/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { Link, NavLink, useParams } from 'react-router-dom'
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
  CTooltip,
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

const AppHeader = () => {
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
  } = useUserAuth()
  const param = useParams()

  const matches = useMediaQuery('(max-width: 767px)')

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const [data, setData] = useState()
  const [years, setYears] = useState()

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

  const clickTab = (e) => {
    setClick1Function(true)
    setClick2Function(false)
    setClick3Function(false)
    setClick4Function(false)
  }
  const clickTab1 = (e) => {
    setClick1Function(false)
    setClick2Function(true)
    setClick3Function(false)
    setClick4Function(false)
  }
  const clickTab2 = (e) => {
    setClick1Function(false)
    setClick2Function(false)
    setClick3Function(true)
    setClick4Function(false)
  }
  const clickTab4 = (e) => {
    setClick1Function(false)
    setClick2Function(false)
    setClick3Function(false)
    setClick4Function(true)
  }

  const resetClick = () => {
    setClick1Function(false)
    setClick2Function(false)
    setClick3Function(false)
    setClick4Function(false)
  }

  useEffect(() => {
    fetchPost()
    if (param['*'] === 'typeAll') {
      clickTab()
    } else if (param['*'] === 'statusAll') {
      clickTab1()
    } else if (param['*'] === 'autoCharts') {
      clickTab2()
    } else if (param['*'] === '' || param['*'] === 'autoCharts') {
      resetClick()
    }
  }, [])

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1  flex items-center justify-center"
          onClick={() => {
            dispatch({ type: 'set', sidebarShow: !sidebarShow })
            changeIconSet()
          }}
        >
          <img
            src={changeIcon ? (matches ? midIcon : rightIcon) : matches ? midIcon : leftIcon}
            alt=""
            onClick={() => changeIconSet()}
            className={`${changeIcon && 'rotate-[360deg]'} `}
          />
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
            className={`headerSection ${
              click4 ? 'border-b-[4px] border-b-[#1c7ed6] rounded-b-[4px]' : ''
            }`}
          >
            <Link
              to="/EIPS"
              style={{ textDecoration: 'none', color: 'inherit' }}
              className="hover:text-black"
              onClick={clickTab4}
            >
              <CNavLink to="/EIPS" component={NavLink} onClick={clickTab4}>
                All{' '}
                <label className="relative cursor-pointer">
                  <div
                    className=" h-7
            shadow-2xl font-extrabold rounded-[8px] bg-[#e7f5ff] text-[#1c7ed6] text-[14px] inline-block p-[4px] drop-shadow-sm cursor-pointer"
                  >
                    EIPs
                  </div>
                  <div className="absolute top-0 right-0 -mr-1 -mt-1 w-2 h-2"></div>
                  <div className="absolute top-0 right-0 -mr-0 -mt-1   w-2 h-2 text-[10px] text-[#1c7ed6] font-[900]">
                    {data === undefined
                      ? 0
                      : data['Standard_Track']['Networking'] +
                        data['Standard_Track']['ERC'] +
                        data['Standard_Track']['Core'] +
                        data['Standard_Track']['Interface'] +
                        data['Meta'] +
                        data['Informational']}
                  </div>
                </label>
              </CNavLink>
            </Link>
          </CNavItem>
          <CNavItem
            className={`headerSection ${
              click1 ? 'border-b-[4px] border-b-[#1c7ed6] rounded-b-[4px]' : ''
            }`}
          >
            <Link
              to="/typeAll"
              style={{ textDecoration: 'none', color: 'inherit' }}
              className="hover:text-black"
              onClick={clickTab}
            >
              <CNavLink to="/typeAll" component={NavLink} onClick={clickTab}>
                Type
              </CNavLink>
            </Link>
          </CNavItem>
          <CNavItem
            className={`headerSection ${
              click2 ? 'border-b-[4px] border-b-[#1c7ed6] rounded-b-[4px]' : ''
            }`}
          >
            <Link
              to="/statusAll"
              style={{ textDecoration: 'none', color: 'inherit' }}
              onClick={clickTab1}
            >
              <CNavLink href="/statusAll" onClick={clickTab}>
                Status
              </CNavLink>
            </Link>
          </CNavItem>

          <CNavItem
            className={`headerSection ${
              click3 ? 'border-b-[4px] border-b-[#1c7ed6] rounded-b-[4px]' : ''
            }`}
          >
            <Link
              to="/Insight/currentMonth"
              state={{
                from: `/october`,
                year: 2022,
              }}
              style={{ textDecoration: 'none', color: 'inherit' }}
              className="z-1"
              onClick={clickTab2}
            >
              <CNavLink href="/Insight">
                Insight{' '}
                <label className="relative cursor-pointer">
                  <div
                    className=" h-7
            shadow-2xl font-extrabold rounded-[8px] bg-[#e7f5ff] text-[#1c7ed6] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer"
                  >
                    October <label className="text-[10px] cursor-pointer">2022</label>
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
              <CNavLink href="/#/form">
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
              <CTooltip content="Github source" placement="bottom">
                <a
                  href="https://github.com/ethereum/EIPs"
                  target="_blank"
                  rel="noreferrer"
                  className="githubIcon"
                >
                  <img src={githubIcon} alt="github Icon" />
                </a>
              </CTooltip>
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CTooltip content="Join our Discord server" placement="bottom">
                <a
                  href="https://discord.com/channels/916850601919393832/975355006322606130/986317048068051035"
                  target="_blank"
                  rel="noreferrer"
                  className="discordIcon"
                >
                  <img src={discordIcon} alt="Discord Icon" />
                </a>
              </CTooltip>
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CTooltip content="Share your feedback with us" placement="bottom">
                <Link to="/contactUs" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <img src={emailIcon} alt="Email Icon" />
                </Link>
              </CTooltip>
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
