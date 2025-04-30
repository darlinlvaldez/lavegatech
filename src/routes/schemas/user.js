import { z } from "zod";

const request = {};

request.updateUsername = z.object({
  newUsername: z.string().min(3).max(40),
}).strict();

request.updateEmail = z.object({
  newEmail: z.string().email().min(5),
}).strict();

request.verifyEmailCode = z.object({
  newEmail: z.string().email(),
  codeInput: z.string().min(6).max(6),
}).strict();

request.updatePassword = z.object({
  oldPassword: z.string().min(6),
  newPassword: z.string().min(6),
  confirmPassword: z.string().min(6),
}).strict();

export default request;
