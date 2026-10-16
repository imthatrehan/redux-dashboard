import { configureStore } from "@reduxjs/toolkit";
import auth from "../features/auth/authSlice";
import cart from "../features/cart/cartSlice";
import products from "../features/products/productsSlice";
import users from "../features/users/usersSlice";
import activity from '../features/activity/activitySlice'

export const store = configureStore({ reducer: { cart, auth, products, users , activity } });
store.subscribe(() => {
  const state = store.getState()
  localStorage.setItem('cart', JSON.stringify(state.cart.items))
  localStorage.setItem('auth', JSON.stringify({
    users: state.auth.users,
    currentUser: state.auth.currentUser,
  }))
  localStorage.setItem('products', JSON.stringify(state.products.items))
  localStorage.setItem('activity', JSON.stringify(state.activity.items))
})