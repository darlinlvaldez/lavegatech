import { z } from "zod";
import { ERROR_ZOD } from "../../utils/error.js";

const request = {};

request.register = z.object({
  username: z
    .string()
    .min(3, { message: ERROR_ZOD.USERNAME_MIN })
    .max(40, { message: ERROR_ZOD.USERNAME_MAX }),
  email: z
    .string()
    .email({ message: ERROR_ZOD.EMAIL_INVALID })
    .min(15, { message: ERROR_ZOD.EMAIL_MIN }),
  password: z
    .string({ required_error: ERROR_ZOD.NEW_PASSWORD_REQUIRED })
    .min(6, { message: ERROR_ZOD.NEW_PASSWORD_MIN }),
  confirmPassword: z
    .string({ required_error: ERROR_ZOD.CONFIRM_PASSWORD_REQUIRED })
    .min(6, { message: ERROR_ZOD.CONFIRM_PASSWORD_MIN }),
}).strict();

request.login = z.object({
  email: z
    .string()
    .email({ message: ERROR_ZOD.EMAIL_INVALID })
    .min(15, { message: ERROR_ZOD.EMAIL_MIN }),
  password: z
    .string({ required_error: ERROR_ZOD.OLD_PASSWORD_REQUIRED })
    .min(6, { message: ERROR_ZOD.OLD_PASSWORD_MIN }),
}).strict();

request.verifyCode = z.object({
  email: z
    .string()
    .email({ message: ERROR_ZOD.EMAIL_INVALID })
    .min(15, { message: ERROR_ZOD.EMAIL_MIN }),
  code: z
    .string({ required_error: ERROR_ZOD.CODE_REQUIRED })
    .min(6, { message: ERROR_ZOD.CODE_LENGTH })
    .max(6, { message: ERROR_ZOD.CODE_LENGTH }),
  type: z
    .string(),
}).strict();

request.email = z.object({
  email: z
    .string()
    .email({ message: ERROR_ZOD.EMAIL_INVALID })
    .min(15, { message: ERROR_ZOD.EMAIL_MIN }),
}).strict();

request.forgotPassword = z.object({
  email: z
    .string()
    .email({ message: ERROR_ZOD.EMAIL_INVALID })
    .min(15, { message: ERROR_ZOD.EMAIL_MIN }),
  password: z
    .string({ required_error: ERROR_ZOD.NEW_PASSWORD_REQUIRED })
    .min(6, { message: ERROR_ZOD.NEW_PASSWORD_MIN }),
  confirm: z
    .string({ required_error: ERROR_ZOD.CONFIRM_PASSWORD_REQUIRED })
    .min(6, { message: ERROR_ZOD.CONFIRM_PASSWORD_MIN }),
}).strict();

request.formEmail = z.object({
  nombre: z
    .string()
    .min(3, { message: ERROR_ZOD.USERNAME_MIN }),
  email: z
    .string()
    .email({ message: ERROR_ZOD.EMAIL_INVALID })
    .min(15, { message: ERROR_ZOD.EMAIL_MIN }),
  asunto: z
    .string()
    .min(10, { message: ERROR_ZOD.MESSAGE_SUBJECT_MIN }),
  mensaje: z
    .string()
    .min(10, { message: ERROR_ZOD.MESSAGE_MIN }),
}).strict();

export default request;