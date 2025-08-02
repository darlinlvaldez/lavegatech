import { z } from "zod";
import { ERROR_ZOD } from "../../utils/error.js";

const request = {};

request.device = z.object({
  cpu_id: z.number({ required_error: ERROR_ZOD.FIELD_REQUIRED }),
  gpu_id: z.number({ required_error: ERROR_ZOD.FIELD_REQUIRED }),
  pantalla_id: z.number({ required_error: ERROR_ZOD.FIELD_REQUIRED }),
  camara_id: z.number({ required_error: ERROR_ZOD.FIELD_REQUIRED }),
  bateria_id: z.number({ required_error: ERROR_ZOD.FIELD_REQUIRED }),
  conectividad_id: z.number({ required_error: ERROR_ZOD.FIELD_REQUIRED }),
  dimensionespeso_id: z.number({ required_error: ERROR_ZOD.FIELD_REQUIRED }),
  productIds: z.array(z.number()).min(1, { message: ERROR_ZOD.FIELD_REQUIRED })
});

request.pantalla = z.object({
tipo: z
    .string()
    .trim()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED }),
tamaño: z
    .string()
    .trim()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED }),
resolucion: z
    .string()
    .trim()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED }),
frecuencia: z
    .string()
    .trim()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED }),
proteccion: z
    .string()
    .trim()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED }),
}).strict(),

request.camara = z.object({
principal: z
    .string()
    .trim()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED }),
selfie: z
    .string()
    .trim()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED }),
video: z
    .string()
    .trim()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED }),
}).strict(),

request.cpu = z.object({
nombre: z
    .string()
    .trim()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED }),
nucleos: z
    .string()
    .trim()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED }),
velocidad: z
    .string()
    .trim()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED }),
}).strict(),

request.gpu = z.object({
modelo: z
    .string()
    .trim()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED }),
nucleos: z
    .string()
    .trim()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED }),
}).strict(),

request.bateria = z.object({
capacidad: z
    .string()
    .trim()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED }),
tipo: z
    .string()
    .trim()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED }),
carga_rapida: z
    .string()
    .trim()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED }),
carga_inalambrica: z.boolean().optional(),
}).strict(),

request.conectividad = z.object({
red: z
    .string()
    .trim()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED }),
wifi: z
    .string()
    .trim()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED }),
bluetooth: z
    .string()
    .trim()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED }),
nfc: z.boolean().optional(),
}).strict(),

request.dimensiones = z.object({
altura: z
    .string()
    .trim()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED }),
anchura: z
    .string()
    .trim()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED }),
grosor: z
    .string()
    .trim()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED }),
peso: z
    .string()
    .trim()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED }),
}).strict(),

request.ram = z.object({
capacidad: z
    .string()
    .trim()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED }),
tipo: z
    .string()
    .trim()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED }),
}).strict(),

request.almacenamiento = z.object({
capacidad: z
    .string()
    .trim()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED }),
tipo: z
    .string()
    .trim()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED }),
}).strict(),

request.varianteRam = z.object({
  movil_id: z.number({ required_error: ERROR_ZOD.FIELD_REQUIRED }),
  ram_id: z.number({ required_error: ERROR_ZOD.FIELD_REQUIRED })
});

request.varianteAlm = z.object({
  movil_id: z.number({ invalid_type_error: ERROR_ZOD.FIELD_REQUIRED }),
  almacenamiento_id: z.number({ invalid_type_error: ERROR_ZOD.FIELD_REQUIRED }),
  nuevo_movil_id: z.number().optional(),
  nuevo_almacenamiento_id: z.number().optional()
}).strict();

export default request;