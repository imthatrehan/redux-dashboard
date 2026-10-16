import { Link } from 'react-router-dom'
import { Minus, Plus, ShoppingBag, X } from 'lucide-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decreaseQty, increaseQty, removeFromCart, selectCartCount, selectCartItems, selectCartTotal } from '../features/cart/cartSlice'
import { selectIsLoggedIn } from '../features/auth/authSlice'

function Cart() {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const dispatch = useDispatch()
  const cart = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)
  const cartCount = useSelector(selectCartCount)
  const [removingId, setRemovingId] = useState(null)

  function remove(id) {
    setRemovingId(id)
    setTimeout(() => {
      dispatch(removeFromCart(id))
      setRemovingId(null)
    }, 200)
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-8">
      <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        Your cart
      </h1>
      <p className="mt-2 text-stone-500">{cartCount} items</p>
      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_380px]">
        <ul className="border-t-2 border-stone-900">
          {cart.map((item) => {
            return (
              <li
                key={item.id}
                className={`flex gap-4 border-b border-stone-200 py-6 sm:gap-6 ${
                  removingId === item.id ? 'row-exit' : ''
                }`}
              >
                <Link
                  to={`/products/${item.id}`}
                  className="flex h-28 w-24 shrink-0 items-center justify-center rounded-md bg-stone-100 p-2 sm:w-28"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-contain"
                  />
                </Link>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-stone-500">{item.category}</p>
                    <Link
                      to={`/products/${item.id}`}
                      className="font-display text-xl font-semibold tracking-tight hover:underline line-clamp-1"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-0.5 text-sm text-stone-500">
                      Rs. {item.price.toLocaleString()} each
                    </p>
                  </div>
                  <div className="mt-3 flex h-10 w-fit items-center rounded-full border border-stone-300">
                    <button
                      onClick={() => dispatch(decreaseQty(item.id))}
                      aria-label="Decrease quantity"
                      className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-stone-100 cursor-pointer"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-6 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => dispatch(increaseQty(item.id))}
                      aria-label="Increase quantity"
                      className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-stone-100 cursor-pointer"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => remove(item.id)}
                    aria-label={`Remove ${item.name}`}
                    className="text-stone-400 transition-colors hover:text-red-600 cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                  <p className="font-medium">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
        <aside className="h-fit rounded-lg bg-stone-100 p-6 lg:sticky lg:top-24">
          {cart.length === 0 ? (
            <div className="max-w-full">
              <div className="flex flex-col justify-center items-center py-24 mx-auto w-full text-center">
                <ShoppingBag
                  size={36}
                  strokeWidth={1.4}
                  className="text-stone-400"
                />
                <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight">
                  Your cart is empty
                </h2>
                <p className="mt-2 text-stone-500">
                  Add something from the store and it will show up here.
                </p>
                <Link
                  to="/products"
                  className="mt-6 rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white hover:bg-[#3446f0]"
                >
                  Browse products
                </Link>
              </div>
            </div>
          ) : (
            <>
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                Order summary
              </h2>
              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-stone-600">Subtotal</dt>
                  <dd>Rs. {cartTotal.toLocaleString()}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-stone-600">Delivery</dt>
                  <dd>Free</dd>
                </div>
              </dl>
              <div className="mt-5 flex items-baseline justify-between border-t border-stone-300 pt-5">
                <span className="font-medium">Total</span>
                <span className="font-display text-3xl font-semibold">
                  Rs. {cartTotal.toLocaleString()}
                </span>
              </div>
              <Link
                to={isLoggedIn ? '/checkout' : '/login'}
                className="mt-6 block rounded-full bg-stone-900 py-3.5 text-center text-sm font-medium text-white transition-colors hover:bg-[#3446f0]"
              >
                {isLoggedIn ? 'Go to checkout' : 'Login First'}
              </Link>
              <Link
                to="/products"
                className="mt-4 block text-center text-sm underline underline-offset-4"
              >
                Continue shopping
              </Link>
            </>
          )}
        </aside>
      </div>
    </section>
  )
}

export default Cart