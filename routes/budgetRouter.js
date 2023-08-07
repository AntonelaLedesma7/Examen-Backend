import { Router } from 'express'
import budgetController from '../controllers/budgetControllers.js'
import { valueGrabber } from '../middlewares/valueGrabber.js'
import { budgetBodyValidation, deleteValidation, paramsValidation } from '../middlewares/validations.js'
import { userAuth } from '../middlewares/auth.js'

export const budgetRoutes = () => {
  const budgetRouter = Router()
  const {
    getBudgets,
    createBudget,
    getBudgetById,
    updateBudget,
    deleteBudget
  } = budgetController()

  budgetRouter.route('/budgets')
    .get(getBudgets)
    .post(budgetBodyValidation, userAuth, valueGrabber, createBudget)

  budgetRouter.route('/budgets/:id')
    .get(paramsValidation, getBudgetById)
    .put(paramsValidation, budgetBodyValidation, userAuth, valueGrabber, updateBudget)
    .delete(paramsValidation, deleteValidation, userAuth, deleteBudget)

  return budgetRouter
}
