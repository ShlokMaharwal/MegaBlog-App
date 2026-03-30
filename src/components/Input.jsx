import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
  label,
  type = "text",
  className = "",
  hint,
  error,
  icon,
  ...props
}, ref) {
  const id = useId()

  return (
    <div className='w-full flex flex-col gap-1.5'>
      {label && (
        <label className='text-sm font-medium text-slate-700' htmlFor={id}>
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={`
            w-full px-4 py-2.5 rounded-lg text-sm
            bg-white border text-slate-800
            placeholder-slate-400
            transition-colors duration-150 outline-none
            ${error
              ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
              : 'border-slate-300 hover:border-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
            }
            ${icon ? 'pl-10' : ''}
            ${className}
          `}
          ref={ref}
          id={id}
          {...props}
        />
      </div>
      {hint && !error && <p className="text-xs text-slate-400">{hint}</p>}
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
})

export default Input