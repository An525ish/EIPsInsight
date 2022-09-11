/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory'
import { useLocation } from 'react-router-dom'
import { useUserAuth } from 'src/Context/AuthContext'

import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

const DefaultLayout = () => {
  const { user } = useUserAuth()
  console.log(user)
  const [data, setInfo] = useState()

  console.log(data)

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
