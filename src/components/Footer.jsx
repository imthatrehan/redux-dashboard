import { Link } from 'react-router-dom'
import { selectIsLoggedIn } from '../features/auth/authSlice'
import { useSelector } from 'react-redux'

const linkClass = 'transition-colors hover:text-stone-900'

function Footer() {
  const isLoggedIn = useSelector(selectIsLoggedIn)

  return (
    <footer className="border-t border-stone-200 bg-stone-50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-8 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl font-semibold tracking-tight">
            Haat<span className="text-[#3446f0]">.</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-stone-500">
            A small store for everyday things. Simple prices, quick delivery.
          </p>
        </div>
        <div className='flex justify-around'><div>
          <h4 className="text-sm font-medium">Shop</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-stone-500">
            <li>
              <Link to="/products" className={linkClass}>
                All products
              </Link>
            </li>
            <li>
              <Link to="/cart" className={linkClass}>
                Cart
              </Link>
            </li>
          </ul>
        </div>
        {isLoggedIn ? (
          ''
        ) : (
          <div>
            <h4 className="text-sm font-medium">Account</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-stone-500">
              <li>
                <Link to="/login" className={linkClass}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className={linkClass}>
                  Create account
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div></div>

      <div className="border-t border-stone-200">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-stone-500 sm:px-8">
          © 2026 Haat. This is a demo store, orders are not real.
        </p>
      </div>
    </footer>
  )
}

export default Footer
