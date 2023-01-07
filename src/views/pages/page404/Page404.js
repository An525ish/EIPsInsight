import React from 'react'

import { Link } from 'react-router-dom'

const Page404 = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[80vh]">
      <div className="text-[10rem] font-bold">404</div>
      <div className="text-[4rem] text-[#868e96]">Something went</div>
      <div
        className="text-[3rem] font-bold mb-4 tracking-wider"
        style={{ fontFamily: 'Big Shoulders Display' }}
      >
        WRONG!
      </div>
      <div className="flex">
        <Link to="/">
          <div
            className="ml-3 bg-white text-[#1c7ed6] text-[1.3rem] p-2 rounded-[0.6rem] shadow-md tracking-wider"
            style={{ fontFamily: 'Big Shoulders Display' }}
          >
            Go Home
          </div>
        </Link>
        <Link to="/contactUs">
          <div
            className="ml-6 bg-[#e7f5ff] text-[#1c7ed6] text-[1.3rem] p-2 rounded-[0.6rem] shadow-md tracking-wider"
            style={{ fontFamily: 'Big Shoulders Display' }}
          >
            CONTACT US
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Page404
