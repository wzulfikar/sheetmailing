import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

type ApiRequest<TSchema extends z.AnyZodObject = z.AnyZodObject> = Omit<
  NextApiRequest,
  'query' | 'body'
> & {
  query: Partial<z.infer<TSchema>['query']>
  body: z.infer<TSchema>['body']
}

type ApiResponse<TData extends z.ZodTypeAny> = NextApiResponse<TData>

export type ApiHandler<
  TRequest extends z.AnyZodObject = z.AnyZodObject,
  TResponse extends z.ZodTypeAny = any
> = (
  req: ApiRequest<TRequest>,
  res: ApiResponse<TResponse>
) => void | Promise<void>
