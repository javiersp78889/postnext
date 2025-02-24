"use client"
import React from 'react'
import ShoppingCart from './ShoppingCart'
import { useStore } from '@/src/zustand/store'

export default function AsideShoppingcart() {

    const productos = useStore(state => state.productoscart)
    return (
        <>
            {productos.length ? (
                <aside className="md:w-96 md:h-screen md:overflow-y-scroll pt-10 pb-32 px-5 bg-white">
                    <ShoppingCart />
                </aside>

            ):''}

        </>
    )
}
