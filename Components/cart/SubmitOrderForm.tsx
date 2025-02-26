"use client"
import { SubmitAction } from '@/action/submit-order-action'
import { useStore } from '@/src/zustand/store'
import React, { useActionState, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'

export default function SubmitOrderForm() {
    const ref = useRef<HTMLFormElement>(null)
    const { productoscart: compra, total, coupon, descuento,buyProducts } = useStore(state => state)

    const order = {
        contents: compra,
        total,
        coupon,
        discount: descuento
    }

    const compras = SubmitAction.bind(null, order)
    const [state, dispatch] = useActionState(compras, { success: '', errors: [] })

    useEffect(() => {
        if (state.success) {
            toast.success(state.success)
            buyProducts()
        }

        if (state.errors) {
            state.errors.map(error => {
                toast.error(error)
            })
        }
    }, [state])
    return (
        <form action={dispatch} ref={ref}>


            <input type="submit" id="" value={'Confirmar Compra'} className='mt-5 w-full bg-indigo-600 hover:bg-indigo-700 text-white uppercase cursor-pointer font-bold p-3' />
        </form>
    )
}
