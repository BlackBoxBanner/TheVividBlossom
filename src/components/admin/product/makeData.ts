import {Product} from ".prisma/client";

export interface ProductTable {
  sku: string
  title: string
  Flower_Color: string
  Flower_Type: string
  Seasonal_Information: string
  selling_price: number
  inventory: number
}

const range = (len: number) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newItem = (props: Product): ProductTable => {
  return {
    sku: props.sku,
    title: props.title,
    Flower_Color: props.Flower_Color,
    Flower_Type: props.Flower_Type,
    Seasonal_Information: props.Seasonal_Information,
    selling_price: props.selling_price,
    inventory: props.inventory,
  }
}

export function makeData( lens: Product[]) {
  const makeDataLevel = (depth = 0): ProductTable[] => {
    const len = lens[depth]!
    return range(lens.length).map((d): ProductTable => {
      return {
        ...newItem(len),
        // subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}