import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import * as Yup from 'yup'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

class UserController {
  async store (req: Request, res: Response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      firstname: Yup.string().required(),
      lastname: Yup.string().required(),
      phone: Yup.string().required().min(8)
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'Validation fails' })
    }

    console.log('pass')

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
        },
        balance: {
          create: {
            balance: 0,
            incomes: 0,
            spends: 0
          }
        }
      }
    })

    return res.json({ id, name, email })
  }

  async update (req: Request, res: Response) {
    const { email, oldpassword, password, confirmpassword, name } = req.body
    const userId = req.userId

    if (password !== confirmpassword) {
      res.status(400).json({ error: 'Confirm password not match' })
    }

    const user = await prisma.user.findOne({
      where: { id: userId }
    })

    if (!user) {
      res.status(400).json({ error: 'User not found.' })
    }

    if (email !== user?.email) {
      const emailExists = await prisma.user.findOne({
        where: { email }
      })

      if (emailExists) {
        return res.status(400).json({ error: 'email already exists.' })
      }
    }

    // eslint-disable-next-line camelcase
    const passwordCheck = await bcrypt.compare(oldpassword, user?.password_hash ? user.password_hash : '')

    if (!passwordCheck) {
      return res.status(401).json({ error: 'Password does not match' })
    }
    const passwordHash = await bcrypt.hash(password, 9)

    const userUpdate = await prisma.user.update({
      where: { id: userId },
      data: { email, password_hash: passwordHash, name },
      select: { id: true, name: true, email: true }
    })

    return res.json(userUpdate)
  }
}

export default UserController
