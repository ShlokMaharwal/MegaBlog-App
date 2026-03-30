import React, { useId } from 'react'

function Select({ options, label, className, ...props }, ref) {
  const id = useId()
  return (
    <div className='w-full flex flex-col gap-1.5'>
      {label && (
        <label htmlFor={id} className='text-sm font-medium text-slate-700'>
          {label}
        </label>
      )}
      <div className="relative">
        <select
          {...props}
          id={id}
          ref={ref}
          className={`
            w-full px-4 py-2.5 rounded-lg text-sm appearance-none cursor-pointer
            bg-white border border-slate-300 text-slate-800
            hover:border-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100
            transition-colors duration-150 outline-none
            ${className}
          `}
        >
          {options?.map((option) => (
            <option key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default React.forwardRef(Select)