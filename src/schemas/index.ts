import { number, z } from "zod";

export const ProductSchema = z.object({
    id: z.number(),
    name: z.string(),
    image: z.string(),
    price: z.coerce.number(),
    inventory: z.number(),
    categoryId: z.number()
})



export const ListProductSchema = z.object({
    products: z.array(ProductSchema),
    total: z.coerce.number()
})
export type LProductType = z.infer<typeof ListProductSchema>;
export type ProductType = z.infer<typeof ProductSchema>;


export const CategorySchema = z.object({
    id: z.number(),
    name: z.string()
})

export const CategoryWithProductsResponseSchema = CategorySchema.extend({
    product: z.array(ProductSchema)
});

export const Categorys = z.array(CategorySchema)

export type Categorys = z.infer<typeof Categorys>


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



export const ContentsSchema = z.object({
    id: z.number(),
    quantity: z.number(),
    price: z.coerce.number(),  // <-- Se asegura de que siempre sea número
    product: ProductSchema
});

export const TransactionResponseSchema = z.object({
    id: z.number(),
    total: z.string(),
    transactionDate: z.string(),
    discount: z.string().nullable().optional(),  // <-- Ahora acepta null
    coupon: z.string().nullable().optional(),    // <-- También acepta null
    contents: z.array(ContentsSchema).default([]) // <-- Evita errores si falta
});

export const TransactionsResponseSchema = z.array(TransactionResponseSchema);

export type TTransactionsResponse = z.infer<typeof TransactionResponseSchema>

export const ProductFormSchema = z.object({
    name: z.string()
        .min(1, { message: 'El Nombre del Producto no puede ir vacio' }),
    price: z.coerce.number({ message: 'Precio no válido' })
        .min(1, { message: 'El Precio debe ser mayor a 0' }),
    inventory: z.coerce.number({ message: 'Inventario no válido' })
        .min(1, { message: 'El inventario debe ser mayor a 0' }),
    categoryId: z.coerce.number({ message: 'La Categoria no es válida' }),
    image: z.string({message:'La imagen es obligatoria'})
})

export const ErrorResponseSchema = z.object({
    error: z.string()
})
export const SuccessSchema = z.string().min(1, { message: 'Valor no valido' })



export const ProductSaveSchema = ProductFormSchema.extend({
    category: CategorySchema
})

export type ProductTypeSchema = z.infer<typeof ProductSaveSchema>