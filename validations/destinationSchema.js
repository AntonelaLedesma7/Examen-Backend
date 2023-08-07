import Joi from 'joi'

export const destinationBodySchema = Joi.object({
  destinationPlace: Joi.string()
    .min(3)
    .max(30)
    .required(),

  language: Joi.string()
    .min(3)
    .max(30)
    .required(),

  estimatedLifeCost: Joi.number()
    .min(1)
    .max(10)
    .required()
    .messages({
      'number.min': 'The estimatedLifeCost field must be between the range 1-10',
      'number.max': 'The estimatedLifeCost field must be between the range 1-10'
    })
})
