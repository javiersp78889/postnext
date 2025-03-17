import { formater, getImagePath, isAviable } from "@/src/formater/utils"
import { ProductType } from "@/src/schemas"
import Image from "next/image"
import AddProduct from "./AddProduct"



export default function ProductCard({ producto }: { producto: ProductType }) {
    return (
        <div
            className='rounded bg-white shadow relative p-5'
        >
            <div>

                <Image src={getImagePath(producto.image)} alt={`imagen de producto ${producto.name}`} width={400} height={200} priority></Image>

                <div className="p-3 space-y-2">
                    <h3 className="text-xl font-bold text-gray-600">{producto.name}</h3>
                    <p className="text-gray-500">{isAviable(producto.inventory)}</p>
                    <p className="text-2xl font-extrabold  text-gray-900">{formater(producto.price)}</p>
                </div>
            </div>
            {producto.inventory > 0 ? <AddProduct producto={producto} /> : ''}

        </div>
    )
}