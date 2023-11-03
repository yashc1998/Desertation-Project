import React from 'react'

const LoadingSpinner = ({isLoading}) => {
  return (
    <div className={`grid h-screen place-items-center ${isLoading === false && 'hidden'}`}>
        <div className={`border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600`} />
    </div>
  )
}

export default LoadingSpinner