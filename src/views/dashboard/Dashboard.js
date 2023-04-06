/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useMemo } from 'react'
import { CSmartTable } from '@coreui/react-pro'
import { CBadge, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CRow } from '@coreui/react'

import { Link, useParams } from 'react-router-dom'
import { ip, TypeColors } from 'src/constants'
import useMediaQuery from 'src/scss/useMediaQuery'
import { Column, Pie, G2, Line } from '@ant-design/plots'
import { each, groupBy } from '@antv/util'
import './Dashboard.css'

import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'

import Loading from '../theme/loading/loading'
import { defaults } from 'chart.js'

const Dashboard = ({ getAllData }) => {
  const dispatch = useDispatch()

  const [data, setData] = useState()
  const [duplicateData, setDuplicateData] = useState()
  const [date, setDate] = useState()
  const [loading, setLoading] = useState(false)
  const [AllData, setAllData] = useState([])

  const [years, setYears] = useState()

  const matches = useMediaQuery('(max-width: 767px)')
  const matches1 = useMediaQuery('(max-width: 950px)')

  const [eips, setEips] = useState([])
  const [eip, setEip] = useState()

  const API2 = `${ip}/allInfo`
  const fetchAllEIps = async (ignore) => {
    const data = await fetch(API2)
    const post = await data.json()

    if (!ignore) {
      setEip(post)
    }
  }

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
    console.log("data sent")
    console.log(post)

    dispatch({ type: 'FETCH_GETALL_SUCCESS', payload: post })

    if (!ignore) {
      let arr = Object.values(post[0])
      arr.shift()
      setDuplicateData(arr)
      setAllData(factorOutDuplicate(Object.values(post[0])))
      setEips(factorOutDuplicate(Object.values(post[0])))
      setLoading(true)
    }
  }

  const fetchDate = () => {
    let date = new Date().toDateString()
    setDate(date)
  }

  function AllMonthsGetAllAPI() {
    let allMOnths = []
    for (let i = 0; i < AllData.length; i++) {
      if (AllData[i].merge_date !== undefined) {
        let splitIt = AllData[i].merge_date.split(',')
        //
        allMOnths.push(splitIt[0].substring(0, 3) + ' ' + splitIt[1].trim())
      } else {
        if (AllData[i].date !== undefined) {
          let splitIt = AllData[i].date.split(' ')
          allMOnths.push(splitIt[1] + ' ' + splitIt[3])
        }
      }
    }

    return allMOnths
  }
  function AllYearsGetAllAPI() {
    let allYears = []
    for (let i = 0; i < AllData.length; i++) {
      if (AllData[i].merge_date !== undefined) {
        let splitIt = AllData[i].merge_date.split(',')
        allYears.push(splitIt[1].trim())
      } else {
        if (AllData[i].date !== undefined) {
          let splitIt = AllData[i].date.split(' ')
          allYears.push(splitIt[3])
        }
      }
    }

    return [...new Set(allYears)]
  }

  function StandardsTrackYearsCollection(statusNum, allYears, i, type) {
    //
    return statusNum.filter((item) => {
      if (item.merge_date !== undefined) {
        let splitIt = item.merge_date.split(',')
        return (
          splitIt[1].trim() === allYears[i] &&
          item.type === 'Standards Track' &&
          item.category === type
        )
      } else {
        if (item.date !== undefined) {
          let splitIt = item.date.split(' ')
          return (
            splitIt[3] === allYears[i] && item.type === 'Standards Track' && item.category === type
          )
        }
      }
    })
  }
  function ExtraYearsCollection(statusNum, allYears, i, type) {
    //
    return statusNum.filter((item) => {
      if (item.merge_date !== undefined) {
        let splitIt = item.merge_date.split(',')
        return splitIt[1].trim() === allYears[i] && item.type === type
      } else {
        if (item.date !== undefined) {
          let splitIt = item.date.split(' ')
          return splitIt[3] === allYears[i] && item.type === type
        }
      }
    })
  }

  const fetchArrayYearWise = (name) => {
    let arr = []
    let yearList = AllYearsGetAllAPI()

    const allData = distributeData(AllData)
    const statusNum = {
      Living: allData[6].data,
      Final: allData[7].data,
      'Last Call': allData[8].data,
      Review: allData[9].data,
      Draft: allData[10].data,
      Stagnant: allData[11].data,
      Withdrawn: allData[12].data,
    }

    for (let i = 0; i < yearList.length; i++) {
      let sumCore = StandardsTrackYearsCollection(statusNum[name], yearList, i, 'Core').length
      let sumERC = StandardsTrackYearsCollection(statusNum[name], yearList, i, 'ERC').length
      let sumNetworking = StandardsTrackYearsCollection(
        statusNum[name],
        yearList,
        i,
        'Networking',
      ).length
      let sumInterface = StandardsTrackYearsCollection(
        statusNum[name],
        yearList,
        i,
        'Interface',
      ).length

      let meta = ExtraYearsCollection(statusNum[name], yearList, i, 'Meta').length
      let informational = ExtraYearsCollection(statusNum[name], yearList, i, 'Informational').length

      arr.push(
        {
          year: yearList[i],
          value: sumCore,
          type: 'Core',
        },
        {
          year: yearList[i],
          value: sumERC,
          type: 'ERC',
        },
        {
          year: yearList[i],
          value: sumNetworking,
          type: 'Networking',
        },
        {
          year: yearList[i],
          value: sumInterface,
          type: 'Interface',
        },
        {
          year: yearList[i],
          value: meta,
          type: 'Meta',
        },
        {
          year: yearList[i],
          value: informational,
          type: 'Informational',
        },
      )
    }
    // arr.reverse()
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

    return arr
  }

  const allData = useMemo(() => distributeData(eips), [eips])

  const totalData = (name) => {
    switch (name) {
      case 'Living':
        return 6
      case 'Final':
        return 7
      case 'Last_Call':
        return 8
      case 'Review':
        return 9
      case 'Draft':
        return 10
      case 'Stagnant':
        return 11
      case 'Withdrawn':
        return 12
      default:
        return 0
    }
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
        fill: 'rgba(0,0,0,0.4)',
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

  function StandardsTrackDataCollection(statusNum, allMonths, i, type) {
    return statusNum.filter((item) => {
      if (item.merge_date !== undefined) {
        let splitIt = item.merge_date.split(',')
        return (
          splitIt[0].substring(0, 3) + ' ' + splitIt[1].trim() === allMonths[i] &&
          item.type === 'Standards Track' &&
          item.category === type
        )
      } else {
        if (item.date !== undefined) {
          let splitIt = item.date.split(' ')
          return (
            splitIt[1] + ' ' + splitIt[3] === allMonths[i] &&
            item.type === 'Standards Track' &&
            item.category === type
          )
        }
      }
    })
  }
  function ExtraDataCollection(statusNum, allMonths, i, type) {
    return statusNum.filter((item) => {
      if (item.merge_date !== undefined) {
        let splitIt = item.merge_date.split(',')
        return (
          splitIt[0].substring(0, 3) + ' ' + splitIt[1].trim() === allMonths[i] &&
          item.type === type
        )
      } else {
        if (item.date !== undefined) {
          let splitIt = item.date.split(' ')
          return splitIt[1] + ' ' + splitIt[3] === allMonths[i] && item.type === type
        }
      }
    })
  }

  function statusUpdateFirstTime(allData, statusData) {
    let ans = []
    for (let i = 0; i < statusData.length; i++) {
      let eip = statusData[i]
      let arr = allData.filter((e) => {
        let status = e.status === 'Active' ? 'Living' : e.status
        return e.eip === eip.eip && status === eip.status
      })
      ans.push(arr[arr.length - 1])
    }
    return ans
  }

  // monthly Insights

  const draftDataFinding = (name, data) => {
    const allData = distributeData(AllData)
    const statusNum = {
      Living: allData[6].data,
      Final: allData[7].data,
      'Last Call': allData[8].data,
      Review: allData[9].data,
      Draft: allData[10].data,
      Stagnant: allData[11].data,
      Withdrawn: allData[12].data,
    }
    //
    //

    let filterDataStatusUpdate = statusUpdateFirstTime(duplicateData, statusNum[name])
    //

    const allMonths = [...new Set(AllMonthsGetAllAPI())]

    // allMonths.reverse()

    let arr = []
    for (let i = 0; i < allMonths.length; i++) {
      let core = StandardsTrackDataCollection(filterDataStatusUpdate, allMonths, i, 'Core').length
      let erc = StandardsTrackDataCollection(filterDataStatusUpdate, allMonths, i, 'ERC').length
      let networking = StandardsTrackDataCollection(
        filterDataStatusUpdate,
        allMonths,
        i,
        'Networking',
      ).length
      let Interface = StandardsTrackDataCollection(
        filterDataStatusUpdate,
        allMonths,
        i,
        'Interface',
      ).length
      let meta = ExtraDataCollection(filterDataStatusUpdate, allMonths, i, 'Meta').length
      let informational = ExtraDataCollection(
        filterDataStatusUpdate,
        allMonths,
        i,
        'Informational',
      ).length

      arr.push(
        {
          name: 'Core',
          year: allMonths[i],
          gdp: core,
        },
        {
          name: 'ERC',
          year: allMonths[i],
          gdp: erc,
        },
        {
          name: 'Networking',
          year: allMonths[i],
          gdp: networking,
        },
        {
          name: 'Interface',
          year: allMonths[i],
          gdp: Interface,
        },
        {
          name: 'Meta',
          year: allMonths[i],
          gdp: meta,
        },
        {
          name: 'Informational',
          year: allMonths[i],
          gdp: informational,
        },
      )
    }

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

  const yearlyDraftConfig = {
    data: fetchArrayYearWise('Draft'),
    color: TypeColors,
    isStack: true,
    xField: 'year',
    yField: 'value',
    seriesField: 'type',
    label: false,

    annotations: fetchAnnotations(fetchArrayYearWise('Draft')),
  }
  const yearlyFinalConfig = {
    data: fetchArrayYearWise('Final'),
    color: TypeColors,
    isStack: true,
    xField: 'year',
    yField: 'value',
    seriesField: 'type',
    label: false,

    annotations: fetchAnnotations(fetchArrayYearWise('Final')),
  }
  const yearlyReviewConfig = {
    data: fetchArrayYearWise('Review'),
    color: TypeColors,
    isStack: true,
    xField: 'year',
    yField: 'value',
    seriesField: 'type',

    label: false,

    annotations: fetchAnnotations(fetchArrayYearWise('Review')),
  }

  const yearlyLastCallConfig = {
    data: fetchArrayYearWise('Last Call'),
    color: TypeColors,
    isStack: true,
    xField: 'year',
    yField: 'value',
    seriesField: 'type',
    label: false,

    annotations: fetchAnnotations(fetchArrayYearWise('Last Call')),
  }

  const yearlyStagnantConfig = {
    data: fetchArrayYearWise('Stagnant'),
    color: TypeColors,
    isStack: true,
    xField: 'year',
    yField: 'value',
    seriesField: 'type',
    label: false,

    annotations: fetchAnnotations(fetchArrayYearWise('Stagnant')),
  }
  const yearlyWithdrawnConfig = {
    data: fetchArrayYearWise('Withdrawn'),
    color: TypeColors,
    isStack: true,
    xField: 'year',
    yField: 'value',
    seriesField: 'type',
    label: false,

    annotations: fetchAnnotations(fetchArrayYearWise('Withdrawn')),
  }
  const yearlyLivingConfig = {
    data: fetchArrayYearWise('Living'),
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

    annotations: fetchAnnotations(fetchArrayYearWise('Living')),
  }

  // smart chart
  const columns = [
    {
      key: 'Number',
      _style: { width: '7%', color: '#1c7ed6', backgroundColor: '#e7f5ff' },
      _props: { className: 'fw-semibold' },
      sorter: true,
    },
    {
      key: 'Title',
      _style: {
        width: '38%',
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

  const eipData = (eips) => {
    let arr = []

    let defaultStatus = {
      Draft: 'Draft',
      'Last Call': 'Last Call',
      Review: 'Review',
      Final: 'Final',
      Stagnant: 'Stagnant',
      Withdrawn: 'Withdrawn',
      Living: 'Living',
    }
    let changeStatus = {
      Active: 'Living',
      Accepted: 'Final',
      Abandoned: 'Withdrawn',
      Deferred: 'Stagnant',
      Superseded: 'Final',
    }

    let inc = 0

    for (let i = 0; i < eips.length; i++) {
      if (eips[i]['merge_date'] === undefined) {
      }
    }
    for (let i = 0; i < eips.length; i++) {
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
            status:
              defaultStatus[eips[i].status] === undefined
                ? changeStatus[eips[i].status.trim()]
                : defaultStatus[eips[i].status],

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
    //
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
            {/* {AllData.length} */}
            {allData[0].total + allData[1].total + allData[2].total + allData[3].total + allData[4].total + allData[5].total}
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
    let list = data.split(',')
    //
    // for (let i = 0; i < list.length; i++) {
    //   list[i] = list[i].split(' ')
    // }
    // //
    // if (list[list.length - 1][list[list.length - 1].length - 1] === 'al.') {
    //   list.pop()
    // }
    return list
  }

  // yearly Draft Component
  const yearlyInsights = (col, title, configName) => {
    return (
      <CCol xs={matches ? 12 : col}>
        <CCard className="card-container">
          {/* <Link to="/statusAll">{header(title)}</Link>
           */}
           <Link
          to={`/${title}`}
          className="cursor-pointer"
          style={{ textDecoration: 'none', color: 'inherit' }}
          state={{
            type: '',
            status: title,
            category: '',
            name: `${title}`,
            data: allData[totalData(title)].data,
            eips: eip[3]['Last_Call'],
          }}
        >{header(title)}
        </Link>
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
    fetchDate(ignore)

    fetchAllData(ignore)
    fetchAllEIps()
    return () => {
      ignore = true
    }
  }, [])

  //redux test
  console.log(getAllData)
  // temparary

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
                    height: '540px',
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
                    itemsPerPage={7}
                    pagination
                    onRowClick={(t) => { }}
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
                                    href={`${item[item.length - 1].substring(
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
                            href={`https://github.com/ethereum/EIPs/pull/${item['PR No.'] === 0 ? item.Number : item['PR No.']
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
                      // striped: true,
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
                  {/* <Link to="/statusAll">{header('Living')}</Link> */}
                  <Link
          to="/living"
          className="cursor-pointer"
          style={{ textDecoration: 'none', color: 'inherit' }}
          state={{
            type: '',
            status: 'Living',
            category: '',
            name: 'Living',
            data: allData[totalData(`Living`)].data,
            eips: eip[3]['Last_Call'],
          }}
        >{header('Living')}
        </Link>
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
                <Link
          to="/final"
          className="cursor-pointer"
          style={{ textDecoration: 'none', color: 'inherit' }}
          state={{
            type: '',
            status: 'Final',
            category: '',
            name: 'Final',
            data: allData[totalData(`Final`)].data,
            eips: eip[3]['Last_Call'],
          }}
        >{header('Final')}
        </Link>
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
                  {/* <Link to="/statusAll">{header('Last Call')}</Link> */}
                  <Link
          to="/lastCall"
          className="cursor-pointer"
          style={{ textDecoration: 'none', color: 'inherit' }}
          state={{
            type: '',
            status: 'Last Call',
            category: '',
            name: 'Last Call',
            data: allData[totalData(`Last_Call`)].data,
            eips: eip[3]['Last_Call'],
          }}
        >{header('Last Call')}
        </Link>
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
                    <Line {...monthlyStatusConfig('Last Call', data)} />
                  </CCardBody>
                  {footer(date, 'Last_Call')}
                </CCard>
              </CCol>

              <CCol xs={12}>
                <CCard className="card-container">
                  {/* <Link to="/statusAll">{header('Review')}</Link> */}
                  <Link
          to="/review"
          className="cursor-pointer"
          style={{ textDecoration: 'none', color: 'inherit' }}
          state={{
            type: '',
            status: 'Review',
            category: '',
            name: 'Review',
            data: allData[totalData(`Review`)].data,
            eips: eip[3]['Last_Call'],
          }}
        >{header('Review')}
        </Link>
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
                  {/* <Link to="/statusAll">{header('Draft')}</Link> */}
                  <Link
          to="/draft"
          className="cursor-pointer"
          style={{ textDecoration: 'none', color: 'inherit' }}
          state={{
            type: '',
            status: 'Draft',
            category: '',
            name: 'Draft',
            data: allData[totalData(`Draft`)].data,
            eips: eip[3]['Last_Call'],
          }}
        >{header('Draft')}
        </Link>
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
                  {/* <Link to="/statusAll">{header('Stagnant')}</Link> */}
                  <Link
          to="/stagnant"
          className="cursor-pointer"
          style={{ textDecoration: 'none', color: 'inherit' }}
          state={{
            type: '',
            status: 'Stagnant',
            category: '',
            name: 'Stagnant',
            data: allData[totalData(`Stagnant`)].data,
            eips: eip[3]['Last_Call'],
          }}
        >{header('Stagnant')}
        </Link>
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
                  {/* <Link to="/statusAll">{header('Withdrawn')}</Link> */}
                  <Link
          to="/withdrawn"
          className="cursor-pointer"
          style={{ textDecoration: 'none', color: 'inherit' }}
          state={{
            type: '',
            status: 'Withdrawn',
            category: '',
            name: 'Withdrawn',
            data: allData[totalData(`Withdrawn`)].data,
            eips: eip[3]['Last_Call'],
          }}
        >{header('Withdrawn')}
        </Link>
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


const mapStateToProps = state => {
  return {
    getAllData: state.getAll
  }
}

export default connect(
  mapStateToProps
)(Dashboard)