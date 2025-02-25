import { useStore } from "@/src/zustand/store"

export default function CouponForm() {

    const coupon = useStore(state => state.applyCoupon)
    const validar = async (formData: FormData) => {



        const datos = formData.get('coupon_name')?.toString()!
        const response = await coupon(datos)



    }


    return (
        <>
            <p className="py-5 font-bold border-t border-gray-300">Canjear Cupón</p>
            <form
                className="flex"
                action={validar}
            >
                <input
                    type="text"
                    className="p-2 bg-gray-200 border-gray-300 w-full"
                    placeholder="Ingresa un cupón"
                    name="coupon_name"
                />
                <input
                    type="submit"
                    className="p-3 bg-green-400 font-bold hover:cursor-pointer"
                    value='Canjear'
                />
            </form>
        </>
    )
}
