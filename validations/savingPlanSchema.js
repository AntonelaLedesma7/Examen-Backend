import Joi from 'joi'

const options = ['per day', 'per week', 'per fortnight', 'per month']

export const savingPlanBodySchema = Joi.object({
  userID: Joi.number().integer(),

  depositPeriod: Joi.string()
    .valid(...options)
    .required(),

  fixedAmount: Joi.number()
    .integer()
    .positive()
    .min(0)
    .required(),

  extraAmount: Joi.number()
    .integer()
    .min(0),

  password: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
    )
    .min(8)
    .max(20)
    .required()
    .messages({
      'string.pattern.base':
        'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (@$!%*?&)',
      'string.min': 'Password must have at least {#limit} characters',
      'string.max': 'Password must not be longer than {#limit} characters'
    })
})
