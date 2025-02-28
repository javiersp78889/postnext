import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    const nextParams = request.nextUrl.searchParams
    const transactionDate = nextParams.get('transactionDate')

    const url = `${process.env.API_URL}/transactions?transactionDate=${transactionDate}`

    const req = await fetch(url)


    const json = await req.json()




    return NextResponse.json(json);

}
