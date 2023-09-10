import { z } from "zod";

export const createCardDto = z.object({
    title: z.string().min(3).max(30),
    columnId: z.string().uuid()
})

export const updateCardDto = createCardDto
    .extend({
        descriptions: z.string().max(255).nullable()
    })
    .partial()

export const updateCardOrderDto = z.array(z.object({
    id: z.string().uuid(),
    order: z.number()
}))