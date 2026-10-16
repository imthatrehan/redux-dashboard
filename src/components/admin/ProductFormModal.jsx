import { X } from 'lucide-react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addProduct, updateProduct } from '../../features/products/productsSlice'
import { logActivity } from '../../features/activity/activitySlice'

const field =
  'mt-1.5 h-11 w-full rounded-md border border-stone-300 bg-white px-3.5 text-sm outline-none transition-colors placeholder:text-stone-400 focus:border-stone-900'

function ProductFormModal({ product, onClose }) {
  const dispatch = useDispatch()
  const isEditing = Boolean(product)

  const [title, setTitle] = useState(product?.title || '')
  const [price, setPrice] = useState(product ? (product.price / 280).toFixed(2) : '')
  const [category, setCategory] = useState(product?.category || "electronics")
  const [image, setImage] = useState(product?.image || '')
  const [description, setDescription] = useState(product?.description || '')
  const [titleError, setTitleError] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) {
      setTitleError(true)
      return
    }

    const productData = {
      id: isEditing ? product.id : Date.now(),
      title: title.trim(),
      price: parseFloat(price) || 0,
      category,
      image: image.trim() || 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png',
      description: description.trim(),
      rating: product?.rating || { rate: 4.0, count: 10 },
    }

    if (isEditing) {
      dispatch(updateProduct(productData))
      dispatch(logActivity(`Edited product "${title.trim()}"`))
    } else {
      dispatch(addProduct(productData))
      dispatch(logActivity(`Added product "${title.trim()}"`))
    }

    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              {isEditing ? 'Edit product' : 'Add product'}
            </h2>
            <p className="mt-1 text-sm text-stone-500">
              Fill in the details below.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-full text-stone-500 hover:bg-stone-100"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm font-medium">Title</span>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                if (e.target.value.trim()) setTitleError(false)
              }}
              className={field}
            />
            <p className={`mt-1.5 text-xs text-red-600 ${titleError ? 'block' : 'hidden'}`}>
              Enter a product title.
            </p>
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium">Price ($)</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={field}
                required
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Category</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={field}
              >
                <option value="electronics">electronics</option>
                <option value="jewelery">jewelery</option>
                <option value="men's clothing">men's clothing</option>
                <option value="women's clothing">women's clothing</option>
              </select>
            </label>
          </div>
          <label className="block">
            <span className="text-sm font-medium">Image URL</span>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://"
              className={field}
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium">Description</span>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1.5 w-full resize-none rounded-md border border-stone-300 bg-white px-3.5 py-3 text-sm outline-none transition-colors focus:border-stone-900"
            />
          </label>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-full border border-stone-300 px-6 py-3 text-sm font-medium hover:border-stone-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#3446f0]"
            >
              Save product
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductFormModal