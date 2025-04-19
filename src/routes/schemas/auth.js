import { z } from "zod";

const request = {}

request.register = z.object({
    username: z.string().min(1).max(),
    password: z.string().min(1),
    email: z.string().email().min(5)
}).strict();

request.login = z.object({
    username: z.string().min(1),
    password: z.string().min(1)
}).strict();

request.authenticate = z.object({
    token: z.string().min(1)
}).strict();

request.verify = z.object({
    token: z.string().min(1)
}).strict();

export default request;