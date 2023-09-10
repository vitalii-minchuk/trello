import { NextResponse } from "next/server"

import { createBoardDto } from "./dto"
import prismadb from "@/lib/prismadb"

export async function GET(request: Request) {
    const boards = await prismadb.boards.findMany()

    return NextResponse.json(boards)
}

export async function POST(request: Request) {
    const bodyRaw = await request.json()
    const validateBody = createBoardDto.safeParse(bodyRaw)
    
    if (!validateBody.success) {
        return NextResponse.json(validateBody.error.issues, {status: 400})
    }

    const {title} = validateBody.data

    const newBoard = await prismadb.boards.create({
        data: {
            title
        }
    })

    return NextResponse.json(newBoard)
}