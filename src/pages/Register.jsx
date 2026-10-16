import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  register,
  selectIsLoggedIn,
  selectUsers,
} from '../features/auth/authSlice'

const field =
  'mt-1.5 h-12 w-full rounded-md border border-stone-300 bg-white px-4 text-sm outline-none transition-colors placeholder:text-stone-400 focus:border-stone-900'

function Register() {
  const users = useSelector(selectUsers)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const [signUpErr, setSignUpErr] = useState({})
  const [emailExistErr, setEmailExistErr] = useState('')
  const [pass, setPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [showPass, setShowPass] = useState(false)

  const signUpValidConfig = {
    name: [
      { required: true, message: 'Enter your full name' },
      { minLength: 3, message: 'At least 3 characters long' },
    ],
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
    confirmPassword: [
      { required: true, message: 'Enter confirm password' },
      { matchWith: 'password', message: 'Password does not match' },
    ],
  }

  const signUpValidate = (SignUpData) => {
    const signUpErrData = {}
    Object.entries(SignUpData).forEach(([key, value]) => {
      signUpValidConfig[key].some((rule) => {
        if (rule.required && !value) {
          signUpErrData[key] = rule.message
          return true
        }
        if (rule.minLength && value.length < rule.minLength) {
          signUpErrData[key] = rule.message
          return true
        }
        if (rule.pattern && !rule.pattern.test(value)) {
          signUpErrData[key] = rule.message
          return true
        }
        if (rule.matchWith && value !== SignUpData[rule.matchWith]) {
          signUpErrData[key] = rule.message
          return true
        }
      })
    })

    setSignUpErr(signUpErrData)
    return signUpErrData
  }

  function handelRegister(e) {
    e.preventDefault()
    const SignUpData = {}
    const formData = new FormData(e.target)
    for (const [key, value] of formData.entries()) {
      SignUpData[key] = value.trim()
    }
    const signUpValidationResult = signUpValidate(SignUpData)
    if (Object.keys(signUpValidationResult).length) return
    const { confirmPassword, ...userData } = SignUpData
    const isExisting = users.some((user) => user.email === SignUpData.email)
    if (!isExisting) {
      dispatch(register(userData))
      e.target.reset()
      setPass('')
      setConfirmPass('')
      navigate('/')
    } else {
      setEmailExistErr('Email Already Registered!')
    }
  }

  if (isLoggedIn) {
    return <Navigate to="/" replace />
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="It takes a minute. No card needed."
      panel="bg-[#ff5b3a]"
      panelText="Save your cart and check out faster."
      footer={
        <>
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-stone-900 underline underline-offset-4"
          >
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handelRegister} className="mt-8 space-y-5">
        <label className="block">
          <span className="text-sm font-medium">Full name</span>
          <input
            onChange={() => {
              setSignUpErr({})
              setEmailExistErr('')
            }}
            type="text"
            placeholder="Your name"
            name="name"
            className={field}
          />
          {signUpErr.name && (
            <p className="mt-1.5 text-xs text-red-600">{signUpErr.name}</p>
          )}
        </label>
        <label className="block">
          <span className="text-sm font-medium">Email</span>
          <input
            onChange={() => {
              setSignUpErr({})
              setEmailExistErr('')
            }}
            type="email"
            placeholder="you@example.com"
            name="email"
            className={field}
          />
          {(signUpErr.email || emailExistErr) && (
            <p className="mt-1.5 text-xs text-red-600">
              {signUpErr.email || emailExistErr}
            </p>
          )}
        </label>
        <label className="block">
          <span className="text-sm font-medium">Password</span>
          <div className="relative">
            <input
              onChange={(e) => {
                setPass(e.target.value)
                setSignUpErr({})
                setEmailExistErr('')
              }}
              value={pass}
              type={showPass ? 'text' : 'password'}
              name="password"
              placeholder="At least 6 characters"
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
          {signUpErr.password && (
            <p className="mt-1.5 text-xs text-red-600">{signUpErr.password}</p>
          )}
        </label>
        <label className="block">
          <span className="text-sm font-medium">Confirm password</span>
          <input
            onChange={(e) => {
              setConfirmPass(e.target.value)
              setSignUpErr({})
              setEmailExistErr('')
            }}
            value={confirmPass}
            type={showPass ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Type it again"
            className={field}
          />
          {signUpErr.confirmPassword && (
            <p className="mt-1.5 text-xs text-red-600">
              {signUpErr.confirmPassword}
            </p>
          )}
        </label>

        <button
          type="submit"
          className="cursor-pointer h-12 w-full rounded-full bg-stone-900 text-sm font-medium text-white transition-colors hover:bg-[#3446f0]"
        >
          Create account
        </button>
      </form>
    </AuthLayout>
  )
}

export default Register
