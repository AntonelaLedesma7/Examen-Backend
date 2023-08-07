import { Router } from 'express'
import savingPlanController from '../controllers/savingPlanControllers.js'
import { valueGrabber } from '../middlewares/valueGrabber.js'
import { deleteValidation, paramsValidation, savingPlanBodyValidation } from '../middlewares/validations.js'
import { userAuth } from '../middlewares/auth.js'

export const savingPlanRoutes = () => {
  const savingPlanRouter = Router()
  const {
    createSavingPlan,
    getSavingPlans,
    getSavingPlanById,
    updateSavingPlan,
    deleteSavingPlan
  } = savingPlanController()

  savingPlanRouter.route('/saving-plans')
    .get(getSavingPlans)
    .post(savingPlanBodyValidation, userAuth, createSavingPlan)

  savingPlanRouter.route('/saving-plans/:id')
    .get(paramsValidation, getSavingPlanById)
    .put(paramsValidation, savingPlanBodyValidation, userAuth, valueGrabber, updateSavingPlan)
    .delete(paramsValidation, deleteValidation, userAuth, deleteSavingPlan)

  return savingPlanRouter
}
