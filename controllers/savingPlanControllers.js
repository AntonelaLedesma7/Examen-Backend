import httpStatus from '../helpers/httpStatus.js'
import prisma from '../database/prisma.js'
import addSoftDelete from '../extensions/softDelete.js'

const savingPlanController = () => {
  const createSavingPlan = async (request, response, next) => {
    try {
      const {
        depositPeriod,
        fixedAmount,
        extraAmount,
        userID
      } = request.body

      const createdSavingPlan = await prisma.savingPlan.create({
        data: {
          userID: Number(userID),
          depositPeriod,
          fixedAmount,
          extraAmount,
          cumulativeAmount: (fixedAmount || 0) + (extraAmount || 0)
        }
      })
      return response.status(httpStatus.CREATED).json(createdSavingPlan)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getSavingPlans = async (_request, response, next) => {
    try {
      const savingPlans = await prisma.savingPlan.findMany({
        where: {
          deletedAt: null
        },
        include: {
          User: true
        }
      })
      const savingPlansWithoutDelete = savingPlans.map(savingPlan => {
        const { User: user } = savingPlan
        return {
          ...savingPlan,
          User: user.deletedAt === null ? user : null
        }
      })
      return response.status(httpStatus.OK).json(savingPlansWithoutDelete)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getSavingPlanById = async (request, response, next) => {
    try {
      const { id } = request.params
      const savingPlan = await prisma.savingPlan.findFirst({
        where: {
          id: Number(id),
          deletedAt: null
        }
      })
      return response.status(httpStatus.OK).json(savingPlan)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const updateSavingPlan = async (request, response, next) => {
    try {
      const { id } = request.params
      const {
        depositPeriod,
        fixedAmount,
        extraAmount
      } = request.body

      const cumulativeAmount = request.cumulativeAmount

      const updatedSavingPlan = await prisma.savingPlan.update({
        where: {
          id: Number(id)
        },
        data: {
          depositPeriod,
          fixedAmount,
          extraAmount,
          cumulativeAmount: (cumulativeAmount || 0) + (fixedAmount || 0) + (extraAmount || 0)
        }
      })

      return response.status(httpStatus.OK).json(updatedSavingPlan)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const deleteSavingPlan = async (request, response, next) => {
    try {
      const { id } = request.params
      await addSoftDelete.savingPlan.delete({
        where: {
          id: Number(id)
        }
      })

      return response.status(httpStatus.OK).json({
        success: true,
        message: 'Saving plan deleted'
      })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  return {
    createSavingPlan,
    getSavingPlans,
    getSavingPlanById,
    updateSavingPlan,
    deleteSavingPlan
  }
}

export default savingPlanController
