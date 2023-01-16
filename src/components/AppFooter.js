import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="bg-gradient-to-r from-[#f8f9fa] to-[#d0ebff] rounded-sm border-none shadow-lg">
      <div className="ms-auto flex justify-center items-center">
        <div className="flex">
          <span className="me-1 text-[#74c0fc] font-bold tracking-wider"> Made with</span>{' '}
          <div>❤️ </div>
          <span className="me-1 ml-1 text-[#74c0fc] font-bold tracking-wider">by </span>
        </div>
        <a
          href="https://Avarch.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1c7ed6]  font-bold tracking-wider ml-1 bg-white px-2 shadow-md rounded-[0.3rem]"
        >
          Avarch.org
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
