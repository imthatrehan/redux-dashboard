import { Banknote, CreditCard, Lock } from 'lucide-react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearCart,
  selectCartItems,
  selectCartTotal,
} from '../features/cart/cartSlice'
import { selectIsLoggedIn } from '../features/auth/authSlice'

const field =
  'mt-1.5 h-11 w-full rounded-md border border-stone-300 bg-white px-3.5 text-sm outline-none transition-colors placeholder:text-stone-400 focus:border-stone-900'

const payment =
  'flex cursor-pointer items-start gap-3 rounded-md border border-stone-300 p-4 transition-colors has-[:checked]:border-stone-900 has-[:checked]:bg-stone-50'

function Checkout() {
  const dispatch = useDispatch()
  const cart = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const navigate = useNavigate()

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-8">
      <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        Checkout
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (cart.length === 0) return
          dispatch(clearCart())
          navigate('/')
        }}
        className="mt-10 grid gap-12 lg:grid-cols-[1fr_380px]"
      >
        <div className="space-y-12">
          <div>
            <h2 className="border-b border-stone-200 pb-3 font-display text-2xl font-semibold tracking-tight">
              Contact
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium">Email</span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className={field}
                  required
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium">Phone</span>
                <input
                  type="tel"
                  placeholder="03XX XXXXXXX"
                  className={field}
                  required
                />
              </label>
            </div>
          </div>
          <div>
            <h2 className="border-b border-stone-200 pb-3 font-display text-2xl font-semibold tracking-tight">
              Delivery address
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="text-sm font-medium">Full name</span>
                <input type="text" className={field} required />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-medium">Address</span>
                <input
                  type="text"
                  placeholder="House, street, area"
                  className={field}
                  required
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium">City</span>
                <input type="text" className={field} required />
              </label>
              <label className="block">
                <span className="text-sm font-medium">Postal code</span>
                <input type="text" className={field} required />
              </label>
            </div>
          </div>
          <div>
            <h2 className="border-b border-stone-200 pb-3 font-display text-2xl font-semibold tracking-tight">
              Payment
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <label className={payment}>
                <input
                  type="radio"
                  name="payment"
                  defaultChecked
                  className="mt-1 accent-stone-900"
                />
                <span>
                  <span className="flex items-center gap-2 text-sm font-medium">
                    <Banknote size={18} strokeWidth={1.6} />
                    Cash on delivery
                  </span>
                  <span className="mt-1 block text-sm text-stone-500">
                    Pay when your order arrives.
                  </span>
                </span>
              </label>
              <label className={payment}>
                <input
                  type="radio"
                  name="payment"
                  className="mt-1 accent-stone-900"
                />
                <span>
                  <span className="flex items-center gap-2 text-sm font-medium">
                    <CreditCard size={18} strokeWidth={1.6} />
                    Card
                  </span>
                  <span className="mt-1 block text-sm text-stone-500">
                    Pay securely online.
                  </span>
                </span>
              </label>
            </div>
          </div>
        </div>
        <aside className="h-fit rounded-lg bg-stone-100 p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            Your order
          </h2>

          <ul className="mt-6 space-y-4">
            {cart.map((item) => (
              <li key={item.id} className="flex items-center gap-4">
                <div className="flex h-14 w-12 shrink-0 items-center justify-center rounded-md bg-white p-1">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                  <p className="text-xs text-stone-500">Qty {item.quantity}</p>
                </div>
                <p className="text-sm">
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
          <dl className="mt-6 space-y-3 border-t border-stone-300 pt-5 text-sm">
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
          <button
            type="submit"
            className="cursor-pointer mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-stone-900 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#3446f0]"
          >
            <Lock size={16} />
            Place order
          </button>
        </aside>
      </form>
    </section>
  )
}

export default Checkout