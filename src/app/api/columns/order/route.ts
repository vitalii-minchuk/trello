import { NextResponse } from "next/server";

import { updateColumnOrderDto } from "../dto";
import prismadb from "@/app/lib/prismadb";

export async function PATCH(request: Request) {
    const bodyRaw = await request.json()
    const validateBody = updateColumnOrderDto.safeParse(bodyRaw)
    
    if (!validateBody.success) {
        return NextResponse.json(validateBody.error.issues, {status: 400})
    }

    const queries = validateBody.data.map(({id, order}) => {
        return prismadb.columns.update({
            where:{
                id
            },
            data: {
                order
            }
        })
    })

    await prismadb.$transaction(queries)

    return NextResponse.json({}, {status: 200})
}