/* eslint-disable react-hooks/rules-of-hooks */
import { React, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ip } from 'src/constants'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

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
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
// sidebar nav config
// import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const [data, setData] = useState()
  const [navii, setNavii] = useState()

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

      console.log(datas)
      const yearArr = ['2022', '2021']
      console.log(yearArr)
      let list = []
      const completeList = []
      completeList.push({
        component: CNavItem,
        name: 'Dashboard',
        to: '/dashboard',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
        badge: {
          color: 'info',
          text: 'NEW',
        },
      })
      for (let j = 0; j < yearArr.length; j++) {
        list = []
        for (let i = 0; i < datas.length; i++) {
          if (datas[i].year === yearArr[j]) {
            list.push({
              component: CNavItem,
              name: `${datas[i].name}`,
              to: `/autoCharts`,
              state: {
                from: `/${datas[i].name.toLowerCase()}`,
              },
            })
          }
        }
        completeList.push({
          component: CNavGroup,
          name: `${yearArr[j]}`,
          to: '/base',
          icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
          items: list,
        })
      }

      const _nav = completeList
      setData(_nav)

      console.log(completeList)
      if (!res.status === 200) {
        const error = new Error(res.error)
        throw error
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    allData()
  }, [])
  console.log(data)

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
        <div className="logoDesign"></div>
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
