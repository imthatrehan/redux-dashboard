import { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('cart', [])

  const toggleCart = (product, quantity = 1) => {
    setCart((prev) =>
      prev.some((c) => c.id === product.id)
        ? prev.filter((c) => c.id !== product.id)
        : [
            {
              id: product.id,
              name: product.name,
              category: product.category,
              price: product.price,
              tone: product.tone,
              quantity,
            },
            ...prev,
          ],
    )
  }
  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((c) => c.id !== id))
  const increaseQty = (id) =>
    setCart((prev) =>
      prev.map((c) => (c.id === id ? { ...c, quantity: c.quantity + 1 } : c)),
    )
  const decreaseQty = (id) =>
    setCart((prev) =>
      prev.map((c) =>
        c.id === id && c.quantity > 1 ? { ...c, quantity: c.quantity - 1 } : c,
      ),
    )
  const clearCart = () => setCart([])
  const isInCart = (id) => cart.some((c) => c.id === id)
  const cartTotal = cart.reduce((sum, c) => sum + c.price * c.quantity, 0)
  const cartCount = cart.length

  return (
    <CartContext.Provider
      value={{
        cart,
        toggleCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        isInCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}