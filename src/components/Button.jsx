import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props
}) {
    return (
        <button 
        type={type}
        className={`px-6 py-2.5 rounded-lg font-semibold ${bgColor} ${textColor} ${className} transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
        {...props}
        >
            {children}
        </button>
    )
}

export default Button
