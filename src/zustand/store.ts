import { create } from "zustand";
import { ProductType, ShoppingCartType } from "../schemas";
import { devtools } from "zustand/middleware";



interface Store {

    total: number,
    productoscart: ShoppingCartType,
    addTocar: (producto: ProductType) => void

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

        console.log(productoscart)
    }
})))