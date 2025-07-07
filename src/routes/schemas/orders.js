import { z } from "zod";
import { ERROR_ZOD } from "../../utils/error.js";

const request = {} 

request.order = z.object({
  nombre: z
    .string()
    .trim()
    .min(1, { message: ERROR_ZOD.USERNAME_REQUIRED })
    .max(40, { message: ERROR_ZOD.USERNAME_MAX })
    .refine(val => val.trim().length > 0, {
      message: ERROR_ZOD.USERNAME_REQUIRED}),
  apellido: z
    .string()
    .min(1, { message: ERROR_ZOD.FIRSNAME_REQUIRED}),
  email: z
  .string()
  .min(1, { message: ERROR_ZOD.EMAIL_REQUIRED })
  .email({ message: ERROR_ZOD.EMAIL_INVALID })
  .refine(val => val.endsWith('@gmail.com'), {
    message: ERROR_ZOD.EMAIL_DOMAIN
  }),
  direccion: z
    .string()
    .min(1, { message: ERROR_ZOD.ADDRESS_MIN }),
  ciudad: z
    .string()
    .min(1, { message: ERROR_ZOD.CITY_MIN }),
  distrito: z
    .string()
    .min(1, { message: ERROR_ZOD.DISCTRIC_MIN }),
  telefono: z
    .string()
    .length(10, { message: ERROR_ZOD.NUMBER_MIN })
}).strict();

export default request;