import { z } from "zod";
import { ERROR_ZOD } from "../../utils/error.js";

const request = {};

request.login = z.object({
  username: z
    .string()
    .trim()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED })
    .max(40, { message: ERROR_ZOD.USERNAME_MAX }),
  password: z
    .string({ required_error: ERROR_ZOD.FIELD_REQUIRED})
    .min(6, { message: ERROR_ZOD.PASSWORD_MIN})
}).strict();

request.product = z.object({
  nombre: z
    .string()
    .trim()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED })
    .max(100, { message: ERROR_ZOD.PRODUCT_NAME_MAX }),
  descripcion: z
    .string()
    .trim()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED }),
  precio: z
    .number({ invalid_type_error: ERROR_ZOD.FIELD_REQUIRED })
    .nonnegative({ message: ERROR_ZOD.PRODUCT_PRICE_POSITIVE })
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED }),
  descuento: z
    .number({ invalid_type_error: ERROR_ZOD.PRODUCT_DISCOUNT_INVALID })
    .nonnegative({ message: ERROR_ZOD.FIELD_NEGATIVE })
    .optional(),
  categoria: z
    .number({ invalid_type_error: ERROR_ZOD.FIELD_REQUIRED }),
  marca: z
    .number({ invalid_type_error: ERROR_ZOD.FIELD_REQUIRED }),
  ram: z
    .number({ invalid_type_error: ERROR_ZOD.FIELD_REQUIRED })
    .nonnegative({ message: ERROR_ZOD.FIELD_NEGATIVE })
    .nullable()
    .optional(),
  almacenamiento: z
    .number({ invalid_type_error: ERROR_ZOD.FIELD_REQUIRED })
    .nonnegative({ message: ERROR_ZOD.FIELD_NEGATIVE })
    .nullable()
    .optional(),
  fecha: z
  .string()
  .refine(value => !value || !isNaN(Date.parse(value)), 
  {message: ERROR_ZOD.PRODUCT_DATE_INVALID})
  .optional(),
}).strict();

const IMG_REGEX = /^\/uploads\/.+\.(png|jpg|jpeg)$/i;

request.variant = z.object({
  producto_id: z.number({ required_error: ERROR_ZOD.FIELD_REQUIRED }),
  color: z.string().trim().min(1, { message: ERROR_ZOD.FIELD_REQUIRED }),
  stock: z.number({ invalid_type_error: ERROR_ZOD.FIELD_REQUIRED }).min(0, { message: ERROR_ZOD.FIELD_NEGATIVE }),
  img: z.string()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED })
    .refine(val => {
      return /^(https?:\/\/)/.test(val) || IMG_REGEX.test(val);
    }, { message: ERROR_ZOD.URL_INVALID }),
}).strict();

request.category = z.object({
  categoria: z
    .string()
    .trim()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED })
    .max(60, { message: ERROR_ZOD.CATEGORY_NAME_MAX }),
  imagen: z
    .string()
    .url({ message: ERROR_ZOD.URL_INVALID })
    .optional(),
}).strict();

request.brand = z.object({
  nombre: z
    .string()
    .trim()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED })
    .max(60, { message: ERROR_ZOD.BRAND_NAME_MAX }),
  logo: z
    .string()
    .url({ message: ERROR_ZOD.BRAND_LOGO_INVALID })
    .optional()
    .or(z.literal(""))
    .optional(),
  categorias: z
    .array(z.number(), { invalid_type_error: ERROR_ZOD.BRAND_CATEGORIES_INVALID })
    .min(1, { message: ERROR_ZOD.BRAND_CATEGORIES_REQUIRED }),
}).strict();

request.shipping = z.object({
  nombre: z
    .string()
    .trim()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED })
    .max(100, { message: ERROR_ZOD.CITY_NAME_MAX }),
  costo_envio: z
    .number({ invalid_type_error: ERROR_ZOD.FIELD_REQUIRED })
    .nonnegative({ message: ERROR_ZOD.FIELD_NEGATIVE })
    .min(0.01, { message: ERROR_ZOD.FIELD_REQUIRED })
}).strict();

request.userAdmin = z.object({
  username: z
    .string()
    .trim()
    .min(1, { message: ERROR_ZOD.FIELD_REQUIRED })
    .max(40, { message: ERROR_ZOD.USERNAME_MAX }),
  password: z
    .string()
    .min(6, { message: ERROR_ZOD.PASSWORD_MIN })
    .optional(),
    rol: z.enum(['superadmin', 'editor', 'soporte'], {
  required_error: ERROR_ZOD.FIELD_REQUIRED})
}).strict();

export default request;