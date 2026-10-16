# 🛒 Haat — Redux Toolkit E-commerce + Admin Dashboard

A full-featured e-commerce app with an admin dashboard, built with **React (Vite)**, **Redux Toolkit**, **React Router**, and **Tailwind CSS**. Includes product CRUD, cart management, user management, activity logging, and localStorage persistence.

![Status](https://img.shields.io/badge/Status-Completed-success)
![Day](https://img.shields.io/badge/12--Week--Roadmap-Day%207-blue)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2-764ABC?logo=redux)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=react-router)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-38B2AC?logo=tailwind-css)

---

## 🌟 Features

### Storefront
- **Home** — Hero, featured products, category browser
- **Products** — Search, filter by category, sort by price
- **Product Detail** — Dynamic route, quantity selector, related products
- **Cart** — Add/remove, quantity +/-, total, empty state
- **Checkout** — Protected route, address form, payment options
- **Login/Register** — Config-driven validation, persisted auth
- **404** — Branded not-found page

### Admin Dashboard
- **Dashboard** — Stat cards (products, cart, users), category distribution, activity feed
- **Products** — Table view, CRUD (add/edit/delete), search, filter, sort
- **Users** — Table view, search, slide-in detail drawer
- **Sidebar** — Navigation with active state
- **Activity Log** — Auto-logged events (product added/edited/deleted, cart changes)

### Core Features
- **Redux Toolkit** — 5 slices: cart, auth, products, users, activity
- **createAsyncThunk** — API fetching with `condition` to prevent duplicate calls
- **Selectors** — Derived state (cartTotal, cartCount, isInCart, isLoggedIn)
- **Persistence** — Store subscribe pattern to localStorage
- **Admin Routes** — Separate route tree with dedicated layout
- **Protected Routes** — Checkout requires login
- **Loading/Error States** — Pending, fulfilled, rejected handled
- **Responsive** — Mobile-first, admin sidebar collapses

---

## 🧠 Redux Toolkit Concepts Practiced

| Concept | Where Used |
|---------|------------|
| **configureStore** | `app/store.js` — 5 reducers combined |
| **createSlice** | 5 slices (cart, auth, products, users, activity) |
| **Reducers** | toggleCart, addProduct, updateProduct, deleteProduct, login, register, logout |
| **createAsyncThunk** | fetchProductsData, fetchUsers |
| **extraReducers** | pending, fulfilled, rejected states |
| **condition** | Skip fetch if already loaded |
| **useSelector** | Every component that reads state |
| **useDispatch** | Every component that dispatches actions |
| **Selectors** | selectCartTotal, selectCartCount, selectIsInCart, selectIsLoggedIn |
| **Store Subscribe** | Manual persistence to localStorage |
| **Immer** | Direct state mutation in reducers |

---

## 🧠 Other Concepts Practiced

| Concept | Where Used |
|---------|------------|
| **React Router** | Nested routes, dynamic routes, admin layout |
| **Context → Redux Migration** | Auth and Cart moved from Context to Redux |
| **Custom Hooks** | `useLocalStorage` for store initialization |
| **Form Validation** | Config-driven rules in Login/Register |
| **CRUD Operations** | Products: add, edit, delete |
| **Modal Patterns** | Form modal, delete confirmation modal |
| **Drawer Pattern** | User details slide-in panel |
| **Skeleton Loading** | Products and users tables |
| **Relative Time** | formatTimeAgo utility |
| **Event Logging** | Custom activity slice |
| **Multi-Slice Architecture** | 5 slices with clear responsibilities |

---

## 🛠️ Tech Stack

- **Framework:** React 19 (Vite)
- **State:** Redux Toolkit + React Redux
- **Routing:** React Router 7
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Fonts:** Bricolage Grotesque + Instrument Sans (Google Fonts)
- **API:** FakeStoreAPI (products, users)
- **Persistence:** localStorage (manual store subscribe)

---

## 📂 Project Structure
redux-dashboard/
├── src/
│ ├── App.jsx # Routes (store + admin)
│ ├── App.css # Global styles + animations
│ ├── index.css # Tailwind imports
│ ├── main.jsx # Provider + BrowserRouter
│ ├── app/
│ │ ├── store.js # configureStore + subscribe
│ │ └── storage.js # loadState utility
│ ├── features/
│ │ ├── activity/
│ │ │ └── activitySlice.js # Event log (max 10)
│ │ ├── auth/
│ │ │ └── authSlice.js # Users, currentUser, login/register/logout
│ │ ├── cart/
│ │ │ └── cartSlice.js # Cart items, totals, qty
│ │ ├── products/
│ │ │ └── productsSlice.js # Async fetch + CRUD
│ │ └── users/
│ │ └── usersSlice.js # Async fetch from API
│ ├── components/
│ │ ├── AuthLayout.jsx # Login/Register shared layout
│ │ ├── Footer.jsx
│ │ ├── Layout.jsx # Store layout (Navbar + Outlet + Footer)
│ │ ├── Navbar.jsx
│ │ ├── ProductCard.jsx
│ │ └── admin/
│ │ ├── AdminLayout.jsx # Admin shell (sidebar + outlet)
│ │ ├── ProductFormModal.jsx # Add/edit product
│ │ ├── Sidebar.jsx # Admin navigation
│ │ └── StatCard.jsx # Dashboard stat card
│ └── pages/
│ ├── Home.jsx
│ ├── Products.jsx
│ ├── ProductDetail.jsx
│ ├── Cart.jsx
│ ├── Checkout.jsx
│ ├── Login.jsx
│ ├── Register.jsx
│ ├── NotFound.jsx
│ └── admin/
│ ├── Dashboard.jsx # Stats + activity
│ ├── AdminProducts.jsx # Product CRUD table
│ └── AdminUsers.jsx # Users table + drawer
├── index.html
├── package.json
└── vite.config.js

---

## 🎨 Design Highlights

- **Brand:** `Haat.` — a small store for everyday things
- **Store:** Stone palette + `#3446f0` accent, editorial layout
- **Admin:** Dark sidebar (`stone-900`) + light content area
- **StatCards:** Colored tones (blue, yellow, green, pink)
- **Product Images:** Real images from FakeStoreAPI
- **Price Conversion:** USD → PKR (× 280)
- **Animations:**
  - `page-enter` — fade-in on route change
  - `card-rise` — staggered product grid
  - `badge-pop` — cart count pulse
  - `row-exit` — cart item removal
- **Responsive:** Mobile menu, admin sidebar drawer

---

## 🚀 How to Run

# Clone
git clone (https://github.com/imthatrehan/redux-dashboard.git)
cd redux-dashboard

# Install
npm install

# Dev server
npm run dev

# Build
npm run build
Open http://localhost:5173

Redux DevTools: Install the Chrome extension to inspect actions and state changes.# redux-dashboard
