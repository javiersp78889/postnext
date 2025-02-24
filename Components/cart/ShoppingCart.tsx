"use client"
import { useStore } from '@/src/zustand/store'
import Image from 'next/image'
import React from 'react'
import ShoppingCartItem from './ShoppingCartItem'
import { formater } from '@/src/formater/utils'


export default function ShoppingCart() {

    const contents = useStore(state => state.productoscart)
    const total = useStore(state => state.total)


    return (
        <>
            <h2 className='font-bold text-4xl text-gray-900'>Resumen de venta</h2>


            {contents.map(item => (
                <ShoppingCartItem key={item.productId} item={item} />
            ))}
            <div className='m-0  '>

                <h2 className='font-bold text-4xl text-gray-900 '>Total: {formater(total)}</h2>

            </div>

        </>
    )
}

