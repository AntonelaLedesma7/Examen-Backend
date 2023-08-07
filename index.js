import express from 'express'
import dotenv from 'dotenv'
import { expressjwt as jwt } from 'express-jwt'
import { userRoutes } from './routes/userRouter.js'
import { destinationRoutes } from './routes/destinationRouter.js'
import { savingPlanRoutes } from './routes/savingPlanRouter.js'
import { budgetRoutes } from './routes/budgetRouter.js'
import { authRoutes } from './routes/authRouter.js'
import errorHandler from './middlewares/errorHandlers.js'
import { invalidEndpoint } from './middlewares/invalidEnpoint.js'
dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(
  jwt({
    secret: process.env.SECRET_KEY,
    algorithms: ['HS256']
  }).unless({ path: ['/api/auth/login', '/api/auth/refresh', '/api/register'] })
)

app.use(express.json())

app.use('/api', authRoutes(), userRoutes(), destinationRoutes(), budgetRoutes(), savingPlanRoutes())

app.use(errorHandler)

app.use('/*', invalidEndpoint)

app.listen(PORT)
