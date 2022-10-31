import { z } from "zod"
import { StatusCodes } from 'http-status-codes'
import { NextApiRequest, NextApiResponse } from "next"

import { validateRequestSchema } from "./validateRequestSchema"

type RootOptions = {
  schema?: z.SomeZodObject
}

type RootHandler = (
  handler: (
    req: NextApiRequest,
    res: NextApiResponse
  ) => void | Promise<void>,
  options?: RootOptions
) => (req: NextApiRequest, res: NextApiResponse) => void | Promise<void>

export const handle: RootHandler = (handler, options) => async (req, res) => {
  try {
    await validateRequestSchema(req, options?.schema) // Validate schema

    await handler(req, res) // Run the actual handler
  } catch (e: any) {
    /* Global error handler */
    let statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    switch (e.name) {
      case 'ValidationError':
        statusCode = StatusCodes.BAD_REQUEST
        break
      case 'AuthenticationError':
        statusCode = StatusCodes.UNAUTHORIZED
        break
      default:
        console.error('error caught in RootHandler:', e)
    }
    res.status(statusCode).json({ success: false, message: e.message })
  }
}
