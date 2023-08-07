import httpStatus from '../helpers/httpStatus.js'
import prisma from '../database/prisma.js'
import addSoftDelete from '../extensions/softDelete.js'

const destinationsController = () => {
  const createDestination = async (request, response, next) => {
    try {
      const {
        destinationPlace,
        language,
        estimatedLifeCost
      } = request.body

      const destination = await prisma.destinations.create({
        data: {
          destinationPlace,
          language,
          estimatedLifeCost
        }
      })

      return response.status(httpStatus.CREATED).json(destination)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getDestinations = async (_request, response, next) => {
    try {
      const destinations = await prisma.destinations.findMany({
        where: {
          deletedAt: null
        }
      })
      return response.status(httpStatus.OK).json(destinations)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getDestinationById = async (request, response, next) => {
    try {
      const { id } = request.params
      const destination = await prisma.destinations.findFirst({
        where: {
          id: Number(id),
          deletedAt: null
        }
      })

      return response.status(httpStatus.OK).json(destination)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const updateDestination = async (request, response, next) => {
    try {
      const { id } = request.params
      const {
        destinationPlace,
        language,
        estimatedLifeCost
      } = request.body

      const updatedDestination = await prisma.destinations.update({
        where: {
          id: Number(id)
        },

        data: {
          destinationPlace,
          language,
          estimatedLifeCost
        }
      })

      return response.status(httpStatus.OK).json(updatedDestination)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const deleteDestination = async (request, response, next) => {
    try {
      const { id } = request.params
      await addSoftDelete.destinations.delete({
        where: {
          id: Number(id)
        }
      })

      return response.status(httpStatus.OK).json({
        success: true,
        message: 'Destination deleted'
      })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  return {
    createDestination,
    getDestinations,
    getDestinationById,
    updateDestination,
    deleteDestination
  }
}

export default destinationsController
