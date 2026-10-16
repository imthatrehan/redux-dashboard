import {
  AlertTriangle,
  Pencil,
  Plus,
  Search,
  SearchX,
  Star,
  Trash2,
} from 'lucide-react'
import ProductFormModal from '../../components/admin/ProductFormModal'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteProduct,
  fetchProductsData,
  getAllProducts,
  getProductError,
  getProductLoadingState,
} from '../../features/products/productsSlice'
import { logActivity } from '../../features/activity/activitySlice'
import { useEffect, useState } from 'react'

const selectClass =
  'h-11 rounded-md border border-stone-300 bg-white px-3 text-sm outline-none focus:border-stone-900'

function AdminProducts() {
  const dispatch = useDispatch()
  const products = useSelector(getAllProducts)
  const loading = useSelector(getProductLoadingState)
  const error = useSelector(getProductError)

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('all')

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    dispatch(fetchProductsData())
  }, [dispatch])

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'asc') return (a.price * 280) - (b.price * 280)
    if (sortBy === 'desc') return (b.price * 280) - (a.price * 280)
    if (sortBy === 'az') return a.title.localeCompare(b.title)
    return 0
  })

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-semibold tracking-tight">
            Products
          </h1>
          <p className="mt-2 text-stone-500">{sortedProducts.length} products</p>
        </div>
        <button
          onClick={() => {
            setEditingProduct(null)
            setIsModalOpen(true)
          }}
          className="cursor-pointer flex items-center gap-2 rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#3446f0]"
        >
          <Plus size={16} />
          Add product
        </button>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1 sm:max-w-xs">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products"
            className="h-11 w-full rounded-md border border-stone-300 bg-white pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-stone-400 focus:border-stone-900"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={selectClass}
        >
          <option value="All">All categories</option>
          <option value="electronics">electronics</option>
          <option value="jewelery">jewelery</option>
          <option value="men's clothing">men's clothing</option>
          <option value="women's clothing">women's clothing</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={selectClass}
        >
          <option value="all">Sort by</option>
          <option value="asc">Price: low to high</option>
          <option value="desc">Price: high to low</option>
          <option value="az">Title: A to Z</option>
        </select>
      </div>
      {loading && (
        <div className="mt-6 divide-y divide-stone-100 rounded-lg border border-stone-200 bg-white">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex animate-pulse items-center gap-4 p-5">
              <div className="h-12 w-12 rounded-md bg-stone-100" />
              <div className="flex-1 space-y-2">
                <div className="h-3.5 w-1/2 rounded bg-stone-100" />
                <div className="h-3 w-1/4 rounded bg-stone-100" />
              </div>
            </div>
          ))}
        </div>
      )}
      {error && !loading && (
        <div className="mt-6 flex flex-col items-start rounded-lg border border-red-200 bg-red-50 p-8">
          <AlertTriangle size={32} strokeWidth={1.4} className="text-red-500" />
          <h2 className="mt-3 font-display text-xl font-semibold">
            Couldn't load products
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            {error}
          </p>
          <button
            onClick={() => dispatch(fetchProductsData())}
            className="cursor-pointer mt-4 rounded-full border border-red-300 px-5 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
          >
            Try again
          </button>
        </div>
      )}
      {!loading && !error && sortedProducts.length > 0 && (
        <div className="mt-6 overflow-x-auto rounded-lg border border-stone-200 bg-white">
          <table className="w-full min-w-180 text-left text-sm">
            <thead className="border-b border-stone-200 text-xs text-stone-500">
              <tr>
                <th className="px-5 py-3.5 font-medium">Product</th>
                <th className="px-5 py-3.5 font-medium">Category</th>
                <th className="px-5 py-3.5 font-medium">Price</th>
                <th className="px-5 py-3.5 font-medium">Rating</th>
                <th className="px-5 py-3.5 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {sortedProducts.map((p) => (
                <tr key={p.id} className="transition-colors hover:bg-stone-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-stone-100 p-1">
                        <img src={p.image} alt={p.title} className="h-full w-full object-contain" />
                      </div>
                      <div className="min-w-0">
                        <p className="line-clamp-1 max-w-xs font-medium">
                          {p.title}
                        </p>
                        <p className="text-xs text-stone-500">ID {p.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 capitalize text-stone-600">
                    {p.category}
                  </td>
                  <td className="px-5 py-4 font-medium">Rs. {Math.round(p.price * 280).toLocaleString()}</td>
                  <td className="px-5 py-4">
                    <span className="flex items-center gap-1.5">
                      <Star
                        size={14}
                        className="text-[#ffb400]"
                        fill="currentColor"
                      />
                      {p.rating?.rate || 0}
                      <span className="text-stone-400">({p.rating?.count || 0})</span>
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => {
                          setEditingProduct(p)
                          setIsModalOpen(true)
                        }}
                        aria-label={`Edit ${p.title}`}
                        className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-full text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => setDeletingId(p.id)}
                        aria-label={`Delete ${p.title}`}
                        className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-full text-stone-500 transition-colors hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!loading && !error && sortedProducts.length === 0 && (
        <div className="flex flex-col items-start py-20">
          <SearchX size={36} strokeWidth={1.4} className="text-stone-400" />
          <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight">
            No products found
          </h2>
          <p className="mt-2 text-stone-500">
            Try a different search or category.
          </p>
        </div>
      )}
      {isModalOpen && (
        <ProductFormModal
          product={editingProduct}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {deletingId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-lg bg-white p-6">
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Delete this product?
            </h2>
            <p className="mt-2 text-sm text-stone-500">
              This will remove it from the store. You can't undo this.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDeletingId(null)}
                className="cursor-pointer rounded-full border border-stone-300 px-5 py-2.5 text-sm font-medium hover:border-stone-900"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  dispatch(deleteProduct(deletingId))
                  dispatch(logActivity(`Deleted product ID ${deletingId}`))
                  setDeletingId(null)
                }}
                className="cursor-pointer rounded-full bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AdminProducts