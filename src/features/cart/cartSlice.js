import { createSlice } from '@reduxjs/toolkit'
import loadState from '../../app/storage'

const initialState = {
  items: loadState('cart', []),
}

const slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart(state, action) {
      const product = action.payload
      const exists = state.items.some((c) => c.id === product.id)
      if (exists) {
        state.items = state.items.filter((c) => c.id !== product.id)
      } else {
        state.items.unshift(product)
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((c) => c.id !== action.payload)
    },
    increaseQty(state, action) {
      const item = state.items.find((c) => c.id === action.payload)
      if (item) item.quantity += 1
    },
    decreaseQty(state, action) {
      const item = state.items.find((c) => c.id === action.payload)
      if (item && item.quantity > 1) item.quantity -= 1
    },
    clearCart(state) {
      state.items = []
    },
  },
})

export const {
  toggleCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = slice.actions

export const selectCartItems = (state) => state.cart.items

export const selectCartTotal = (state) =>
  state.cart.items.reduce((sum, c) => sum + c.price * c.quantity, 0)

export const selectCartCount = (state) => state.cart.items.length

export const selectIsInCart = (id) => (state) =>
  state.cart.items.some((c) => c.id === id)

export default slice.reducer