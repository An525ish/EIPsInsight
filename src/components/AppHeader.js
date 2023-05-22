/* eslint-disable react/prop-types */
import Dropdown from 'react-multilevel-dropdown'
import React, { useEffect, useState, useRef } from 'react'
import { Link, NavLink, useParams, useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import { cilBell, cilSpeedometer, cilStar, cilChart } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { v4 as uuid } from 'uuid'
import { AppBreadcrumb } from './index'
import { ip } from 'src/constants'
import logo from 'src/assets/logo3.gif'
import logoAndroid from 'src/assets/logo3.gif'
import discordIcon from 'src/assets/discord.svg'
import githubIcon from 'src/assets/github.svg'
import emailIcon from 'src/assets/email.png'
import backbtn from 'src/assets/back-btn.png'
import './AppHeader.styles.css'
import { useUserAuth } from 'src/Context/AuthContext'
import useMediaQuery from 'src/scss/useMediaQuery'
const AppHeaderDropdown = React.lazy(() => import('./header/AppHeaderDropdown'))

const date = new Date()

const AppHeader = (props) => {
  //state defines
  const [changeIcon, setChangeIcon] = useState(0)
  const [data, setData] = useState()
  const [pastData, setPastData] = useState()
  const [pastYears, setPastYears] = useState([])
  const [routeDashboard, setRouteDashboard] = useState()
  const [routesPastYears, setRoutesPastYears] = useState()

  const yearref = useRef(null)
  const monthref = useRef(null)

  const resources = {
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
  }

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

  const {
    imageOpen,
    user,
    click1,
    click2,
    click3,
    click4,
    setClick1Function,
    setClick2Function,
    setClick3Function,
    setClick4Function,
    allEIPs,
    setAllEIPsFunction,
  } = useUserAuth()
  const param = useParams()

  const matches = useMediaQuery('(max-width: 767px)')

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const [eips, setEips] = useState([])
  const [par, isPar] = useState()
  const [data2, setData2] = useState([])

  const factorOutDuplicate = (data) => {
    data.shift()
    for (let i = 0; i < data.length; i++) {
      if (Object.keys(data[i]).length !== 0) {
        for (let j = i + 1; j < data.length; j++) {
          if (Object.keys(data[j]).length !== 0 && data[j].eip === data[i].eip) {
            data[j] = {}
          }
        }
      }
    }

    let res = data.filter((el) => {
      if (Object.keys(el).length !== 0) {
        return true
      }

      return false
    })

    return res
  }

  const API4 = `${ip}/getAll`
  const fetchAllData = async (ignore) => {
    const data = await fetch(API4)
    const post = await data.json()

    if (!ignore) {
      setEips(factorOutDuplicate(Object.values(post[0])))
    }
  }

  const asyncFetch = () => {
    fetch('https://eipsinsight.com/api/overallData')
      .then((response) => response.json())
      .then((json) => setData2(json))
      .catch((error) => {
        console.log('fetch data failed', error)
      })
  }

  const changeIconSet = () => {
    if (!sidebarShow) {
      setChangeIcon(0)
    } else {
      setChangeIcon(1)
    }
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

  //years data
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
      return ele !== props.Year && !isNaN(ele) && ele >= 2018
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
    fetchAllData()
    fetchPastMonthData()
    asyncFetch()
  }, [])

  const navigate = useNavigate()

  function location(path) {
    window.location.href = `${path}`
  }

  return (
    <CHeader
      position="sticky"
      className={`navbar-container ${changeIcon ? 'margin-close' : 'margin-open'}`}
    >
      <CContainer fluid>
        <CHeaderToggler
          onClick={() => {
            dispatch({ type: 'set', sidebarShow: !sidebarShow })
            changeIconSet()
          }}
          className="md:hidden"
        >
          <svg
            className="svg-file"
            onClick={() => changeIconSet()}
            xmlns="http://www.w3.org/2000/svg"
          >
            {changeIcon ? (
              <path d="M6 36v-3h26v3Zm33.9-2.6-9.45-9.45 9.4-9.4L42 16.7l-7.25 7.25 7.3 7.3ZM6 25.4v-3h20v3ZM6 15v-3h26v3Z" />
            ) : (
              <path d="M6 36v-3h36v3Zm0-10.5v-3h36v3ZM6 15v-3h36v3Z" />
            )}
          </svg>
        </CHeaderToggler>
        <CHeaderBrand className="">
          <Link to="/">
            <img
              src={matches ? logoAndroid : logo}
              // height={48}
              alt="Logo"
              style={{ width: '8rem', height: '4rem' }}
            />
          </Link>
        </CHeaderBrand>

        <CHeaderNav className="d-none d-md-flex m-auto items-center">
          <CNavItem
            className={`navbar-items ${
              click4 ? 'border-b-[4px] border-b-[#1c7ed6] rounded-b-[4px]' : ''
            }`}
          >
            <Link
              to="/EIPS"
              style={{ textDecoration: 'none', color: 'inherit' }}
              className="hover:text-black"
            >
              <CNavLink to="/EIPS" component={NavLink}>
                All{' '}
                <label className="relative cursor-pointer">
                  <div
                    className=" h-7
            shadow-md font-extrabold rounded-[0.3rem] bg-[#e7f5ff] text-[#1c7ed6] text-[14px] inline-block p-[4px] drop-shadow-sm cursor-pointer"
                  >
                    EIPs
                  </div>
                  <div className="absolute top-0 right-0 -mr-1 -mt-1 w-2 h-2"></div>
                  <div className="absolute top-0 right-0 -mr-0 -mt-1   w-2 h-2 text-[10px] text-[#1c7ed6] font-extrabold">
                    {/* {eips.length-1} */}
                    {data2.Standard_Track + data2.Meta + data2.Informational}
                  </div>
                </label>
              </CNavLink>
            </Link>
          </CNavItem>
          <CNavItem
            className={`navbar-items ${
              click1 ? 'border-b-[4px] border-b-[#1c7ed6] rounded-b-[4px]' : ''
            }`}
          >
            <CNavLink to="/typeAll" component={NavLink}>
              Type
              {/* {totalEIPs()} */}
            </CNavLink>
          </CNavItem>
          <CNavItem
            className={`navbar-items ${
              click2 ? 'border-b-[4px] border-b-[#1c7ed6] rounded-b-[4px]' : ''
            }`}
          >
            <CNavLink to="/statusAll" component={NavLink}>
              Status
              {/* {totalEIPs()} */}
            </CNavLink>
          </CNavItem>
          <CNavItem
            className={`navbar-items ${
              props.Month.toLowerCase() === param['*'].split('-')[0]
                ? 'border-b-[4px] border-b-[#1c7ed6] rounded-b-[4px]'
                : ''
            }`}
          >
            <div style={{ position: 'relative' }}>
              <div className="dropdown-container">
                <Dropdown
                  style={{
                    opacity: '0',
                    padding: '10px',
                    margin: '0px',
                  }}
                  className="navbar-items"
                  position="right"
                  buttonVariant="tertiary"
                  title={`Dropdownsection`}
                >
                  {routesPastYears === undefined
                    ? ''
                    : routesPastYears.map((route) => {
                        return (
                          <Dropdown.Item key={route.id}>
                            {route.name}
                            <Dropdown.Submenu position="right">
                              {route.subRoutes.map((subRoute) => {
                                let maylink = 'https://hackmd.io/@poojaranjan/EIPsInsightMay2023'
                                return  (
                                  subRoute.path === '/may-2023' ? (
                                    <a key={subRoute.id} href='https://hackmd.io/@poojaranjan/EIPsInsightMay2023'>
                                      <Dropdown.Item onClick={() => location(maylink)}>
                                        {subRoute.name}</Dropdown.Item>
                                    </a>
                                  ) :
                                  <Link key={subRoute.id} to={subRoute.path}>
                                    <Dropdown.Item>{subRoute.name}</Dropdown.Item>
                                  </Link>
                                )
                              })}
                            </Dropdown.Submenu>
                          </Dropdown.Item>
                        )
                      })}
                </Dropdown>
              </div>
              <div>
                <CNavLink href="/">
                  Insight{' '}
                  <label className="relative cursor-pointer">
                    <div
                      className=" h-7
            shadow-md font-extrabold rounded-[0.3rem] bg-[#e7f5ff] text-[#1c7ed6] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer"
                    >
                      {props.Month}{' '}
                      <label className="text-[10px] cursor-pointer">{props.Year}</label>
                    </div>
                    <div className="absolute top-0 right-0 -mr-1 -mt-0 w-2 h-2 rounded-full bg-[#339af0] animate-ping"></div>
                    <div className="absolute top-0 right-0 -mr-1 -mt-0 w-2 h-2 rounded-full bg-[#339af0]"></div>
                  </label>
                </CNavLink>
              </div>
            </div>
          </CNavItem>
          <CNavItem
            className={`${click2 ? 'border-b-[4px] border-b-[#1c7ed6] rounded-b-[4px]' : ''}`}
          >
            <CNavLink to="/" component={NavLink}>
              <Dropdown
                style={{ color: '#2c384aae' }}
                className="navbar-items"
                position="right"
                buttonVariant="tertiary"
                title={`Resources`}
              >
                {resources.subRoutes.map((resource) => {
                  const link = resource.path
                  return ( 
                    <a key={resource.id} href={resource.path}>
                      <Dropdown.Item onClick={() => location(link)}>{resource.name}</Dropdown.Item>
                    </a>
                    )
                })}
              </Dropdown>
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          {user === null ? null : user.email === 'contact@etherworld.co' ? (
            <CNavItem>
              <CNavLink href="/insertForm">
                <label className="relative cursor-pointer">
                  <label
                    className="h-7
            shadow-2xl font-extrabold rounded-[8px] bg-[#e7f5ff] text-[#1c7ed6] text-[15px] inline-block p-[4px] drop-shadow-sm cursor-pointer"
                  >
                    form
                  </label>
                  <div className="absolute top-0 left-0 -mr-1 -mt-0 w-2 h-2 rounded-full bg-[#339af0] animate-ping"></div>
                  <div className="absolute top-0 left-0 -mr-1 -mt-0 w-2 h-2 rounded-full bg-[#339af0]"></div>
                </label>
              </CNavLink>
            </CNavItem>
          ) : null}
          <CNavItem>
            <CNavLink href="#">
              <a
                href="https://github.com/Avarch-org/EIPsInsight/tree/main"
                target="_blank"
                rel="noreferrer"
                className="githubIcon"
              >
                <img className="nav-social" src={githubIcon} alt="github Icon" />
              </a>
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <a
                href="https://discord.com/channels/916850601919393832/975355006322606130/986317048068051035"
                target="_blank"
                rel="noreferrer"
                className="discordIcon"
              >
                <img className="nav-social" src={discordIcon} alt="Discord Icon" />
              </a>
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <Link to="/contactUs" style={{ textDecoration: 'none', color: 'inherit' }}>
                <img className="nav-social" loading="lazy" src={emailIcon} alt="Email Icon" />
              </Link>
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          {imageOpen === 'enable' ? (
            <AppHeaderDropdown />
          ) : (
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <div className="loginButton1 github1">Login</div>
            </Link>
          )}
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
        {par?.length === 0 || matches ? (
          ''
        ) : (
          <div className="flex justify-center items-center">
            {/* <div
              style={{
                width: 0,
                height: 0,
                borderLeft: '10px solid transparent',
                borderRight: '10px solid transparent',
                borderBottom: '20px solid #339af0',
              }}
              className="rotate-[270deg]"
            ></div> */}
            <div
              style={{
                zIndex: '999',
                cursor: 'pointer',
                color: '#339af0',
                padding: '2px 10px',
                backgroundColor: '#e7f5ff',
              }}
              className="cursor-pointer px-3 py-2 flex justify-center items-center animateButton rounded-[0.4rem]"
              onClick={() => navigate(-1)}
            >
              <div className="">
                <img className="backbtn" loading="lazy" src={backbtn} alt="Back Icon" />
              </div>
            </div>
          </div>
        )}
        {/* <motion.div
          className="bg-[#e7f5ff] text-[#1c7ed6] font-[900] pl-10 pr-10"
          initial={{ opacity: 0, scale: 0.5 }}
          cx={500}
          animate={{
            opacity: 1,

            x: [0, 0],
            y: [0, 500],
          }}
          transition={{
            type: 'spring',
            duration: 5,
            // times: [0, 0.4, 0.5, 0.9, 1],
            // delay: 2,
            ease: 'easeOut',
            repeat: 'Infinity',
          }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1 }}
        >
          EIPs: 538
        </motion.div> */}
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
