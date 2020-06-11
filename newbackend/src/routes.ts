import express from 'express'
import UserController from './controllers/UserController'
import ProfileController from './controllers/ProfileController'
import SessionController from './controllers/SessionController'

const routes = express.Router()

const usercontroller = new UserController()
const profilecontroller = new ProfileController()
const sessioncontroller = new SessionController()

routes.post('/api42/user', usercontroller.store)
routes.put('/api42/user', usercontroller.update)

routes.get('/api42/profile/:userId', profilecontroller.index)
routes.put('/api42/profile', profilecontroller.update)

routes.post('/api42/session', sessioncontroller.store)

export default routes
