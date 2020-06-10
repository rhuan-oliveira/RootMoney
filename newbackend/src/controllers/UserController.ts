import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

class UserController {
  async store (req: Request, res: Response) {
    const password = await bcrypt.hash(req.body.password, 9)
    const { id, name, email } = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password_hash: password,
        profile: {
          create: {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone
          }
        }
      }
    })

    return res.json({ id, name, email })
  }
}

export default UserController
