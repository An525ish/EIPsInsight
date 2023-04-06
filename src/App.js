import React, { Component, Suspense } from 'react'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './redux/store'

import ProtectedLogin from './components/protectedLogin'
import ProtectedRoute from './components/ProtectedRoutes'
import { UserAuthContextProvider } from './Context/AuthContext'
import './scss/style.scss'
import Dashboard from './views/dashboard/Dashboard'
import ForgotPassword from './views/pages/ForgotPassword/ForgotPassword'
import MForm from './views/pages/ManualForm/mForm'
import MForm2 from './views/pages/ManualForm/mForm2'
import ResetPassword from './views/pages/ResetPassword/resetPassword'
import { useUserAuth } from 'src/Context/AuthContext'
import ProtectedRouteAdmin from './components/ProtectedRouteAdmin.js'
import EIPs from './views/charts/EIPs'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <Provider store={store}>
          <UserAuthContextProvider>
            <Routes>
              <Route
                exact
                path="/login"
                name="Login Page"
                element={
                  <ProtectedLogin>
                    <Login />
                  </ProtectedLogin>
                }
              />
              <Route exact path="/register" name="Register Page" element={<Register />} />
              <Route
                exact
                path="/forgotPassword"
                name="Forgot Password"
                element={<ForgotPassword />}
              />
              <Route exact path="/resetPassword" name="Reset Password" element={<ResetPassword />} />
              <Route exact path="/404" name="Page 404" element={<Page404 />} />
              <Route exact path="/500" name="Page 500" element={<Page500 />} />
              {/* <Route path="*" name="Home" element={<DefaultLayout />} /> */}
              <Route exact path="*" name="Home" element={<DefaultLayout />} />

              {/* <Route path="/insertForm" name="Form" element={<MForm />} />
            <Route path="/updateForm" name="Update Form" element={<MForm2 />} /> */}
              {/* route for each EIP */}
              {/* <Route path="/EIPS/:EIPid" element={<EIPs />} /> */}
            </Routes>
          </UserAuthContextProvider>
        </Provider>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
