import { z } from "zod";

const request = {}

request.register = z.object({
    username: z.string().min(3).max(40),
    email: z.string().email().min(5),
    password: z.string().min(6),
    confirmPassword: z.string().min(6)
}).strict();

request.login = z.object({
    email: z.string().email().min(5),
    password: z.string().min(6)
}).strict();

request.verifyCode = z.object({
    email: z.string().email(),
    code: z.string().min(6).max(6),
    type: z.string() 
}).strict();

request.email = z.object({
    email: z.string().email().min(1)
}).strict();

request.updatePassword = z.object({
    email: z.string().email().min(1),
    password: z.string().min(6),
    confirm: z.string().min(6)
}).strict();

request.formEmail = z.object({
    nombre: z.string().min(3),
    correo: z.string().email().min(5),
    asunto: z.string().min(10),
    mensaje: z.string().min(10)
}).strict();

export default request;