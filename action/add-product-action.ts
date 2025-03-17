"use server"

import { ErrorResponseSchema, ProductFormSchema, SuccessResponeSchema } from "@/src/schemas"


type Tproduct = {
    success: string,
    errors: string[]
}

export const addProduct = async (prevstate: Tproduct, formData: FormData) => {
    const url = `${process.env.API_URL}/products`
    console.log('aqui')
    console.log(formData)
    const info = {
        name: formData.get('name'),
        price: formData.get('price'),
        inventory: formData.get('inventory'),
        categoryId: formData.get('categoryId'),
        image: formData.get('image')
    }
   

    const data = ProductFormSchema.safeParse(info)

    if (!data.success) {
        const errors = data.error.errors.map(error => error.message)

        return {
            success: "",
            errors
        }
    }

    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data.data)
    })
    const json = await req.json()
    if (!req.ok) {
        const errors = ErrorResponseSchema.parse(json)

        return {
            errors: [errors.error],
            success: ''
        }
    }



    return {
        errors: [],
        success: "Producto creado"
    }
}