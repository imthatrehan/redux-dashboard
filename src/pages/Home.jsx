import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useSelector } from 'react-redux'
import { getAllProducts } from '../features/products/productsSlice'

const info = [
  'Free delivery above Rs. 5,000',
  '7-day returns',
  'Cash on delivery',
]

function Home() {
  const products = useSelector(getAllProducts)

  function categoryWiseProductCount(items) {
    const productsTotalCategory = items.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + 1
      return acc
    }, {})
    return Object.entries(productsTotalCategory).map((e) => {
      return { name: e[0], count: e[1] }
    })
  }

  const categories = categoryWiseProductCount(products)

  return (
    <>
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-12 sm:px-8 md:pt-20 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h1 className="font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            Everyday things, fairly priced.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-stone-600">
            Laptops, clothes, shoes and bags in one small store, delivered to
            your door.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Link
              to="/products"
              className="rounded-full bg-stone-900 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#3446f0]"
            >
              Shop all products
            </Link>
            <a
              href="#categories"
              className="text-sm font-medium underline underline-offset-4"
            >
              Browse categories
            </a>
          </div>
        </div>
        <div className="grid h-110 grid-cols-2 grid-rows-2 gap-3 sm:h-135 lg:col-span-6">
          <Link
            to="/products/9"
            className="row-span-2 flex flex-col justify-between rounded-lg bg-[#3446f0] p-6 text-white"
          >
            <span className="text-sm uppercase tracking-wider opacity-70">Electronics</span>
            <span>
              <span className="block font-display text-5xl font-semibold leading-none tracking-tight sm:text-6xl">
                Hard Drive
              </span>
              <span className="mt-2 block text-sm opacity-80">Rs. 17,920</span>
            </span>
          </Link>
          <Link
            to="/products/1"
            className="flex flex-col justify-between rounded-lg bg-[#ffd23f] p-6 text-stone-900"
          >
            <span className="text-sm uppercase tracking-wider opacity-70">Clothing</span>
            <span>
              <span className="block font-display text-3xl font-semibold leading-none tracking-tight">
                Backpack
              </span>
              <span className="mt-2 block text-sm opacity-80">Rs. 30,786</span>
            </span>
          </Link>
          <Link
            to="/products/5"
            className="flex flex-col justify-between rounded-lg bg-[#16a37f] p-6 text-white"
          >
            <span className="text-sm uppercase tracking-wider opacity-70">Jewelery</span>
            <span>
              <span className="block font-display text-3xl font-semibold leading-none tracking-tight">
                Bracelet
              </span>
              <span className="mt-2 block text-sm opacity-80">Rs. 194,600</span>
            </span>
          </Link>
        </div>
      </section>
      <div className="border-y border-stone-200 bg-stone-50">
        <ul className="mx-auto flex max-w-7xl flex-wrap gap-x-10 gap-y-2 px-4 py-4 text-sm text-stone-600 sm:px-8">
          {info.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      </div>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            New this week
          </h2>
          <Link
            to="/products"
            className="text-sm font-medium underline underline-offset-4"
          >
            View all products
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-5">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
      <section id="categories" className="mx-auto max-w-7xl px-4 pb-20 sm:px-8">
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Shop by category
        </h2>
        <ul className="mt-8 border-t-2 border-stone-900">
          {categories.map((c) => (
            <li key={c.name}>
              <Link
                to={`/products?category=${c.name}`}
                className="group flex items-baseline justify-between gap-4 border-b border-stone-200 py-6 transition-colors hover:bg-stone-50"
              >
                <span className="font-display text-4xl font-semibold tracking-tight capitalize transition-colors group-hover:text-[#3446f0] sm:text-6xl">
                  {c.name}
                </span>
                <span className="text-sm text-stone-500">
                  {c.count} {c.count === 1 ? 'product' : 'products'}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default Home