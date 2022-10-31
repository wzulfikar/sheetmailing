import { z } from "zod";
import { ApiHandler, handle } from "src/lib/backend"

const schema = {
  query: {
    recipient_name: z.string().optional(),
    recipient_email: z.string(),
  }
}

const handler: ApiHandler<typeof schema> = async (req, res) => {

}

export default handle(handler, { schema })
