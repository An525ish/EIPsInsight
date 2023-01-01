/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */

import React, { useEffect, useState } from 'react'
import github from '../../assets/grey_logo.png'
import { ip, TypeColors } from './../../constants'
import {
  CCard,
  CCardBody,
  CCol,
  CCardHeader,
  CRow,
  CContainer,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import {
  CChartBar,
  CChartDoughnut,
  CChartLine,
  CChartPie,
  CChartPolarArea,
  CChartRadar,
} from '@coreui/react-chartjs'
import 'chartjs-plugin-datalabels'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { DocsCallout } from 'src/components'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

import { element } from 'prop-types'
import { CanvasJS, CanvasJSChart } from 'canvasjs-react-charts'
import useMediaQuery from 'src/scss/useMediaQuery'

import { Column, Pie, G2, Line, Area, Bar, measureTextWidth } from '@ant-design/plots'
import { each, groupBy } from '@antv/util'
import { cilBold } from '@coreui/icons'
import { CBadge, CCardFooter } from '@coreui/react-pro'
import { useUserAuth } from 'src/Context/AuthContext'
import Loading from '../theme/loading/loading'
import Page404 from '../pages/page404/Page404'

const autoCharts = (props) => {
  // const [info, setInfo] = useState()
  const [monthName, setMonthName] = useState()
  const [month, setMonth] = useState()
  const [year, setYear] = useState()
  const [date, setDate] = useState()
  const navigate = useNavigate()
  const param = useParams()
  const [loading, setLoading] = useState(false)
  const monthNum = {
    january: 1,
    february: 2,
    march: 3,
    april: 4,
    may: 5,
    june: 6,
    july: 7,
    august: 8,
    september: 9,
    october: 10,
    november: 11,
    december: 12,
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

  const G = G2.getEngine('canvas')
  let location = useLocation()
  const matches = useMediaQuery('(max-width: 767px)')
  const { click1, click2, click3, setClick1Function, setClick2Function, setClick3Function } =
    useUserAuth()
  let [data, setData] = useState() // i set the data here
  const [AllData, setAllData] = useState() // all data

  const allDataAPI = `${ip}/getAll`

  const allDataFetcher = async () => {
    try {
      const response = await fetch(allDataAPI)
      const data = await response.json()
      const dataValue = Object.values(data[0])

      dataValue.splice(0, 2)
      console.log(dataValue)

      const list = param.id.split('-')
      const att = list[0]
      const y = list[1]

      let filterData = dataValue.filter((element) => {
        if (element.date !== undefined) {
          let elementMergedDate = element.date.split(' ')

          return (
            elementMergedDate[1] === (att.charAt(0).toUpperCase() + att.slice(1)).substring(0, 3) &&
            elementMergedDate[3] === y
          )
        } else if (element.created !== undefined) {
          let elementCreatedDate = element.created.split(',')
          if (elementCreatedDate.length === 1) {
            elementCreatedDate = elementCreatedDate[0].split('-')
          }
          if (elementCreatedDate.length === 1) {
            elementCreatedDate = elementCreatedDate[0].split('/')
          }

          return (
            parseInt(elementCreatedDate[1].trim()) === monthNum[att] && elementCreatedDate[0] === y
          )
        }
      })
      console.log(filterData)
      filterData = factorOutDuplicate(filterData)
      console.log(filterData)
      // console.log(dataValue)
      setAllData(filterData)
      setLoading(true)
    } catch (e) {
      console.log("Can't access " + allDataAPI + ' response. ' + e)
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
      let datas = await res.json()
      const list = param.id.split('-')
      const att = list[0]
      const y = list[1]

      console.log({ att, y })
      setMonthName(list[0])
      setMonth(monthNum[list[0]])
      setYear(y)

      let filterData =
        att.toLowerCase() === 'october' && y === '2022'
          ? [
              {
                _id: { $oid: '6309ef70756fa134910777ed' },
                name: 'October',
                year: '2022',
                summary: {
                  Draft: '9',
                  Final: '1',
                  LastCall: '6',
                  Review: '8',
                  Stagnant: '0',
                  Withdrawn: '0',
                  Living: '0',
                  potentialProposal: '0',
                  SummaryInfo:
                    'In October, we have added 9 new EIPs as Draft. 8 EIPs are available in Review status. 6 EIPs are available in Last Call status. 1 EIP, EIP-2535: Diamonds, Multi-Facet Proxy is promoted to Final status.',
                  HighlightText:
                    'This repo has 3958 Forks and 925 users have put it on the watchlist. Open Pull Request-84 & Issues-26.',
                },
                Draft: { Core: '1', ERC: '8', Networking: '0', Interface: '0' },
                Final: { Core: '0', ERC: '1', Networking: '0', Interface: '0' },
                Review: { Core: '2', ERC: '6', Networking: '0', Interface: '0' },
                LastCall: { Core: '0', ERC: '6', Networking: '0', Interface: '0' },
                Stagnant: { Core: '0', ERC: '0', Networking: '0', Interface: '0' },
                Withdrawn: { Core: '0', ERC: '0', Networking: '0', Interface: '0' },
                Living: { Core: '0', ERC: '0', Networking: '0', Interface: '0' },
                GeneralStats: { OpenPR: '27', MergedPR: '87', ClosedIssues: '8', NewIssues: '1' },
                OtherStats: { Forks: '3958', Users: '925', Authors: '47', Files: '102' },
                __v: { $numberInt: '0' },
              },
            ]
          : att.toLowerCase() === 'november' && y === '2022'
          ? [
              {
                _id: { $oid: '6309ef70756fa134910745ed' },
                name: 'November',
                year: '2022',
                summary: {
                  Draft: '16',
                  Final: '7',
                  LastCall: '6',
                  Review: '6',
                  Stagnant: '34',
                  Withdrawn: '0',
                  Living: '0',
                  potentialProposal: '0',
                  SummaryInfo:
                    'In October, we have added 9 new EIPs as Draft. 8 EIPs are available in Review status. 6 EIPs are available in Last Call status. 1 EIP, EIP-2535: Diamonds, Multi-Facet Proxy is promoted to Final status.',
                  HighlightText:
                    'This repo has 3958 Forks and 925 users have put it on the watchlist. Open Pull Request-84 & Issues-26.',
                },
                Draft: { Core: '4', ERC: '7', Networking: '1', Interface: '4' },
                Final: { Core: '0', ERC: '7', Networking: '0', Interface: '0' },
                Review: { Core: '1', ERC: '5', Networking: '0', Interface: '0' },
                LastCall: { Core: '1', ERC: '4', Networking: '0', Interface: '1' },
                Stagnant: { Core: '12', ERC: '20', Networking: '1', Interface: '1' },
                Withdrawn: { Core: '0', ERC: '0', Networking: '0', Interface: '0' },
                Living: { Core: '0', ERC: '0', Networking: '0', Interface: '0' },
                GeneralStats: { OpenPR: '51', MergedPR: '141', ClosedIssues: '22', NewIssues: '5' },
                OtherStats: { Forks: '3958', Users: '925', Authors: '61', Files: '130' },
                __v: { $numberInt: '0' },
              },
            ]
          : datas.filter((e) => {
              return e.name.toLowerCase() === att.toLowerCase() && e.year === y
            }) // we filter from here

      console.log({ filterData })
      setData(filterData)
      setLoading(true)

      if (!res.status === 200) {
        const error = new Error(res.error)
        throw error
      }
    } catch (err) {}
  }
  const dataCapture = (name, data) => {
    let a = 0
    let b = 0
    let c = 0
    let d = 0
    let arr = []
    for (let i = 0; i < data.length; i++) {
      a += parseInt(data[i][name].Core)
      b += parseInt(data[i][name].ERC)
      c += parseInt(data[i][name].Networking)
      d += parseInt(data[i][name].Interface)
    }
    arr.push(
      {
        type: 'Core',
        value: a,
      },
      {
        type: 'ERC',
        value: b,
      },
      {
        type: 'Networking',
        value: c,
      },
      {
        type: 'Interface',
        value: d,
      },
    )
    return arr
  }
  // const dataCapture = (name, data) => {
  //   let arr = []
  //   const statusList = fetchStatusData(data, name)[1]

  //   arr.push(
  //     {
  //       type: 'Core',
  //       value: statusList[1],
  //     },
  //     {
  //       type: 'ERC',
  //       value: statusList[2],
  //     },
  //     {
  //       type: 'Networking',
  //       value: statusList[3],
  //     },
  //     {
  //       type: 'Interface',
  //       value: statusList[4],
  //     },
  //     {
  //       type: 'Meta',
  //       value: statusList[5],
  //     },
  //     {
  //       type: 'Informational',
  //       value: statusList[6],
  //     },
  //   )

  //   return arr
  // }

  const configColumnCharts = (name, data) => {
    const config = {
      data: dataCapture(name, data),
      color: TypeColors,
      isStack: true,
      xField: 'type',
      yField: 'value',
      seriesField: 'type',
      label: {
        position: 'middle',

        style: {
          fill: '#FFFFFF',
          opacity: 0.8,
          fontSize: 14,
          fontWeight: 800,
        },
      },
      legend: {
        position: 'top-right',
      },
    }

    return config
  }

  const configPieCharts = (name, data) => {
    const config = {
      appendPadding: 10,
      data: dataCapture(name, data),
      angleField: 'value',
      colorField: 'type',
      radius: 0.75,
      legend: false,
      color: TypeColors,
      label: {
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

    return config
  }
  function renderStatistic(containerWidth, text, style) {
    const { width: textWidth, height: textHeight } = measureTextWidth(text, style)
    const R = containerWidth / 2 // r^2 = (w / 2)^2 + (h - offsetY)^2

    let scale = 1

    if (containerWidth < textWidth) {
      scale = Math.min(
        Math.sqrt(
          Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2))),
        ),
        1,
      )
    }

    const textStyleStr = `width:${containerWidth}px;`
    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${
      scale < 1 ? 1 : 'inherit'
    };">${text}</div>`
  }
  const configDougnutChart = (name, data) => {
    const config = {
      appendPadding: 10,
      data: dataCapture(name, data),
      color: TypeColors,
      angleField: 'value',
      colorField: 'type',
      radius: 1,
      innerRadius: 0.64,
      meta: {
        value: {
          formatter: (v) => `${v} ¥`,
        },
      },
      label: {
        type: 'inner',
        offset: '-50%',
        style: {
          textAlign: 'center',
        },
        autoRotate: false,
        content: '{value}',
      },
      statistic: {
        title: {
          offsetY: -4,

          customHtml: (container, view, datum) => {
            const { width, height } = container.getBoundingClientRect()
            const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2))
            const text = datum ? datum.type : 'Total'
            return renderStatistic(d, text, {
              fontSize: 8,
            })
          },
        },
        content: {
          offsetY: 4,
          style: {
            fontSize: '32px',
          },
          customHtml: (container, view, datum, data) => {
            const { width } = container.getBoundingClientRect()
            const text = datum ? `${datum.value}` : `${data.reduce((r, d) => r + d.value, 0)}`
            return renderStatistic(width, text, {
              fontSize: 32,
            })
          },
        },
      },
      interactions: [
        {
          type: 'element-selected',
        },
        {
          type: 'element-active',
        },
        {
          type: 'pie-statistic-active',
        },
      ],
    }
    return config
  }
  const configAreaCharts = (name, data) => {
    const config = {
      data: dataCapture(name, data),
      xField: 'type',
      yField: 'value',
      color: TypeColors,
      xAxis: {
        range: [0, 1],
        tickCount: 5,
      },

      areaStyle: () => {
        return {
          fill: 'l(270) 0:#ffffff 0.5:#da77f2 1:#862e9c',
          shadowColor: '#862e9c',
        }
      },
      line: {
        color: '#862e9c',
      },
    }
    return config
  }

  const factorOutDuplicate = (data) => {
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

  //status Data
  const fetchStatusData = (data, statusName) => {
    let statusData = factorOutDuplicate(data.filter((item) => item.status === statusName))
    let coreData = statusData.filter((item) => item.category === 'Core')
    let ERCData = statusData.filter((item) => item.category === 'ERC')
    let NetworkingData = statusData.filter((item) => item.category === 'Networking')

    let InterfaceData = statusData.filter((item) => item.category === 'Interface')
    let metaData = statusData.filter((item) => item.type === 'Meta')
    let informationalData = statusData.filter((item) => item.type === 'Informational')

    // console.log({ statusData })

    let findArr = [
      statusData.length,
      coreData.length,
      ERCData.length,
      NetworkingData.length,
      InterfaceData.length,
      metaData.length,
      informationalData.length,
    ]
    let res = []
    res.push(statusData)
    res.push(findArr)
    console.log(statusName + ' ' + findArr)
    return res
  }

  const annotations = []

  const d1 = [
    {
      year: 'Draft',
      value: data === undefined || data.length === 0 ? 0 : parseInt(data[0]?.Draft.Core),
      type: 'Core',
    },
    {
      year: 'Draft',
      value: data === undefined || data.length === 0 ? 0 : parseInt(data[0]?.Draft.ERC),
      type: 'ERC',
    },
    {
      year: 'Draft',
      value: data === undefined || data.length === 0 ? 0 : parseInt(data[0]?.Draft.Networking),
      type: 'Networking',
    },
    {
      year: 'Draft',
      value: data === undefined || data.length === 0 ? 0 : parseInt(data[0]?.Draft.Interface),
      type: 'Interface',
    },
    {
      year: 'Final',
      value: data === undefined || data.length === 0 ? 0 : parseInt(data[0]?.Final.Core),
      type: 'Core',
    },
    {
      year: 'Final',
      value: data === undefined || data.length === 0 ? 0 : parseInt(data[0]?.Final.ERC),
      type: 'ERC',
    },
    {
      year: 'Final',
      value: data === undefined || data.length === 0 ? 0 : parseInt(data[0]?.Final.Networking),
      type: 'Networking',
    },
    {
      year: 'Final',
      value: data === undefined || data.length === 0 ? 0 : parseInt(data[0]?.Final.Interface),
      type: 'Interface',
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

  const configDraftvsFinalCharts = (data) => {
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
    return config
  }
  const getBadge = (status) => {
    switch (status) {
      case 'Final':
        return '#c3fae8'
      case 'Last_Call':
        return '#d3f9d8'
      case 'Last Call':
        return '#d3f9d8'
      case 'LastCall':
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
      case 'LastCall':
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

  const header = (text) => {
    return (
      <CCardHeader
        className="cardHeader flex"
        style={{
          color: `${getBadgeColor(text)}`,
          background: `${getBadge(text)}`,
          borderBottom: `2px solid ${getBadgeColor(text)}`,
        }}
      >
        {text === 'GeneralStats' ? 'General Stats' : text === 'LastCall' ? 'Last Call' : text}{' '}
        {text !== 'GeneralStats' && (
          <div className="ml-2 bg-white rounded-[0.6rem] shadow-2xl text-[10px] flex justify-center items-center px-2">
            {text === 'GeneralStats' ? (
              ''
            ) : (
              <label
                style={{ fontWeight: '700', fontFamily: 'Big Shoulders Display' }}
                className="tracking-wider text-[1rem]"
              >
                {parseInt(
                  data === undefined || data.length === 0
                    ? 0
                    : findTotalValueZero(data === undefined || data.length === 0 ? [] : data, text),
                )}
              </label>
            )}
          </div>
        )}
      </CCardHeader>
    )
  }
  const configgeneralStatsCharts = (data) => {
    const config = {
      data: [
        {
          type: 'Open PR',
          value: data.length === 0 ? 0 : parseInt(data[0]?.GeneralStats.OpenPR),
        },
        {
          type: 'Merged PR',
          value: data.length === 0 ? 0 : parseInt(data[0]?.GeneralStats.MergedPR),
        },
        {
          type: 'New Issues',
          value: data.length === 0 ? 0 : parseInt(data[0]?.GeneralStats.NewIssues),
        },
        {
          type: 'closed Issues',
          value: data.length === 0 ? 0 : parseInt(data[0]?.GeneralStats.ClosedIssues),
        },
      ],
      color: ['#228be6', '#66d9e8', '#ffa8a8', '#ffe066', '#e599f7', '#c0eb75'],
      isStack: true,
      xField: 'type',
      yField: 'value',
      seriesField: 'type',
      label: {
        position: 'middle',

        style: {
          fill: '#FFFFFF',
          opacity: 0.8,
          fontSize: 14,
          fontWeight: 800,
        },
      },
      legend: {
        position: 'top-right',
      },
    }

    return config
  }

  const findTotalValueZero = (data, name) => {
    console.log({ data })
    if (data.length !== 0) {
      return (
        parseInt(data === undefined || data.length === 0 ? 0 : data[0][name].Core) +
        parseInt(data === undefined || data.length === 0 ? 0 : data[0][name].ERC) +
        parseInt(data === undefined || data.length === 0 ? 0 : data[0][name].Networking) +
        parseInt(data === undefined || data.length === 0 ? 0 : data[0][name].Interface)
      )
    }
    return 0
  }
  // for date fetching
  const fetchDate = () => {
    let date = new Date().toDateString()
    setDate(date)
  }

  // new set of Data fetching

  // tablerowsStatus
  const statusRows = (name) => {
    return (
      <CTableRow>
        <CTableHeaderCell scope="row">
          <CBadge
            style={{
              color: `${getBadgeColor(name)}`,
              backgroundColor: `${getBadge(name)}`,
              fontSize: '13px',
            }}
          >
            {name}
          </CBadge>
        </CTableHeaderCell>
        <CTableDataCell>
          <label className="relative cursor-pointer">
            <div
              className={`h-7
shadow-2xl font-extrabold rounded-[8px] bg-[${getBadge(name)}] text-[${getBadgeColor(
                name,
              )}] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer`}
              style={{
                color: `${getBadgeColor(name)}`,
                backgroundColor: `${getBadge(name)}`,
              }}
            >
              <Link
                to="/chartTable"
                style={{
                  textDecoration: 'none',

                  color: `${getBadgeColor(name)}`,
                  backgroundColor: `${getBadge(name)}`,
                }}
                className={`githubIcon h-7
shadow-2xl font-extrabold rounded-[8px]  text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer`}
                state={{
                  type: '',
                  status: name,
                  category: '',
                  month: `${month}`,
                  year: `${year}`,
                  name: `${monthName}_${year}_${name}`,
                  data: fetchStatusData(
                    Alldata === undefined || data.length === 0 ? [] : AllData,
                    name,
                  )[0],
                }}
              >
                {
                  fetchStatusData(
                    Alldata === undefined || data.length === 0 ? [] : AllData,
                    name,
                  )[1][0]
                }{' '}
                <label className="text-[8rem]">*</label>
              </Link>
            </div>
            <div
              className={`absolute top-0 right-0 -mr-1 -mt-0 w-2 h-2 rounded-full bg-[${getBadgeColor(
                name,
              )}] animate-ping`}
              style={{
                backgroundColor: `${getBadgeColor(name)}`,
              }}
            ></div>
            <div
              className={`absolute top-0 right-0 -mr-1 -mt-0 w-2 h-2 rounded-full bg-[${getBadgeColor(
                name,
              )}]`}
              style={{
                backgroundColor: `${getBadgeColor(name)}`,
              }}
            ></div>
          </label>
        </CTableDataCell>
      </CTableRow>
    )
  }

  // status charts
  const statusChartsTemplate = (status, ChartType, configChartType) => {
    console.log({ data })
    return (
      <CCard className="mb-4 cardBorder shadow-md">
        <Link
          to="/chartTable"
          style={{ textDecoration: 'none', color: 'inherit' }}
          state={{
            type: '',
            status: status,
            category: '',
            month: `${month}`,
            year: `${year}`,
            name: `${monthName}_${year}_${status}`,
          }}
        >
          {header(status)}
        </Link>
        <CCardBody className="childChartContainer">
          {findTotalValueZero(data === undefined || data.length === 0 ? [] : data, status) === 0 ? (
            <div
              style={{
                textAlign: 'center',
                width: '100%',
                height: '100%',
                position: 'absolute',
                left: '0',
                top: '83px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'rgba(220, 52, 85, 0.5)',
                zIndex: '1',
                fontSize: '26px',
              }}
            >
              <b>No data for you today!</b>
            </div>
          ) : (
            ''
          )}
          <ChartType
            style={{
              visibility: `${
                findTotalValueZero(data === undefined || data.length === 0 ? [] : data, status) ===
                0
                  ? 'hidden'
                  : 'visible'
              }`,
            }}
            {...configChartType(status, data === undefined || data.length === 0 ? [] : data)}
          />
        </CCardBody>
      </CCard>
    )
  }

  function StatusTableRow(name, month, year, monthName) {
    return (
      <CTableRow>
        <CTableHeaderCell scope="row">
          <div className="flex items-center">
            <label
              style={{
                color: `${getBadgeColor(name)}`,
                backgroundColor: `${getBadge(name)}`,
                fontSize: '13px',
              }}
              className="px-2 py-1 rounded-[0.3rem] shadow-md"
            >
              {name}
            </label>
          </div>
        </CTableHeaderCell>
        <CTableDataCell>
          <label className="relative cursor-pointer">
            <div>
              <Link
                to="/chartTable"
                style={{
                  textDecoration: 'none',
                  color: `${getBadgeColor(name)}`,
                  backgroundColor: `${getBadge(name)}`,
                  fontFamily: 'Big Shoulders Display',
                }}
                className={`githubIcon h-7
            shadow-md font-extrabold rounded-[8px] tracking-wider  text-[1rem] flex justify-center items-center min-w-max px-2 drop-shadow-sm cursor-pointer`}
                state={{
                  type: '',
                  status: name,
                  category: '',
                  month: `${month}`,
                  year: `${year}`,
                  name: `${monthName}_${year}_${name}`,
                }}
              >
                {parseInt(
                  data === undefined || data.length === 0
                    ? 0
                    : data[0]?.summary[name === 'Last_Call' ? 'LastCall' : name],
                )}
                *
              </Link>
            </div>
            <div
              className={`absolute top-0 right-0 -mr-1 -mt-0 w-2 h-2 rounded-full bg-[${getBadgeColor(
                name,
              )}] animate-ping`}
              style={{
                backgroundColor: `${getBadgeColor(name)}`,
              }}
            ></div>
            <div
              className={`absolute top-0 right-0 -mr-1 -mt-0 w-2 h-2 rounded-full bg-[${getBadgeColor(
                name,
              )}]`}
              style={{
                backgroundColor: `${getBadgeColor(name)}`,
              }}
            ></div>
          </label>
        </CTableDataCell>
      </CTableRow>
    )
  }

  // for duplicate fetching...

  useEffect(() => {
    fetchDate()
    if (param['*'] === 'autoCharts') {
      setClick1Function(false)
      setClick2Function(false)
      setClick3Function(false)
    }
    allData()
    // allDataFetcher()
    // setInfo(localStorage.getItem('count'))
  }, [param['*']])

  return (
    <>
      {loading ? (
        data.length === 0 || data === undefined ? (
          <Page404 />
        ) : (
          <div>
            <div className="flex justify-center items-center mb-[4rem]">
              <div className="flex justify-center items-center">
                <div
                  className="rotate-[270deg] bg-white text-[2rem] tracking-wider p-2 border-b-[#1c7ed6] border-b-[6px] "
                  style={{ fontFamily: 'Big Shoulders Display' }}
                >
                  {year}
                </div>
                <div
                  className="flex justify-center items-center bg-[#e7f5ff] text-[#1c7ed6] p-2 px-6 text-[5.5rem] shadow-md "
                  style={{ fontFamily: 'Big Shoulders Display' }}
                >
                  {months[month - 1]}{' '}
                </div>
              </div>
            </div>
            (
            <CRow>
              <CCol xs={matches ? 12 : 6}>
                <div className="p-2">
                  <CCard className="shadow-md">
                    <CCardBody
                      style={{
                        overflowX: 'auto',
                        overflowY: 'auto',
                        width: '100%',
                        fontFamily: 'Roboto',
                        fontSize: '15px',
                        borderBottom: '2px solid #74c0fc',
                      }}
                    >
                      <CTable align="middle" responsive>
                        <CTableHead style={{ borderBottom: '2px solid #4dabf7' }}>
                          <CTableRow>
                            <CTableHeaderCell
                              scope="col"
                              style={{ width: '82%', fontFamily: 'Big Shoulders Display' }}
                              className="tracking-wider text-[1.3rem]"
                            >
                              Status
                            </CTableHeaderCell>
                            <CTableHeaderCell
                              scope="col"
                              style={{ width: '18%', fontFamily: 'Big Shoulders Display' }}
                              className="tracking-wider text-[1.3rem]"
                            >
                              Number
                            </CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {parseInt(
                            data === undefined || data.length === 0 ? 0 : data[0]?.summary.Final,
                          ) === 0
                            ? ''
                            : StatusTableRow('Final', month, year, monthName)}
                          {parseInt(
                            data === undefined || data.length === 0 ? 0 : data[0]?.summary.LastCall,
                          ) === 0
                            ? ''
                            : StatusTableRow('Last_Call', month, year, monthName)}
                          {parseInt(
                            data === undefined || data.length === 0 ? 0 : data[0]?.summary.Review,
                          ) === 0
                            ? ''
                            : StatusTableRow('Review', month, year, monthName)}
                          {parseInt(
                            data === undefined || data.length === 0 ? 0 : data[0]?.summary.Draft,
                          ) === 0
                            ? ''
                            : StatusTableRow('Draft', month, year, monthName)}

                          {parseInt(
                            data === undefined || data.length === 0 ? 0 : data[0]?.summary.Stagnant,
                          ) === 0
                            ? ''
                            : StatusTableRow('Stagnant', month, year, monthName)}
                          {parseInt(
                            data === undefined || data.length === 0
                              ? 0
                              : data[0]?.summary.Withdrawn,
                          ) === 0
                            ? ''
                            : StatusTableRow('Withdrawn', month, year, monthName)}
                          {parseInt(
                            data === undefined || data.length === 0 ? 0 : data[0]?.summary.Living,
                          ) === 0
                            ? ''
                            : StatusTableRow('Living', month, year, monthName)}
                        </CTableBody>
                      </CTable>
                    </CCardBody>
                    <CCardFooter
                      className="cardFooter bg-[#e7f5ff] text-[#1c7ed6]"
                      style={{ display: 'flex', justifyContent: 'space-between' }}
                    >
                      <label style={{ color: '#1c7ed6', fontSize: '15px', fontWeight: 'bold' }}>
                        * Click to see more
                      </label>
                      <label
                        style={{
                          color: '#1c7ed6',
                          fontSize: '10px',
                          fontFamily: 'Big Shoulders Display',
                        }}
                        className="tracking-widest text-[0.8rem]"
                      >
                        {date}
                      </label>
                    </CCardFooter>
                  </CCard>
                </div>

                {/* <div className="p-2" style={{ width: matches ? '100%' : '50%' }}>
              <CCol xs={12} className="mb-4">
                <CCard>
                  <CCardBody
                    style={{
                      overflowX: 'auto',
                      overflowY: 'auto',
                      width: '100%',
                      fontFamily: 'Roboto',
                      fontSize: '15px',
                      borderBottom: '2px solid #74c0fc',
                    }}
                    className="shadow-md"
                  >
                    <CTable align="middle" responsive>
                      <CTableHead style={{ borderBottom: '2px solid #4dabf7' }}>
                        <CTableRow>
                          <CTableHeaderCell scope="col" style={{ width: '70%' }}>
                            Other Stats
                          </CTableHeaderCell>
                          <CTableHeaderCell scope="col" style={{ width: '30%' }}>
                            Number
                          </CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        <CTableRow>
                          <CTableHeaderCell scope="row">Forks</CTableHeaderCell>
                          <CTableDataCell>
                            {parseInt(data === undefined || data.length === 0 ? 0 : data[0]?.OtherStats.Forks)}
                          </CTableDataCell>
                        </CTableRow>

                        <CTableRow>
                          <CTableHeaderCell scope="row">Users</CTableHeaderCell>
                          <CTableDataCell>
                            {parseInt(data === undefined || data.length === 0 ? 0 : data[0]?.OtherStats.Users)}
                          </CTableDataCell>
                        </CTableRow>

                        <CTableRow>
                          <CTableHeaderCell scope="row">Authors</CTableHeaderCell>
                          <CTableDataCell>
                            {parseInt(data === undefined || data.length === 0 ? 0 : data[0]?.OtherStats.Authors)}
                          </CTableDataCell>
                        </CTableRow>

                        <CTableRow>
                          <CTableHeaderCell scope="row">Files</CTableHeaderCell>
                          <CTableDataCell>
                            {parseInt(data === undefined || data.length === 0 ? 0 : data[0]?.OtherStats.Files)}
                          </CTableDataCell>
                        </CTableRow>
                      </CTableBody>
                    </CTable>
                  </CCardBody>
                  <CCardFooter
                    className="cardFooter bg-[#e7f5ff] text-[#1c7ed6]"
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <label></label>
                    <label style={{ color: '#1c7ed6', fontSize: '10px' }}>{date}</label>
                  </CCardFooter>
                </CCard>
              </CCol>
            </div> */}
              </CCol>

              {/* <CCol xs={12}>
              <CCard className="mb-4 cardBorder shadow-md">
                {header('GeneralStats')}

                <CCardBody className="childChartContainer">
                  {parseInt(data === undefined || data.length === 0 ? 0 : data[0]?.GeneralStats.OpenPR) === 0 &&
                  parseInt(data === undefined || data.length === 0 ? 0 : data[0]?.GeneralStats.MergePR) === 0 &&
                  parseInt(data === undefined || data.length === 0 ? 0 : data[0]?.GeneralStats.NewIssues) === 0 &&
                  parseInt(data === undefined || data.length === 0 ? 0 : data[0]?.GeneralStats.ClosedIssues) === 0 ? (
                    <div
                      style={{
                        textAlign: 'center',
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        left: '0',
                        top: '83px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'rgba(220, 52, 85, 0.5)',
                        zIndex: '1',
                        fontSize: '26px',
                      }}
                    >
                      <b>No data for you today!</b>
                    </div>
                  ) : (
                    ''
                  )}
                  <Column
                    style={{
                      visibility: `${
                        parseInt(data === undefined || data.length === 0 ? 0 : data[0]?.GeneralStats.OpenPR) === 0 &&
                        parseInt(data === undefined || data.length === 0 ? 0 : data[0]?.GeneralStats.MergePR) === 0 &&
                        parseInt(data === undefined || data.length === 0 ? 0 : data[0]?.GeneralStats.NewIssues) === 0 &&
                        parseInt(data === undefined || data.length === 0 ? 0 : data[0]?.GeneralStats.ClosedIssues) === 0
                          ? 'hidden'
                          : 'visible'
                      }`,
                    }}
                    {...configgeneralStatsCharts(data === undefined || data.length === 0 ? [] : data)}
                  />
                </CCardBody>
              </CCard>
            </CCol> */}

              {/* status Charts */}

              <CCol xs={matches ? 12 : 6}>
                {statusChartsTemplate('Final', Pie, configPieCharts)}
              </CCol>

              <CCol xs={matches ? 12 : 6}>
                {statusChartsTemplate(
                  'LastCall',
                  Area,
                  configAreaCharts,
                  data === undefined || data.length === 0 ? [] : data,
                )}
              </CCol>

              <CCol xs={matches ? 12 : 6}>
                {statusChartsTemplate(
                  'Review',
                  Pie,
                  configDougnutChart,
                  data === undefined || data.length === 0 ? [] : data,
                )}
              </CCol>

              <CCol xs={matches ? 12 : 6}>
                {statusChartsTemplate(
                  'Draft',
                  Column,
                  configColumnCharts,
                  data === undefined || data.length === 0 ? [] : data,
                )}
              </CCol>

              <CCol xs={matches ? 12 : 6}>
                {statusChartsTemplate(
                  'Stagnant',
                  Pie,
                  configPieCharts,
                  data === undefined || data.length === 0 ? [] : data,
                )}
              </CCol>

              <CCol xs={matches ? 12 : 6}>
                {statusChartsTemplate(
                  'Withdrawn',
                  Column,
                  configColumnCharts,
                  data === undefined || data.length === 0 ? [] : data,
                )}
              </CCol>

              <CCol xs={matches ? 12 : 6}>
                {statusChartsTemplate(
                  'Living',
                  Column,
                  configColumnCharts,
                  data === undefined || data.length === 0 ? [] : data,
                )}
              </CCol>

              {/* Final vs Draft */}
              <CCol xs={matches ? 12 : 6}>
                <CCard className="mb-4 cardBorder">
                  <CCardHeader
                    className="cardHeader"
                    style={{
                      color: `${coloring('text')}`,
                      background: `${coloring('back')}`,
                      borderBottom: '2px solid #74c0fc',
                    }}
                  >
                    Final vs Draft
                  </CCardHeader>
                  <CCardBody className="childChartContainer">
                    {parseInt(
                      data === undefined || data.length === 0 ? 0 : data[0]?.summary.Draft,
                    ) === 0 &&
                    parseInt(
                      data === undefined || data.length === 0 ? 0 : data[0]?.summary.Final,
                    ) === 0 ? (
                      <div
                        style={{
                          textAlign: 'center',
                          width: '100%',
                          height: '100%',
                          position: 'absolute',
                          left: '0',
                          top: '83px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          color: 'rgba(220, 52, 85, 0.5)',
                          zIndex: '1',
                          fontSize: '26px',
                        }}
                      >
                        <b>No data for you today!</b>
                      </div>
                    ) : (
                      ''
                    )}

                    {/* <Column
                    style={{
                      visibility: `${
                        fetchStatusData(Alldata === undefined || data.length === 0 ? [] : AllData, 'Draft')[1][0] ===
                          0 &&
                        fetchStatusData(Alldata === undefined || data.length === 0 ? [] : AllData, 'Final')[1][0] === 0
                          ? 'hidden'
                          : 'visible'
                      }`,
                    }}
                    {...configDraftvsFinalCharts(data === undefined || data.length === 0 ? [] : data)}
                  /> */}
                    <Column
                      style={{
                        visibility: `${
                          parseInt(
                            data === undefined || data.length === 0 ? 0 : data[0]?.summary.Draft,
                          ) === 0 &&
                          parseInt(
                            data === undefined || data.length === 0 ? 0 : data[0]?.summary.Final,
                          ) === 0
                            ? 'hidden'
                            : 'visible'
                        }`,
                      }}
                      {...configDraftvsFinalCharts(
                        data === undefined || data.length === 0 ? [] : data,
                      )}
                    />
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </div>
        )
      ) : (
        <Loading />
      )}
    </>
  )
}

export default autoCharts
