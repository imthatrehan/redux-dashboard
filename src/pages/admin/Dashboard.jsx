import { Package, ShoppingBag, Users, Wallet } from 'lucide-react'
import StatCard from '../../components/admin/StatCard'
import { selectCartCount, selectCartTotal } from '../../features/cart/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchProductsData,
  getAllProducts,
} from '../../features/products/productsSlice'
import { fetchUsers, getAllUsers } from '../../features/users/usersSlice'
import { useEffect } from 'react'
import { getAllActivities } from '../../features/activity/activitySlice'

function formatTimeAgo(timestamp) {
  if (!timestamp) return 'Just now'
  const seconds = Math.floor((Date.now() - timestamp) / 1000)
  if (seconds < 60) return 'Just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} min${minutes > 1 ? 's' : ''} ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  const days = Math.floor(hours / 24)
  return `${days} day${days > 1 ? 's' : ''} ago`
}

function Dashboard() {
  const dispatch = useDispatch()
  const products = useSelector(getAllProducts)
  const cartCount = useSelector(selectCartCount)
  const cartTotal = useSelector(selectCartTotal)
  const users = useSelector(getAllUsers)
  const activity = useSelector(getAllActivities)

  useEffect(() => {
    dispatch(fetchProductsData())
    dispatch(fetchUsers())
  }, [dispatch])

  function categoryWiseProductCount(items) {
    const productsTotalCategory = items.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + 1
      return acc
    }, {})
    return Object.entries(productsTotalCategory).map((e) => {
      return { label: e[0], count: e[1] }
    })
  }

  const byCategory = categoryWiseProductCount(products)
  const totalProductsCount = products.length || 1

  return (
    <>
      <h1 className="font-display text-4xl font-semibold tracking-tight">
        Dashboard
      </h1>
      <p className="mt-2 text-stone-500">A quick look at your store.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total products"
          value={products.length}
          icon={Package}
          tone="bg-[#3446f0] text-white"
        />
        <StatCard
          title="Cart items"
          value={cartCount}
          icon={ShoppingBag}
          tone="bg-[#ffd23f] text-stone-900"
        />
        <StatCard
          title="Cart value"
          value={`Rs. ${cartTotal.toLocaleString()}`}
          icon={Wallet}
          tone="bg-[#16a37f] text-white"
        />
        <StatCard
          title="Total users"
          value={users.length}
          icon={Users}
          tone="bg-[#f6a8c4] text-stone-900"
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-lg border border-stone-200 bg-white p-6">
          <h2 className="font-display text-xl font-semibold tracking-tight">
            Products by category
          </h2>
          <ul className="mt-6 space-y-5">
            {byCategory.map((c) => (
              <li key={c.label}>
                <div className="flex justify-between text-sm">
                  <span className="capitalize">{c.label}</span>
                  <span className="text-stone-500">{c.count}</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-stone-100">
                  <div
                    className="h-2 rounded-full bg-stone-900"
                    style={{
                      width: `${(c.count / totalProductsCount) * 100}%`,
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-lg border border-stone-200 bg-white p-6">
          <h2 className="font-display text-xl font-semibold tracking-tight">
            Recent activity
          </h2>
          {activity.length === 0 ? (
            <p className="text-sm flex items-center justify-center text-stone-500 h-48">
              No recent activity yet.
            </p>
          ) : (
            <ul className="mt-6 divide-y divide-stone-100">
              {activity.map((a) => (
                <li
                  key={a.id}
                  className="flex items-center justify-between gap-4 py-3.5 text-sm"
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full ${a.dot}`}
                    />
                    {a.text}
                  </span>
                  <span className="shrink-0 text-stone-500">
                    {formatTimeAgo(a.createdAt)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  )
}

export default Dashboard