import { z } from "zod";

export const createBoardDto = z.object({
    title: z.string().min(3).max(30)
})

export type TCreateBoardDto = z.infer<typeof createBoardDto>

export const updateBoardDto = createBoardDto.partial()