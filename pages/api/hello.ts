import { z } from "zod";
import { ApiHandler, handle } from "src/lib/backend"

const schema = z.object({
  query: z.object({
    name: z.string()
  })
})

const handler: ApiHandler<typeof schema> = async (req, res) => {
  res.status(200).json({ success: true, name: `Hello, ${req.query.name}!` })
}


export default handle(handler, { schema })
