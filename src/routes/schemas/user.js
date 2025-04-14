import { z } from "zod";

const request = {}

request.update = z.object({
    username: z.string().optional(),
    email: z.string().email().optional(),
}).strict();

request.updatePassword= z.object({
password: z.string().min(1),
}).strict();

export default request;