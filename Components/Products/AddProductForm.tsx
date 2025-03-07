import React from 'react'

export default function AddProductForm({ children }: { children: React.ReactNode }) {
    return (
        <form action="" className='flex flex-col gap-3'>
            {children}

            <input type="submit" className='rounded bg-green-400 font-bold py-2 w-full cursor-pointer' value="Agregar Producto" />
        </form>
    )
}
