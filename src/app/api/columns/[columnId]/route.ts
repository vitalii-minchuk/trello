import { NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"
import { updateColumnDto } from "../dto"

interface IColumnsContextProps {
     params: {
        columnId: string
     }
}

export async function DELETE(request: Request, {params}: IColumnsContextProps) {
    const id = params.columnId

    const findColumn = await prismadb.columns.findUnique({
        where: {
            id
        }
    })

    if (!findColumn) {
        return NextResponse.json({
            code: 'not_found',
            message: 'Column not found'
        }, {
            status: 404
        })
    }

    await prismadb.columns.deleteMany({
        where: {
            id
        }
    })

    return NextResponse.json({}, {status: 200})
}
 
export async function PATCH(request: Request, {params}: IColumnsContextProps) {
    const bodyRaw = await request.json()
    const validateBody = updateColumnDto.safeParse(bodyRaw)
    const id = params.columnId

    if (!validateBody.success) {
        return NextResponse.json(validateBody.error.issues, {status: 400})
    }

    const findColumn = await prismadb.columns.findUnique({
        where: {
            id
        }
    })

    if (!findColumn) {
        return NextResponse.json({
            code: 'not_found',
            message: 'Column not found'
        }, {
            status: 404
        })
    }

    const {title, width} = validateBody.data

    const updatedColumn = await prismadb.columns.update({
        where: {
            id
        },
        data: {
            title,
            width
        }
    })

    return NextResponse.json(updatedColumn)
}