import { z } from "zod";
import {ERROR_ZOD} from "../../utils/error.js";

const request = {};

request.updateUsername = z.object({
  newUsername: z
    .string()
    .min(3, { message: ERROR_ZOD.USERNAME_MIN })
    .max(40, { message: ERROR_ZOD.USERNAME_MAX }),
}).strict();

request.updateEmail = z.object({
  newEmail: z
    .string()
    .email({ message: ERROR_ZOD.EMAIL_INVALID })
    .min(15, { message: ERROR_ZOD.EMAIL_MIN }),
}).strict();

request.verifyEmailCode = z.object({
  newEmail: z
    .string()
    .email({ message: ERROR_ZOD.EMAIL_INVALID })
    .min(15, { message: ERROR_ZOD.EMAIL_MIN }),
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