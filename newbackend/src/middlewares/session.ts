import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import authConfig from '../config/auth'

export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded: any = verify(token, authConfig.secret)

    req.headers.userId = decoded.id

    return next()
  } catch (err) {
    console.log(err)
    return res.status(401).json({ error: 'Token invalid' })
  }
}
