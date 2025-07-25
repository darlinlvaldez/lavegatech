import { z } from "zod";
import { ERROR_ZOD } from "../../utils/error.js";

const request = {};

request.movil = z.object({
nombre: z
    .string()
    .trim()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED })
    .max(100, { message: ERROR_ZOD.PRODUCT_NAME_MAX }),
cpu: z
    .number({ invalid_type_error: ERROR_ZOD.FIELD_REQUIRED }),
gpu: z
    .number({ invalid_type_error: ERROR_ZOD.FIELD_REQUIRED }),
pantalla: z
    .number({ invalid_type_error: ERROR_ZOD.FIELD_REQUIRED }),
camara: z
    .number({ invalid_type_error: ERROR_ZOD.FIELD_REQUIRED }),
bateria: z
    .number({ invalid_type_error: ERROR_ZOD.FIELD_REQUIRED }),
conectividad: z
    .number({ invalid_type_error: ERROR_ZOD.FIELD_REQUIRED }),
dimensionespeso: z
    .number({ invalid_type_error: ERROR_ZOD.FIELD_REQUIRED }),
}).strict()

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

request.varianteRAM = z.object({
movilId: z
    .number({ invalid_type_error: ERROR_ZOD.FIELD_REQUIRED }),
ramId: z
    .number({ invalid_type_error: ERROR_ZOD.FIELD_REQUIRED }),
}).strict(),

request.varianteAlm = z.object({
  movil_id: z.number({ invalid_type_error: ERROR_ZOD.FIELD_REQUIRED }),
  almacenamiento_id: z.number({ invalid_type_error: ERROR_ZOD.FIELD_REQUIRED }),
  nuevo_movil_id: z.number().optional(),
  nuevo_almacenamiento_id: z.number().optional()
}).strict();

export default request;