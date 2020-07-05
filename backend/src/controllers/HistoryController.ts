import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

class HistoryController {
  async index (req: Request, res: Response) {
    const userId = req.userId

    const balance = await prisma.history.findMany({
      where: { userId },
      select: {
        id: true,
        category: true,
        amount: true,
        description: true,
        type: true,
        date: true
      }
    })

    return res.json(balance)
  }

  async store (req: Request, res: Response) {
    const { category, amount, type, description, date } = req.body
    const userId = req.userId

    if (req.body.autobalance === true) {
      const balanceNow = await prisma.balance.findOne({
        where: { userId }
      })
      let spends = balanceNow?.spends ? balanceNow.spends : 0
      let incomes = balanceNow?.incomes ? balanceNow.incomes : 0
      let newbalance = balanceNow?.balance ? balanceNow.balance : 0
      if (type === 'spends') {
        newbalance = newbalance - amount
        spends += amount
      } else {
        newbalance += amount
        incomes += amount
      }
      await prisma.balance.update({
        where: { userId },
        data: { balance: newbalance, spends, incomes }
      })
    }

    await prisma.history.create({
      data: {
        category,
        amount,
        type,
        description,
        date,
        user: {
          connect: { id: userId }
        }
      }
    })

    return res.sendStatus(200)
  }

  async update (req: Request, res: Response) {
    const {
      id,
      category,
      amount,
      description,
      type,
      date
    } = req.body

    await prisma.history.update({
      where: { id },
      data: {
        category,
        amount,
        description,
        type,
        date
      }
    })

    return res.sendStatus(200)
  }
}

export default HistoryController
