import React from 'react'

function Logo({ width = '100px' }) {
  return (
    <div className="flex items-center gap-2.5" style={{ width }}>
      <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
        M
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-extrabold text-slate-800 text-base tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Mega<span className="text-indigo-600">Blog</span>
        </span>
        <span className="text-slate-400 text-[9px] tracking-widest uppercase font-medium">Platform</span>
      </div>
    </div>
  )
}

export default Logo