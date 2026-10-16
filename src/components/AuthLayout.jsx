import { Link } from 'react-router-dom'

function AuthLayout({ title, subtitle, panel, panelText, footer, children }) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-8 md:py-16">
      <div className="grid overflow-hidden rounded-lg border border-stone-200 lg:min-h-155 lg:grid-cols-2">
        <div
          className={`hidden flex-col justify-between p-12 text-white lg:flex ${panel}`}
        >
          <Link
            to="/"
            className="font-display text-2xl font-semibold tracking-tight"
          >
            Haat.
          </Link>
          <p className="font-display text-5xl font-semibold leading-[1.05] tracking-tight">
            {panelText}
          </p>
        </div>

        <div className="flex flex-col justify-center p-8 sm:p-12">
          <h1 className="font-display text-4xl font-semibold tracking-tight">
            {title}
          </h1>
          <p className="mt-2 text-stone-500">{subtitle}</p>
          {children}
          <p className="mt-8 text-sm text-stone-500">{footer}</p>
        </div>
      </div>
    </section>
  )
}

export default AuthLayout
