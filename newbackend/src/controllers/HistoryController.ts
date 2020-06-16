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
