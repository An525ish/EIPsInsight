/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion'
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
import CIcon from '@coreui/icons-react'
import { cibDiscord, cibGithub, cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import logo from 'src/assets/logo2.gif'
import logoAndroid from 'src/assets/logo3.gif'
import leftIcon from 'src/assets/left.svg'
import rightIcon from 'src/assets/right.svg'
import midIcon from 'src/assets/mid.png'
import discordIcon from 'src/assets/discord.svg'
import githubIcon from 'src/assets/github.svg'
import emailIcon from 'src/assets/email.png'
import { ReactComponent as left } from 'src/assets/brand/left.svg'
import './AppHeader.styles.css'
import { useUserAuth } from 'src/Context/AuthContext'
import { ip } from 'src/constants'
import { ResponsiveStream } from 'nivo/lib/components/charts/stream'
import useMediaQuery from 'src/scss/useMediaQuery'

import back from 'src/assets/back.png'

const AppHeader = (props) => {
  const [changeIcon, setChangeIcon] = useState(0)
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

  const [data, setData] = useState()
  const [years, setYears] = useState()
  const [par, isPar] = useState()

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

  const APII = 'https://eipsinsight.com/api/typePage'
  const fetchPost = () => {
    fetch(APII)
      .then((res) => res.json())
      .then((res) => {
        setData(res)
      })
  }

  const [post, getPost] = useState()
  const APIII = 'https://eipsinsight.com/api/statusPage'
  const fetchPostI = () => {
    fetch(APIII)
      .then((res) => res.json())
      .then((res) => {
        getPost(res)
      })
  }

  const getStandardAttribute = (post, name) => {
    return post.length === 0
      ? 0
      : post['Final']['Standard_Track'] === undefined
      ? 0
      : post['Final']['Standard_Track'][name] +
        post['Draft']['Standard_Track'][name] +
        post['Review']['Standard_Track'][name] +
        post['Last_Call']['Standard_Track'][name] +
        post['Stagnant']['Standard_Track'][name] +
        post['Withdrawn']['Standard_Track'][name] +
        post['Living']['Standard_Track'][name]
  }

  const fetchTableDataExtra = (data, name, status) => {
    const keys = Object.keys(data)
    let res = 0
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] === status) {
        res = data[keys[i]][name]
      }
    }

    return res
  }
  const totalEIPs = () => {
    const total =
      getStandardAttribute(post === undefined ? [] : post, 'Core') +
      getStandardAttribute(post === undefined ? [] : post, 'ERC') +
      getStandardAttribute(post === undefined ? [] : post, 'Networking') +
      getStandardAttribute(post === undefined ? [] : post, 'Interface') +
      fetchTableDataExtra(post === undefined ? [] : post, 'Meta', 'Living') +
      fetchTableDataExtra(post === undefined ? [] : post, 'Meta', 'Final') +
      fetchTableDataExtra(post === undefined ? [] : post, 'Meta', 'Withdrawn') +
      fetchTableDataExtra(post === undefined ? [] : post, 'Meta', 'Draft') +
      fetchTableDataExtra(post === undefined ? [] : post, 'Meta', 'Review') +
      fetchTableDataExtra(post === undefined ? [] : post, 'Meta', 'Last_Call') +
      fetchTableDataExtra(post === undefined ? [] : post, 'Meta', 'Stagnant') +
      fetchTableDataExtra(post === undefined ? [] : post, 'Informational', 'Living') +
      fetchTableDataExtra(post === undefined ? [] : post, 'Informational', 'Final') +
      fetchTableDataExtra(post === undefined ? [] : post, 'Informational', 'Withdrawn') +
      fetchTableDataExtra(post === undefined ? [] : post, 'Informational', 'Draft') +
      fetchTableDataExtra(post === undefined ? [] : post, 'Informational', 'Review') +
      fetchTableDataExtra(post === undefined ? [] : post, 'Informational', 'Last_Call') +
      fetchTableDataExtra(post === undefined ? [] : post, 'Informational', 'Stagnant')
    setAllEIPsFunction(total)
    return total
  }

  const getMonth = (d) => {
    if (d.length !== 0) {
      d.sort(sorter)
      d.reverse()

      return d[0].name.toLowerCase()
    }
  }

  const getYear = (d) => {
    if (d.length !== 0) {
      d.sort(sorter)
      d.reverse()

      return d[0].year
    }
  }

  const changeIconSet = () => {
    if (!sidebarShow) {
      setChangeIcon(0)
    } else {
      setChangeIcon(1)
    }
  }

  useEffect(() => {
    fetchPost()
    fetchPostI()
  }, [])

  const navigate = useNavigate()

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
        <CHeaderBrand className="mx-auto d-md-none">
          <img
            src={matches ? logoAndroid : logo}
            height={48}
            alt="Logo"
            style={{ width: '87px', height: '100%' }}
          />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem
            className={`navbar-items ${
              click4 ? 'border-b-[4px] border-b-[#1c7ed6] rounded-b-[4px]' : ''
            }`}
          >
            <CNavLink style={{ padding: '0px' }} to="/EIPS" component={NavLink}>
              All EIPs
              {/* {totalEIPs()} */}
            </CNavLink>
          </CNavItem>
          <CNavItem
            className={`navbar-items ${
              click1 ? 'border-b-[4px] border-b-[#1c7ed6] rounded-b-[4px]' : ''
            }`}
          >
            <CNavLink style={{ padding: '0px' }} to="/typeAll" component={NavLink}>
              Type
              {/* {totalEIPs()} */}
            </CNavLink>
          </CNavItem>
          <CNavItem
            className={`navbar-items ${
              click2 ? 'border-b-[4px] border-b-[#1c7ed6] rounded-b-[4px]' : ''
            }`}
          >
            <CNavLink style={{ padding: '0px' }} to="/statusAll" component={NavLink}>
              Status
              {/* {totalEIPs()} */}
            </CNavLink>
          </CNavItem>
          <CNavItem
            className={`navbar-items ${
              click3 ? 'border-b-[4px] border-b-[#1c7ed6] rounded-b-[4px]' : ''
            }`}
          >
            <Link
              to={`/${props.Month.toLowerCase()}-${props.Year}`}
              state={{
                from: `/october`,
                year: 2022,
              }}
            >
              <CNavLink style={{ padding: '0px' }} href="/Insight">
                Insight{' '}
                <label className="relative cursor-pointer">
                  <div
                    className=" h-7
            shadow-md font-extrabold rounded-[0.3rem] bg-[#e7f5ff] text-[#1c7ed6] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer"
                  >
                    {props.Month} <label className="text-[10px] cursor-pointer">{props.Year}</label>
                  </div>
                  <div className="absolute top-0 right-0 -mr-1 -mt-0 w-2 h-2 rounded-full bg-[#339af0] animate-ping"></div>
                  <div className="absolute top-0 right-0 -mr-1 -mt-0 w-2 h-2 rounded-full bg-[#339af0]"></div>
                </label>
              </CNavLink>
            </Link>
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
                <img className="nav-social" src={emailIcon} alt="Email Icon" />
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
          <div
            style={{ zIndex: '999', position: 'fixed', right: '0' }}
            onClick={() => navigate(-1)}
          >
            <img src={back} alt="back" className="w-[2rem] h-[2rem] max-w-none" />
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
