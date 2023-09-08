import { NextResponse } from "next/server"
import prismadb from "@/app/lib/prismadb"

import { createColumnDto } from "./dto"

export async function GET(request: Request) {
    const columns = await prismadb.columns.findMany()

    return NextResponse.json(columns)
}

export async function POST(request: Request) {
    const bodyRaw = await request.json()
    const validateBody = createColumnDto.safeParse(bodyRaw)
    
    if (!validateBody.success) {
        return NextResponse.json(validateBody.error.issues, {status: 400})
    }

    const {title, boardId} = validateBody.data

    const newBoard = await prismadb.columns.create({
        data: {
            title,
            boardId,
        }
    })

    return NextResponse.json(newBoard)
}