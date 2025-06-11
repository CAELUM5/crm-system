import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Types for products
interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

interface ProductsState {
  products: Product[]
  isLoading: boolean
  error: string | null
  total: number
  skip: number
  limit: number
}

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  error: null,
  total: 0,
  skip: 0,
  limit: 30,
}

// Fetch products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ skip = 0, limit = 30 }: { skip?: number; limit?: number } = {}) => {
    const response = await fetch(`https://dummyjson.com/products?skip=${skip}&limit=${limit}`)
    const data = await response.json()
    return data
  },
)

// Add product
export const addProduct = createAsyncThunk("products/addProduct", async (productData: Omit<Product, "id">) => {
  const response = await fetch("https://dummyjson.com/products/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  })
  const data = await response.json()
  return data
})

// Update product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, ...productData }: Partial<Product> & { id: number }) => {
    const response = await fetch(`https://dummyjson.com/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    })
    const data = await response.json()
    return data
  },
)

// Delete product
export const deleteProduct = createAsyncThunk("products/deleteProduct", async (id: number) => {
  await fetch(`https://dummyjson.com/products/${id}`, {
    method: "DELETE",
  })
  return id
})

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.products = action.payload.products
        state.total = action.payload.total
        state.skip = action.payload.skip
        state.limit = action.payload.limit
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to fetch products"
      })
      // Add product
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload)
      })
      // Update product
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((p) => p.id === action.payload.id)
        if (index !== -1) {
          state.products[index] = action.payload
        }
      })
      // Delete product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p.id !== action.payload)
      })
  },
})

export const { clearError } = productsSlice.actions
export default productsSlice.reducer
