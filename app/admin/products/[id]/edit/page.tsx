import EditProductForm from '@/Components/Products/EditProductForm'
import ProductForm from '@/Components/Products/ProductForm'
import Headings from '@/Components/ui/Headings'
import { ProductFormSchema, ProductSaveSchema } from '@/src/schemas'
import Link from 'next/link'


const getProducto = async (id: string) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`

    const req = await fetch(url)

    const json = await req.json()


    const validacion = ProductSaveSchema.parse(json)

    return validacion

}

type Params = Promise<{ id: string }>

export default async function page({ params }: { params: Params }) {
    const { id } = await params
    const product = await getProducto(id)
    return (
        <>
            <Link href={`/admin/products?page=1`} className='rounded bg-green-400 font-bold py-2 px-10'>Volver</Link>
            <Headings>Editar Producto: <span className='font-bold '>{product.name}</span></Headings>


            <EditProductForm>
                <ProductForm data={product} />
            </EditProductForm>


        </>
    )
}
