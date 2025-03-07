import AddProductForm from '@/Components/Products/AddProductForm'
import ProductForm from '@/Components/Products/ProductForm'
import Headings from '@/Components/ui/Headings'
import { Categorys } from '@/src/schemas'
import Link from 'next/link'
import React from 'react'


const getCategory = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/categories`

    const req = await fetch(url)


    const json = await req.json()
    const response = Categorys.parse(json)

    return response
}


export default async function New() {

    const categorias = await getCategory()
    return (
        <>
            <Link href={`/admin/products?page=1`} className='rounded bg-green-400 font-bold py-2 px-10'>Volver</Link>
            <Headings>Nuevo Producto</Headings>

            <AddProductForm><ProductForm categorias={categorias} /></AddProductForm>

        </>
    )
}
