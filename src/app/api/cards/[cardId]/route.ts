import { NextResponse } from "next/server"

import { updateCardDto } from "../dto"
import prismadb from "@/lib/prismadb"

interface ICardsContextProps {
     params: {
        cardId: string
     }
}

export async function DELETE(request: Request, {params}: ICardsContextProps) {
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
 
export async function PATCH(request: Request, {params}: ICardsContextProps) {
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

    const updatedCard = await prismadb.cards.update({
        where: {
            id
        },
        data: {
            ...validateBody.data
        }
    })

    return NextResponse.json(updatedCard)
}