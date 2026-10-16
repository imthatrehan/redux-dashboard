import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'
import { useState } from 'react'
import { login, selectIsLoggedIn, selectUsers } from '../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'

const field =
  'mt-1.5 h-12 w-full rounded-md border border-stone-300 bg-white px-4 text-sm outline-none transition-colors placeholder:text-stone-400 focus:border-stone-900'

function Login() {
  const dispatch = useDispatch()
  const users = useSelector(selectUsers)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)
  const [emailNotExistErr, setEmailNotExistErr] = useState('')
  const [incorrectPassErr, setIncorrectPassErr] = useState('')
  const [signInErr, setSignInErr] = useState({})
  
  const signInValidConfig = {
    email: [
      { required: true, message: 'Enter your email' },
      {
        pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        message: 'Enter a valid email',
      },
    ],
    password: [
      { required: true, message: 'Enter your password' },
      {
        pattern: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
        message: 'Enter a strong password',
      },
    ],
  }

  const signInValidate = (SignInData) => {
    const signInErrData = {}
    Object.entries(SignInData).forEach(([key, value]) => {
      signInValidConfig[key].some((rule) => {
        if (rule.required && !value) {
          signInErrData[key] = rule.message
          return true
        }
        if (rule.pattern && !rule.pattern.test(value)) {
          signInErrData[key] = rule.message
          return true
        }
      })
    })

    setSignInErr(signInErrData)
    return signInErrData
  }
  const handleLogIn = (e) => {
    e.preventDefault()
    const SignInData = {}
    const formData = new FormData(e.target)
    for (const [key, value] of formData.entries()) {
      SignInData[key] = value.trim()
    }

    const signInValidationResult = signInValidate(SignInData)
    if (Object.keys(signInValidationResult).length) return

    const matchedUser = users.find((user) => user.email === SignInData.email)

    if (matchedUser) {
      if (matchedUser.password === SignInData.password) {
        dispatch(login(matchedUser))
        e.target.reset()
        navigate('/')
      } else {
        setIncorrectPassErr('Incorrect password!')
      }
    } else {
      setEmailNotExistErr("Email doesn't exist. Try using another or signup")
    }
  }

  if (isLoggedIn) {
    return <Navigate to="/" replace />
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to see your cart and check out."
      panel="bg-[#3446f0]"
      panelText="Pick up where you left off."
      footer={
        <>
          New to Haat?{' '}
          <Link
            to="/register"
            className="font-medium text-stone-900 underline underline-offset-4"
          >
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleLogIn} className="mt-8 space-y-5">
        <label className="block">
          <span className="text-sm font-medium">Email</span>
          <input
            onChange={() => {
              setSignInErr({})
              setEmailNotExistErr('')
              setIncorrectPassErr('')
            }}
            type="email"
            name="email"
            placeholder="you@example.com"
            className={field}
          />
          {(signInErr.email || emailNotExistErr) && (
            <p className="mt-1.5 text-xs text-red-600">
              {signInErr.email || emailNotExistErr}
            </p>
          )}
        </label>

        <label className="block">
          <span className="text-sm font-medium">Password</span>
          <div className="relative">
            <input
              onChange={() => {
                setSignInErr({})
                setEmailNotExistErr('')
                setIncorrectPassErr('')
              }}
              name="password"
              type={showPass ? 'text' : 'password'}
              placeholder="Your password"
              className={`${field} pr-12`}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              aria-label={showPass ? 'Hide password' : 'Show password'}
              className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-900"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {(signInErr.password || incorrectPassErr) && (
            <p className="mt-1.5 text-xs text-red-600">
              {signInErr.password || incorrectPassErr}
            </p>
          )}
        </label>
        <button
          type="submit"
          className="cursor-pointer h-12 w-full rounded-full bg-stone-900 text-sm font-medium text-white transition-colors hover:bg-[#3446f0]"
        >
          Sign in
        </button>
      </form>
    </AuthLayout>
  )
}

export default Login
