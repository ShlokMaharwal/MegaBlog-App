import React, { useState, useEffect } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Write', slug: '/add-post', active: authStatus },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Sign Up', slug: '/signup', active: !authStatus },
  ]

  const isActive = (slug) => location.pathname === slug

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <Container>
        <nav className='flex items-center justify-between h-16'>
          <Link to='/' className="flex-shrink-0">
            <Logo width='160px' />
          </Link>
          <ul className='hidden md:flex items-center gap-1'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  {item.name === 'Write' ? (
                    <button
                      onClick={() => navigate(item.slug)}
                      className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-2a2 2 0 01.586-1.414z" />
                      </svg>
                      Write
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate(item.slug)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive(item.slug)
                          ? 'text-indigo-600 bg-indigo-50'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      {item.name}
                    </button>
                  )}
                </li>
              ) : null
            )}
            {authStatus && (
              <li className="ml-1">
                <LogoutBtn />
              </li>
            )}
          </ul>
          <button
            className="md:hidden p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </nav>
        {mobileOpen && (
          <div className="md:hidden py-3 border-t border-slate-100">
            <ul className="flex flex-col gap-1">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive(item.slug)
                          ? 'text-indigo-600 bg-indigo-50'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && <li className="px-2 pt-1"><LogoutBtn /></li>}
            </ul>
          </div>
        )}
      </Container>
    </header>
  )
}

export default Header