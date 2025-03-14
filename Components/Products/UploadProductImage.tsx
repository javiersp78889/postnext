"use client"

import { UploadImage } from "@/action/upload-image-action"
import Image from "next/image"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"

export default function UploadProductImage() {
    const [url, setUrl] = useState('')
    const onDrop = useCallback(async (file: File[]) => {
        const formData = new FormData()
        file.forEach(files => {
            formData.append('file', files) // Agregar cada archivo individualmente
        })
        setUrl(await UploadImage(formData))
    }, [])
    const { getRootProps, getInputProps, isDragActive, isDragReject, isDragAccept } = useDropzone({
        accept: {
            'image/jpeg': ['.jpg'],
            'image/png': ['.png'],
        },
        onDrop,
        maxFiles: 1
    })
    return (
        <>
            <div className="space-y-1">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                    Imagen Producto
                </label>
                <div {...getRootProps({
                    className: `
                py-20 border-2 border-dashed  text-center 
                ${isDragActive ? 'border-gray-900 text-gray-900 bg-gray-200 ' : 'border-gray-400 text-gray-400 bg-white'} 
                ${isDragReject ? 'border-none bg-white' : 'cursor-not-allowed'}
            `})}>
                    <input {...getInputProps()} />
                    {isDragAccept && (<p>Suelta la Imagen</p>)}
                    {isDragReject && (<p>Archivo no válido</p>)}
                    {!isDragActive && (<p>Arrastra y suelta una imagen aquí</p>)}
                </div>

                {url ?
                    <div className="py-5 space-y-3 flex items-center justify-center flex-col">
                        <p>Imagen de Producto</p>
                        <Image src={url} width={60} height={60} alt="imagen nueva" />
                    </div>
                    : ''}
            </div>

            <input type="hidden" name="image" defaultValue={url} />
        </>

    )
}
