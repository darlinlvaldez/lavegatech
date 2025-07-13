import { z } from "zod";
import { ERROR_ZOD } from "../../utils/error.js";

const request = {};

request.login = z.object({
  username: z
    .string()
    .trim()
    .min(1, { message: ERROR_ZOD.USERNAME_REQUIRED })
    .max(40, { message: ERROR_ZOD.USERNAME_MAX }),
  password: z
    .string({ required_error: ERROR_ZOD.NEW_PASSWORD_REQUIRED })
    .min(6, { message: ERROR_ZOD.NEW_PASSWORD_MIN })
}).strict();

export default request;