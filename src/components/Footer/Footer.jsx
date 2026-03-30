import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  const currentYear = new Date().getFullYear()

  const links = {
    Platform: [
      { label: 'Home', to: '/' },
      { label: 'All Posts', to: '/all-posts' },
      { label: 'Write a Post', to: '/add-post' },
    ],
    Support: [
      { label: 'Help Center', to: '/' },
      { label: 'Contact Us', to: '/' },
      { label: 'Customer Support', to: '/' },
    ],
    Legal: [
      { label: 'Terms & Conditions', to: '/' },
      { label: 'Privacy Policy', to: '/' },
      { label: 'Licensing', to: '/' },
    ],
  }

  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-10">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link to="/" className="w-fit">
              <Logo width="160px" />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              A modern blogging platform for creators and thinkers. Write beautiful posts, share your ideas with the world.
            </p>
          </div>
          {Object.entries(links).map(([title, items]) => (
            <div key={title} className="flex flex-col gap-4">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400">{title}</h3>
              <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link to={item.to} className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-400 text-xs">© {currentYear} MegaBlog. All Rights Reserved.</p>
          <p className="text-slate-400 text-xs flex items-center gap-1">
            Built with <span className="text-red-400">♥</span> using React & Appwrite
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer