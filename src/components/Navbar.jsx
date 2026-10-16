import { Link, NavLink } from 'react-router-dom'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartCount } from '../features/cart/cartSlice'
import { logout, selectIsLoggedIn } from '../features/auth/authSlice'

const navLinkClass = ({ isActive }) =>
  `text-sm underline-offset-[10px] transition-colors ${
    isActive
      ? 'font-medium text-stone-900 underline decoration-2'
      : 'text-stone-500 hover:text-stone-900'
  }`

function Navbar() {
  const cartCount = useSelector(selectCartCount)
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
        <Link
          to="/"
          className="font-display text-2xl font-semibold tracking-tight"
        >
          Haat<span className="text-[#3446f0]">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/products" className={navLinkClass}>
            Products
          </NavLink>
          <NavLink to="/admin" className={navLinkClass}>
            Admin
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className="flex h-10 items-center gap-2 rounded-full px-3 text-sm text-stone-800 transition-colors hover:bg-stone-100"
          >
            <ShoppingBag size={19} strokeWidth={1.7} />
            Cart
            <span
              key={cartCount}
              className="badge-pop flex h-5 min-w-5 items-center justify-center rounded-full bg-[#3446f0] px-1.5 text-xs font-medium text-white"
            >
              {cartCount}
            </span>
          </Link>
          {isLoggedIn ? (
            <button
              onClick={() => dispatch(logout())}
              className="hidden md:flex rounded-full bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#3446f0] sm:inline-block"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="hidden md:flex rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#3446f0] sm:inline-block"
            >
              Login
            </Link>
          )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="flex h-10 w-10 items-center justify-center rounded-full text-stone-800 hover:bg-stone-100 md:hidden"
          >
            {menuOpen ? (
              <X size={22} strokeWidth={1.7} />
            ) : (
              <Menu size={22} strokeWidth={1.7} />
            )}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="border-t border-stone-200 md:hidden">
          <nav className="flex flex-col px-4 py-2 text-base">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="border-b border-stone-100 py-3"
            >
              Home
            </Link>
            <Link
              to="/products"
              onClick={() => setMenuOpen(false)}
              className="border-b border-stone-100 py-3"
            >
              Products
            </Link>
            {isLoggedIn ? (
              <button
                onClick={() => {
                  dispatch(logout())
                  setMenuOpen(false)
                }}
                className="py-3 text-left font-medium text-red-600"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="py-3 font-medium"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar
