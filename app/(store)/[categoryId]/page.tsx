import { CategoryWithProductsResponseSchema } from "@/src/schemas"
import ProductCard from "@/Components/Products/ProductCard"
import { redirect } from "next/navigation"


type Params = Promise<{ categoryId: string }>

const getProducts = async (categoryId: string) => {
    const url = `${process.env.API_URL}/categories/${categoryId}?products=true`

    const req = await fetch(url,{next:{tags:['productos']}})
    const json = await req.json()

    if(!req.ok){
        redirect('/')
    }



    const validate = CategoryWithProductsResponseSchema.parse(json)

    return validate
}





export default async function StorePage({ params }: { params: Params }) {
    const { categoryId } = await params
    const { product, id, name } = await getProducts(categoryId)


    return (
        <>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3" >
                {product.map((producto) => (
                    <ProductCard key={producto.id} producto={producto} />
                ))}
            </div>
        </>
    )
}
