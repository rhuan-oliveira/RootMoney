import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

class BalanceController {
  async index (req: Request, res: Response) {
    const userId = req.userId

    const balance = await prisma.balance.findOne({
      where: { userId },
      select: {
        balance: true,
        spends: true,
        incomes: true
      }
    })

    return res.json(balance)
  }

  async update (req: Request, res: Response) {
    const { balance, spends, incomes } = req.body

    await prisma.balance.update({
      where: { userId: req.userId },
      data: { balance, spends, incomes }
    })

    return res.sendStatus(200)
  }
}

export default BalanceController
