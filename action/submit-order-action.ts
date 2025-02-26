"use server"

import { OrderSchema, SuccessResponeSchema, TCompras } from "@/src/schemas"
import { revalidateTag } from "next/cache"

type TSubmit = {
    success: string,
    errors: string[]
}


export const SubmitAction = async (compras: TCompras, prevState: TSubmit) => {
    console.log(compras)

    const datos = OrderSchema.safeParse(compras)


    if (!datos.success) {
        const errors = datos.error.errors.map(error => (error.message))

        return {
            errors,
            success: ''
        }
    }

    //Enviamos los datos a nuestra API


    const url = `${process.env.API_URL}/transactions`

    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos.data)
    })

    const json = await req.json()
    if (!req.ok) {
        return {
            errors: ['Error al realizar la compra'],
            success: ''
        }
    }

    const response = SuccessResponeSchema.parse(json)

    revalidateTag('productos')
    return {
        success: response.message,
        errors: []
    }

}