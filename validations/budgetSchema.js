import Joi from 'joi'

const options = ['low', 'medium', 'high']

const budgetBodySchema = Joi.object({
  destinationID: Joi.number().integer(),

  amountToReach: Joi.number()
    .integer()
    .positive()
    .min(0)
    .required(),

  assignedSavingAmount: Joi.number()
    .integer()
    .positive()
    .min(0)
    .max(100)
    .required(),

  priorityLevel: Joi.string()
    .valid(...options)
    .required(),

  userID: Joi.number()
    .integer()
    .required(),

  savingPlanID: Joi.number()
    .integer()
    .required(),

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

export default budgetBodySchema
