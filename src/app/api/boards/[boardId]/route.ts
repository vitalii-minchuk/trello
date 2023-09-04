import { NextResponse } from "next/server"
import { updateBoardDto } from "./dto"
import prismadb from "@/app/lib/prismadb"

interface IContextProps {
     params: {
        boardId: string
     }
}

export async function DELETE(request: Request, {params}: IContextProps) {
    const id = params.boardId

    await prismadb.boards.deleteMany({
        where: {
            id
        }
    })
    
    return NextResponse.json({})
}
 
export async function PATCH(request: Request, {params}: IContextProps) {
    const bodyRaw = await request.json()
    const validateBody = updateBoardDto.safeParse(bodyRaw)
    const id = params.boardId

    if (!validateBody.success) {
        return NextResponse.json(validateBody.error.issues, {status: 400})
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