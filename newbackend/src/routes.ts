import express from 'express'
import UserController from './controllers/UserController'
import ProfileController from './controllers/ProfileController'

const routes = express.Router()

const usercontroller = new UserController()
const profilecontroller = new ProfileController()

routes.post('/api42/user', usercontroller.store)
routes.put('/api42/user', usercontroller.update)

routes.get('/api42/profile/:userId', profilecontroller.index)
routes.put('/api42/profile', profilecontroller.update)

export default routes
