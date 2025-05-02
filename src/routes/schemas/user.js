import { z } from "zod";

const request = {};

request.updateUsername = z.object({
  newUsername: z
    .string({ required_error: "El nombre es obligatorio" })
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
    .max(40, { message: "El nombre no debe superar los 40 caracteres" }),
}).strict();

request.updateEmail = z.object({
  newEmail: z
    .string({ required_error: "El correo es obligatorio" })
    .email({ message: "El formato del correo no es válido" })
    .min(5, { message: "El correo debe tener al menos 5 caracteres" }),
}).strict();

request.verifyEmailCode = z.object({
  newEmail: z
    .string({ required_error: "El correo es obligatorio" })
    .email({ message: "El formato del correo no es válido" }),
  codeInput: z
    .string({ required_error: "El código es obligatorio" })
    .min(6, { message: "El código debe tener exactamente 6 caracteres" })
    .max(6, { message: "El código debe tener exactamente 6 caracteres" }),
}).strict();

request.updatePassword = z.object({
  oldPassword: z
    .string({ required_error: "La contraseña actual es obligatoria" })
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  newPassword: z
    .string({ required_error: "La nueva contraseña es obligatoria" })
    .min(6, { message: "La nueva contraseña debe tener al menos 6 caracteres" }),
  confirmPassword: z
    .string({ required_error: "Debes confirmar la nueva contraseña" })
    .min(6, { message: "La confirmación debe tener al menos 6 caracteres" }),
}).strict();

export default request;
