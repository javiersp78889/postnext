"use server"

export const UploadImage = async (formData: FormData): Promise<string> => {
    const url = `${process.env.API_URL}/products/upload-image`

    const req = await fetch(url, {
        method: 'POST',
        body: formData // No agregar 'Content-Type', Fetch lo maneja solo
    })

    const json = await req.json()
    return json.secure_url
}
