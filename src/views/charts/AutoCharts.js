/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */

import React, { useEffect, useMemo, useState } from 'react'
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
  const [eips, setEips] = useState([])
  const [eip, setEip] = useState()

  const API = `${ip}/allInfo`
  const fetchAllEIps = async (ignore) => {
    const data = await fetch(API)
    const post = await data.json()

    if (!ignore) {
      setEip(post)
    }
  }

  const API4 = `${ip}/getAll`
  const fetchAllData = async (ignore) => {
    const data = await fetch(API4)
    const post = await data.json()

    if (!ignore) {
      let eips = factorOutDuplicate(Object.values(post[0]))
      const list = param.id.split('-')
      const att = list[0][0].toUpperCase() + list[0].slice(1, 3)
      const y = list[1]

      setMonthName(list[0])
      setMonth(monthNum[list[0]])
      setYear(y)

      let filterData = eips.filter((eip) => {
        if (eip['merge_date'] !== undefined) {
          let splitIt = eip['merge_date'].split(',')
          let monthYear = splitIt[0].substring(0, 3) + ' ' + splitIt[1].trim()
          return monthYear === att + ' ' + y
        } else {
          if (eip.date === undefined) return false
          let splitIt = eip.date.split(' ')
          let monthYear = splitIt[1] + ' ' + splitIt[3]
          return monthYear === att + ' ' + y
        }
      })

      setEips(filterData)
      setLoading(true)
    }
  }

  const dataCapture = (name, data) => {
    let arr = []

    let coreItem = allDatas[statusIndex(name)].data.filter(
      (e) => e.type === 'Standards Track' && e.category === 'Core',
    )
    let ercItem = allDatas[statusIndex(name)].data.filter(
      (e) => e.type === 'Standards Track' && e.category === 'ERC',
    )
    let networkingItem = allDatas[statusIndex(name)].data.filter(
      (e) => e.type === 'Standards Track' && e.category === 'Networking',
    )
    let interfaceItem = allDatas[statusIndex(name)].data.filter(
      (e) => e.type === 'Standards Track' && e.category === 'Interface',
    )
    let metaItem = allDatas[statusIndex(name)].data.filter((e) => e.type === 'Meta')
    let infoItem = allDatas[statusIndex(name)].data.filter((e) => e.type === 'Informational')
    arr.push(
      {
        type: 'Core',
        value: coreItem.length,
      },
      {
        type: 'ERC',
        value: ercItem.length,
      },
      {
        type: 'Networking',
        value: networkingItem.length,
      },
      {
        type: 'Interface',
        value: interfaceItem.length,
      },
      {
        type: 'Meta',
        value: metaItem.length,
      },
      {
        type: 'Informational',
        value: infoItem.length,
      },
    )
    return arr
  }

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

  const annotations = []

  function draftvsFinalData() {
    let FinalData = allDatas[statusIndex('Final')].data
    let DraftData = allDatas[statusIndex('Draft')].data

    let FinalCoreData = FinalData.filter(
      (item) => item.type === 'Standards Track' && item.category === 'Core',
    )
    let FinalERCData = FinalData.filter(
      (item) => item.type === 'Standards Track' && item.category === 'ERC',
    )
    let FinalNetworkingData = FinalData.filter(
      (item) => item.type === 'Standards Track' && item.category === 'Networking',
    )
    let FinalInterfaceData = FinalData.filter(
      (item) => item.type === 'Standards Track' && item.category === 'Interface',
    )
    let FinalMeta = FinalData.filter((item) => item.type === 'Meta')
    let FinalInformational = FinalData.filter((item) => item.type === 'Informational')

    let DraftCoreData = DraftData.filter(
      (item) => item.type === 'Standards Track' && item.category === 'Core',
    )
    let DraftERCData = DraftData.filter(
      (item) => item.type === 'Standards Track' && item.category === 'ERC',
    )
    let DraftNetworkingData = DraftData.filter(
      (item) => item.type === 'Standards Track' && item.category === 'Networking',
    )
    let DraftInterfaceData = DraftData.filter(
      (item) => item.type === 'Standards Track' && item.category === 'Interface',
    )
    let DraftMeta = DraftData.filter((item) => item.type === 'Meta')
    let DraftInformational = DraftData.filter((item) => item.type === 'Informational')

    const d1 = [
      {
        year: 'Draft',
        value: DraftCoreData.length,
        type: 'Core',
      },
      {
        year: 'Draft',
        value: DraftERCData.length,
        type: 'ERC',
      },
      {
        year: 'Draft',
        value: DraftNetworkingData.length,
        type: 'Networking',
      },
      {
        year: 'Draft',
        value: DraftInterfaceData.length,
        type: 'Interface',
      },
      {
        year: 'Draft',
        value: DraftMeta.length,
        type: 'Meta',
      },
      {
        year: 'Draft',
        value: DraftInformational.length,
        type: 'Informational',
      },
      {
        year: 'Final',
        value: FinalCoreData.length,
        type: 'Core',
      },
      {
        year: 'Final',
        value: FinalERCData.length,
        type: 'ERC',
      },
      {
        year: 'Final',
        value: FinalNetworkingData.length,
        type: 'Networking',
      },
      {
        year: 'Final',
        value: FinalInterfaceData.length,
        type: 'Interface',
      },
      {
        year: 'Final',
        value: FinalMeta.length,
        type: 'Meta',
      },
      {
        year: 'Final',
        value: FinalInformational.length,
        type: 'Informational',
      },
    ]

    return d1
  }

  each(groupBy(draftvsFinalData, 'year'), (values, k) => {
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
      data: draftvsFinalData(),
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
        className="cardHeader flex tracking-widest text-[1.3rem] font-bold"
        style={{
          color: `${getBadgeColor(text)}`,
          background: `${getBadge(text)}`,
          borderBottom: `2px solid ${getBadgeColor(text)}`,
          fontFamily: 'Big Shoulders Display',
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
                {allDatas[statusIndex(text)].total}
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

  const findTotalValueZero = (name) => {
    return allDatas[statusIndex(name)].total
  }
  // for date fetching
  const fetchDate = () => {
    let date = new Date().toDateString()
    setDate(date)
  }

  // status charts
  const statusChartsTemplate = (status, ChartType, configChartType) => {
    return (
      <CCard className="mb-4 cardBorder shadow-md">
        <Link
          to="/chartTable"
          style={{ textDecoration: 'none', color: 'inherit', zIndex: 3 }}
          state={{
            data: allDatas[statusIndex(status)].data,
            status: status,
            name: `${monthName}_${year}_${status}`,
            eips: eip === undefined ? eip : eip[3]['Last_Call'],
          }}
        >
          {header(status)}
        </Link>
        <CCardBody className="childChartContainer">
          {findTotalValueZero(status) === 0 ? (
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
              visibility: `${findTotalValueZero(status) === 0 ? 'hidden' : 'visible'}`,
            }}
            {...configChartType(status)}
          />
        </CCardBody>
      </CCard>
    )
  }
  // had to be external
  function statusIndex(name) {
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
                  data: allDatas[statusIndex(name)].data,
                  status: name,
                  name: `${monthName}_${year}_${name}`,
                  eips: eip === undefined ? eip : eip[3]['Last_Call'],
                }}
              >
                {allDatas[statusIndex(name)].total}*
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

  function distributeData(data) {
    let arr = []
    // Types
    if (data.length !== 0) {
      let coreData = data.filter(
        (item) => item.category === 'Core' && item.type === 'Standards Track',
      )
      let ercData = data.filter(
        (item) => item.category === 'ERC' && item.type === 'Standards Track',
      )
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
    }

    return arr
  }

  const allDatas = useMemo(() => distributeData(eips), [eips])

  // for duplicate fetching...

  useEffect(() => {
    let ignore = false
    fetchDate()
    if (param['*'] === 'autoCharts') {
      setClick1Function(false)
      setClick2Function(false)
      setClick3Function(false)
    }
    // allData()
    fetchAllEIps(ignore)
    fetchAllData(ignore)

    return () => {
      ignore = true
    }
    // allDataFetcher()
    // setInfo(localStorage.getItem('count'))
  }, [param['*']])

  return (
    <>
      {loading ? (
        eips.length === 0 ? (
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
                          {parseInt(allDatas[statusIndex('Final')].total) === 0
                            ? ''
                            : StatusTableRow('Final', month, year, monthName)}
                          {parseInt(allDatas[statusIndex('Last_Call')].total) === 0
                            ? ''
                            : StatusTableRow('Last_Call', month, year, monthName)}
                          {parseInt(allDatas[statusIndex('Review')].total) === 0
                            ? ''
                            : StatusTableRow('Review', month, year, monthName)}
                          {parseInt(allDatas[statusIndex('Draft')].total) === 0
                            ? ''
                            : StatusTableRow('Draft', month, year, monthName)}

                          {parseInt(allDatas[statusIndex('Stagnant')].total) === 0
                            ? ''
                            : StatusTableRow('Stagnant', month, year, monthName)}
                          {parseInt(allDatas[statusIndex('Withdrawn')].total) === 0
                            ? ''
                            : StatusTableRow('Withdrawn', month, year, monthName)}
                          {parseInt(allDatas[statusIndex('Living')].total) === 0
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
                    {...configgeneralStatsChart)}
                  />
                </CCardBody>
              </CCard>
            </CCol> */}

              {/* status Charts */}

              <CCol xs={matches ? 12 : 6}>
                {statusChartsTemplate('Final', Pie, configPieCharts)}
              </CCol>

              <CCol xs={matches ? 12 : 6}>
                {statusChartsTemplate('Last_Call', Area, configAreaCharts)}
              </CCol>

              <CCol xs={matches ? 12 : 6}>
                {statusChartsTemplate('Review', Pie, configDougnutChart)}
              </CCol>

              <CCol xs={matches ? 12 : 6}>
                {statusChartsTemplate('Draft', Column, configColumnCharts)}
              </CCol>

              <CCol xs={matches ? 12 : 6}>
                {statusChartsTemplate('Stagnant', Pie, configPieCharts)}
              </CCol>

              <CCol xs={matches ? 12 : 6}>
                {statusChartsTemplate('Withdrawn', Column, configColumnCharts)}
              </CCol>

              <CCol xs={matches ? 12 : 6}>
                {statusChartsTemplate('Living', Column, configColumnCharts)}
              </CCol>

              {/* Final vs Draft */}
              <CCol xs={matches ? 12 : 6}>
                <CCard className="mb-4 cardBorder">
                  <CCardHeader
                    className="cardHeader flex tracking-widest text-[1.3rem] font-bold"
                    style={{
                      color: `${coloring('text')}`,
                      background: `${coloring('back')}`,
                      borderBottom: '2px solid #74c0fc',
                      fontFamily: 'Big Shoulders Display',
                    }}
                  >
                    Final vs Draft
                  </CCardHeader>
                  <CCardBody className="childChartContainer">
                    {allDatas[statusIndex('Final')].total === 0 &&
                    allDatas[statusIndex('Draft')].total === 0 ? (
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
                    {...configDraftvsFinalChart)}
                  /> */}
                    <Column
                      style={{
                        visibility: `${
                          allDatas[statusIndex('Final')].total === 0 &&
                          allDatas[statusIndex('Draft')].total === 0
                            ? 'hidden'
                            : 'visible'
                        }`,
                      }}
                      {...configDraftvsFinalCharts()}
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
