import { CategoryWithProductsResponseSchema } from "@/app/src/schemas"


type Params = Promise<{ categoryId: string }>

const getProducts = async (categoryId: string) => {
    const url = `${process.env.API_URL}/categories/${categoryId}?products=true`

    const req = await fetch(url)

    const json = await req.json()

    
    console.log(json)
    const validate = CategoryWithProductsResponseSchema.parse(json)
  
  
}





export default async function StorePage({ params }: { params: Params }) {
    const { categoryId } = await params
    const productos = await getProducts(categoryId)
   

    return (
        <div>StoreP</div>
    )
}
