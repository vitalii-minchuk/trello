import { z } from "zod";

export const createColumnDto = z.object({
    title: z.string().min(3).max(30),
    boardId: z.string()
})