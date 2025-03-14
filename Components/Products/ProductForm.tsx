import { Categorys, ProductTypeSchema } from "@/src/schemas";
import { da } from "date-fns/locale";
import UploadProductImage from "./UploadProductImage";
const getCategory = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/categories`

  const req = await fetch(url)


  const json = await req.json()
  const response = Categorys.parse(json)

  return response
}

export default async function ProductForm({ data }: { data?: ProductTypeSchema }) {
  const categorias = await getCategory()
  return (
    <>
      <div className="space-y-2 ">
        <label
          htmlFor="name"
          className="block"
        >Nombre Producto</label>
        <input
          id="name"
          type="text"
          placeholder="Nombre Producto"
          className="border border-gray-300 w-full p-2"
          name="name"
          defaultValue={data ? (data.name) : ''}
        />
      </div>

      <div className="space-y-2 ">
        <label
          htmlFor="price"
          className="block"
        >Precio</label>
        <input
          id="price"
          type="number"
          placeholder="Precio Producto"
          className="border border-gray-300 w-full p-2"
          name="price"
          min={0}
          defaultValue={data ? (data.price) : ''}
        />
      </div>

      <div className="space-y-2 ">
        <label
          htmlFor="inventory"
          className="block"
        >Inventario</label>
        <input
          id="inventory"
          type="number"
          placeholder="Cantidad Disponible"
          className="border border-gray-300 w-full p-2"
          name="inventory"
          min={0}
          defaultValue={data ? (data.inventory) : ''}
        />
      </div>

      <div className="space-y-2 ">
        <label
          htmlFor="categoryId"
          className="block"
        >Categoría</label>
        <select
          id="categoryId"
          className="border border-gray-300 w-full p-2 bg-white"
          name="categoryId"
          defaultValue={data ? (data.categoryId) : ''}
        >
          {data ? (
            <option value={data.category.id}>{data.category.name}</option>
          ) : (
            <option value="">Seleccionar Categoría</option>
          )}

          {categorias.map(item => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}

        </select>
      </div>

      <UploadProductImage />

    </>
  )
}
