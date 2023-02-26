/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
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

import { AppBreadcrumb } from './index'
import { ip } from 'src/constants'
import logo from 'src/assets/logo3.gif'
import logoAndroid from 'src/assets/logo3.gif'
import leftIcon from 'src/assets/left.svg'
import rightIcon from 'src/assets/right.svg'
import midIcon from 'src/assets/mid.png'
import discordIcon from 'src/assets/discord.svg'
import githubIcon from 'src/assets/github.svg'
import emailIcon from 'src/assets/email.png'
import backbtn from 'src/assets/back-btn.png'
import './AppHeader.styles.css'
import { useUserAuth } from 'src/Context/AuthContext'
import useMediaQuery from 'src/scss/useMediaQuery'
const AppHeaderDropdown = React.lazy(() => import('./header/AppHeaderDropdown'))

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

  const [eips, setEips] = useState([])
  const [par, isPar] = useState()

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

  const changeIconSet = () => {
    if (!sidebarShow) {
      setChangeIcon(0)
    } else {
      setChangeIcon(1)
    }
  }

  useEffect(() => {
    fetchAllData()
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
          <img
            src={matches ? logoAndroid : logo}
            // height={48}
            alt="Logo"
            style={{ width: '8rem', height : '4rem' }}
          />
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
                    {eips.length}
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
              props.Month.toLowerCase() === param['*'].split('-')[0]
                ? 'border-b-[4px] border-b-[#1c7ed6] rounded-b-[4px]'
                : ''
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
                <img className="nav-social" loading="lazy" src={githubIcon} alt="github Icon" />
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
                <img className="nav-social" loading="lazy" src={discordIcon} alt="Discord Icon" />
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
