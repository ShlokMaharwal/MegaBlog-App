import { useState,useEffect } from 'react'
import  {useDispatch} from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import {login,logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(()=> setLoading(false))
  },[dispatch])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-lg font-semibold text-white">Loading...</p>
    </div>
  </div>
)
}

export default App
