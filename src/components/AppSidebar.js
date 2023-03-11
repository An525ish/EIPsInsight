/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/rules-of-hooks */
import { React, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SidebarMenu from './SidebarMenu'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { ip } from 'src/constants'

import { CSidebar, CSidebarBrand, CSidebarNav } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { sygnet } from 'src/assets/brand/sygnet'
import eiplogo from '../assets/logo3.gif'

import 'simplebar/dist/simplebar.min.css'
import './AppSidebar.css'

import {
  cilBell,
  cilSpeedometer,
  cilStar,
  cilChart,
} from '@coreui/icons'
import { CNavItem} from '@coreui/react'
import { Link, NavLink, useParams } from 'react-router-dom'
import { useUserAuth } from 'src/Context/AuthContext'
import useMediaQuery from 'src/scss/useMediaQuery'
import SidebarMenuYear from './sideBarMenuYear'
import { v4 as uuid } from 'uuid'

// sidebar nav config
// import navigation from '../_nav'
const date = new Date()
const routes = [
  {
    path: '/resources',
    name: 'Resources',
    icon: cilSpeedometer,
    id: uuid(),
    exact: true,
    subRoutes: [
      {
        path: 'https://youtu.be/AyidVR6X6J8',
        name: 'EIPs & Standardization Process',
        focus: false,
        id: uuid(),
      },
      {
        path: 'https://medium.com/ethereum-cat-herders/shedding-light-on-the-ethereum-network-upgrade-process-4c6186ed442c',
        name: 'Ethereum Network Upgrade Process',
        focus: false,
        id: uuid(),
      },
      {
        path: 'https://youtu.be/fwxkbUaa92w',
        name: 'EIP-20: Token Standard',
        focus: false,
        id: uuid(),
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
        if (!years.includes(parseInt(element['created'].trim().substring(0, 4)))) {
          years.push(parseInt(element.created.trim().substring(0, 4)))
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

    setPastData(data)

    // fetchAllYears
    let allYears = fetchAllYears(data).sort()
    allYears.shift()
    allYears.shift()
    allYears.reverse()

    setPastYears(allYears)

    //
    let routes = []
    let routes1 = []

    const completeList = []
    routes1.push({
      path: '/',
      name: 'Dashboard',
      icon: cilSpeedometer,
      id: uuid(),
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

    // currentMonth Data
    const currentMonthsObjects = {}
    currentMonthsObjects.path = `/${props.Year}`
    currentMonthsObjects.name = props.Year
    currentMonthsObjects.icon = cilChart
    currentMonthsObjects.id = uuid()
    currentMonthsObjects.exact = true
    currentMonthsObjects.subRoutes = []

    currentMonthsObjects.subRoutes.push({
      path: `/${props.Month.toLowerCase()}-${props.Year}`,
      name: `${props.Month}`,
      focus: false,
      id: uuid(),
    })

    let lastCurrentIndex = date.getMonth()

    for (let i = lastCurrentIndex - 1; i >= 0; i--) {
      currentMonthsObjects.subRoutes.push({
        path: `/${months[i].toLowerCase()}-${props.Year}`,
        name: `${months[i]}`,
        focus: false,
        id: uuid(),
      })
    }

    routes.push(currentMonthsObjects)

    // only years after 2018...we can change this later.
    allYears = allYears.filter((ele) => {
      return ele !== props.Year && !isNaN(ele) && ele >= 2015
    })

    // past years
    for (let j = 0; j < allYears.length; j++) {
      const objYear = {}

      objYear.path = `/${allYears[j]}`
      objYear.name = allYears[j]
      objYear.icon = cilChart
      objYear.id = uuid()
      objYear.exact = true
      objYear.subRoutes = []

      for (let i = 11; i >= 0; i--) {
        objYear.subRoutes.push({
          path: `/${months[i].toLowerCase()}-${allYears[j]}`,
          name: `${months[i]}`,
          id: uuid(),
        })
      }

      routes.push(objYear)
    }

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
      setClick1Function(false)
      setClick2Function(false)
      setClick3Function(false)
      setClick4Function(false)
    }
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
      style={{ backgroundColor: '#ffff' }}
      className="scrollbarDesign"
    >
      <CSidebarBrand style={{ backgroundColor: 'white' }} to="/">
        <Link to="/" style={{ textDecoration: 'none' }}>
          {/* <video controls='' autoPlay loop muted>
            <source src={eiplogo} />
          </video> */}
          <img src={eiplogo}/>
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
                        allRoutes={routeDashboard}
                      />
                    )
                  }

                  return (
                    <motion.div
                      key={index}
                      className={`flex p-2 pl-4 items-center w-full 
                      ${param['*'] === '' ? 'border-black border-r-4 ' : ''}
                         ${
                           param['*'] !== '' ? ' hover:border-r-[#c4c5c5] hover:border-r-4' : ' '
                         } py-3 transition-all ease-in-out cursor-pointer `}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setMainOpen(true)}
                    >
                      <CIcon
                        icon={cilSpeedometer}
                        style={{ color: `${param['*'] === '' ? 'black' : '#adb5bd'}` }}
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
                              param['*'] === '' ? 'text-black ' : 'text-[#adb5bd]'
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
          <section className="flex flex-col gap-[6px]">
            {routeDashboard === undefined
              ? ''
              : routes.map((route, index) => {
                  if (route.subRoutes) {
                    return (
                      <SidebarMenu
                        setIsOpen={setIsOpen}
                        route={route}
                        showAnimation={showAnimation}
                        isOpen={isOpen}
                        allRoutes={routes}
                      />
                    )
                  }

                  return (
                    <motion.div
                      key={index}
                      className="flex p-2 pl-4 items-center w-full hover:text-[#00000] rounded-[13px] cursor-pointer"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setMainOpen(true)}
                    >
                      <CIcon
                        icon={cilSpeedometer}
                        style={{ color: 'black' }}
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
                            className="text-[17px] text-[#000000] pr-16"
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
    </CSidebar>
  )
}

export default AppSidebar
