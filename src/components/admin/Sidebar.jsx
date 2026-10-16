import { Link, NavLink } from 'react-router-dom'
import { LayoutDashboard, Package, Store, Users } from 'lucide-react'

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/users', label: 'Users', icon: Users },
]

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
    isActive
      ? 'bg-white/10 text-white'
      : 'text-stone-400 hover:bg-white/5 hover:text-white'
  }`

function Sidebar() {
  return (
    <div className="flex h-full flex-col bg-stone-900 px-4 py-6">
      <Link
        to="/admin"
        className="px-3 font-display text-2xl font-semibold tracking-tight text-white"
      >
        Haat<span className="text-[#7b88ff]">.</span>
        <span className="ml-2 font-body text-sm font-normal text-stone-500">
          admin
        </span>
      </Link>

      <nav className="mt-10 flex flex-col gap-1">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={linkClass}>
            <Icon size={18} strokeWidth={1.7} />
            {label}
          </NavLink>
        ))}
      </nav>

      <Link
        to="/"
        className="mt-auto flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-stone-400 transition-colors hover:bg-white/5 hover:text-white"
      >
        <Store size={18} strokeWidth={1.7} />
        Back to store
      </Link>
    </div>
  )
}

export default Sidebar
