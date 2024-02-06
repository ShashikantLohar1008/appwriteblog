import React, { Children } from 'react'

function Button({
    children,
    type='button',
    bgColor='bg-blue-600',
    textColor='text-white',
    className='',
    ...props

} ) {
    
  return (
    <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}{...props}>
        {/* children ====kuch nahi bas button text hai */}
        {children}
    </button>
  )
}

export default Button
