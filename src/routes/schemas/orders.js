import { z } from "zod";
import { ERROR_ZOD } from "../../utils/error.js";

const request = {} 

request.order = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED })
    .max(40, { message: ERROR_ZOD.USERNAME_MAX })
    .refine(val => val.trim().length > 0, {
      message: ERROR_ZOD.FIELD_REQUIRED}),
  lastName: z
    .string()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED}),
  email: z
  .string()
  .min(1, { message: ERROR_ZOD.FIELD_REQUIRED })
  .email({ message: ERROR_ZOD.EMAIL_INVALID })
  .refine(val => val.endsWith('@gmail.com'), {
    message: ERROR_ZOD.EMAIL_DOMAIN}),
  address: z
    .string()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED }),
  shippingCityId: z.coerce
  .number()
  .int()
  .min(1, { message: ERROR_ZOD.FIELD_REQUIRED }),
  district: z
    .string()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED }),
  tel: z
    .string()
    .length(10, { message: ERROR_ZOD.NUMBER_MIN }),
  differentShipping: z
    .number()
    .int()
    .min(0)
    .max(1)
    .default(0)
}).strict();

export default request;