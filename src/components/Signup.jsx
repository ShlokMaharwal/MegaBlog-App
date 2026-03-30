import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

  const create = async (data) => {
    setError("")
    try {
      const userData = await authService.createAccount(data)
      if (userData) {
        const currentUser = await authService.getCurrentUser()
        if (currentUser) dispatch(login({ userData: currentUser }))
        navigate("/")
      }
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-slate-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <div className="flex justify-center mb-7">
            <Logo width='150px' />
          </div>
          <div className="text-center mb-7">
            <h1 className="text-2xl font-bold text-slate-900 mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Create your account
            </h1>
            <p className="text-slate-500 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>
          {error && (
            <div className="mb-5 px-4 py-3 rounded-lg bg-red-50 border border-red-200 flex items-start gap-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          <form onSubmit={handleSubmit(create)} className="flex flex-col gap-4">
            <Input
              label="Full Name"
              placeholder="John Doe"
              error={errors.name?.message}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }
              {...register("name", { required: "Full name is required" })}
            />
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              }
              {...register("email", {
                required: "Email is required",
                validate: { matchPattern: (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "Enter a valid email" },
              })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="At least 8 characters"
              hint="Use a mix of letters, numbers, and symbols"
              error={errors.password?.message}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              }
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Minimum 8 characters" },
              })}
            />
            <Button type="submit" className="w-full py-3 mt-1 text-base" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center gap-2 justify-center">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Creating account…
                </span>
              ) : 'Create Account'}
            </Button>
          </form>
        </div>
        <p className="text-center text-slate-400 text-xs mt-5">
          By signing up, you agree to our{' '}
          <Link to="/" className="hover:text-slate-600">Terms</Link> &{' '}
          <Link to="/" className="hover:text-slate-600">Privacy Policy</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup