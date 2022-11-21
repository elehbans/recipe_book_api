interface Recipe {
  id: string
  name: string
  description: string
  instructions: string
  ingredients: string
  [fieldName: string]: string
}

export type { Recipe }
