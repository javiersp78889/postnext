import { create } from "zustand";
import { ProductType, ShoppingCartType } from "../schemas";
import { devtools } from "zustand/middleware";



interface Store {

    total: number,
    productoscart: ShoppingCartType,
    addTocar: (producto: ProductType) => void,
    updateQuantity: (id: ProductType['id'], quantity: number) => void,
    delete: (id: ProductType['id']) => void,
    calculateTotal: () => void,
    applyCoupon: (coupon: string) => Promise<void>

}

export const useStore = create<Store>()(devtools((set, get) => ({
    total: 0,
    productoscart: [],
    addTocar: (producto) => {
        let productoscart: ShoppingCartType = []
        const { id: productId, categoryId, ...data } = producto
        const duplicated = get().productoscart.findIndex(item => item.productId === productId)

        if (duplicated >= 0) {
            productoscart = get().productoscart.map(n => n.productId === productId ? {
                ...n, quantity: n.quantity + 1
            } : n)
        } else {
            productoscart = [...get().productoscart, { ...data, quantity: 1, productId }]

        }

        set(() => ({
            productoscart

        }))
        get().calculateTotal()
    },
    updateQuantity: (id, cantidad) => {
        const productoscart = get().productoscart.map(item => item.productId === id ? { ...item, quantity: cantidad } : item)

        set(() => ({
            productoscart,

        }))

        get().calculateTotal()
    },
    delete: (id) => {
        const productoscart = get().productoscart.filter(item => item.productId !== id)
        set(() => ({
            productoscart

        }))
        get().calculateTotal()
    },
    calculateTotal: () => {
        let total = get().productoscart.reduce((total, item) => total + (item.price * item.quantity), 0)
        console.log(get().productoscart)
        set(() => ({
            total
        }))
    },
    applyCoupon: async (coupon) => {
        const data = {
            "coupon_name": coupon
        }
        const req = await fetch('/coupon/api', {
            method: 'POST',
            body: JSON.stringify(data)
        })


        const json = await req.json()

        return Response.json({ json })

    }
})))