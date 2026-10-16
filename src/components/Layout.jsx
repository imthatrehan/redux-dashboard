import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

function Layout() {
  const { pathname } = useLocation()
return (
  <div className="flex min-h-screen flex-col bg-white font-body text-stone-900">
    <Navbar />
    <main key={pathname} className="flex-1 page-enter"><Outlet /></main>
    <Footer />
  </div>
)
}

export default Layout
