import { Categorys, CategorySchema } from "@/src/schemas";
import Logo from "./Logo";
import Link from "next/link";

const getCategories = async () => {
    const url = `${process.env.API_URL}/categories`

    const req = await fetch(url)

    const json = await req.json()

    const validate = Categorys.parse(json)

    return validate
}




export default async function MainNav() {

    const category = await getCategories()

    return (
        <header className="px-10 py-5 bg-gray-700 flex flex-col md:flex-row justify-between ">
            <div className="flex justify-center">
                <Logo />
            </div>

            <nav className="flex flex-col md:flex-row gap-2 items-center mt-5 md:mt-0">
                {category.map((categorias) => (

                    <Link className="text-lg font-bold text-white hover:text-green-400 p-2" key={categorias.id} href={`${categorias.id}`}>{categorias.name}</Link>

                ))}

                <Link href={'/admin/sales'} className="rounded bg-green-500 hover:bg-green-700 p-3 font-bold text-white">Panel de Administración</Link>

            </nav>
        </header>
    )
}