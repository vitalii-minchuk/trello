import { NextResponse } from "next/server"

import prismadb from "@/app/lib/prismadb"
import { updateCardDto } from "../dto"

interface IColumnsContextProps {
     params: {
        cardId: string
     }
}

export async function DELETE(request: Request, {params}: IColumnsContextProps) {
    const id = params.cardId

    const findCard = await prismadb.cards.findUnique({
        where: {
            id
        }
    })

    if (!findCard) {
        return NextResponse.json({
            code: 'not_found',
            message: 'Card not found'
        }, {
            status: 404
        })
    }

    await prismadb.cards.deleteMany({
        where: {
            id
        }
    })

    return NextResponse.json({}, {status: 200})
}
 
export async function PATCH(request: Request, {params}: IColumnsContextProps) {
    const bodyRaw = await request.json()
    const validateBody = updateCardDto.safeParse(bodyRaw)
    const id = params.cardId

    if (!validateBody.success) {
        return NextResponse.json(validateBody.error.issues, {status: 400})
    }

    const findCard = await prismadb.cards.findUnique({
        where: {
            id
        }
    })

    if (!findCard) {
        return NextResponse.json({
            code: 'not_found',
            message: 'Card not found'
        }, {
            status: 404
        })
    }

    const {title} = validateBody.data

    const updatedCard = await prismadb.cards.update({
        where: {
            id
        },
        data: {
            title
        }
    })

    return NextResponse.json(updatedCard)
}