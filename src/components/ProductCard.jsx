import { Link } from 'react-router-dom'
import { Minus, Plus } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import {
  removeFromCart,
  selectCartItems,
  toggleCart,
} from '../features/cart/cartSlice'
import { logActivity } from '../features/activity/activitySlice'

function ProductCard({ product }) {
  const dispatch = useDispatch()
  const cart = useSelector(selectCartItems)
  const isCart = cart.some((c) => c.id === product.id)

  const calculatedPrice = Math.round(product.price * 280)

  return (
    <article className="group">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-stone-100 p-4">
        <Link
          to={`/products/${product.id}`}
          aria-label={product.title}
          className="absolute inset-0 flex items-center justify-center p-4"
        >
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <span className="absolute left-3 top-3 rounded-full bg-white/80 px-2.5 py-1 text-xs font-medium text-stone-700 backdrop-blur-sm">
          {product.category}
        </span>
        {isCart ? (
          <button
            onClick={() => dispatch(removeFromCart(product.id))}
            className="cursor-pointer absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-stone-900 text-white transition hover:scale-105 focus-visible:opacity-100 md:opacity-0 md:group-hover:opacity-100"
          >
            <Minus size={18} />
          </button>
        ) : (
          <button
            onClick={() => {
              dispatch(
                toggleCart({
                  id: product.id,
                  name: product.title,
                  category: product.category,
                  price: calculatedPrice,
                  image: product.image,
                  quantity: 1,
                }),
              )
              dispatch(logActivity(`Added ${product.title} to cart`))
            }}
            aria-label={`Add ${product.title} to cart`}
            className="cursor-pointer absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-stone-900 shadow transition hover:scale-105 focus-visible:opacity-100 md:opacity-0 md:group-hover:opacity-100"
          >
            <Plus size={18} />
          </button>
        )}
      </div>
      <div className="mt-3">
        <h3 className="font-display font-semibold text-stone-900 line-clamp-1">
          {product.title}
        </h3>
        <p className="mt-1 font-medium text-stone-900">
          Rs. {calculatedPrice.toLocaleString()}
        </p>
      </div>
    </article>
  )
}

export default ProductCard
