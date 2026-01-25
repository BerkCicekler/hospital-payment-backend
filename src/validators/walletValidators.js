import {z} from 'zod'

export const topUpSchema = z.object({
    idempotencyKey: z.string().uuid(),
    amount: z.number().min(100, "Amount must be over 100")
})