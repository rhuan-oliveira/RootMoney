import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

class ProfileController {
  async update (req: Request, res: Response) {
    const { firstname, lastname, phone } = req.body

    const profile = await prisma.profile.update({
      where: { userId: req.body.userid },
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
