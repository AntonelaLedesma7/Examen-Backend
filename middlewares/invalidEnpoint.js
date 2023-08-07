import httpstatus from '../helpers/httpStatus.js'

export const invalidEndpoint = (request, response, next) => {
  return response.status(httpstatus.NOT_FOUND).send('This route does not exist')
}
