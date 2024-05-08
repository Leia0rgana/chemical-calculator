import express from 'express'
import { StatusCodes } from 'http-status-codes'
import Element from '../schema/element.js'

const router = express.Router()

router.post('/', async (request, response) => {
  try {
    const elementName = request.body
    const element = await Element.find({ symbol: elementName })

    element && response.status(StatusCodes.OK).send(element.number)
  } catch (err) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err)
  }
})
export default router
