"use client"
import { DeleteProduct } from "@/action/delete-product-action"
import { formater } from "@/src/formater/utils"
import { LProductType, ProductType } from "@/src/schemas"
import Image from "next/image"
import Link from "next/link"
import { toast } from "react-toastify"

const Delete = async (id: number) => {


    const response = await DeleteProduct(id, {
        success: '', errors: []
    })


    if (response.success) {
        toast.success(response.success)
    }

    if (response.errors) {
        toast.error(response.errors.map(error => error))
    }

}

export default function ProductsTable(products: LProductType) {


    return (
        <div className="px-4 sm:px-6 lg:px-8 mt-10">
            <div className="mt-8 flow-root ">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 bg-white p-5 ">
                        <table className="min-w-full divide-y divide-gray-300 ">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        Imagen
                                    </th>

                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        Producto
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Precio
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Inventario
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                        <span className="sr-only">Acciones</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {products.products.map(product => (
                                    <tr key={product.id}>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            <Image src={`${process.env.NEXT_PUBLIC_API_URL}/${product.image}`} width={200} height={400} alt="imagen"></Image>
                                        </td>
                                        <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                            <p>{product.name}</p>
                                        </td>
                                        <td className="px-3 py-4 text-sm text-gray-500">
                                            <p>{formater(product.price)}</p>
                                        </td>
                                        <td className="px-3 py-4 text-sm text-gray-500">
                                            <p>{product.inventory}</p>
                                        </td>
                                        <td className="relative py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 ">
                                            <div className='flex gap-5 justify-end items-center'>
                                                <Link href={`/admin/products/${product.id}/edit`} className="text-indigo-600 hover:text-indigo-800">Editar <span className="sr-only">{product.name}</span></Link>
                                                <form action={() => Delete(+product.id)}>
                                                    <input type="submit" className="text-red-600 hover:text-red-800 cursor-pointer" value={'Eliminar'} />
                                                </form>
                                            </div>


                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    )
}
