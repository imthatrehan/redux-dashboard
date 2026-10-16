import { Outlet } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Sidebar from './Sidebar'

function AdminLayout() {
  return (
    <div className="min-h-screen bg-stone-50 font-body text-stone-900 lg:grid lg:grid-cols-[256px_1fr]">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen lg:block">
        <Sidebar />
      </aside>

      <div className="min-w-0">
        {/* Mobile top bar */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-stone-200 bg-white px-4 lg:hidden">
          <span className="font-display text-xl font-semibold tracking-tight">
            Haat<span className="text-[#3446f0]">.</span>
            <span className="ml-2 font-body text-sm font-normal text-stone-500">
              admin
            </span>
          </span>
          <button
            aria-label="Open menu"
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-stone-100"
          >
            <Menu size={22} strokeWidth={1.7} />
          </button>
        </header>

        {/* Mobile drawer: menu button dabane par `hidden` hata dein */}
        <div className="hidden lg:hidden">
          <div className="fixed inset-0 z-40 bg-black/50" />
          <aside className="fixed inset-y-0 left-0 z-50 w-64">
            <Sidebar />
            <button
              aria-label="Close menu"
              className="absolute right-3 top-4 text-stone-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </aside>
        </div>

        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-8 lg:py-12">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
