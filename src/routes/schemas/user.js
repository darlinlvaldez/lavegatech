import { z } from "zod";
import {ERROR_ZOD} from "../../utils/error.js";

const request = {};

request.updateUsername = z.object({
  newUsername: z
    .string()
    .trim()
    .min(1, { message: ERROR_ZOD.USERNAME_REQUIRED })
    .max(40, { message: ERROR_ZOD.USERNAME_MAX })
    .refine(val => val.trim().length > 0, {
      message: ERROR_ZOD.USERNAME_REQUIRED}),
}).strict();

request.updateEmail = z.object({
  newEmail: z
    .string()
    .email({ message: ERROR_ZOD.EMAIL_INVALID })
    .min(1, { message: ERROR_ZOD.EMAIL_REQUIRED })
    .refine(val => val.endsWith('@gmail.com'), {
    message: ERROR_ZOD.EMAIL_DOMAIN}),
}).strict();

request.verifyEmailCode = z.object({
  newEmail: z
    .string()
    .email({ message: ERROR_ZOD.EMAIL_INVALID })
    .min(1, { message: ERROR_ZOD.EMAIL_REQUIRED })
    .refine(val => val.endsWith('@gmail.com'), {
    message: ERROR_ZOD.EMAIL_DOMAIN}),
  codeInput: z
    .string()
    .min(6, { message: ERROR_ZOD.CODE_LENGTH })
    .max(6, { message: ERROR_ZOD.CODE_LENGTH }),
}).strict();

request.updatePassword = z.object({
  oldPassword: z
    .string()
    .min(6, { message: ERROR_ZOD.OLD_PASSWORD_MIN }),
  newPassword: z
    .string()
    .min(6, { message: ERROR_ZOD.NEW_PASSWORD_MIN }),
  confirmPassword: z
    .string()
    .min(6, { message: ERROR_ZOD.CONFIRM_PASSWORD_MIN }),
}).strict();

export default request;