/* eslint-disable react-hooks/rules-of-hooks */
import { React, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ip } from 'src/constants'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

import { AppSidebarNav } from './AppSidebarNav'

import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import './AppSidebar.css'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cisSpeedometer,
  cidSpeedometer,
  cilStar,
  cilChart,
  cilExpandLeft,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import { Link, useParams } from 'react-router-dom'
import { useUserAuth } from 'src/Context/AuthContext'
import useMediaQuery from 'src/scss/useMediaQuery'
// sidebar nav config
// import navigation from '../_nav'

const AppSidebar = () => {
  const param = useParams()
  const matches = useMediaQuery('(max-width: 767px)')
  const dispatch = useDispatch()
  const {
    click1,
    click2,
    click3,
    click4,
    setClick1Function,
    setClick2Function,
    setClick3Function,
    setClick4Function,
  } = useUserAuth()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const [data, setData] = useState()
  const [navii, setNavii] = useState()
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
  const sorter = (a, b) => {
    if (a.year !== b.year) {
      return a.year - b.year
    } else {
      return months.indexOf(a.name) - months.indexOf(b.name)
    }
  }
  const allData = async () => {
    try {
      const res = await fetch(`${ip}/register`, {
        // method: 'GET',
        // headers: {
        //   Accept: 'application/json',
        //   'Content-Type': 'application',
        // },
        // credentials: 'include',
      })
      const datas = await res.json()

      const yearArr = datas === [] ? [] : [...new Set(datas.map((item) => item.year))]

      let list = []
      const completeList = []
      completeList.push({
        component: CNavItem,
        name: 'Dashboard',
        to: '/',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
        // icon: <FontAwesomeIcon icon={faEnvelope} />,
        badge: {
          color: 'info',
          text: 'NEW',
        },
      })
      // for app version
      if (matches) {
        completeList.push(
          {
            component: CNavItem,
            name: 'Type',
            to: '/typeAll',
            icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
            // icon: <FontAwesomeIcon icon={faEnvelope} />,
          },
          {
            component: CNavItem,
            name: 'Status',
            to: '/statusAll',
            icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
            // icon: <FontAwesomeIcon icon={faEnvelope} />,
          },
        )
      }

      for (let j = 0; j < yearArr.length; j++) {
        list = []
        if (yearArr[j] === '2022') {
          list.push({
            component: CNavItem,
            name: `November`,
            to: `/currentMonth`,
            state: {
              from: `/november`,
              year: 2022,
            },
          })
        }
        for (let i = 0; i < datas.length; i++) {
          if (datas[i].year === yearArr[j]) {
            list.push({
              component: CNavItem,
              name: `${datas[i].name}`,
              to: `/${datas[i].name.toLowerCase()}-${datas[i].year}`,
              state: {
                from: `/${datas[i].name.toLowerCase()}`,
                year: datas[i].year,
              },
            })
          }
        }
        list.sort(sorter)
        list.reverse()
        completeList.push({
          component: CNavGroup,
          name: `${yearArr[j]}`,
          to: '/base',
          icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
          items: list,
        })
      }

      const _nav = completeList
      setData(_nav)

      if (!res.status === 200) {
        const error = new Error(res.error)
        throw error
      }
    } catch (err) {}
  }

  useEffect(() => {
    allData()
    if (param['*'] === 'autoCharts' || param['*'] === '') {
      console.log('hello')
      setClick1Function(false)
      setClick2Function(false)
      setClick3Function(false)
      setClick4Function(false)
      console.log(click4)
    }
  }, [])

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
      style={{ backgroundColor: '#000000' }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div className="logoDesign"></div>
        </Link>
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={data} d={data} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default AppSidebar
