import ProductsTable from '@/Components/Products/ProductsTable'
import Headings from '@/Components/ui/Headings'
import { isValidPage } from '@/src/formater/utils'
import { ListProductSchema } from '@/src/schemas'
import Link from 'next/link'
import { redirect } from 'next/navigation'


async function getProducts(productsPerPage: number, skip: number) {

  const url = `${process.env.NEXT_PUBLIC_API_URL}/products?take=${productsPerPage}&&skip=${skip}`

  const req = await fetch(url)

  const json = await req.json()

  const validate = ListProductSchema.parse(json)

  return validate

}

type SearchParams = Promise<{ page: string }>
export default async function Productspage({ searchParams }: { searchParams: SearchParams }) {
  const { page } = await searchParams
  if (+page <= 0 || !page) {
    redirect('/admin/products?page=1')
  }
  const productsPerPage = 10
  const skip = (+page - 1) * productsPerPage
  const { products, total } = await getProducts(productsPerPage, skip)

  const param = isValidPage(+page)
  const tot = Math.ceil(total / productsPerPage)
  const paginas = Array.from({ length: tot }, (_, index) => index + 1);

  if (!param || +page > tot) {
    redirect('/admin/products?page=1')
  }

  return (
    <>
      <Link href={`/admin/products/new?opcion=create`} className='rounded bg-green-400 font-bold py-2 px-10'>Nuevo Producto</Link>
      <Headings>Administar Productos</Headings>


      <ProductsTable products={products} total={0} />

      <nav className="flex items-center justify-center gap-3 pt-5 ">
        {+page === 1 ? ('') :
          <Link href={`/admin/products?page=${+page - 1}`} className='font-bold hover:text-red-500'>Anterior</Link>
        }
        {paginas.map(n => (


          <Link key={n} href={`/admin/products?page=${n}`} className={`${n === +page ? 'text-red-500 font-bold px-4 py-2 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0' : ''}`}>{n}</Link>


        ))}

        {+page === tot ? ('') :

          <Link href={`/admin/products?page=${+page + 1}`} className='font-bold hover:text-green-500'>Siguiente</Link>
        }
      </nav>

    </>
  )
}
