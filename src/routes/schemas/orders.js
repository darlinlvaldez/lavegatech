import { z } from "zod";
import { ERROR_ZOD } from "../../utils/error.js";

const request = {} 

request.order = z.object({
  nombre: z
    .string()
    .trim()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED })
    .max(40, { message: ERROR_ZOD.USERNAME_MAX })
    .refine(val => val.trim().length > 0, {
      message: ERROR_ZOD.FIELD_REQUIRED}),
  apellido: z
    .string()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED}),
  email: z
  .string()
  .min(1, { message: ERROR_ZOD.FIELD_REQUIRED })
  .email({ message: ERROR_ZOD.EMAIL_INVALID })
  .refine(val => val.endsWith('@gmail.com'), {
    message: ERROR_ZOD.EMAIL_DOMAIN}),
  direccion: z
    .string()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED }),
  ciudad_envio_id: z.coerce
  .number()
  .int()
  .min(1, { message: ERROR_ZOD.FIELD_REQUIRED }),
  distrito: z
    .string()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED }),
  telefono: z
    .string()
    .length(10, { message: ERROR_ZOD.NUMBER_MIN }),
  envio_diferente: z
    .number()
    .int()
    .min(0)
    .max(1)
    .default(0)
}).strict();

export default request;