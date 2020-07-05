import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

class ProfileController {
  async index (req: Request, res: Response) {
    const userId = req.userId

    const profile = await prisma.profile.findOne({
      where: { userId }
    })

    return res.json(profile)
  }

  async update (req: Request, res: Response) {
    const { firstname, lastname, phone } = req.body

    const profile = await prisma.profile.update({
      where: { userId: req.userId },
      data: { firstname, lastname, phone },
      select: {
        firstname: true,
        lastname: true,
        phone: true
      }
    })

    return res.json(profile)
  }
}

export default ProfileController
