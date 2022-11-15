/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useUserAuth } from 'src/Context/AuthContext'
import back from 'src/assets/back.png'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import useMediaQuery from 'src/scss/useMediaQuery'

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

  const matches = useMediaQuery('(max-width: 767px)')
  const param = useParams()
  const navigate = useNavigate()
  const [par, isPar] = useState()
  const [post, getPost] = useState()
  const API = 'https://eipsinsight.com/api/statusPage'
  const fetchPost = () => {
    fetch(API)
      .then((res) => res.json())
      .then((res) => {
        getPost(res)
      })
  }

  useEffect(() => {
    isPar(param['*'])
    fetchPost()
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
    } else if (param['*'] === 'currentMonth') {
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

  console.log({ par })
  const [data, setInfo] = useState()

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex flex-grow-1 px-3">
          {par?.length === 0 || matches ? (
            ''
          ) : (
            <div
              className="fixed rounded-[15px] flex flex-col justify-center items-center bg-[#e7f5ff] text-[#1c7ed6] text-[3rem] w-[3rem] h-[12rem] mt-[15rem] px-[2rem] py-3 border-[#1c7ed6] border-[1.5px] drop-shadow-sm cursor-pointer shadow-[#1c7ed6] ease-in-out shadow-lg transition hover:scale-95 motion-reduce:transition delay-100 motion-reduce:focus:scale-95 animate-pulse"
              onClick={() => navigate(-1)}
              style={{ zIndex: 999 }}
            >
              <img src={back} alt="back" className="w-[2rem] h-[2rem] max-w-none" />
            </div>
          )}
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
