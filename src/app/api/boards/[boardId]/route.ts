import { NextResponse } from "next/server"

import prismadb from "@/app/lib/prismadb"
import { updateBoardDto } from "../dto"

interface IBoardsContextProps {
     params: {
        boardId: string
     }
}

export async function DELETE(request: Request, {params}: IBoardsContextProps) {
    const id = params.boardId

    const findBoard = await prismadb.boards.findUnique({
        where: {
            id
        }
    })

    if (!findBoard) {
        return NextResponse.json({
            code: 'not_found',
            message: 'Board not found'
        }, {
            status: 404
        })
    }

    await prismadb.boards.deleteMany({
        where: {
            id
        }
    })

    return NextResponse.json({}, {status: 200})
}
 
export async function PATCH(request: Request, {params}: IBoardsContextProps) {
    const bodyRaw = await request.json()
    const validateBody = updateBoardDto.safeParse(bodyRaw)
    const id = params.boardId

    if (!validateBody.success) {
        return NextResponse.json(validateBody.error.issues, {status: 400})
    }

    const findBoard = await prismadb.boards.findUnique({
        where: {
            id
        }
    })

    if (!findBoard) {
        return NextResponse.json({
            code: 'not_found',
            message: 'Board not found'
        }, {
            status: 404
        })
    }

    const {title} = validateBody.data

    const updatedBoard = await prismadb.boards.update({
        where: {
            id
        },
        data: {
            title
        }
    })

    return NextResponse.json(updatedBoard)
}