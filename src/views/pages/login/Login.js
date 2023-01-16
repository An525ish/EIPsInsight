/* eslint-disable prettier/prettier */
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Github from '../../../assets/images/github.png'
import Google from '../../../assets/images/google.png'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CToast,
  CToastBody,
  CToaster,
  CToastClose,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import './login.styles.css'
import { useUserAuth } from 'src/Context/AuthContext'
import useMediaQuery from 'src/scss/useMediaQuery'
const Login = () => {
  const matches = useMediaQuery('(max-width: 767px)')

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const {
    user,
    logIn,
    googleSignIn,
    setImageFunction,
    setImageFunction1,
    githubSignIn,
  } = useUserAuth()

  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const exampleToast = (txt, color) => (
    <CToast
      autohide={false}
      visible={true}
      className="text-white align-items-center"
      style={{ backgroundColor: color }}
    >
      <div className="d-flex">
        <CToastBody>{txt}</CToastBody>
        <CToastClose className="me-2 m-auto" white />
      </div>
    </CToast>
  )

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')
    try {
      await logIn(email, password)
      await setImageFunction1()
      navigate('/')
    } catch (err) {
      setError(err.message)
      addToast(exampleToast(err.message, '#fa5252'))
    }
  }

  const handleImage = async () => {
    try {
      await setImageFunction()
    } catch (err) {
      addToast(exampleToast(err.message, '#fa5252'))
    }
  }

  const handleSignInWithGoogle = async (e) => {
    e.preventDefault()
    try {
      await googleSignIn()
      await setImageFunction1()
      navigate('/')
    } catch (err) {
      addToast(exampleToast(err.message, '#fa5252'))
    }
  }
  const handleSignInWithGithub = async (e) => {
    e.preventDefault()
    try {
      await githubSignIn()
      await setImageFunction1()
      navigate('/')
    } catch (err) {
      addToast(exampleToast(err.message, '#fa5252'))
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CToaster ref={toaster} push={toast} placement="top-end" />
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1 style={{ color: '#0c2461' }} className="text-[30px] font-black mb-4">
                      Sign in
                    </h1>
                    <p className="text-medium">Email</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </CInputGroup>
                    <div className="password-section">
                      <p className="text-medium password-word">Password</p>
                      <Link to="/forgotPassword" style={{ color: '#0c2461' }}>
                        <div className="px-0 ml-2">Forgot password?</div>
                      </Link>
                    </div>

                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </CInputGroup>
                    <CRow style={{ marginBottom: '1rem' }}>
                      <CCol xs={6}>
                        <CButton
                          color="primary"
                          className="px-4"
                          style={{ backgroundColor: '#0c2461' }}
                          type="submit"
                        >
                          Sign In
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        {/* <CButton color="link" className="px-0 ml-2">
                          Forgot password?
                        </CButton> */}
                        <Link to="/register">
                          <CButton
                            color="primary"
                            className="mt-0"
                            style={{
                              width: `${matches ? '100%' : 'auto'}`,
                              marginLeft: '-3rem',
                              backgroundColor: '#e5dbff',
                              borderColor: '#e5dbff',
                              color: '#5f3dc4',
                            }}
                            active
                          >
                            Need an account? Sign up here
                          </CButton>
                        </Link>
                      </CCol>
                    </CRow>

                    <div className="extraButton flex">
                      <div className="loginButton google" onClick={handleSignInWithGoogle}>
                        <img src={Google} alt="" className="icon1" />
                        Google
                      </div>
                      {/* <GoogleButton onClick={handleSignInWithGoogle} /> */}
                      <div className="loginButton github" onClick={handleSignInWithGithub}>
                        <img src={Github} alt="" className="icon1" />
                        Github
                      </div>
                    </div>
                    <Link to="/">
                      <CButton
                        color="primary"
                        style={{
                          marginTop: '0.5rem',
                          width: '100%',
                          backgroundColor: '#0c2461',
                        }}
                        onClick={handleImage}
                        active
                      >
                        Sign In as Guest User
                      </CButton>
                    </Link>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
