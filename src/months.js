/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */

import { React, useEffect } from 'react'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
const monthData = () => {
  const [data, setData] = React.useState([])
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
      console.log(datas)
      const arr = []
      for (let i = 0; i < datas.length; i++) {
        arr.push({
          component: CNavItem,
          name: datas[i].name,
          to: '/juneCharts',
        })
      }
      console.log(arr)
      setData(arr)

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

  return [data]
}

export default monthData
