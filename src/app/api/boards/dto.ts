import { z } from "zod";

export const createBoardDto = z.object({
    title: z.string().min(3).max(30)
})