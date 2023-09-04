import { z } from "zod";

export const updateBoardDto = z.object({
    title: z.string().min(3).max(30)
})