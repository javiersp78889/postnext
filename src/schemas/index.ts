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