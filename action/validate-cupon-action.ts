"use server"

import { CouponSchema } from "@/src/schemas"

type TData = {
    success: string,
    errors: string[]
}


export const validateCupon = async (datos:FormDataEntryValue) => {

    
    const url =`${process.env.API_URL}/coupons/apply-coupon`
    const data = {
        coupon_name: datos
    }

    const validate = CouponSchema.safeParse(data)

 
    if (!validate.success) {
        const errors = validate.error.errors.map(errores => errores.message)
        return {
            success: '',
            errors
        }
    }

    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(validate.data)
    })


    const json = await req.json()


    return json
      

}