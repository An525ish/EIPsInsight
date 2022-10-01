/* eslint-disable prettier/prettier */
import React, { useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import GitHubButton from 'react-github-button'
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
  CToastHeader,
  CToastClose,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

import { GoogleButton } from 'react-google-button'
import { useUserAuth } from 'src/Context/AuthContext'
function useQuery() {
  return new URLSearchParams(useLocation().search)
}
const ResetPassword = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [password, setPassword] = useState('')
  const query = useQuery()

  const navigate = useNavigate()
  const {
    user,
    logIn,
    googleSignIn,
    setImageFunction,
    setImageFunction1,
    githubSignIn,
    forgotPassword,
    ResetPassword,
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
    try {
      await ResetPassword(query.get('oobCode'), password)
      addToast(exampleToast(`Password has been reset Successfully!!!`, '#12b886'))
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
                    <h1 style={{ color: '#0c2461' }}>Reset Password</h1>

                    <p className="text-medium password-word">Password</p>

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

                    <CButton
                      color="primary"
                      style={{
                        marginTop: '0.5rem',
                        width: '100%',
                        backgroundColor: '#0c2461',
                      }}
                      type="submit"
                    >
                      Reset Password
                    </CButton>
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

export default ResetPassword
