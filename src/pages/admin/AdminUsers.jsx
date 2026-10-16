import { Mail, MapPin, Phone, Search, SearchX, X } from 'lucide-react'
import {
  fetchUsers,
  getAllUsers,
  getUsersLoadingState,
} from '../../features/users/usersSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

function AdminUsers() {
  const dispatch = useDispatch()
  const users = useSelector(getAllUsers)
  const loading = useSelector(getUsersLoadingState)
  
  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  
  const filteredUsers = users.filter((u) => {
    const fullName = `${u.name.firstname} ${u.name.lastname}`.toLowerCase()
    const email = u.email.toLowerCase()
    const query = searchQuery.toLowerCase()
    return fullName.includes(query) || email.includes(query)
  })
  return (
    <>
      <h1 className="font-display text-4xl font-semibold tracking-tight">
        Users
      </h1>
      <p className="mt-2 text-stone-500">{users.length} users</p>

      <div className="relative mt-8 sm:max-w-xs">
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
        />
        <input
          onChange={(e) => {
            setSearchQuery(e.target.value)
          }}
          value={searchQuery}
          type="text"
          placeholder="Search by name or email"
          className="h-11 w-full rounded-md border border-stone-300 bg-white pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-stone-400 focus:border-stone-900"
        />
      </div>
      <div className="mt-6 overflow-x-auto rounded-lg border border-stone-200 bg-white">
        <table className="w-full min-w-180 text-left text-sm">
          <thead className="border-b border-stone-200 text-xs text-stone-500">
            <tr>
              <th className="px-5 py-3.5 font-medium">Name</th>
              <th className="px-5 py-3.5 font-medium">Username</th>
              <th className="px-5 py-3.5 font-medium">Email</th>
              <th className="px-5 py-3.5 font-medium">City</th>
              <th className="px-5 py-3.5 text-right font-medium">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {!loading && filteredUsers.length > 0 && filteredUsers.map((u) => (
              <tr key={u.id} className="transition-colors hover:bg-stone-50">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold uppercase ${u.tone}`}
                    >
                      {u.name.firstname[0]}
                      {u.name.lastname[0]}
                    </span>
                    <span className="font-medium capitalize">
                      {u.name.firstname} {u.name.lastname}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4 text-stone-600">{u.username}</td>
                <td className="px-5 py-4 text-stone-600">{u.email}</td>
                <td className="px-5 py-4 capitalize text-stone-600">
                  {u.address.city}
                </td>
                <td className="px-5 py-4 text-right">
                  <button onClick={() => setSelectedUser(u)} className="cursor-pointer rounded-full border border-stone-300 px-4 py-1.5 text-xs font-medium transition-colors hover:border-stone-900 hover:bg-stone-900 hover:text-white">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {loading && (
        <div className="mt-6 divide-y divide-stone-100 rounded-lg border border-stone-200 bg-white">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex animate-pulse items-center gap-4 p-5">
              <div className="h-9 w-9 rounded-full bg-stone-100" />
              <div className="flex-1 space-y-2">
                <div className="h-3.5 w-1/3 rounded bg-stone-100" />
                <div className="h-3 w-1/5 rounded bg-stone-100" />
              </div>
            </div>
          ))}
        </div>
      )}
      {!loading && filteredUsers.length === 0 && (
        <div className="flex flex-col items-start py-20">
          <SearchX size={36} strokeWidth={1.4} className="text-stone-400" />
          <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight">
            No users found
          </h2>
          <p className="mt-2 text-stone-500">Try a different name or email.</p>
        </div>
      )}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50">
          <aside className="h-full w-full max-w-md overflow-y-auto bg-white p-6 sm:p-8">
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedUser(null)}
                aria-label="Close"
                className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-full text-stone-500 hover:bg-stone-100"
              >
                <X size={18} />
              </button>
            </div>

            <span className="mt-2 flex h-20 w-20 items-center justify-center rounded-full bg-[#3446f0] font-display text-2xl font-semibold uppercase text-white">
              {selectedUser.name.firstname[0]}
              {selectedUser.name.lastname[0]}
            </span>
            <h2 className="mt-5 font-display text-3xl font-semibold capitalize tracking-tight">
              {selectedUser.name.firstname} {selectedUser.name.lastname}
            </h2>
            <p className="mt-1 text-stone-500">@{selectedUser.username}</p>

            <dl className="mt-8 space-y-6 border-t border-stone-200 pt-8 text-sm">
              <div className="flex gap-4">
                <Mail size={18} strokeWidth={1.6} className="mt-0.5 shrink-0 text-stone-400" />
                <div>
                  <dt className="text-stone-500">Email</dt>
                  <dd className="mt-0.5 font-medium">{selectedUser.email}</dd>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone size={18} strokeWidth={1.6} className="mt-0.5 shrink-0 text-stone-400" />
                <div>
                  <dt className="text-stone-500">Phone</dt>
                  <dd className="mt-0.5 font-medium">{selectedUser.phone}</dd>
                </div>
              </div>
              <div className="flex gap-4">
                <MapPin size={18} strokeWidth={1.6} className="mt-0.5 shrink-0 text-stone-400" />
                <div>
                  <dt className="text-stone-500">Address</dt>
                  <dd className="mt-0.5 font-medium capitalize">
                    {selectedUser.address.number} {selectedUser.address.street}, {selectedUser.address.city}
                    <br />
                    {selectedUser.address.zipcode}
                  </dd>
                </div>
              </div>
            </dl>
          </aside>
        </div>
      )}
    </>
  )
}

export default AdminUsers
