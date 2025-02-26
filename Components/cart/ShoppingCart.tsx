"use client"
import { useStore } from '@/src/zustand/store'
import Image from 'next/image'
import React from 'react'
import ShoppingCartItem from './ShoppingCartItem'
import { formater } from '@/src/formater/utils'
import CouponForm from './CouponForm'
import SubmitOrderForm from './SubmitOrderForm'


export default function ShoppingCart() {

    const { total, descuento, productoscart: contents } = useStore(state => state)



    return (
        <>
            <h2 className='font-bold text-4xl text-gray-900'>Resumen de venta</h2>


            {contents.map(item => (
                <ShoppingCartItem key={item.productId} item={item} />
            ))}
            <CouponForm />
            <div className='py-5  '>
                {descuento ?
                    <div className=" text-green-800 bg-green-400 flex  font-bold justify-between p-2">
                        <p>Descuento</p>
                        <p >-{formater(descuento)}</p>
                    </div>
                    : ''}
                <h2 className='font-bold text-4xl text-gray-900 '>Total: {formater(total)}</h2>

            </div>

            <SubmitOrderForm/>

        </>
    )
}

