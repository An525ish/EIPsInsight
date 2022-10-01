/* eslint-disable react-hooks/rules-of-hooks */
import { React, useState, useEffect } from 'react'
import CIcon from '@coreui/icons-react'
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

const navi = () => {
  const [data, setData] = useState()
  const allData = async () => {
    try {
      const res = await fetch('/register', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application',
        },
        credentials: 'include',
      })
      const datas = await res.json()
      const list = []
      for (let i = 0; i < datas.length; i++) {
        list.push({
          component: CNavItem,
          name: `${datas[i].name.toUpperCase()}`,
          to: '/juneCharts',
        })
      }
      setData(list)

      if (!res.status === 200) {
        const error = new Error(res.error)
        throw error
      }
    } catch (err) {}
  }
  useEffect(() => {
    allData()
  }, [])

  const _nav = [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/dashboard',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
      badge: {
        color: 'info',
        text: 'NEW',
      },
    },
    {
      component: CNavGroup,
      name: '2022',
      to: '/base',
      icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
      items: data,
      // items: [
      //   {
      //     component: CNavItem,
      //     name: 'June',
      //     to: '/juneCharts',
      //   },
      //   {
      //     component: CNavItem,
      //     name: 'May',
      //     to: '/mayCharts',
      //   },
      //   {
      //     component: CNavItem,
      //     name: 'April',
      //     to: '/aprilCharts',
      //   },
      //   {
      //     component: CNavItem,
      //     name: 'March',
      //     to: '/marchCharts',
      //   },
      //   {
      //     component: CNavItem,
      //     name: 'February',
      //     to: '/febCharts',
      //   },
      //   {
      //     component: CNavItem,
      //     name: 'January',
      //     to: '/janCharts',
      //   },
      // ],
    },
    {
      component: CNavGroup,
      name: '2021',
      to: '/buttons',
      icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'December',
          to: '/decCharts',
        },
        {
          component: CNavItem,
          name: 'November',
          to: '/novCharts',
        },
        {
          component: CNavItem,
          name: 'October',
          to: '/octCharts',
        },
        {
          component: CNavItem,
          name: 'September',
          to: '/sepCharts',
        },
        {
          component: CNavItem,
          name: 'August',
          to: '/augCharts',
        },
      ],
    },
  ]

  return _nav
}

export default navi
