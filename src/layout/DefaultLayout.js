/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useUserAuth } from 'src/Context/AuthContext'
import back from 'src/assets/back.png'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import useMediaQuery from 'src/scss/useMediaQuery'

const date = new Date()

const DefaultLayout = () => {
  const {
    user,
    click1,
    click2,
    click3,
    setClick1Function,
    setClick2Function,
    setClick3Function,
    setClick4Function,
    setAllEIPsFunction,
  } = useUserAuth()

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const matches = useMediaQuery('(max-width: 767px)')
  const param = useParams()
  const navigate = useNavigate()
  const [par, isPar] = useState()
  const [currentMonthData, setCurrentMonthData] = useState([])

  useEffect(() => {
    isPar(param['*'])

    if (param['*'] === 'typeAll') {
      setClick1Function(true)
      setClick2Function(false)
      setClick3Function(false)
      setClick4Function(false)
    } else if (param['*'] === 'statusAll') {
      setClick2Function(true)
      setClick1Function(false)
      setClick3Function(false)
      setClick4Function(false)
    } else if (param['*'] === 'EIPS') {
      setClick4Function(true)
      setClick1Function(false)
      setClick2Function(false)
      setClick3Function(false)
    } else if (param['*'] === 'december-2022') {
      setClick3Function(true)
      setClick1Function(false)
      setClick2Function(false)
      setClick4Function(false)
    } else {
      setClick1Function(false)
      setClick2Function(false)
      setClick3Function(false)
      setClick4Function(false)
    }
  }, [param['*']])

  const [data, setInfo] = useState()

  return (
    <div>
      <AppSidebar Year={date.getFullYear()} Month={months[date.getMonth()]} />
      <div style={{backgroundColor:"#FAFAFA"}} className="wrapper d-flex flex-column min-vh-100">
        <AppHeader Year={date.getFullYear()} Month={months[date.getMonth()]} />
        <div className="body flex flex-grow-1 px-3">
          {/* {par?.length === 0 || matches ? (
            ''
          ) : (
            <div
              style={{ zIndex: '999', position:'fixed', right:'0'}}
              onClick={() => navigate(-1)}
            >
              <img src={back} alt="back" className="w-[2rem] h-[2rem] max-w-none" />
            </div>
          )} */}
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout