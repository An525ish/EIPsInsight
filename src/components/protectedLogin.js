/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */

import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUserAuth } from 'src/Context/AuthContext'

const ProtectedLogin = ({ children }) => {
  const { user } = useUserAuth()

  console.log('Check user in Private: ', user)
  if (user) {
    return <Navigate to="/" />
  }
  return children
}

export default ProtectedLogin
