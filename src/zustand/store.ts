import { create } from "zustand";
import { ProductType, responseSchema, ShoppingCartType, Tresponse } from "../schemas";
import { devtools } from "zustand/middleware";



interface Store {

    total: number,
    porcentaje: number,
    productoscart: ShoppingCartType,
    addTocar: (producto: ProductType) => void,
    updateQuantity: (id: ProductType['id'], quantity: number) => void,
    delete: (id: ProductType['id']) => void,
    calculateTotal: () => void,
    applyCoupon: (coupon: string) => Promise<void>,
    response: Tresponse,
    descuento: number,
    coupon: string,
    DeleteDiscount: () => void,
    buyProducts: () => void

}

const initializar = {
    descuento: 0,
    response: {
        message: '',
        status: 0,
        cupon: {
            name: '',
            expirationDate: '',
            percentage: 0
        }
    },
    porcentaje: 0
}

const shoppingCartInit:ShoppingCartType = []


export const useStore = create<Store>()(devtools((set, get) => ({
    total: 0,
    productoscart: [],
    response: [],
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
            productoscart,
        }))


        if (productoscart.length <= 0) {
            set(() => (initializar))
        }

        get().DeleteDiscount()


    },
    DeleteDiscount: () => {
        let total = get().productoscart.reduce((total, item) => total + (item.price * item.quantity), 0)
        const descuento = (total * get().porcentaje)
        total = total - descuento
        set(() => ({
            total,
            descuento
        }))

    },
    calculateTotal: () => {
        let total = get().productoscart.reduce((total, item) => total + (item.price * item.quantity), 0)

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
        console.log(json)
        const response = responseSchema.parse(json)


        if (response.cupon) {
            const { percentage } = response.cupon
            const coupon = response.cupon.name
            const porcentaje = percentage / 100
            const descuento = (get().total * porcentaje)
            const total = get().total - descuento
            set(() => ({
                response,
                total,
                descuento,
                coupon,
                porcentaje
            }))
        }


        set(() => ({
            response,
        }))
    },
    buyProducts: () => {


        set(() => ({
            productoscart:shoppingCartInit
        }))

    },
})))