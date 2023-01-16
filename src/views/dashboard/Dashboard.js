/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { CSmartTable } from '@coreui/react-pro'

import { motion } from 'framer-motion'
import {
  CAvatar,
  CDataTable,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CBadge,
} from '@coreui/react'

import { Link, useParams } from 'react-router-dom'
import { ip, TypeColors } from 'src/constants'

import useMediaQuery from 'src/scss/useMediaQuery'

import { Column, Pie, G2, Line, Area, Bar } from '@ant-design/plots'
import { each, groupBy } from '@antv/util'

import './Dashboard.css'
import { useUserAuth } from 'src/Context/AuthContext'
import Loading from '../theme/loading/loading'

const Dashboard = () => {
  const [data, setData] = useState()
  const [date, setDate] = useState()
  const [eips, setEips] = useState()
  const [post, getPost] = useState()
  const [pieChartData, setPieChartData] = useState()
  const [loading, setLoading] = useState(false)
  const [AllData, setAllData] = useState([])

  const [years, setYears] = useState()

  const matches = useMediaQuery('(max-width: 767px)')
  const matches1 = useMediaQuery('(max-width: 950px)')

  const API = 'https://eipsinsight.com/api/overallData'
  const API2 = 'https://eipsinsight.com/api/allinfo'
  const API3 = 'https://eipsinsight.com/api/statusPage'

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
  const fetchPost = async (ignore) => {
    const data = await fetch(API)
    const post = await data.json()
    if (!ignore) {
      getPost(post)
    }
  }
  const fetchAllEIPs = async (ignore) => {
    const data = await fetch(API2)
    const post = await data.json()
    if (!ignore) {
      setEips(post)
    }
  }
  const fetchAllStatus = async (ignore) => {
    const data = await fetch(API3)
    const post = await data.json()
    if (!ignore) {
      setPieChartData(post)
    }
  }
  const fetchAllData = async (ignore) => {
    const data = await fetch(API4)
    const post = await data.json()

    if (!ignore) {
      setAllData(factorOutDuplicate(Object.values(post[0])))
    }
  }

  const fetchDate = () => {
    let date = new Date().toDateString()
    setDate(date)
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
  const sorter = (a, b) => {
    if (a.year !== b.year) {
      return a.year - b.year
    } else {
      return months.indexOf(a.name) - months.indexOf(b.name)
    }
  }
  const allData = async (ignore) => {
    try {
      const res = await fetch(`${ip}/register`, {
        // method: 'GET',
        // headers: {
        //   Accept: 'application/json',
        //   'Content-Type': 'application',
        // },
        // credentials: 'include',
      })
      let datas = []
      datas = await res.json()

      if (!ignore) {
        setData(datas)

        const yearArr = datas === [] ? [] : [...new Set(datas.map((item) => item.year))]
        setYears(yearArr)
        setLoading(true)
      }

      if (!res.status === 200) {
        const error = new Error(res.error)
        throw error
      }
    } catch (err) {}
  }
  const fetchArrayYearWise = (yearList, name) => {
    let arr = []
    for (let i = 0; i < yearList.length; i++) {
      let sumCore = 0
      let sumERC = 0
      let sumNetworking = 0
      let sumInterface = 0
      for (let j = 0; j < data.length; j++) {
        if (yearList[i] === data[j].year) {
          sumCore += parseInt(data[j][name]['Core'])
          sumERC += parseInt(data[j][name]['ERC'])
          sumNetworking += parseInt(data[j][name]['Networking'])
          sumInterface += parseInt(data[j][name]['Interface'])
        }
      }
      arr.push(
        {
          year: yearList[i],
          value: parseInt(sumCore),
          type: 'Core',
        },
        {
          year: yearList[i],
          value: parseInt(sumERC),
          type: 'ERC',
        },
        {
          year: yearList[i],
          value: parseInt(sumNetworking),
          type: 'Networking',
        },
        {
          year: yearList[i],
          value: parseInt(sumInterface),
          type: 'Interface',
        },
      )
    }

    return arr
  }

  // factor out all Data
  function distributeData(data) {
    let arr = []
    // Types
    let coreData = data.filter(
      (item) => item.category === 'Core' && item.type === 'Standards Track',
    )
    let ercData = data.filter((item) => item.category === 'ERC' && item.type === 'Standards Track')
    let networkingData = data.filter(
      (item) => item.category === 'Networking' && item.type === 'Standards Track',
    )
    let interfaceData = data.filter(
      (item) => item.category === 'Interface' && item.type === 'Standards Track',
    )
    let metaData = data.filter((item) => item.type === 'Meta')
    let informationalData = data.filter((item) => item.type === 'Informational')

    // statuses
    let livingData = data.filter((item) => item.status === 'Living')
    let finalData = data.filter((item) => item.status === 'Final')
    let lastCallData = data.filter((item) => item.status === 'Last Call')
    let reviewData = data.filter((item) => item.status === 'Review')
    let draftData = data.filter((item) => item.status === 'Draft')
    let stagnantData = data.filter((item) => item.status === 'Stagnant')
    let withdrawnData = data.filter((item) => item.status === 'Withdrawn')

    arr.push({
      total: coreData.length,
      data: coreData,
    })
    arr.push({
      total: ercData.length,
      data: ercData,
    })
    arr.push({
      total: networkingData.length,
      data: networkingData,
    })
    arr.push({
      total: interfaceData.length,
      data: interfaceData,
    })
    arr.push({
      total: metaData.length,
      data: metaData,
    })
    arr.push({
      total: informationalData.length,
      data: informationalData,
    })

    arr.push({
      total: livingData.length,
      data: livingData,
    })
    arr.push({
      total: finalData.length,
      data: finalData,
    })
    arr.push({
      total: lastCallData.length,
      data: lastCallData,
    })
    arr.push({
      total: reviewData.length,
      data: reviewData,
    })
    arr.push({
      total: draftData.length,
      data: draftData,
    })
    arr.push({
      total: stagnantData.length,
      data: stagnantData,
    })
    arr.push({
      total: withdrawnData.length,
      data: withdrawnData,
    })

    console.log(arr)

    return arr
  }

  const annotations = []

  const d1 = [
    {
      year: 'Standard Track',
      value: distributeData(AllData)[0].total,
      type: 'Core',
    },
    {
      year: 'Standard Track',
      value: distributeData(AllData)[1].total,
      type: 'ERC',
    },
    {
      year: 'Standard Track',
      value: distributeData(AllData)[2].total,
      type: 'Networking',
    },
    {
      year: 'Standard Track',
      value: distributeData(AllData)[3].total,
      type: 'Interface',
    },
    {
      year: 'Meta',
      value: distributeData(AllData)[4].total,
      type: 'Meta',
    },
    {
      year: 'Informational',
      value: distributeData(AllData)[5].total,
      type: 'Informational',
    },
  ]
  each(groupBy(d1, 'year'), (values, k) => {
    const value = values.reduce((a, b) => a + b.value, 0)

    annotations.push({
      type: 'text',
      position: [k, value],
      content: `${value}`,
      style: {
        textAlign: 'center',
        fontSize: 12,
        fill: 'rgba(0,0,0,0.1)',
      },
      offsetY: -10,
    })
  })
  const fetchAnnotations = (d) => {
    const annotations = []
    each(groupBy(d, 'year'), (values, k) => {
      const value = values.reduce((a, b) => a + b.value, 0)

      annotations.push({
        type: 'text',
        position: [k, value],
        content: `${value}`,
        style: {
          textAlign: 'center',
          fontSize: 12,
          fill: 'rgba(0,0,0,0.1)',
        },
        offsetY: -10,
      })
    })
    return annotations
  }
  const config = {
    data: d1,
    color: TypeColors,
    isStack: true,
    xField: 'year',
    yField: 'value',
    seriesField: 'type',
    label: false,

    annotations,
  }

  // monthly Insights

  const draftDataFinding = (name, data) => {
    const allData = distributeData(AllData)
    const statusNum = {
      Living: allData[6].total,
      Final: allData[7].total,
      Last_Call: allData[8].total,
      Review: allData[9].total,
      Draft: allData[10].total,
      Stagnant: allData[11].total,
      Withdrawn: allData[12].total,
    }

    console.log(statusNum[name])

    let arr = []
    for (let i = 0; i < data.length; i++) {
      const month = data[i].name.slice(0, 3) + ' ' + data[i].year
      arr.push(
        {
          name: 'Core',
          year: month,
          gdp: parseInt(data[i][name]['Core']),
        },
        {
          name: 'ERC',
          year: month,
          gdp: parseInt(data[i][name]['ERC']),
        },
        {
          name: 'Networking',
          year: month,
          gdp: parseInt(data[i][name]['Networking']),
        },
        {
          name: 'Interface',
          year: month,
          gdp: parseInt(data[i][name]['Interface']),
        },
      )
    }
    return arr
  }

  const DraftvsPotentialData = (name, data) => {
    data.sort(sorter)
    let arr = []
    for (let i = 0; i < data.length; i++) {
      const month = data[i].name.slice(0, 3) + ' ' + data[i].year
      arr.push(
        {
          name: 'Draft',
          year: month,
          value: parseInt(data[i]['summary']['Draft']),
        },
        {
          name: 'Potential Proposal',
          year: month,
          value: parseInt(data[i]['summary']['potentialProposal']),
        },
      )
    }
    //
    return arr
  }

  const monthlyStatusConfig = (name, data) => {
    const config = {
      data: draftDataFinding(name, data === undefined ? [] : data),
      xField: 'year',
      yField: 'gdp',
      seriesField: 'name',
      color: TypeColors,
      // color: ['#1864ab', '#228be6', '#74c0fc', '#a5d8ff'],
      yAxis: {
        label: {
          // 数值格式化为千分位
          formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
        },
      },
      legend: {
        position: 'top',
      },
      smooth: true,
      // @TODO 后续会换一种动画方式
      animation: {
        appear: {
          animation: 'path-in',
          duration: 5000,
        },
      },
      slider: {
        start: 0.0,
        end: 1.0,
      },
    }
    return config
  }
  // const monthlyFinalConfig = {
  //   data: draftDataFinding('Final', data === undefined ? [] : data),
  //   isGroup: true,
  //   xField: 'year',
  //   yField: 'gdp',
  //   seriesField: 'name',
  //   color: ['#228be6', '#66d9e8', '#ffa8a8', '#ffe066', '#e599f7'],
  //   label: {
  //     position: 'middle',
  //     layout: [
  //       {
  //         type: 'interval-adjust-position',
  //       },
  //       {
  //         type: 'interval-hide-overlap',
  //       },
  //       {
  //         type: 'adjust-color',
  //       },
  //     ],
  //   },
  //   slider: {
  //     start: 0.0,
  //     end: 1.0,
  //   },
  // }

  const montlyDraftvsFinalconfig = {
    data: DraftvsPotentialData('summary', data === undefined ? [] : data),
    xField: 'year',
    yField: 'value',
    seriesField: 'name',
    color: ['#ffa8a8', '#ffe066', '#e599f7'],
    yAxis: {
      label: {
        // 数值格式化为千分位
        formatter: (v) => v,
      },
    },
    legend: {
      position: 'top',
    },
    axis: {
      minLimit: 0,
    },
  }

  const finalvsDraftData = (data) => {
    data.sort(sorter)
    let arr = []
    for (let i = 0; i < data.length; i++) {
      const month = data[i].name.slice(0, 3) + ' ' + data[i].year
      arr.push({
        year: month,
        value: parseInt(data[i]['summary']['Final']),
        type: 'Final',
      })
    }
    for (let i = 0; i < data.length; i++) {
      const month = data[i].name.slice(0, 3) + ' ' + data[i].year
      arr.push({
        year: month,
        value: parseInt(data[i]['summary']['Draft']),
        type: 'Draft',
      })
    }

    return arr
  }

  const finalvsDraftconfig = {
    data: finalvsDraftData(data === undefined ? [] : data),
    isStack: true,
    xField: 'year',
    yField: 'value',
    seriesField: 'type',
    // color: ['#ffa8a8', '#ffe066', '#e599f7'],
    color: ['#1864ab', '#74c0fc'],
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle', // 'top', 'bottom', 'middle'
    },
    interactions: [
      {
        type: 'active-region',
        enable: false,
      },
    ],
    connectedArea: {
      style: (oldStyle, element) => {
        return {
          fill: 'rgba(0,0,0,0.25)',
          stroke: oldStyle.fill,
          lineWidth: 0.5,
        }
      },
    },
  }

  const yearlyDraftConfig = {
    data: fetchArrayYearWise(years === undefined ? [] : years, 'Draft'),
    color: TypeColors,
    isStack: true,
    xField: 'year',
    yField: 'value',
    seriesField: 'type',
    label: false,

    annotations: fetchAnnotations(fetchArrayYearWise(years === undefined ? [] : years, 'Draft')),
  }
  const yearlyFinalConfig = {
    data: fetchArrayYearWise(years === undefined ? [] : years, 'Final'),
    color: TypeColors,
    isStack: true,
    xField: 'year',
    yField: 'value',
    seriesField: 'type',
    label: false,

    annotations: fetchAnnotations(fetchArrayYearWise(years === undefined ? [] : years, 'Final')),
  }
  const yearlyReviewConfig = {
    data: fetchArrayYearWise(years === undefined ? [] : years, 'Review'),
    color: TypeColors,
    isStack: true,
    xField: 'year',
    yField: 'value',
    seriesField: 'type',

    label: false,

    annotations: fetchAnnotations(fetchArrayYearWise(years === undefined ? [] : years, 'Review')),
  }

  const yearlyLastCallConfig = {
    data: fetchArrayYearWise(years === undefined ? [] : years, 'LastCall'),
    color: TypeColors,
    isStack: true,
    xField: 'year',
    yField: 'value',
    seriesField: 'type',
    label: false,

    annotations: fetchAnnotations(fetchArrayYearWise(years === undefined ? [] : years, 'LastCall')),
  }

  const yearlyStagnantConfig = {
    data: fetchArrayYearWise(years === undefined ? [] : years, 'Stagnant'),
    color: TypeColors,
    isStack: true,
    xField: 'year',
    yField: 'value',
    seriesField: 'type',
    label: false,

    annotations: fetchAnnotations(fetchArrayYearWise(years === undefined ? [] : years, 'Stagnant')),
  }
  const yearlyWithdrawnConfig = {
    data: fetchArrayYearWise(years === undefined ? [] : years, 'Withdrawn'),
    color: TypeColors,
    isStack: true,
    xField: 'year',
    yField: 'value',
    seriesField: 'type',
    label: false,

    annotations: fetchAnnotations(
      fetchArrayYearWise(years === undefined ? [] : years, 'Withdrawn'),
    ),
  }
  const yearlyLivingConfig = {
    data: fetchArrayYearWise(years === undefined ? [] : years, 'Living'),
    color: TypeColors,
    isStack: true,
    xField: 'year',
    yField: 'value',
    seriesField: 'type',
    meta: {
      formatter({ value }) {
        return Math.round(value)
      },
    },
    label: false,

    annotations: fetchAnnotations(fetchArrayYearWise(years === undefined ? [] : years, 'Living')),
  }

  // smart chart
  const [details, setDetails] = useState([])
  const columns = [
    {
      key: 'Number',
      _style: { width: '5%', color: '#1c7ed6', backgroundColor: '#e7f5ff' },
      _props: { className: 'fw-semibold' },
      sorter: true,
    },
    {
      key: 'Title',
      _style: {
        width: '40%',
        color: '#1c7ed6',
      },
    },
    {
      key: 'Author',
      _style: {
        width: '20%',
        color: '#1c7ed6',
        backgroundColor: '#e7f5ff',
      },
    },
    { key: 'Type', _style: { width: '10%', color: '#1c7ed6' } },
    { key: 'Category', _style: { width: '10%', color: '#1c7ed6', backgroundColor: '#e7f5ff' } },
    { key: 'status', _style: { width: '10%', color: '#1c7ed6' } },
    { key: 'PR No.', _style: { width: '10%', color: '#1c7ed6', backgroundColor: '#e7f5ff' } },
  ]
  const coloring = (text) => {
    switch (text) {
      case 'text':
        return '#1c7ed6'
      case 'back':
        return '#e7f5ff'
      default:
        return '#e7f5ff'
    }
  }
  const getBadge = (status) => {
    switch (status) {
      case 'Final':
        return '#c3fae8'
      case 'Last_Call':
        return '#d3f9d8'
      case 'Last Call':
        return '#d3f9d8'
      case 'Draft':
        return '#fff3bf'
      case 'Stagnant':
        return '#ffe8cc'
      case 'Withdrawn':
        return '#ffe3e3'
      case 'Review':
        return '#d0ebff'
      case 'Living':
        return '#c5f6fa'
      default:
        return '#e7f5ff'
    }
  }
  const getBadgeColor = (status) => {
    switch (status) {
      case 'Final':
        return '#0ca678'
      case 'Last_Call':
        return '#37b24d'
      case 'Last Call':
        return '#37b24d'
      case 'Draft':
        return '#f08c00'
      case 'Stagnant':
        return '#e8590c'
      case 'Withdrawn':
        return '#e03131'
      case 'Review':
        return '#1971c2'
      case 'Living':
        return '#0c8599'
      default:
        return '#1c7ed6'
    }
  }

  const getBadgeShadowColor = (status) => {
    switch (status) {
      case 'Final':
        return 'shadow-[#0ca678]'
      case 'Last_Call':
        return 'shadow-[#37b24d]'
      case 'Last Call':
        return 'shadow-[#37b24d]'
      case 'Draft':
        return 'shadow-[#f08c00]'
      case 'Stagnant':
        return 'shadow-[#e8590c]'
      case 'Withdrawn':
        return 'shadow-[#e03131]'
      case 'Review':
        return 'shadow-[#1971c2]'
      case 'Living':
        return 'shadow-[#0c8599]'
      default:
        return 'shadow-[#1c7ed6]'
    }
  }
  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }

  const eipData = (eips) => {
    let arr = []

    let inc = 0
    for (let i = 0; i < eips.length; i++) {
      console.log(eips[i].eip)
      const temp = eips[i].eip.split('.md')[0].split('eip-')
      if (temp.length === 2) {
        if (temp[0] === '' && !isNaN(temp[1])) {
          arr.push({
            id: inc++,
            Number: parseInt(temp[1]),
            Title: eips[i].title,
            Type: eips[i].type,
            Category:
              eips[i].type === 'Standards Track' ? eips[i].category : `Type - ${eips[i].type}`,
            status: eips[i].status,
            Author: eips[i].author,
            'PR No.': eips[i].pull,
          })
        }
      }
    }

    arr.sort((a, b) => (a.Number > b.Number ? 1 : -1))

    return arr
  }
  // pie config
  const G = G2.getEngine('canvas')
  const pieData = [
    {
      type: 'Living',
      value: distributeData(AllData)[6].total,
    },
    {
      type: 'Final',
      value: distributeData(AllData)[7].total,
    },
    {
      type: 'Last_Call',
      value: distributeData(AllData)[8].total,
    },
    {
      type: 'Review',
      value: distributeData(AllData)[9].total,
    },
    {
      type: 'Draft',
      value: distributeData(AllData)[10].total,
    },
    {
      type: 'Stagnant',
      value: distributeData(AllData)[11].total,
    },
    {
      type: 'Withdrawn',
      value: distributeData(AllData)[12].total,
    },
  ]

  // header
  const header = (text) => {
    // console.log(AllData)
    text = text === 'Last Call' ? 'Last_Call' : text
    const allData = distributeData(AllData)
    const statusNum = {
      Living: allData[6].total,
      Final: allData[7].total,
      Last_Call: allData[8].total,
      Review: allData[9].total,
      Draft: allData[10].total,
      Stagnant: allData[11].total,
      Withdrawn: allData[12].total,
    }

    return (
      <CCardHeader
        className="cardHeader flex tracking-wider text-[1.3rem] font-bold "
        style={{
          fontFamily: 'Roboto',
          fontWeight: '500',
          fontSize: '18px',
          color: `black`,
          background: `white`,
          border: `none`,
        }}
      >
        {text === 'Last_Call' ? 'Last Call' : text}
        {text === 'EIPs Type & Categories' || text === 'EIPs Status' || text === 'Search an EIP' ? (
          <div className="ml-2 bg-white rounded-[0.7rem] text-[1rem] flex justify-center items-center px-2 ">
            {allData[0].total +
              allData[1].total +
              allData[2].total +
              allData[3].total +
              allData[4].total +
              allData[5].total}
          </div>
        ) : (
          <div className="ml-2 bg-white rounded-[0.7rem] text-[1rem] flex justify-center items-center px-2 ">
            {statusNum[text]}
          </div>
        )}
      </CCardHeader>
    )
  }

  // footer
  const footer = (date, text) => {
    return (
      <CCardFooter
        className="cardFooter"
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          color: `black`,
          background: `white`,
          borderBottom: `none`,
        }}
      >
        <label style={{ fontSize: '10px', color: `${getBadgeColor(text)}` }}>{date}</label>
      </CCardFooter>
    )
  }
  const pieConfig = {
    appendPadding: 10,
    data: pieData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.75,
    legend: matches1
      ? {
          layout: 'vertical',
          position: 'right',
        }
      : false,
    color: ['#3bc9db', '#20c997', '#69db7c', '#339af0', '#fcc419', '#ffc078', '#ff6b6b'],
    label: matches1
      ? {
          type: 'inner',
          offset: '-30%',
          content: (data) => `${data.value}`,
          style: {
            fontSize: 8,
            textAlign: 'center',
            fontWeight: 'bold',
          },
        }
      : {
          type: 'spider',
          labelHeight: 40,
          formatter: (data, mappingData) => {
            const group = new G.Group({})
            group.addShape({
              type: 'circle',
              attrs: {
                x: 0,
                y: 0,
                width: 40,
                height: 50,
                r: 5,
                fill: mappingData.color,
              },
            })
            group.addShape({
              type: 'text',
              attrs: {
                x: 10,
                y: 8,
                text: `${data.type}`,
                fill: mappingData.color,
              },
            })
            group.addShape({
              type: 'text',
              attrs: {
                x: 0,
                y: 25,
                text: `${data.value}`,
                fill: 'rgba(0, 0, 0, 0.65)',
                fontWeight: 700,
              },
            })
            return group
          },
        },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
  }

  const factorAuthor = (data) => {
    console.log({ data })
    let list = data.split(',')
    // console.log({ list })
    // for (let i = 0; i < list.length; i++) {
    //   list[i] = list[i].split(' ')
    // }
    // // console.log({ list })
    // if (list[list.length - 1][list[list.length - 1].length - 1] === 'al.') {
    //   list.pop()
    // }
    return list
  }

  const getString = (data) => {
    let ans = ''
    for (let i = 0; i < data.length - 1; i++) {
      ans += data[i] + ' '
    }
    return ans
  }
  // yearly Draft Component
  const yearlyInsights = (col, title, configName) => {
    return (
      <CCol xs={matches ? 12 : col}>
        <CCard className="card-container">
          {header(title)}
          <CCardBody
            style={{
              // backgroundColor: '#fff9db',
              height: '300px',
              // backgroundImage: `url(${github})`,
              // backgroundSize: '33% 30%',
              // backgroundRepeat: 'no-repeat',
              // backgroundPosition: 'right -12px bottom -40px',
            }}
          >
            <Column {...configName} />
          </CCardBody>
          {footer(date, title)}
        </CCard>
      </CCol>
    )
  }

  // text animation
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: -20,
      y: 10,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  }

  useEffect(() => {
    // fetchData()
    let ignore = false
    fetchPost(ignore)
    fetchDate(ignore)
    fetchAllEIPs(ignore)
    fetchAllStatus(ignore)
    fetchAllData(ignore)
    allData(ignore)

    return () => {
      ignore = true
    }
  }, [])

  // temparary
  console.log({ AllData })

  const [insight, setInsight] = useState(1)

  return (
    <div>
      {loading ? (
        <div>
          <CRow>
            <CCol xs={matches ? 12 : 6}>
              <CCard className="card-container">
                <Link to="/typeAll">{header('EIPs Type & Categories')} </Link>
                <CCardBody
                  style={{
                    // backgroundColor: '#fff9db',
                    height: '300px',
                    // backgroundImage: `url(${github})`,
                    // backgroundSize: '33% 30%',
                    // backgroundRepeat: 'no-repeat',
                    // backgroundPosition: 'right -12px bottom -40px',
                  }}
                >
                  <Column {...config} />
                </CCardBody>
                {footer(date)}
              </CCard>
            </CCol>
            <CCol xs={matches ? 12 : 6}>
              <CCard className="card-container">
                <Link to="/statusAll">{header('EIPs Status')} </Link>
                <CCardBody
                  style={{
                    // backgroundColor: '#fff9db',
                    height: '300px',
                    // backgroundImage: `url(${github})`,
                    // backgroundSize: '33% 30%',
                    // backgroundRepeat: 'no-repeat',
                    // backgroundPosition: 'right -12px bottom -40px',
                  }}
                >
                  <Pie {...pieConfig} />
                </CCardBody>
                {footer(date)}
              </CCard>
            </CCol>

            <CCol xs={12}>
              <CCard className="card-container">
                <Link to="/EIPS">{header('Search an EIP')}</Link>
                <CCardBody
                  style={{
                    overflowX: 'auto',
                    overflowY: 'auto',
                    height: '300px',
                    fontFamily: 'Roboto',
                    fontSize: '12px',
                    '--main-color': `#1c7ed6`,
                    '--main-color-background': `#e7f5ff`,
                  }}
                  className="scrollbarDesign"
                >
                  <CSmartTable
                    items={eipData(AllData)}
                    activePage={1}
                    color="success"
                    clickableRows
                    columns={columns}
                    columnFilter
                    columnSorter
                    itemsPerPage={50}
                    pagination
                    onRowClick={(t) => {}}
                    scopedColumns={{
                      id: (item) => (
                        <td>
                          <div
                            style={{
                              color: `${getBadgeColor(item.status)}`,
                              fontWeight: 'bold',
                            }}
                          >
                            {item.id}.
                          </div>
                        </td>
                      ),
                      Number: (item) => (
                        <td>
                          <Link to={`/EIP-${item.Number}`}>
                            <div>
                              <label className="relative cursor-pointer">
                                <div
                                  className={`h-7
            font-extrabold rounded-[8px] bg-[${getBadge(item.status)}] text-[${getBadgeColor(
                                    item.status,
                                  )}] text-[12px] inline-block p-[4px] drop-shadow-sm ${getBadgeShadowColor(
                                    item.status,
                                  )} shadow-md cursor-pointer px-[8px]`}
                                  style={{
                                    color: `${getBadgeColor(item.status)}`,
                                    backgroundColor: `${getBadge(item.status)}`,
                                  }}
                                >
                                  {item.Number}
                                </div>
                                <div
                                  className={`absolute top-0 right-0 -mr-1 -mt-0 w-2 h-2 rounded-full bg-[${getBadgeColor(
                                    item.status,
                                  )}] animate-ping`}
                                  style={{
                                    backgroundColor: `${getBadgeColor(item.status)}`,
                                  }}
                                ></div>
                                <div
                                  className={`absolute top-0 right-0 -mr-1 -mt-0 w-2 h-2 rounded-full bg-[${getBadgeColor(
                                    item.status,
                                  )}]`}
                                  style={{
                                    backgroundColor: `${getBadgeColor(item.status)}`,
                                  }}
                                ></div>
                              </label>
                            </div>
                          </Link>
                        </td>
                      ),
                      Title: (item) => (
                        <td
                          style={{
                            // borderBottomWidth: item.id % 2 !== 0 ? '1px' : '',
                            // borderColor: item.id % 2 !== 0 ? `${getBadgeColor(item.status)}` : '',
                            color: `${getBadgeColor(item.status)}`,

                            fontWeight: 'bold',
                            height: '100%',
                          }}
                          className="hover:text-[#1c7ed6]"
                        >
                          <Link
                            to={`/EIP-${item.Number}`}
                            className="hover:text-[#1c7ed6] text-[13px]"
                          >
                            {item.Title}
                          </Link>
                        </td>
                      ),

                      Author: (it) => (
                        <td>
                          <div>
                            {factorAuthor(it.Author).map((item, index) => {
                              let t = item[item.length - 1].substring(
                                1,
                                item[item.length - 1].length - 1,
                              )

                              return (
                                <CBadge
                                  key={index}
                                  className={`mr-1 drop-shadow-sm ${getBadgeShadowColor(
                                    it.status,
                                  )} shadow-sm`}
                                  style={{
                                    color: `${getBadgeColor(it.status)}`,
                                    backgroundColor: `${getBadge(it.status)}`,
                                  }}
                                >
                                  <a
                                    key={index}
                                    href={`${
                                      item[item.length - 1].substring(
                                        item[item.length - 1].length - 1,
                                      ) === '>'
                                        ? 'mailto:' + t
                                        : 'https://github.com/' + t.substring(1)
                                    }`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hoverAuthor text-[10px]"
                                    style={{ '--author-color': `${getBadgeColor(it.status)}` }}
                                  >
                                    {item}
                                  </a>
                                </CBadge>
                              )
                            })}
                          </div>
                        </td>
                      ),
                      'Start Date': (item) => (
                        <td>
                          <div>{item['Start Date']}</div>
                        </td>
                      ),

                      'Final Date': (item) => (
                        <td>
                          <div>{item['Final Date']}</div>
                        </td>
                      ),
                      Type: (item) => (
                        <td
                          style={{
                            color: `${getBadgeColor(item.status)}`,
                            fontWeight: 'bold',
                          }}
                          className="text-[12px]"
                        >
                          {item.Type}
                        </td>
                      ),
                      Category: (item) => (
                        <td
                          style={{
                            color: `${getBadgeColor(item.status)}`,
                            fontWeight: 'bold',
                          }}
                        >
                          <div className=" text-[12px]">{item.Category}</div>
                        </td>
                      ),
                      status: (item) => (
                        <td style={{}}>
                          <CBadge
                            style={{
                              color: `${getBadgeColor(item.status)}`,
                              backgroundColor: `${getBadge(item.status)}`,
                            }}
                            className={`drop-shadow-sm ${getBadgeShadowColor(
                              item.status,
                            )} shadow-md`}
                          >
                            {item.status}
                          </CBadge>
                        </td>
                      ),
                      'PR No.': (item) => (
                        <td>
                          <a
                            href={`https://github.com/ethereum/EIPs/pull/${
                              item['PR No.'] === 0 ? item.Number : item['PR No.']
                            }`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <CBadge
                              style={{
                                color: `${getBadgeColor('Random')}`,
                                backgroundColor: `${getBadge('Random')}`,
                              }}
                              className={`drop-shadow-sm ${getBadgeShadowColor(
                                'Random',
                              )} shadow-md  z-auto`}
                            >
                              <div>{item['PR No.'] === 0 ? item.Number : item['PR No.']}</div>
                            </CBadge>
                          </a>
                        </td>
                      ),
                    }}
                    sorterValue={{ column: 'name', state: 'asc' }}
                    tableHeadProps={{}}
                    tableProps={{
                      // borderless: true,
                      striped: true,
                      hover: true,
                      responsive: true,
                    }}
                  />
                </CCardBody>
                {footer(date)}
                {/* <CCardFooter
                  className="cardFooter bg-[#e7f5ff] text-[#1c7ed6] border-b-[#1c7ed6] border-b-[2px]"
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  {loading ? (
                    <motion.div
                      className="flex justify-between items-center"
                      variants={container}
                    >
                      <label>* </label>
                      <motion.div >
                        <motion.span variants={child} key={1}>
                          Click to see more
                        </motion.span>
                      </motion.div>
                    </motion.div>
                  ) : null}
                  <label style={{ color: '#1c7ed6', fontSize: '10px' }}>{date}</label>
                </CCardFooter> */}
              </CCard>
            </CCol>
          </CRow>

          <div className="chart-heading-container">
            <button
              className={insight == 1 ? 'chart-heading-active' : 'chart-heading'}
              onClick={() => setInsight(1)}
            >
              Insights
            </button>
            <button
              className={insight == 0 ? 'chart-heading-active' : 'chart-heading'}
              onClick={() => setInsight(0)}
            >
              Yearly Insights
            </button>
          </div>
          {insight === 1 ? (
            <CRow>
              <CCol xs={12} className="mb-4"></CCol>
              <CCol xs={12}>
                <CCard className="card-container">
                  {header('Living')}
                  <CCardBody
                    style={{
                      // backgroundColor: '#fff9db',
                      height: '300px',
                      border: 'none',
                      // backgroundImage: `url(${github})`,
                      // backgroundSize: '33% 30%',
                      // backgroundRepeat: 'no-repeat',
                      // backgroundPosition: 'right -12px bottom -40px',
                    }}
                  >
                    <Line {...monthlyStatusConfig('Living', data)} />
                  </CCardBody>
                  {footer(date, 'Living')}
                </CCard>
              </CCol>

              <CCol xs={12}>
                <CCard className="card-container">
                  {header('Final')}
                  <CCardBody
                    style={{
                      // backgroundColor: '#fff9db',
                      height: '300px',
                      // backgroundImage: `url(${github})`,
                      // backgroundSize: '33% 30%',
                      // backgroundRepeat: 'no-repeat',
                      // backgroundPosition: 'right -12px bottom -40px',
                    }}
                  >
                    <Line {...monthlyStatusConfig('Final', data)} />
                  </CCardBody>
                  {footer(date, 'Final')}
                </CCard>
              </CCol>

              <CCol xs={12}>
                <CCard className="card-container">
                  {header('Last Call')}
                  <CCardBody
                    style={{
                      // backgroundColor: '#fff9db',
                      height: '300px',
                      // backgroundImage: `url(${github})`,
                      // backgroundSize: '33% 30%',
                      // backgroundRepeat: 'no-repeat',
                      // backgroundPosition: 'right -12px bottom -40px',
                    }}
                  >
                    <Line {...monthlyStatusConfig('LastCall', data)} />
                  </CCardBody>
                  {footer(date, 'Last_Call')}
                </CCard>
              </CCol>

              <CCol xs={12}>
                <CCard className="card-container">
                  {header('Review')}
                  <CCardBody
                    style={{
                      // backgroundColor: '#fff9db',
                      height: '300px',
                      // backgroundImage: `url(${github})`,
                      // backgroundSize: '33% 30%',
                      // backgroundRepeat: 'no-repeat',
                      // backgroundPosition: 'right -12px bottom -40px',
                    }}
                  >
                    <Line {...monthlyStatusConfig('Review', data)} />
                  </CCardBody>
                  {footer(date, 'Review')}
                </CCard>
              </CCol>

              <CCol xs={12}>
                <CCard className="card-container">
                  {header('Draft')}
                  <CCardBody
                    style={{
                      // backgroundColor: '#fff9db',
                      height: '300px',
                      // backgroundImage: `url(${github})`,
                      // backgroundSize: '33% 30%',
                      // backgroundRepeat: 'no-repeat',
                      // backgroundPosition: 'right -12px bottom -40px',
                    }}
                  >
                    <Line {...monthlyStatusConfig('Draft', data)} />
                  </CCardBody>
                  {footer(date, 'Draft')}
                </CCard>
              </CCol>

              <CCol xs={12}>
                <CCard className="card-container">
                  {header('Stagnant')}
                  <CCardBody
                    style={{
                      // backgroundColor: '#fff9db',
                      height: '300px',
                      // backgroundImage: `url(${github})`,
                      // backgroundSize: '33% 30%',
                      // backgroundRepeat: 'no-repeat',
                      // backgroundPosition: 'right -12px bottom -40px',
                    }}
                  >
                    <Line {...monthlyStatusConfig('Stagnant', data)} />
                  </CCardBody>
                  {footer(date, 'Stagnant')}
                </CCard>
              </CCol>

              <CCol xs={12}>
                <CCard className="card-container">
                  {header('Withdrawn')}
                  <CCardBody
                    style={{
                      // backgroundColor: '#fff9db',
                      height: '300px',
                      // backgroundImage: `url(${github})`,
                      // backgroundSize: '33% 30%',
                      // backgroundRepeat: 'no-repeat',
                      // backgroundPosition: 'right -12px bottom -40px',
                    }}
                  >
                    <Line {...monthlyStatusConfig('Withdrawn', data)} />
                  </CCardBody>
                  {footer(date, 'Withdrawn')}
                </CCard>
              </CCol>
            </CRow>
          ) : (
            <CRow>
              {/* Yearly Insights */}
              {yearlyInsights(4, 'Draft', yearlyDraftConfig)}
              {yearlyInsights(4, 'Final', yearlyFinalConfig)}
              {yearlyInsights(4, 'Review', yearlyReviewConfig)}
              {yearlyInsights(6, 'Last Call', yearlyLastCallConfig)}
              {yearlyInsights(6, 'Stagnant', yearlyStagnantConfig)}
              {yearlyInsights(6, 'Withdrawn', yearlyWithdrawnConfig)}
              {yearlyInsights(6, 'Living', yearlyLivingConfig)}
            </CRow>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default Dashboard
