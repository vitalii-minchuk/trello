import { NextResponse } from "next/server"

import { createColumnDto } from "./dto"
import prismadb from "@/lib/prismadb"

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url)
    const boardId = searchParams.get('boardId')

    if (!boardId) {
        return NextResponse.json([{
            code: 'missing_query_param',
            field: 'boardId',
            message: 'Query param boardId is required'
        }], {status: 400})
    }

    const columns = await prismadb.columns.findMany({
        where: {
            boardId
        },
        orderBy: {
            order: 'asc'
        }
    })

    return NextResponse.json(columns)
}

export async function POST(request: Request) {
    const bodyRaw = await request.json()
    const validateBody = createColumnDto.safeParse(bodyRaw)
    
    if (!validateBody.success) {
        return NextResponse.json(validateBody.error.issues, {status: 400})
    }

    const {title, boardId, width} = validateBody.data

    const lastColumn = await prismadb.columns.findFirst({
        where: {
            boardId
        },
        orderBy: {
            order: 'desc'
        }
    })

    const newColumn = await prismadb.columns.create({
        data: {
            title,
            boardId,
            width,
            order: lastColumn ? lastColumn.order + 1 : 0,
        }
    })

    return NextResponse.json(newColumn)
}