import { Search, SearchX } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { getAllProducts } from '../features/products/productsSlice'
import { useSelector } from 'react-redux'

function Products() {
  const products = useSelector(getAllProducts)
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryFilter = searchParams.get('category') ?? 'All'
  const [searchInput, setSearchInput] = useState('')
  const [sort, setSort] = useState('all')

  const categories = [
    { label: 'All' },
    { label: "men's clothing" },
    { label: 'jewelery' },
    { label: 'electronics' },
    { label: "women's clothing" },
  ]

  const filteredProducts = products.filter((p) => {
    const matchCategory =
      categoryFilter === 'All' || p.category.toLowerCase() === categoryFilter.toLowerCase()
    const matchSearch =
      searchInput.trim() === '' ||
      p.title.toLowerCase().includes(searchInput.toLowerCase())
    return matchCategory && matchSearch
  })

  const sortedProducts =
    sort === 'asc'
      ? [...filteredProducts].sort((a, b) => (a.price * 280) - (b.price * 280))
      : sort === 'desc'
        ? [...filteredProducts].sort((a, b) => (b.price * 280) - (a.price * 280))
        : filteredProducts

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-8">
      <div className="flex items-end justify-between gap-4">
        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          All products
        </h1>
        <p className="text-sm text-stone-500">{sortedProducts.length} items</p>
      </div>
      <div className="mt-8 flex flex-col gap-4 border-y border-stone-200 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-xs">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
          />
          <input
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
            type="text"
            placeholder="Search products"
            className="h-11 w-full rounded-md border border-stone-300 bg-white pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-stone-400 focus:border-stone-900"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.label}
              onClick={() => {
                c.label === 'All' ? setSearchParams({}) : setSearchParams({ category: c.label })
              }}
              className={`rounded-full px-4 py-2 text-sm capitalize transition-colors ${
                categoryFilter.toLowerCase() === c.label.toLowerCase()
                  ? 'bg-stone-900 text-white'
                  : 'border border-stone-300 text-stone-600 hover:border-stone-900 hover:text-stone-900'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <select
          onChange={(e) => setSort(e.target.value)}
          value={sort}
          className="h-11 rounded-md border border-stone-300 bg-white px-3 text-sm outline-none focus:border-stone-900"
        >
          <option value="all">Sort by price</option>
          <option value="asc">Price: low to high</option>
          <option value="desc">Price: high to low</option>
        </select>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-5">
        {sortedProducts.map((p, i) => (
          <div key={p.id} className="card-rise" style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
      {sortedProducts.length === 0 ? (
        <div>
          <div className="flex flex-col items-start py-24">
            <SearchX size={36} strokeWidth={1.4} className="text-stone-400" />
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight">
              Nothing matches your search
            </h2>
            <p className="mt-2 text-stone-500">
              Check the spelling or pick a different category.
            </p>
            <button
              onClick={() => {
                setSearchInput('')
                setSort('all')
                setSearchParams({})
              }}
              className="cursor-pointer mt-6 rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white hover:bg-[#3446f0]"
            >
              Clear filters
            </button>
          </div>
        </div>
      ) : (
        ''
      )}
    </section>
  )
}

export default Products