// tone: rang + text ka rang, jaise 'bg-[#3446f0] text-white'
function StatCard({ title, value, icon: Icon, tone }) {
  return (
    <div
      className={`flex min-h-40 flex-col justify-between rounded-lg p-5 ${tone}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm opacity-80">{title}</span>
        <Icon size={20} strokeWidth={1.6} className="opacity-70" />
      </div>
      <p className="font-display text-4xl font-semibold leading-none tracking-tight sm:text-5xl">
        {value}
      </p>
    </div>
  )
}

export default StatCard
