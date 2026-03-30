import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import { login, logout } from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) dispatch(login({ userData }))
        else dispatch(logout())
      })
      .finally(() => setLoading(false))
  }, [dispatch])

  return !loading ? (
    <div className='min-h-screen flex flex-col bg-slate-50'>
      <Header />
      <main className='flex-1'>
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-indigo-200 border-t-indigo-500 rounded-full animate-spin" />
        <p className="text-slate-400 text-sm">Loading MegaBlog…</p>
      </div>
    </div>
  )
}

export default App
