import { number, z } from "zod";

export const ProductSchema = z.object({
    id: z.number(),
    name: z.string(),
    image: z.string(),
    price: z.coerce.number(),
    inventory: z.number(),
    categoryId: z.number()
})

export type ProductType = z.infer<typeof ProductSchema>;


export const CategorySchema = z.object({
    id: z.number(),
    name: z.string()
})

export const CategoryWithProductsResponseSchema = CategorySchema.extend({
    product: z.array(ProductSchema)
});

export const Categorys = z.array(CategorySchema)


const CarritoShcema = ProductSchema.pick({
    name: true,
    image: true,
    price: true,
    inventory: true,
}).extend({
    productId: number(),
    quantity: z.number()
})

export const shoppingCart = z.array(CarritoShcema)

export type Cartito = z.infer<typeof CarritoShcema>

export type ShoppingCartType = z.infer<typeof shoppingCart>


export const CouponSchema = z.object({

    coupon_name: z.string().min(6, { message: "El cupon no es válido" })
})


export const couponResponseSchema = z.object({

    expirationDate: z.string(),

    name: z.string(),

    percentage: z.coerce.number().default(0),
})


export const responseSchema = z.object({
    message: z.string().min(1, { message: 'mensaje no esperado' }),
    status: z.number(),
    cupon: couponResponseSchema.optional()
})


export type Tresponse = z.infer<typeof responseSchema>


const OrderContentSchema = z.object({
    productId: z.number(),
    quantity: z.number(),
    price: z.number()
})
export const OrderSchema = z.object({
    total: z.number(),
    coupon: z.string().optional(),
    contents: z.array(OrderContentSchema).min(1, { message: 'El Carrito no puede ir vacio' })
})


export const SuccessResponeSchema = z.object({
    message: z.string().min(1, { message: 'Error' })
})



export type TCompras = z.infer<typeof OrderSchema>