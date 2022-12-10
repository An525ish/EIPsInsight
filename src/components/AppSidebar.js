/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/rules-of-hooks */
import { React, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SidebarMenu from './SidebarMenu'
import { AnimatePresence, motion, Variants } from 'framer-motion'
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
import { Link, NavLink, useParams } from 'react-router-dom'
import { useUserAuth } from 'src/Context/AuthContext'
import useMediaQuery from 'src/scss/useMediaQuery'
import { object } from 'prop-types'
import SidebarMenuYear from './sideBarMenuYear'

// sidebar nav config
// import navigation from '../_nav'
const date = new Date()
const routes = [
  {
    path: '/resources',
    name: 'Resources',
    icon: cilSpeedometer,

    exact: true,
    subRoutes: [
      {
        path: 'https://youtu.be/AyidVR6X6J8',
        name: 'EIPs & Standardization Process',
      },
      {
        path: 'https://medium.com/ethereum-cat-herders/shedding-light-on-the-ethereum-network-upgrade-process-4c6186ed442c',
        name: 'Ethereum Network Upgrade Process',
      },
      {
        path: 'https://youtu.be/fwxkbUaa92w',
        name: 'EIP-20: Token Standard',
      },
    ],
  },
]

const AppSidebar = (props) => {
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

  const [isOpen, setIsOpen] = useState(false)
  const [mainOpen, setMainOpen] = useState(false)
  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  }

  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const [data, setData] = useState()
  const [navii, setNavii] = useState()
  const [routeDashboard, setRouteDashboard] = useState()
  const [routesPastYears, setRoutesPastYears] = useState()
  const [pastData, setPastData] = useState()
  const [pastYears, setPastYears] = useState([])
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
    return months.indexOf(a.name) - months.indexOf(b.name)
  }
  const fetchAllYears = (data) => {
    let years = []
    data.forEach((element) => {
      if (element['created'] !== undefined) {
        if (!years.includes(parseInt(element['created'].substring(0, 4)))) {
          years.push(parseInt(element.created.substring(0, 4)))
        }
      }
    })
    return years
  }

  const fetchPastMonthData = async () => {
    const response = await fetch(`${ip}/getAll`)
    let data = await response.json()
    data = Object.values(data[0])
    data.shift()

    console.log(data)
    setPastData(data)

    // fetchAllYears
    let allYears = fetchAllYears(data).sort()
    allYears.shift()
    allYears.shift()
    allYears.reverse()
    console.log({ allYears })
    setPastYears(allYears)

    //
    let routes = []
    let routes1 = []

    const completeList = []
    routes1.push({
      path: '/',
      name: 'Dashboard',
      icon: cilSpeedometer,
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

    // past years
    for (let j = 0; j < allYears.length; j++) {
      const objYear = {}

      objYear.path = `/${allYears[j]}`
      objYear.name = allYears[j]
      objYear.icon = cilChart

      objYear.exact = true
      objYear.subRoutes = []

      if (allYears[j] === 2022) {
        objYear.subRoutes.push({
          path: `/${props.Month.toLowerCase()}-${props.Year}`,
          name: `${props.Month}`,
        })

        let lastIndex = date.getMonth()

        for (let i = lastIndex - 1; i >= 0; i--) {
          objYear.subRoutes.push({
            path: `/${months[i].toLowerCase()}-${allYears[j]}`,
            name: `${months[i]}`,
          })
        }
      } else {
        if (allYears[j] === 2021) {
          for (let i = 11; i >= 7; i--) {
            objYear.subRoutes.push({
              path: `/${months[i].toLowerCase()}-${allYears[j]}`,
              name: `${months[i]}`,
            })
          }
          for (let i = 6; i >= 0; i--) {
            objYear.subRoutes.push({
              path: `/old-${months[i].toLowerCase()}-${allYears[j]}`,
              name: `${months[i]}`,
            })
          }
        } else {
          for (let i = 11; i >= 0; i--) {
            objYear.subRoutes.push({
              path: `/old-${months[i].toLowerCase()}-${allYears[j]}`,
              name: `${months[i]}`,
            })
          }
        }
      }

      console.log({ objYear })
      routes.push(objYear)
    }
    console.log({ routes })

    const _nav = completeList
    setData(_nav)
    setRouteDashboard(routes1)
    setRoutesPastYears(routes)

    if (!response.status === 200) {
      const error = new Error(response.error)
      throw error
    }
  }

  useEffect(() => {
    fetchPastMonthData()

    if (param['*'] === 'autoCharts' || param['*'] === '') {
      console.log('hello')
      setClick1Function(false)
      setClick2Function(false)
      setClick3Function(false)
      setClick4Function(false)
      console.log(click4)
    }
    console.log({ param })
  }, [])

  // const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: '140px',
      padding: '5px 15px',
      transition: {
        duration: 0.2,
      },
    },
  }

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: 'auto',
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
      style={{ backgroundColor: '#000000' }}
      className="scrollbarDesign"
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div className="logoDesign"></div>
        </Link>
      </CSidebarBrand>
      <CSidebarNav className="scrollbarDesign z-20">
        {/* <SimpleBar>
          <AppSidebarNav items={data} d={data} />
        </SimpleBar> */}
        <motion.div>
          <section className="flex flex-col gap-[6px]">
            {routeDashboard === undefined
              ? ''
              : routeDashboard.map((route, index) => {
                  if (route.subRoutes) {
                    return (
                      <SidebarMenuYear
                        setIsOpen={setIsOpen}
                        route={route}
                        showAnimation={showAnimation}
                        isOpen={isOpen}
                      />
                    )
                  }

                  return (
                    <motion.div
                      key={index}
                      className={`flex p-2 pl-4 items-center w-full 
                      ${param['*'] === '' ? 'border-b-[#339af0] border-b-2 ' : ''}
                         ${
                           param['*'] !== '' ? ' hover:border-b-[#abd5bd] hover:border-b-2' : ' '
                         } rounded-[13px] cursor-pointer `}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setMainOpen(true)}
                    >
                      <CIcon
                        icon={cilSpeedometer}
                        style={{ color: `${param['*'] === '' ? '#339af0' : '#adb5bd'}` }}
                        customClassName="nav-icon"
                      />
                      <NavLink to={route.path} key={index} activeClassName="active">
                        <AnimatePresence>
                          (
                          <motion.div
                            variants={showAnimation}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            className={`text-[17px] ${
                              param['*'] === '' ? 'text-[#339af0]' : 'text-[#adb5bd]'
                            }  pr-16`}
                          >
                            {route.name}
                          </motion.div>
                          )
                        </AnimatePresence>
                      </NavLink>
                    </motion.div>
                  )
                })}
          </section>
        </motion.div>
        <motion.div>
          <section className="flex flex-col gap-[6px] mb-1">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                )
              }

              return (
                <div key={index}>
                  <CIcon
                    icon={cilSpeedometer}
                    style={{ color: `${isOpen ? '#339af0' : '#adb5bd'}` }}
                    customClassName="nav-icon"
                  />
                  {/* <NavLink to={route.path} key={index}>
                    <AnimatePresence>
                      (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className={`text-[17px] ${
                          isOpen ? 'text-[#339af0]' : 'text-[#adb5bd]'
                        } pr-16`}
                      >
                        {route.name}
                      </motion.div>
                      )
                    </AnimatePresence>
                  </NavLink> */}
                </div>
              )
            })}
          </section>
        </motion.div>
        <motion.div>
          <section className="flex flex-col gap-[6px]">
            {routesPastYears === undefined
              ? ''
              : routesPastYears.map((route, index) => {
                  if (route.subRoutes) {
                    return (
                      <SidebarMenuYear
                        setIsOpen={setIsOpen}
                        route={route}
                        showAnimation={showAnimation}
                        isOpen={isOpen}
                      />
                    )
                  }

                  return (
                    <motion.div
                      key={index}
                      className={`flex p-2 pl-4 items-center w-full 
                      ${param['*'] === '' ? 'border-b-[#339af0] border-b-2 ' : ''}
                         ${
                           param['*'] !== '' ? ' hover:border-b-[#abd5bd] hover:border-b-2' : ' '
                         } rounded-[13px] cursor-pointer `}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setMainOpen(true)}
                    >
                      <CIcon
                        icon={cilSpeedometer}
                        style={{ color: `${param['*'] === '' ? '#339af0' : '#adb5bd'}` }}
                        customClassName="nav-icon"
                      />
                      <NavLink to={route.path} key={index} activeClassName="active">
                        <AnimatePresence>
                          (
                          <motion.div
                            variants={showAnimation}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            className={`text-[17px] ${
                              param['*'] === '' ? 'text-[#339af0]' : 'text-[#adb5bd]'
                            }  pr-16`}
                          >
                            {route.name}
                          </motion.div>
                          )
                        </AnimatePresence>
                      </NavLink>
                    </motion.div>
                  )
                })}
          </section>
        </motion.div>
      </CSidebarNav>
      {/* <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      /> */}
    </CSidebar>
  )
}

export default AppSidebar
