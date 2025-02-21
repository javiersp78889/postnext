import { formater } from "@/app/src/formater/utils"
import { ProductType } from "@/app/src/schemas"
import Image from "next/image"



export default function ProductCard({ producto }: { producto: ProductType }) {
    return (
        <div
            className='rounded bg-white shadow relative p-5'
        >
            <div>

                <Image src={`${process.env.API_URL}/${producto.image}`} alt={`imagen de producto ${producto.name}`} width={400} height={200}></Image>

                <div className="p-3 space-y-2">
                    <h3 className="text-xl font-bold text-gray-600">{producto.name}</h3>
                    <p className="text-gray-500">Disponibles: {producto.inventory}</p>
                    <p className="text-2xl font-extrabold  text-gray-900">{formater(producto.price)}</p>
                </div>
            </div>
            <button
                type="button"
                className="absolute top-5 -right-3"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 bg-indigo-600 rounded-full text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
        </div>
    )
}