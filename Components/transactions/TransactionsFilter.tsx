"use client"

import { useState } from 'react'

import 'react-calendar/dist/Calendar.css'
import { format } from 'date-fns'
import { useQuery } from '@tanstack/react-query'
import { getVentas } from '@/src/api'
import TransactionSummary from './TransactionSummary'
import { formater } from '@/src/formater/utils'
import dynamic from 'next/dynamic'
const Calendar = dynamic(()=> import('react-calendar'),{
    ssr:false
}) 
type ValuePiece = Date | null

type Value = ValuePiece | [ValuePiece, ValuePiece]

export default function TransactionsFilter() {

    const [date, setDate] = useState<Value>(new Date)
    const formatDate = format(date?.toString()!, 'yyyy-MM-dd')

    const { data, isLoading } = useQuery({
        queryKey: ['sales', formatDate],
        queryFn: () => getVentas(formatDate)
    })

    const total = data?.reduce((total, items) => +items.total + total, 0)

    console.log(data)

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-10 relative items-start'>

            <div className='lg:sticky lg:top-10'>
                <Calendar value={date} onChange={setDate}  />
            </div>

            <div className='flex flex-col items-center'>
                {isLoading ? <p>Cargando...</p> : (
                    <>
                        <h1 className='font-bold uppercase text-xl'>{total ? `total del día: ${formater(+total)}` : ''}</h1>

                        {data?.length ? (

                            data?.map(n => (

                                <TransactionSummary key={n.id} n={n} />

                            ))

                        ) : <p className='text-center text-lg'>No hay registros</p>}



                    </>
                )
                }

            </div>
        </div>
    )
}
