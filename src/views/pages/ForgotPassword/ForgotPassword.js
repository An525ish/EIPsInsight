/* eslint-disable prettier/prettier */
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
import { cilUser } from '@coreui/icons'
import './login.styles.css'
import { useUserAuth } from 'src/Context/AuthContext'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  const {
    forgotPassword,
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
      addToast(
        exampleToast(`An email is sent to ${email} for password reset instructions.`, '#12b886'),
      )
      await forgotPassword(email)
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
                    <h1 style={{ color: '#0c2461' }}>Forgot Password</h1>
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

                    <CButton
                      color="primary"
                      style={{
                        marginTop: '0.5rem',
                        width: '100%',
                        backgroundColor: '#0c2461',
                      }}
                      type="submit"
                    >
                      Submit
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

export default ForgotPassword
