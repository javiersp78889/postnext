"use server"


import { ErrorResponseSchema, SuccessResponeSchema } from "@/src/schemas"
import { revalidateTag } from "next/cache"


type TProduct = {
    success: string,
    errors: string[]
}

export const DeleteProduct = async (id: number, prevState: TProduct) => {

    const url = `${process.env.API_URL}/products/${id}`


    const req = await fetch(url, {
        method: 'DELETE'
    })

    const json = await req.json()
    console.log(json)
    if (!req) {
        const { error } = ErrorResponseSchema.parse(json)

        return {
            errors: [error],
            success: ''
        }
    }


    const success = SuccessResponeSchema.parse(json)

    revalidateTag('product')
    return {
        success: success.message,
        errors: []
    }
}