import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-start justify-center px-4 py-20 sm:px-8">
      <p className="font-display text-[8rem] font-semibold leading-none tracking-tight text-[#3446f0] sm:text-[12rem]">
        404
      </p>
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        This page isn't here.
      </h1>
      <p className="mt-3 max-w-md text-stone-600">
        The link may be broken, or the page was moved. Go back home or keep
        browsing the store.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-6">
        <Link
          to="/"
          className="rounded-full bg-stone-900 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#3446f0]"
        >
          Back to home
        </Link>
        <Link
          to="/products"
          className="text-sm font-medium underline underline-offset-4"
        >
          Browse products
        </Link>
      </div>
    </section>
  )
}

export default NotFound
