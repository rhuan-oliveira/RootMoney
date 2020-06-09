import express from 'express'

const routes = express.Router()

routes.get('/test', (req: express.Request, res: express.Response) => {
  res.json({ test: 'working' })
})

export default routes
