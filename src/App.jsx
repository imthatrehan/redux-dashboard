import './App.css'

import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Register from './pages/Register'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Products from './pages/Products'
import AdminLayout from './components/admin/AdminLayout'
import AdminProducts from './pages/admin/AdminProducts'
import AdminUsers from './pages/admin/AdminUsers'
import Dashboard from './pages/admin/Dashboard'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchProductsData } from './features/products/productsSlice'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProductsData())
  }, [dispatch])
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="users" element={<AdminUsers />} />
      </Route>
    </Routes>
  )
}

export default App
