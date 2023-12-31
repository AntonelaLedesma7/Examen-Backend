import { Router } from 'express'
import authController from '../controllers/authControllers.js'
import { userBodyValidation, authBodyValidation } from '../middlewares/validations.js'

export const authRoutes = () => {
  const authRouter = Router()
  const { login, refresh, register } = authController()

  authRouter.route('/auth/login')
    .post(authBodyValidation, login)

  authRouter.route('/auth/refresh')
    .post(refresh)

  authRouter.route('/register')
    .post(userBodyValidation, register)

  return authRouter
}
