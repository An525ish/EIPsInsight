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
import { MotionConfig } from 'framer-motion'

const Dashboard = () => {
  const [data, setData] = useState()
  const [info, setInfo] = useState()
  const param = useParams()
  const [date, setDate] = useState()
  const [eips, setEips] = useState()
  const [post, getPost] = useState()
  const [pieChartData, setPieChartData] = useState()
  const [loading, setLoading] = useState(false)

  const {
    click1,
    click2,
    click3,
    setClick1Function,
    setClick2Function,
    setClick3Function,
    setClick4Function,
  } = useUserAuth()

  const [years, setYears] = useState()

  const matches = useMediaQuery('(max-width: 767px)')
  const matches1 = useMediaQuery('(max-width: 950px)')

  const API = 'https://eipsinsight.com/api/overallData'
  const API2 = 'https://eipsinsight.com/api/allinfo'
  const API3 = 'https://eipsinsight.com/api/statusPage'
  const fetchPost = () => {
    fetch(API)
      .then((res) => res.json())
      .then((res) => {
        getPost(res)
      })
  }
  const fetchAllEIPs = () => {
    fetch(API2)
      .then((res) => res.json())
      .then((res) => {
        setEips(res)
      })
  }
  const fetchAllStatus = () => {
    fetch(API3)
      .then((res) => res.json())
      .then((res) => {
        setPieChartData(res)
      })
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
      let datas = []
      datas = await res.json()

      setData(datas)

      const yearArr = datas === [] ? [] : [...new Set(datas.map((item) => item.year))]
      setYears(yearArr)
      setLoading(true)

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

  const checkDataPresent = (dataList) => {
    let present = 0
    for (let i = 0; i < dataList.length; i++) {
      if (dataList[i] !== 0) {
        present = 1
      }
    }
    return present
  }
  const sortLabel = (data, name) => {
    data.sort(sorter)
    const arr = []
    for (let i = 0; i < data.length; i++) {
      const month = data[i].name.slice(0, 3) + ' ' + data[i].year
      arr.push(month)
    }
    return arr
  }
  const sortData = (data, name, section) => {
    data.sort(sorter)

    const arr = []
    for (let i = 0; i < data.length; i++) {
      arr.push(data[i][name][section])
    }

    return arr
  }
  const sortRem = (data, name) => {
    data.sort(sorter)

    const arr = []
    for (let i = 0; i < data.length; i++) {
      arr.push(data[i]['summary'][name])
    }

    return arr
  }
  const annotations = []

  const d1 = [
    {
      year: 'Standard Track',
      value: post === undefined ? '' : post['Core'],
      type: 'Core',
    },
    {
      year: 'Standard Track',
      value: post === undefined ? '' : post['ERC'],
      type: 'ERC',
    },
    {
      year: 'Standard Track',
      value: post === undefined ? '' : post['Networking'],
      type: 'Networking',
    },
    {
      year: 'Standard Track',
      value: post === undefined ? '' : post['Interface'],
      type: 'Interface',
    },
    {
      year: 'Meta',
      value: post === undefined ? '' : post['Meta'],
      type: 'Meta',
    },
    {
      year: 'Informational',
      value: post === undefined ? '' : post['Informational'],
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
        fill: 'rgba(0,0,0,0.6)',
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
          fill: 'rgba(0,0,0,0.6)',
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
    data.sort(sorter)
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
      color: ['#228be6', '#66d9e8', '#ffa8a8', '#ffe066', '#e599f7'],
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
    color: ['#228be6', '#66d9e8', '#ffa8a8', '#ffe066', '#e599f7', '#c0eb75'],
    isStack: true,
    xField: 'year',
    yField: 'value',
    seriesField: 'type',
    label: false,

    annotations: fetchAnnotations(fetchArrayYearWise(years === undefined ? [] : years, 'Draft')),
  }
  const yearlyFinalConfig = {
    data: fetchArrayYearWise(years === undefined ? [] : years, 'Final'),
    color: ['#228be6', '#66d9e8', '#ffa8a8', '#ffe066', '#e599f7', '#c0eb75'],
    isStack: true,
    xField: 'year',
    yField: 'value',
    seriesField: 'type',
    label: false,

    annotations: fetchAnnotations(fetchArrayYearWise(years === undefined ? [] : years, 'Final')),
  }
  const yearlyReviewConfig = {
    data: fetchArrayYearWise(years === undefined ? [] : years, 'Review'),
    color: ['#228be6', '#66d9e8', '#ffa8a8', '#ffe066', '#e599f7', '#c0eb75'],
    isStack: true,
    xField: 'year',
    yField: 'value',
    seriesField: 'type',

    label: false,

    annotations: fetchAnnotations(fetchArrayYearWise(years === undefined ? [] : years, 'Review')),
  }

  const yearlyLastCallConfig = {
    data: fetchArrayYearWise(years === undefined ? [] : years, 'LastCall'),
    color: ['#228be6', '#66d9e8', '#ffa8a8', '#ffe066', '#e599f7', '#c0eb75'],
    isStack: true,
    xField: 'year',
    yField: 'value',
    seriesField: 'type',
    label: false,

    annotations: fetchAnnotations(fetchArrayYearWise(years === undefined ? [] : years, 'LastCall')),
  }

  const yearlyStagnantConfig = {
    data: fetchArrayYearWise(years === undefined ? [] : years, 'Stagnant'),
    color: ['#228be6', '#66d9e8', '#ffa8a8', '#ffe066', '#e599f7', '#c0eb75'],
    isStack: true,
    xField: 'year',
    yField: 'value',
    seriesField: 'type',
    label: false,

    annotations: fetchAnnotations(fetchArrayYearWise(years === undefined ? [] : years, 'Stagnant')),
  }
  const yearlyWithdrawnConfig = {
    data: fetchArrayYearWise(years === undefined ? [] : years, 'Withdrawn'),
    color: ['#228be6', '#66d9e8', '#ffa8a8', '#ffe066', '#e599f7', '#c0eb75'],
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
    color: ['#228be6', '#66d9e8', '#ffa8a8', '#ffe066', '#e599f7', '#c0eb75'],
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
    { key: 'Category', _style: { width: '10%', color: '#1c7ed6' } },
    { key: 'status', _style: { width: '10%', color: '#1c7ed6', backgroundColor: '#e7f5ff' } },
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
    if (eips[0] !== undefined) {
      let inc = 0
      for (let i = 0; i < eips[0]['Final'].length; i++) {
        arr.push({
          id: inc++,
          Number: eips[0]['Final'][i].eip,
          Title: eips[0]['Final'][i].title,
          Type: eips[0]['Final'][i].type,
          Category:
            eips[0]['Final'][i].type === 'Standards Track'
              ? eips[0]['Final'][i].category
              : `Type - ${eips[0]['Final'][i].type}`,
          status: eips[0]['Final'][i].status,
          Author: eips[0]['Final'][i].author,
        })
      }
      for (let i = 0; i < eips[1]['Draft'].length; i++) {
        arr.push({
          id: inc++,
          Number: eips[1]['Draft'][i].eip,
          Title: eips[1]['Draft'][i].title,
          Type: eips[1]['Draft'][i].type,
          Category:
            eips[1]['Draft'][i].type === 'Standards Track'
              ? eips[1]['Draft'][i].category
              : `Type - ${eips[1]['Draft'][i].type}`,
          status: eips[1]['Draft'][i].status,
          Author: eips[1]['Draft'][i].author,
        })
      }
      for (let i = 0; i < eips[2]['Review'].length; i++) {
        arr.push({
          id: inc++,
          Number: eips[2]['Review'][i].eip,
          Title: eips[2]['Review'][i].title,
          Type: eips[2]['Review'][i].type,
          Category:
            eips[2]['Review'][i]?.type === 'Standards Track'
              ? eips[2]['Review'][i]?.category
              : `Type - ${eips[2]['Review'][i].type}`,
          status: eips[2]['Review'][i].status,
          Author: eips[2]['Review'][i].author,
        })
      }
      for (let i = 0; i < eips[3]['Last_Call'].length; i++) {
        arr.push({
          id: inc++,
          Number: eips[3]['Last_Call'][i].eip,
          Title: eips[3]['Last_Call'][i].title,
          Type: eips[3]['Last_Call'][i].type,
          Category:
            eips[3]['Last_Call'][i].type === 'Standards Track'
              ? eips[3]['Last_Call'][i].category
              : `Type - ${eips[3]['Last_Call'][i].type}`,
          status: eips[3]['Last_Call'][i].status,
          Author: eips[3]['Last_Call'][i].author,
        })
      }

      for (let i = 0; i < eips[4]['Stagnant'].length; i++) {
        arr.push({
          id: inc++,
          Number: eips[4]['Stagnant'][i].eip,
          Title: eips[4]['Stagnant'][i].title,
          Type: eips[4]['Stagnant'][i].type,
          Category:
            eips[4]['Stagnant'][i].type === 'Standards Track'
              ? eips[4]['Stagnant'][i].category
              : `Type - ${eips[4]['Stagnant'][i].type}`,
          status: eips[4]['Stagnant'][i].status,
          Author: eips[4]['Stagnant'][i].author,
        })
      }
      for (let i = 0; i < eips[5]['Withdrawn'].length; i++) {
        arr.push({
          id: inc++,
          Number: eips[5]['Withdrawn'][i].eip,
          Title: eips[5]['Withdrawn'][i].title,
          Type: eips[5]['Withdrawn'][i].type,
          Category:
            eips[5]['Withdrawn'][i].type === 'Standards Track'
              ? eips[5]['Withdrawn'][i].category
              : `Type - ${eips[5]['Withdrawn'][i].type}`,
          status: eips[5]['Withdrawn'][i].status,
          Author: eips[5]['Withdrawn'][i].author,
        })
      }
      for (let i = 0; i < eips[6]['Living'].length; i++) {
        arr.push({
          id: inc++,
          Number: eips[6]['Living'][i].eip,
          Title: eips[6]['Living'][i].title,
          Type: eips[6]['Living'][i].type,
          Category:
            eips[6]['Living'][i].type === 'Standards Track'
              ? eips[6]['Living'][i].category
              : `Type - ${eips[6]['Living'][i].type}`,
          status: eips[6]['Living'][i].status,
          Author: eips[6]['Living'][i].author,
        })
      }
      arr.sort((a, b) => (a.Number > b.Number ? 1 : -1))
    }
    return arr
  }
  // pie config
  const G = G2.getEngine('canvas')
  const pieData = [
    {
      type: 'Living',
      value:
        pieChartData === undefined
          ? 0
          : pieChartData['Living'] === undefined
          ? 0
          : pieChartData['Living']['Standard_Track']['Core'] +
            pieChartData['Living']['Standard_Track']['ERC'] +
            pieChartData['Living']['Standard_Track']['Networking'] +
            pieChartData['Living']['Standard_Track']['Interface'] +
            pieChartData['Living']['Meta'] +
            pieChartData['Living']['Informational'],
    },
    {
      type: 'Final',
      value:
        pieChartData === undefined
          ? 0
          : pieChartData['Final'] === undefined
          ? 0
          : pieChartData['Final']['Standard_Track']['Core'] +
            pieChartData['Final']['Standard_Track']['ERC'] +
            pieChartData['Final']['Standard_Track']['Networking'] +
            pieChartData['Final']['Standard_Track']['Interface'] +
            pieChartData['Final']['Meta'] +
            pieChartData['Final']['Informational'],
    },
    {
      type: 'Last_Call',
      value:
        pieChartData === undefined
          ? 0
          : pieChartData['Last_Call'] === undefined
          ? 0
          : pieChartData['Last_Call']['Standard_Track']['Core'] +
            pieChartData['Last_Call']['Standard_Track']['ERC'] +
            pieChartData['Last_Call']['Standard_Track']['Networking'] +
            pieChartData['Last_Call']['Standard_Track']['Interface'] +
            pieChartData['Last_Call']['Meta'] +
            pieChartData['Last_Call']['Informational'],
    },
    {
      type: 'Review',
      value:
        pieChartData === undefined
          ? 0
          : pieChartData['Review'] === undefined
          ? 0
          : pieChartData['Review']['Standard_Track']['Core'] +
            pieChartData['Review']['Standard_Track']['ERC'] +
            pieChartData['Review']['Standard_Track']['Networking'] +
            pieChartData['Review']['Standard_Track']['Interface'] +
            pieChartData['Review']['Meta'] +
            pieChartData['Review']['Informational'],
    },
    {
      type: 'Draft',
      value:
        pieChartData === undefined
          ? 0
          : pieChartData['Draft'] === undefined
          ? 0
          : pieChartData['Draft']['Standard_Track']['Core'] +
            pieChartData['Draft']['Standard_Track']['ERC'] +
            pieChartData['Draft']['Standard_Track']['Networking'] +
            pieChartData['Draft']['Standard_Track']['Interface'] +
            pieChartData['Draft']['Meta'] +
            pieChartData['Draft']['Informational'],
    },
    {
      type: 'Stagnant',
      value:
        pieChartData === undefined
          ? 0
          : pieChartData['Stagnant'] === undefined
          ? 0
          : pieChartData['Stagnant']['Standard_Track']['Core'] +
            pieChartData['Stagnant']['Standard_Track']['ERC'] +
            pieChartData['Stagnant']['Standard_Track']['Networking'] +
            pieChartData['Stagnant']['Standard_Track']['Interface'] +
            pieChartData['Stagnant']['Meta'] +
            pieChartData['Stagnant']['Informational'],
    },
    {
      type: 'Withdrawn',
      value:
        pieChartData === undefined
          ? 0
          : pieChartData['Withdrawn'] === undefined
          ? 0
          : pieChartData['Withdrawn']['Standard_Track']['Core'] +
            pieChartData['Withdrawn']['Standard_Track']['ERC'] +
            pieChartData['Withdrawn']['Standard_Track']['Networking'] +
            pieChartData['Withdrawn']['Standard_Track']['Interface'] +
            pieChartData['Withdrawn']['Meta'] +
            pieChartData['Withdrawn']['Informational'],
    },
  ]

  // header
  const header = (text) => {
    return (
      <CCardHeader
        className="cardHeader flex"
        style={{
          fontFamily: 'Roboto',
          fontWeight: '800',
          fontSize: '14px',
          color: `${getBadgeColor(text)}`,
          background: `${getBadge(text)}`,
          borderBottom: `2px solid ${getBadgeColor(text)}`,
        }}
      >
        {text}
        {(text === 'EIPs Type & Categories' || text === 'EIPs Status') && (
          <div className="ml-2 bg-white rounded-[0.7rem] text-[10px] flex justify-center items-center px-2">
            {post === undefined
              ? ''
              : post['Core'] +
                post['ERC'] +
                post['Networking'] +
                post['Interface'] +
                post['Meta'] +
                post['Informational']}
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
          color: `${getBadgeColor(text)}`,
          background: `${getBadge(text)}`,
          borderBottom: `2px solid ${getBadgeColor(text)}`,
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
    let ans
    // console.log({ data })
    let list = data.split(',')
    // console.log({ list })
    for (let i = 0; i < list.length; i++) {
      list[i] = list[i].split(' ')
    }
    // console.log({ list })
    if (list[list.length - 1][list[list.length - 1].length - 1] === 'al.') {
      list.pop()
    }
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
        <CCard className="mb-2 cardBorder">
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

    fetchPost()
    fetchDate()
    fetchAllEIPs()
    fetchAllStatus()
    allData()
  }, [])

  // temparary

  return (
    <div>
      {loading ? (
        <div>
          <CRow>
            <CCol xs={matches ? 12 : 6}>
              <CCard style={{ border: '2px solid #a5d8ff' }} className="mb-2 cardBorder">
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
              <CCard style={{ border: '2px solid #a5d8ff' }} className="mb-2 cardBorder">
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
              <CCard style={{ border: '2px solid #a5d8ff' }}>
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
                    items={eipData(eips === undefined ? [] : eips)}
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
                                    {getString(item)}
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
                <CCardFooter
                  className="cardFooter bg-[#e7f5ff] text-[#1c7ed6] border-b-[#1c7ed6] border-b-[2px]"
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  {loading ? (
                    <motion.div
                      style={{ color: '#1c7ed6', fontSize: '15px', fontWeight: 'bold' }}
                      className="flex justify-between items-center"
                      variants={container}
                    >
                      <label>* </label>
                      <motion.div className="ml-2 bg-white px-2 rounded-lg border-[#1c7ed6] border-l-[2px]">
                        <motion.span variants={child} key={1}>
                          Click to see more
                        </motion.span>
                      </motion.div>
                    </motion.div>
                  ) : null}
                  <label style={{ color: '#1c7ed6', fontSize: '10px' }}>{date}</label>
                </CCardFooter>
              </CCard>
            </CCol>
          </CRow>

          <CRow>
            <CCol xs={12} className="mb-4">
              <div
                style={{
                  fontSize: '30px',
                  fontWeight: '400',
                  marginBottom: '00px',
                  backgroundColor: 'white',
                  border: 'none',
                  display: 'inline-block',

                  padding: '14px',
                  borderRadius: '5px',
                  borderLeft: '4px solid #339af0',
                  borderBottom: '2px solid #339af0',
                  marginTop: '2rem',
                }}
              >
                Insights
              </div>
            </CCol>
            <CCol xs={12}>
              <CCard className="mb-2 cardBorder">
                {header('Living')}
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
                  <Line {...monthlyStatusConfig('Living', data)} />
                </CCardBody>
                {footer(date, 'Living')}
              </CCard>
            </CCol>

            <CCol xs={12}>
              <CCard className="mb-2 cardBorder">
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
              <CCard className="mb-2 cardBorder">
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
              <CCard className="mb-2 cardBorder">
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
              <CCard className="mb-2 cardBorder">
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
              <CCard className="mb-2 cardBorder">
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
              <CCard className="mb-2 cardBorder">
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
          <CRow>
            <CCol xs={12} className="mb-4">
              <div
                style={{
                  fontSize: '30px',
                  fontWeight: '400',
                  marginBottom: '00px',
                  backgroundColor: 'white',
                  border: 'none',
                  display: 'inline-block',
                  padding: '14px',
                  borderRadius: '5px',
                  borderLeft: '4px solid #339af0',
                  borderBottom: '2px solid #339af0',
                  marginTop: '2rem',
                }}
              >
                Yearly Insights
              </div>
            </CCol>

            {/* Yearly Insights */}
            {yearlyInsights(4, 'Draft', yearlyDraftConfig)}
            {yearlyInsights(4, 'Final', yearlyFinalConfig)}
            {yearlyInsights(4, 'Review', yearlyReviewConfig)}
            {yearlyInsights(6, 'Last Call', yearlyLastCallConfig)}
            {yearlyInsights(6, 'Stagnant', yearlyStagnantConfig)}
            {yearlyInsights(6, 'Withdrawn', yearlyWithdrawnConfig)}
            {yearlyInsights(6, 'Living', yearlyLivingConfig)}
          </CRow>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default Dashboard
