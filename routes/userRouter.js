import { Router } from 'express'
import userController from '../controllers/userControllers.js'
import { userBodyValidation, paramsValidation, deleteValidation } from '../middlewares/validations.js'
import { userAuth } from '../middlewares/auth.js'

export const userRoutes = () => {
  const userRouter = Router()
  const {
    getUsers,
    getUserById,
    updateUser,
    deleteUser
  } = userController()

  userRouter.route('/users')
    .get(getUsers)

  userRouter.route('/users/:id')
    .get(paramsValidation, getUserById)
    .put(paramsValidation, userBodyValidation, userAuth, updateUser)
    .delete(paramsValidation, deleteValidation, userAuth, deleteUser)

  return userRouter
}
