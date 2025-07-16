import { z } from "zod";
import { ERROR_ZOD } from "../../utils/error.js";

const request = {};

request.register = z.object({
  username: z
    .string()
    .trim()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED })
    .max(40, { message: ERROR_ZOD.USERNAME_MAX })
    .refine(val => val.trim().length > 0, {
      message: ERROR_ZOD.FIELD_REQUIRED}),
  email: z
    .string()
    .email({ message: ERROR_ZOD.EMAIL_INVALID })
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED })
    .refine(val => val.endsWith('@gmail.com'), {
    message: ERROR_ZOD.EMAIL_DOMAIN}),
  password: z
    .string({ required_error: ERROR_ZOD.FIELD_REQUIRED })
    .min(6, { message: ERROR_ZOD.PASSWORD_MIN }),
  confirmPassword: z
    .string({ required_error: ERROR_ZOD.FIELD_REQUIRED })
    .min(6, { message: ERROR_ZOD.PASSWORD_MIN }),
}).strict();

request.login = z.object({
  email: z
    .string()
    .email({ message: ERROR_ZOD.EMAIL_INVALID })
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED })
    .refine(val => val.endsWith('@gmail.com'), {
    message: ERROR_ZOD.EMAIL_DOMAIN}),
  password: z
    .string({ required_error: ERROR_ZOD.FIELD_REQUIRED })
    .min(6, { message: ERROR_ZOD.PASSWORD_MIN }),
}).strict();

request.verifyCode = z.object({
  email: z
    .string()
    .email({ message: ERROR_ZOD.EMAIL_INVALID })
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED })
    .refine(val => val.endsWith('@gmail.com'), {
    message: ERROR_ZOD.EMAIL_DOMAIN
  }),
  code: z
    .string({ required_error: ERROR_ZOD.FIELD_REQUIRED })
    .min(6, { message: ERROR_ZOD.CODE_LENGTH })
    .max(6, { message: ERROR_ZOD.CODE_LENGTH }),
  type: z.string(),
}).strict();

request.email = z.object({
  email: z
    .string()
    .email({ message: ERROR_ZOD.EMAIL_INVALID })
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED })
    .refine(val => val.endsWith('@gmail.com'), {
    message: ERROR_ZOD.EMAIL_DOMAIN
  }),
}).strict();

request.forgotPassword = z.object({
  email: z
    .string()
    .email({ message: ERROR_ZOD.EMAIL_INVALID })
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED })
    .refine(val => val.endsWith('@gmail.com'), {
    message: ERROR_ZOD.EMAIL_DOMAIN
  }),
  password: z
    .string({ required_error: ERROR_ZOD.FIELD_REQUIRED })
    .min(6, { message: ERROR_ZOD.PASSWORD_MIN }),
  confirm: z
    .string({ required_error: ERROR_ZOD.FIELD_REQUIRED })
    .min(6, { message: ERROR_ZOD.PASSWORD_MIN }),
}).strict();

request.formEmail = z.object({
  nombre: z
    .string()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED }),
  email: z
    .string()
    .email({ message: ERROR_ZOD.EMAIL_INVALID })
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED })
    .refine(val => val.endsWith('@gmail.com'), {
    message: ERROR_ZOD.EMAIL_DOMAIN
  }),
  asunto: z
    .string()
    .min(10, { message: ERROR_ZOD.AFFAIR_MIN }),
  mensaje: z
    .string()
    .min(10, { message: ERROR_ZOD.MESSAGE_MIN }),
}).strict();

export default request;