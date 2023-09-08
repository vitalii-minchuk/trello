import { z } from "zod";

export const createColumnDto = z.object({
    title: z.string().min(3).max(30),
    boardId: z.string().uuid(),
    width: z.number().min(50).default(100)
})

export const updateColumnDto = createColumnDto.partial()