import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import loadState from '../../app/storage'

export const fetchProductsData = createAsyncThunk(
  'products/fetch',
  async (_, { getState }) => {
    const response = await fetch('https://fakestoreapi.com/products')
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    return response.json()
  },
  {
    condition: (_, { getState }) => {
      const { products } = getState()
      if (products.items.length > 0 || products.loading) {
        return false
      }
    },
  },
)

const slice = createSlice({
  name: 'products',
  initialState: {
    items: loadState('products', []),
    loading: false,
    error: null,
  },
  reducers: {
    addProduct: (state, action) => {
      state.items.unshift(action.payload)
    },
    updateProduct: (state, action) => {
      const { id, ...fields } = action.payload
      const index = state.items.findIndex((p) => p.id === id)
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...fields }
      }
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter((p) => p.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProductsData.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
        state.error = null
      })
      .addCase(fetchProductsData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Something went wrong!'
      })
  },
})

export const { addProduct, updateProduct, deleteProduct } = slice.actions

export const getAllProducts = (state) => state.products.items
export const getProductLoadingState = (state) => state.products.loading
export const getProductError = (state) => state.products.error

export default slice.reducer