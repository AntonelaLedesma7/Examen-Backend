import { Router } from 'express'
import destinationsController from '../controllers/destinationControllers.js'
import { adminAuth } from '../middlewares/auth.js'
import { destinationBodyValidation, paramsValidation } from '../middlewares/validations.js'

export const destinationRoutes = () => {
  const destinationRouter = Router()
  const {
    createDestination,
    getDestinations,
    getDestinationById,
    updateDestination,
    deleteDestination
  } = destinationsController()

  destinationRouter.route('/destinations')
    .get(getDestinations)
    .post(adminAuth, destinationBodyValidation, createDestination)

  destinationRouter.route('/destinations/:id')
    .get(paramsValidation, getDestinationById)
    .put(adminAuth, paramsValidation, destinationBodyValidation, updateDestination)
    .delete(adminAuth, paramsValidation, deleteDestination)

  return destinationRouter
}
