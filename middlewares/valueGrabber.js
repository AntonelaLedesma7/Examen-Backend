import prisma from '../database/prisma.js'

export const valueGrabber = async (request, _response, next) => {
  try {
    const { id } = request.params
    const { savingPlanID } = request.body

    let savingPlan

    if (savingPlanID) {
      savingPlan = await prisma.savingPlan.findFirst({
        where: {
          id: Number(savingPlanID)
        }
      })
    } else if (id) {
      savingPlan = await prisma.savingPlan.findFirst({
        where: {
          id: Number(id)
        }
      })
    }

    const cumulativeAmount = savingPlan.cumulativeAmount

    request.cumulativeAmount = cumulativeAmount
    next()
  } catch (error) {
    next(error)
  } finally {
    await prisma.$disconnect()
  }
}
