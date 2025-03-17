export const formater = (price: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
}


export function isValidPage(value: number) {
  if (value == null) {
    return false;
  }

  if (typeof value !== 'number' && isNaN(value)) {
    return false;
  }
  if (value <= 0) {
    return false;
  }

  if (!Number.isInteger(value)) {
    return false;
  }

  return true;
}

export const getImagePath = (image: string) => {
  const cloudinaryBase = 'https://res.cloudinary.com'

  if (image.startsWith(cloudinaryBase)) {
    console.log(image)
    return image
  } else {
    console.log(image)
    return `${process.env.NEXT_PUBLIC_API_URL}/${image}`
  }
}

export const isAviable = (inventory: number) => {

  if (inventory < 1) {
    return 'Agotado'
  }

  else {
    return `Disponibles: ${inventory}`
  }

}