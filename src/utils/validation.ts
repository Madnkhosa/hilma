import { z } from "zod";

export const productSchema = z.object({
  title: z.string(),
  // img: z.string().url({
  //   message: "Image must be a valid URL",
  // }),
  description: z.string(),
  // categoryId:z.string(),
  price: z.number({
    required_error: "Price is required",
  }),
  usg: z.string({
    required_error: "USG is required",
  }),
  costPrice:z.number().optional()
});

export const categoreSchema = z.object({
  name: z.string(),
});


export const orderSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  address: z.string(),
  streetNameAndAddress: z.string(),
  annex: z.string().optional(),
  city: z.string(),
  postalCode: z.number(),
  country: z.string(),
  phoneNumber: z.number(),
  // mailAddress: z.string(),
  email: z.string().email().optional(),
});