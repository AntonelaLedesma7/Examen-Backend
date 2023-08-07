import httpStatus from '../helpers/httpStatus.js'
import prisma from '../database/prisma.js'
import addSoftDelete from '../extensions/softDelete.js'

const budgetsController = () => {
  const createBudget = async (request, response, next) => {
    try {
      const {
        destinationID,
        amountToReach,
        assignedSavingAmount,
        priorityLevel,
        userID,
        savingPlanID
      } = request.body

      const cumulativeAmount = request.cumulativeAmount
      const value = ((cumulativeAmount) * (assignedSavingAmount)) / 100
      const currentAmount = value

      const budget = await prisma.budgets.create({
        data: {
          destinationID: Number(destinationID),
          amountToReach,
          assignedSavingAmount,
          currentAmount,
          remainingAmount: (amountToReach || 0) - (currentAmount || 0),
          priorityLevel,
          userID: Number(userID),
          savingPlanID: Number(savingPlanID)
        }
      })

      return response.status(httpStatus.CREATED).json(budget)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getBudgets = async (_request, response, next) => {
    try {
      const budgets = await prisma.budgets.findMany({
        where: {
          deletedAt: null
        },
        include: {
          User: true,
          Destination: true,
          SavingPlan: true
        }
      })

      const budgetsWithoutDelete = budgets.map(budget => {
        const { User: user, Destination: destination, SavingPlan: savingPlan } = budget
        return {
          ...budget,
          User: user.deletedAt === null ? user : null,
          Destination: destination.deletedAt === null ? destination : null,
          SavingPlan: savingPlan.deletedAt === null ? savingPlan : null
        }
      })

      return response.status(httpStatus.OK).json(budgetsWithoutDelete)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getBudgetById = async (request, response, next) => {
    try {
      const { id } = request.params

      const budget = await prisma.budgets.findFirst({
        where: {
          id: Number(id),
          deletedAt: null
        }
      })

      return response.status(httpStatus.OK).json(budget)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const updateBudget = async (request, response, next) => {
    try {
      const { id } = request.params
      const {
        amountToReach,
        assignedSavingAmount,
        priorityLevel
      } = request.body

      const cumulativeAmount = request.cumulativeAmount
      const value = ((cumulativeAmount) * (assignedSavingAmount)) / 100
      const currentAmount = value

      const updatedBudget = await prisma.budgets.update({
        where: {
          id: Number(id)
        },
        data: {
          amountToReach,
          assignedSavingAmount,
          currentAmount,
          remainingAmount: (amountToReach || 0) - (currentAmount || 0),
          priorityLevel
        }
      })

      return response.status(httpStatus.OK).json(updatedBudget)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const deleteBudget = async (request, response, next) => {
    try {
      const { id } = request.params
      await addSoftDelete.budgets.delete({
        where: {
          id: Number(id)
        }
      })

      return response.status(httpStatus.OK).json({
        success: true,
        message: 'Budget deleted'
      })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  return {
    createBudget,
    getBudgets,
    getBudgetById,
    updateBudget,
    deleteBudget
  }
}

export default budgetsController
