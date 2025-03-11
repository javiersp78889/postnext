"use server"

import { ErrorResponseSchema, ProductFormSchema, SuccessResponeSchema } from "@/src/schemas"
import { da } from "date-fns/locale"

type Tproduct = {
    success: string,
    errors: string[]
}

export const editProduct = async (id: number, prevState: Tproduct, formData: FormData) => {
    const url = `${process.env.API_URL}/products/${id}`
    const data =
    {
        name: formData.get('name'),
        price: formData.get('price'),
        inventory: formData.get('inventory'),
        categoryId: formData.get('categoryId')
    }

    const validation = ProductFormSchema.safeParse(data)

    if (!validation.success) {
        const errors = validation.error.errors.map(errores => errores.message)
        return {
            errors,
            success: ''
        }
    }


    const req = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(validation.data)
    })
    const json = await req.json()
    console.log(json)
    if (!req.ok) {
        const { error } = ErrorResponseSchema.parse(json)


        return {
            errors: [error],
            success: ''
        }
    }

    const { message } = SuccessResponeSchema.parse(json)

    return {
        success: message,
        errors: []
    }
}