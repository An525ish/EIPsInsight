/* eslint-disable react/prop-types */
import React from 'react'
import { Route, Redirect, Navigate } from 'react-router-dom'
import { useUserAuth } from 'src/Context/AuthContext'
const ProtectedRoute = ({ children }) => {
  const { adminLogin, user } = useUserAuth()

  if (user.email !== 'contact@etherworld.co') {
    return <Navigate to="/" />
  }

  return children
}

export default ProtectedRoute
