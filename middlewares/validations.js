import { userBodySchema, paramsSchema, deleteShema } from '../validations/userSchema.js'
import { savingPlanBodySchema } from '../validations/savingPlanSchema.js'
import { destinationBodySchema } from '../validations/destinationSchema.js'
import budgetBodySchema from '../validations/budgetSchema.js'
import { authBodySchema } from '../validations/authSchema.js'

export const paramsValidation = (request, _response, next) => {
  const params = request.params
  const { error } = paramsSchema.validate(params, { abortEarly: false })
  error ? next(error) : next()
}

export const userBodyValidation = (request, _response, next) => {
  const bodyData = request.body
  const { error } = userBodySchema.validate(bodyData, { abortEarly: false })
  error ? next(error) : next()
}

export const savingPlanBodyValidation = (request, _response, next) => {
  const bodyData = request.body
  const { error } = savingPlanBodySchema.validate(bodyData, { abortEarly: false })
  error ? next(error) : next()
}

export const destinationBodyValidation = (request, _response, next) => {
  const bodyData = request.body
  const { error } = destinationBodySchema.validate(bodyData, { abortEarly: false })
  error ? next(error) : next()
}

export const budgetBodyValidation = (request, _response, next) => {
  const bodyData = request.body
  const { error } = budgetBodySchema.validate(bodyData, { abortEarly: false })
  error ? next(error) : next()
}

export const authBodyValidation = (request, _response, next) => {
  const bodyData = request.body
  const { error } = authBodySchema.validate(bodyData, { abortEarly: false })
  error ? next(error) : next()
}

export const deleteValidation = (request, _response, next) => {
  const bodyData = request.body
  const { error } = deleteShema.validate(bodyData, { abortEarly: false })
  error ? next(error) : next()
}
