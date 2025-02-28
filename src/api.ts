import { TransactionsResponseSchema } from "./schemas"

export async function getVentas(date: string) {
    
    const url = `${process.env.NEXT_PUBLIC_DOMAIN_URL}/admin/sales/api?transactionDate=${date}`
    
    
    const req = await fetch(url)


    if(!req.ok){
        console.log('Error al obtener los datos')
    }

    const data = await req.json()

    const validate = TransactionsResponseSchema.parse(data)
    
    return validate
}
