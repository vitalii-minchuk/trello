import { NextResponse } from "next/server"

import { createCardDto } from "./dto"
import prismadb from "@/lib/prismadb"

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url)
    const columnId = searchParams.get('columnId')

    if (!columnId) {
        return NextResponse.json([{
            code: 'missing_query_param',
            field: 'columnId',
            message: 'Query param columnId is required'
        }], {status: 400})
    }

    const cards = await prismadb.cards.findMany({
        where: {
            columnId
        },
        orderBy: {
            order: 'asc'
        }
    })

    return NextResponse.json(cards)
}

export async function POST(request: Request) {
    const bodyRaw = await request.json()
    const validateBody = createCardDto.safeParse(bodyRaw)
    
    if (!validateBody.success) {
        return NextResponse.json(validateBody.error.issues, {status: 400})
    }

    const {columnId} = validateBody.data

    const lastCard = await prismadb.cards.findFirst({
        where: {
            columnId
        },
        orderBy: {
            order: 'desc'
        }
    })

    const newCard = await prismadb.cards.create({
        data: {
            ... validateBody.data,
            order: lastCard ? lastCard.order + 1 : 0,
        }
    })

    return NextResponse.json(newCard)
}