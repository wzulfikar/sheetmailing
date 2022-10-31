import { NextApiRequest } from 'next'
import { z } from 'zod'

import { ValidationError } from './errors'

export const validateRequestSchema = (req: NextApiRequest, schema) => {
  if (!schema) return

  const schemaPayload = {
    query: req.query,
    body: req.body,
  }

  const schemaResult = schema.safeParse(schemaPayload, { errorMap })
  if (!schemaResult.success) {
    throw new ValidationError(schemaResult.error.issues[0].message)
  }
}

const errorMap: z.ZodErrorMap = (error, ctx) => {
  let message = ctx.defaultError

  const { path, code } = error
  switch (code) {
    case z.ZodIssueCode.invalid_type:
      if (error.received === 'undefined') {
        message = `${path.join('.')} is required`
      } else {
        const field = path.join('.')
        const { expected, received } = error
        message = `Expected ${expected} got ${received}: ${field}`
      }
  }
  return { message }
}
