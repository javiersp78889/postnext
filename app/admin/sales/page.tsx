
import TransactionsFilter from '@/Components/transactions/TransactionsFilter'
import Headings from '@/Components/ui/Headings'
import React from 'react'
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { format } from 'date-fns'



export async function getVentas() {

  const url=`localhost:3001/admin/sales/api?transactionDate=${date}`
}


export default async function Salespage({params}) {


  console.log(await params)
  const queryClient = new QueryClient()


  const today = new Date()

  const formatedDate = format(today, 'yyyy-MM-dd')
  await queryClient.prefetchQuery({
    queryKey: ['sales', formatedDate],
    queryFn: getVentas
  })


  
  return (
    <>
      <Headings>Ventas</Headings>
      <p className='text-lg'>En esta sección podrás ver las ventas, utiliza el calendario para filtrar por fecha.</p>
      <HydrationBoundary state={dehydrate(queryClient)} >
        <TransactionsFilter />
      </HydrationBoundary>

    </>
  )
}
