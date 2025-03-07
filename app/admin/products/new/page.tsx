import Headings from '@/Components/ui/Headings'
import Link from 'next/link'
import React from 'react'

export default function New() {
    return (
        <>
            <Link href={`/admin/products?page=1`} className='rounded bg-green-400 font-bold py-2 px-10'>Volver</Link>
            <Headings>Nuevo Producto</Headings>

        </>
    )
}
