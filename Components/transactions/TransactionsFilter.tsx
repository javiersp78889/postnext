"use client"

import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { format } from 'date-fns'

type ValuePiece = Date | null

type Value = ValuePiece | [ValuePiece, ValuePiece]

export default function TransactionsFilter() {

    const [date, setDate] = useState<Value>(new Date)
    const formatDate = format(date?.toString()!, 'yyyy-MM-dd')
    console.log(formatDate)
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-10'>

            <div>
                <Calendar value={date} onChange={setDate} />
            </div>

            <div>
                2

            </div>
        </div>
    )
}
