import React from 'react'

function Button({
  children,
  type = 'button',
  bgColor,
  textColor,
  className = '',
  variant = 'primary',
  ...props
}) {
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
    secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50',
    danger: 'bg-white text-red-600 border border-red-200 hover:bg-red-50',
    success: 'bg-white text-emerald-600 border border-emerald-200 hover:bg-emerald-50',
    ghost: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
  }

  const style = bgColor || textColor
    ? `${bgColor || ''} ${textColor || 'text-white'}`
    : variants[variant] || variants.primary

  return (
    <button
      type={type}
      className={`
        inline-flex items-center justify-center gap-2
        px-5 py-2.5 rounded-lg text-sm font-semibold
        transition-colors duration-150
        disabled:opacity-40 disabled:cursor-not-allowed
        ${style}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
