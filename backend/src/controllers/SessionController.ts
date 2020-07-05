import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import authConfig from '../config/auth'

const prisma = new PrismaClient()

class SessionController {
  async store (req: Request, res: Response) {
    const { email, password } = req.body

    const user = await prisma.user.findOne({
      where: { email }
    })

    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }

    // eslint-disable-next-line camelcase
    const passwordCheck = await bcrypt.compare(password, user?.password_hash ? user.password_hash : '')

    if (!passwordCheck) {
      return res.status(401).json({ error: 'Password does not match' })
    }

    const { id, name } = user

    return res.json({
      user: {
        id,
        name,
        email
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      })
    })
  }
}

export default SessionController
