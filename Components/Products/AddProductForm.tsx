"use client"
import { addProduct } from '@/action/add-product-action'
import { useRouter } from 'next/router'
import React, { useActionState, useEffect } from 'react'
import { toast } from 'react-toastify'

export default function AddProductForm({ children }: { children: React.ReactNode }) {

    const router = useRouter()
   
    const [state, dispatch] = useActionState(addProduct, {
        success: "",
        errors: []
    })

    useEffect(() => {
        if (state.errors) {
            state.errors.map(error => toast.error(error))
        }
        if(state.success){
            toast.success(state.success)
            router.push('/admin/products')
        }
    }, [state])
    return (
        <form action={dispatch} className='space-y-5'>
            {children}

            <input type="submit" className='rounded bg-green-400 font-bold py-2 w-full cursor-pointer' value="Agregar Producto" />
        </form>
    )
}
