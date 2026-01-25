import { prisma } from '../config/db.js'

export const topUp = async (req, res) => {
    const {idempotencyKey, amount} = req.body;

    console.log(req.user);

    const transaction = await prisma.walletTransaction.findUnique({
    where: {
        walletId_idempotencyKey: {
        walletId: req.user.wallet.id,
        idempotencyKey: idempotencyKey
        }
    }
    })

    if (transaction) {
        console.log("This transaction already exist")
        return res.json(transaction);
    }

    const data = await prisma.walletTransaction.create({
        data: {
            walletId: req.user.wallet.id,
            amount: amount,
            idempotencyKey: idempotencyKey,
            type: "TOP_UP",
            status: "SUCCESS"
        }
    }
    )

    if (data) {
        const updateWalletBalence = await prisma.wallet.update({
            where: {
                id: req.user.wallet.id
            },
        data: {
            balance: {
            increment: amount,
            },
        }
        }
    )
    }

    res.json(data)
}

