/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */

import React, { useEffect, useState } from 'react'
import github from '../../assets/grey_logo.png'
import { ip } from './../../constants'
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

const CurrentMonth = () => {
  const [month, setMonth] = useState()
  const [year, setYear] = useState()
  const [date, setDate] = useState()
  const param = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const G = G2.getEngine('canvas')
  let location = useLocation()
  const matches = useMediaQuery('(max-width: 767px)')
  const { click1, click2, click3, setClick1Function, setClick2Function, setClick3Function } =
    useUserAuth()
  let [data, setData] = useState() // i set the data here
  let [currentMonthData, setCurrentMonthData] = useState()

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

  const fetchCurrentMonthData = async () => {
    const response = await fetch(`${ip}/currentMonth`)
    const data = await response.json()
    console.log(data)
    setCurrentMonthData(data)
    setLoading(true)
  }

  const dataCapture = (name, data) => {
    let a = 0
    let b = 0
    let c = 0
    let d = 0
    let e = 0
    let f = 0
    let arr = []

    console.log(data)
    a = parseInt(fetchStatusCategorySum(data, name, 'Core'))
    b = parseInt(fetchStatusCategorySum(data, name, 'ERC'))
    c = parseInt(fetchStatusCategorySum(data, name, 'Networking'))
    d = parseInt(fetchStatusCategorySum(data, name, 'Interface'))
    e = parseInt(fetchStatusCategorySum(data, name, 'Meta'))
    f = parseInt(fetchStatusCategorySum(data, name, 'Informational'))

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
      {
        type: 'Meta',
        value: e,
      },
      {
        type: 'Informational',
        value: f,
      },
    )

    return arr
  }

  const configColumnCharts = (name, data) => {
    const config = {
      data: dataCapture(name, data),
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

  const configPieCharts = (name, data) => {
    const config = {
      appendPadding: 10,
      data: dataCapture(name, data),
      angleField: 'value',
      colorField: 'type',
      radius: 0.75,
      legend: false,
      color: ['#228be6', '#66d9e8', '#ffa8a8', '#ffe066', '#e599f7', '#c0eb75', '#20c997'],
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
      color: ['#228be6', '#66d9e8', '#ffa8a8', '#ffe066', '#e599f7', '#c0eb75', '#20c997'],
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
      color: ['#228be6', '#66d9e8', '#ffa8a8', '#ffe066', '#e599f7', '#c0eb75', '#20c997'],
      xAxis: {
        range: [0, 1],
        tickCount: 5,
      },
      areaStyle: () => {
        return {
          fill: 'l(270) 0:#ffffff 0.5:#66d9e8 1:#228be6',
        }
      },
    }
    return config
  }

  const configDraftvsPotentialCharts = (data) => {
    const config = {
      data: [
        {
          type: 'Draft',
          value: parseInt(fetchStatusSum(data, 'Draft')),
        },
        {
          type: 'Potential Proposal',
          value: 12,
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

  // draft vs Final Charts
  const annotations = []

  const d1 = [
    {
      year: 'Draft',
      value: currentMonthData === undefined ? 0 : parseInt(currentMonthData[1]?.Core[0]),
      type: 'Core',
    },
    {
      year: 'Draft',
      value: currentMonthData === undefined ? 0 : parseInt(currentMonthData[1]?.ERC[0]),
      type: 'ERC',
    },
    {
      year: 'Draft',
      value: currentMonthData === undefined ? 0 : parseInt(currentMonthData[1]?.Networking[0]),
      type: 'Networking',
    },
    {
      year: 'Draft',
      value: currentMonthData === undefined ? 0 : parseInt(currentMonthData[1]?.Interface[0]),
      type: 'Interface',
    },
    {
      year: 'Draft',
      value: currentMonthData === undefined ? 0 : parseInt(currentMonthData[1]?.Meta[0]),
      type: 'Meta',
    },
    {
      year: 'Draft',
      value: currentMonthData === undefined ? 0 : parseInt(currentMonthData[1]?.Informational[0]),
      type: 'Informational',
    },
    {
      year: 'Final',
      value: currentMonthData === undefined ? 0 : parseInt(currentMonthData[0]?.Core[0]),
      type: 'Core',
    },
    {
      year: 'Final',
      value: currentMonthData === undefined ? 0 : parseInt(currentMonthData[0]?.ERC[0]),
      type: 'ERC',
    },
    {
      year: 'Final',
      value: currentMonthData === undefined ? 0 : parseInt(currentMonthData[0]?.Networking[0]),
      type: 'Networking',
    },
    {
      year: 'Final',
      value: currentMonthData === undefined ? 0 : parseInt(currentMonthData[0]?.Interface[0]),
      type: 'Interface',
    },
    {
      year: 'Final',
      value: currentMonthData === undefined ? 0 : parseInt(currentMonthData[0]?.Interface[0]),
      type: 'Meta',
    },
    {
      year: 'Final',
      value: currentMonthData === undefined ? 0 : parseInt(currentMonthData[0]?.Meta[0]),
      type: 'Meta',
    },
    {
      year: 'Final',
      value: currentMonthData === undefined ? 0 : parseInt(currentMonthData[0]?.Informational[0]),
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
  const configDraftvsFinalCharts = (data) => {
    const config = {
      data: d1,
      color: ['#228be6', '#66d9e8', '#ffa8a8', '#ffe066', '#e599f7', '#c0eb75'],
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

  // header
  const header = (text) => {
    return (
      <CCardHeader
        className="cardHeader"
        style={{
          color: `${getBadgeColor(text)}`,
          background: `${getBadge(text)}`,
          borderBottom: `2px solid ${getBadgeColor(text)}`,
        }}
      >
        {text === 'GeneralStats' ? 'General Stats' : text === 'LastCall' ? 'Last Call' : text}{' '}
        {text === 'GeneralStats' ? (
          ''
        ) : (
          <label style={{ fontWeight: '700' }}>
            {'('}
            {parseInt(
              fetchStatusSum(
                currentMonthData === undefined ? [] : currentMonthData,
                text === 'Last Call' ? 'Last_Call' : text,
              ),
            )}
            {')'}
          </label>
        )}
      </CCardHeader>
    )
  }
  const configgeneralStatsCharts = (data) => {
    const config = {
      data: [
        {
          type: 'Open PR',
          value: 38,
        },
        {
          type: 'Merged PR',
          value: 67,
        },
        {
          type: 'New Issues',
          value: 2,
        },
        {
          type: 'closed Issues',
          value: 9,
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
    if (data.length !== 0) {
      return (
        parseInt(data === undefined ? 0 : data[0][name].Core) +
        parseInt(data === undefined ? 0 : data[0][name].ERC) +
        parseInt(data === undefined ? 0 : data[0][name].Networking) +
        parseInt(data === undefined ? 0 : data[0][name].Interface)
      )
    }
    return 0
  }
  // for date fetching
  const fetchDate = () => {
    let date = new Date().toDateString()
    setDate(date)
  }

  // current Month fetching
  const fetchStatusSum = (monthData, status) => {
    let sum = 0

    for (let i = 0; i < monthData?.length; i++) {
      if (monthData[i].Status === status) {
        sum += parseInt(monthData[i].Core[0]) === -1 ? 0 : parseInt(monthData[i].Core[0])
        sum += parseInt(monthData[i].ERC[0]) === -1 ? 0 : parseInt(monthData[i].ERC[0])
        sum +=
          parseInt(monthData[i].Networking[0]) === -1 ? 0 : parseInt(monthData[i].Networking[0])
        sum += parseInt(monthData[i].Interface[0]) === -1 ? 0 : parseInt(monthData[i].Interface[0])
        sum += parseInt(monthData[i].Meta[0]) === -1 ? 0 : parseInt(monthData[i].Meta[0])
        sum +=
          parseInt(monthData[i].Informational[0]) === -1
            ? 0
            : parseInt(monthData[i].Informational[0])
      }
    }

    return sum
  }

  const fetchStatusCategorySum = (monthData, status, category) => {
    let sum = 0
    for (let i = 0; i < monthData?.length; i++) {
      if (monthData[i].Status === status) {
        sum = parseInt(monthData[i][category][0]) === -1 ? 0 : parseInt(monthData[i][category][0])
      }
    }

    return sum
  }
  useEffect(() => {
    fetchDate()
    if (param['*'] === 'autoCharts') {
      setClick1Function(false)
      setClick2Function(false)
      setClick3Function(false)
    }
    fetchCurrentMonthData()
    // setInfo(localStorage.getItem('count'))
  }, [param['*']])

  return (
    <>
      {loading ? (
        <div>
          <div
            style={{
              fontSize: '40px',
              fontWeight: '800',
              marginBottom: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              // textTransform: 'uppercase',
            }}
          >
            <CCard
              style={{
                display: 'inline-block',
                padding: '2rem',

                borderRadius: '2rem',
                border: '2px solid #1c7ed6',
              }}
            >
              <label className="translate-y-[-205%] w-max text-[1.3rem]  px-[0.6em] text-[#1c7ed6] border-[1px] border-[#1c7ed6] bg-[#e7f5ff] rounded-[10px] relative">
                {currentMonthData === undefined ? '' : currentMonthData[0].Year}
                {/* <div className="absolute top-0 right-0 -mr-1 -mt-0 w-2 h-2 rounded-full bg-[#339af0] animate-ping"></div>
            <div className="absolute top-0 right-0 -mr-1 -mt-0 w-2 h-2 rounded-full bg-[#339af0]"></div> */}
              </label>
              {/* <label className="text-[5rem]">O</label> */}
              <label className="text-[#1c7ed6]">
                {currentMonthData === undefined ? '' : currentMonthData[0].Month}{' '}
              </label>{' '}
              <label className="translate-y-[160%] w-max text-[1.3rem]  px-[0.6em] text-[#1c7ed6] border-[1px] border-[#1c7ed6] bg-[#e7f5ff] rounded-[10px] relative">
                Insights
              </label>
            </CCard>
          </div>

          <div style={{ display: 'flex', flexDirection: matches ? 'column' : 'row' }}>
            <div className="p-2" style={{ width: matches ? '100%' : '50%' }}>
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
                >
                  <CTable align="middle" responsive>
                    <CTableHead style={{ borderBottom: '2px solid #4dabf7' }}>
                      <CTableRow>
                        <CTableHeaderCell scope="col" style={{ width: '70%' }}>
                          Status
                        </CTableHeaderCell>
                        <CTableHeaderCell scope="col" style={{ width: '30%' }}>
                          Number
                        </CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {parseInt(
                        fetchStatusSum(
                          currentMonthData === undefined ? [] : currentMonthData,
                          'Draft',
                        ),
                      ) === 0 ? (
                        ''
                      ) : (
                        <CTableRow>
                          <CTableHeaderCell scope="row">
                            <CBadge
                              style={{
                                color: `${getBadgeColor('Draft')}`,
                                backgroundColor: `${getBadge('Draft')}`,
                                fontSize: '13px',
                              }}
                            >
                              Draft
                            </CBadge>
                          </CTableHeaderCell>
                          <CTableDataCell>
                            <label className="relative cursor-pointer">
                              <div
                                className={`h-7
              shadow-2xl font-extrabold rounded-[8px] bg-[${getBadge(
                'Draft',
              )}] text-[${getBadgeColor(
                                  'Draft',
                                )}] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer`}
                                style={{
                                  color: `${getBadgeColor('Draft')}`,
                                  backgroundColor: `${getBadge('Draft')}`,
                                }}
                              >
                                <Link
                                  to="/currentMonthTable"
                                  style={{
                                    textDecoration: 'none',
                                    color: `${getBadgeColor('Draft')}`,
                                    backgroundColor: `${getBadge('Draft')}`,
                                  }}
                                  className={`githubIcon h-7
              shadow-2xl font-extrabold rounded-[8px]  text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer`}
                                  state={{
                                    status: 'Draft',
                                    name: `${currentMonthData[0].Month}_${currentMonthData[0].Year}_Draft`,
                                  }}
                                >
                                  {parseInt(
                                    fetchStatusSum(
                                      currentMonthData === undefined ? [] : currentMonthData,
                                      'Draft',
                                    ),
                                  )}
                                  *
                                </Link>
                              </div>
                              <div
                                className={`absolute top-0 right-0 -mr-1 -mt-0 w-2 h-2 rounded-full bg-[${getBadgeColor(
                                  'Draft',
                                )}] animate-ping`}
                                style={{
                                  backgroundColor: `${getBadgeColor('Draft')}`,
                                }}
                              ></div>
                              <div
                                className={`absolute top-0 right-0 -mr-1 -mt-0 w-2 h-2 rounded-full bg-[${getBadgeColor(
                                  'Draft',
                                )}]`}
                                style={{
                                  backgroundColor: `${getBadgeColor('Draft')}`,
                                }}
                              ></div>
                            </label>
                          </CTableDataCell>
                        </CTableRow>
                      )}

                      {parseInt(
                        fetchStatusSum(
                          currentMonthData === undefined ? [] : currentMonthData,
                          'Final',
                        ),
                      ) === 0 ? (
                        ''
                      ) : (
                        <CTableRow>
                          <CTableHeaderCell scope="row">
                            <CBadge
                              style={{
                                color: `${getBadgeColor('Final')}`,
                                backgroundColor: `${getBadge('Final')}`,
                                fontSize: '13px',
                              }}
                            >
                              Final
                            </CBadge>
                          </CTableHeaderCell>
                          <CTableDataCell>
                            <label className="relative cursor-pointer">
                              <div
                                className={`h-7
              shadow-2xl font-extrabold rounded-[8px] bg-[${getBadge(
                'Final',
              )}] text-[${getBadgeColor(
                                  'Final',
                                )}] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer`}
                                style={{
                                  color: `${getBadgeColor('Final')}`,
                                  backgroundColor: `${getBadge('Final')}`,
                                }}
                              >
                                <Link
                                  to="/currentMonthTable"
                                  style={{
                                    textDecoration: 'none',

                                    color: `${getBadgeColor('Final')}`,
                                    backgroundColor: `${getBadge('Final')}`,
                                  }}
                                  className={`githubIcon h-7
              shadow-2xl font-extrabold rounded-[8px]  text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer`}
                                  state={{
                                    type: '',
                                    status: 'Final',
                                    category: '',
                                    month: `${month}`,
                                    year: `${year}`,
                                    name: `${currentMonthData[0].Month}_${currentMonthData[0].Year}_Final`,
                                  }}
                                >
                                  {parseInt(
                                    fetchStatusSum(
                                      currentMonthData === undefined ? [] : currentMonthData,
                                      'Final',
                                    ),
                                  )}
                                  *
                                </Link>
                              </div>
                              <div
                                className={`absolute top-0 right-0 -mr-1 -mt-0 w-2 h-2 rounded-full bg-[${getBadgeColor(
                                  'Final',
                                )}] animate-ping`}
                                style={{
                                  backgroundColor: `${getBadgeColor('Final')}`,
                                }}
                              ></div>
                              <div
                                className={`absolute top-0 right-0 -mr-1 -mt-0 w-2 h-2 rounded-full bg-[${getBadgeColor(
                                  'Final',
                                )}]`}
                                style={{
                                  backgroundColor: `${getBadgeColor('Final')}`,
                                }}
                              ></div>
                            </label>
                          </CTableDataCell>
                        </CTableRow>
                      )}

                      {parseInt(
                        fetchStatusSum(
                          currentMonthData === undefined ? [] : currentMonthData,
                          'Review',
                        ),
                      ) === 0 ? (
                        ''
                      ) : (
                        <CTableRow>
                          <CTableHeaderCell scope="row">
                            <CBadge
                              style={{
                                color: `${getBadgeColor('Review')}`,
                                backgroundColor: `${getBadge('Review')}`,
                                fontSize: '13px',
                              }}
                            >
                              Review
                            </CBadge>
                          </CTableHeaderCell>
                          <CTableDataCell>
                            <label className="relative cursor-pointer">
                              <div
                                className={`h-7
              shadow-2xl font-extrabold rounded-[8px] bg-[${getBadge(
                'Review',
              )}] text-[${getBadgeColor(
                                  'Review',
                                )}] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer`}
                                style={{
                                  color: `${getBadgeColor('Review')}`,
                                  backgroundColor: `${getBadge('Review')}`,
                                }}
                              >
                                <Link
                                  to="/currentMonthTable"
                                  style={{
                                    textDecoration: 'none',

                                    color: `${getBadgeColor('Review')}`,
                                    backgroundColor: `${getBadge('Review')}`,
                                  }}
                                  className={`githubIcon h-7
              shadow-2xl font-extrabold rounded-[8px]  text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer`}
                                  state={{
                                    type: '',
                                    status: 'Review',
                                    category: '',
                                    month: `${month}`,
                                    year: `${year}`,
                                    name: `${currentMonthData[0].Month}_${currentMonthData[0].Year}_Review`,
                                  }}
                                >
                                  {parseInt(
                                    fetchStatusSum(
                                      currentMonthData === undefined ? [] : currentMonthData,
                                      'Review',
                                    ),
                                  )}
                                  *
                                </Link>
                              </div>
                              <div
                                className={`absolute top-0 right-0 -mr-1 -mt-0 w-2 h-2 rounded-full bg-[${getBadgeColor(
                                  'Review',
                                )}] animate-ping`}
                                style={{
                                  backgroundColor: `${getBadgeColor('Review')}`,
                                }}
                              ></div>
                              <div
                                className={`absolute top-0 right-0 -mr-1 -mt-0 w-2 h-2 rounded-full bg-[${getBadgeColor(
                                  'Review',
                                )}]`}
                                style={{
                                  backgroundColor: `${getBadgeColor('Review')}`,
                                }}
                              ></div>
                            </label>
                          </CTableDataCell>
                        </CTableRow>
                      )}
                      {parseInt(
                        fetchStatusSum(
                          currentMonthData === undefined ? [] : currentMonthData,
                          'Last_Call',
                        ),
                      ) === 0 ? (
                        ''
                      ) : (
                        <CTableRow>
                          <CTableHeaderCell scope="row">
                            <CBadge
                              style={{
                                color: `${getBadgeColor('Last_Call')}`,
                                backgroundColor: `${getBadge('Last_Call')}`,
                                fontSize: '13px',
                              }}
                            >
                              Last Call
                            </CBadge>
                          </CTableHeaderCell>
                          <CTableDataCell>
                            <label className="relative cursor-pointer">
                              <div
                                className={`h-7
              shadow-2xl font-extrabold rounded-[8px] bg-[${getBadge(
                'Last_Call',
              )}] text-[${getBadgeColor(
                                  'Last_Call',
                                )}] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer`}
                                style={{
                                  color: `${getBadgeColor('Last_Call')}`,
                                  backgroundColor: `${getBadge('Last_Call')}`,
                                }}
                              >
                                <Link
                                  to="/currentMonthTable"
                                  style={{
                                    textDecoration: 'none',

                                    color: `${getBadgeColor('Last_Call')}`,
                                    backgroundColor: `${getBadge('Last_Call')}`,
                                  }}
                                  className={`githubIcon h-7
              shadow-2xl font-extrabold rounded-[8px]  text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer`}
                                  state={{
                                    type: '',
                                    status: 'Last_Call',
                                    category: '',
                                    month: `${month}`,
                                    year: `${year}`,
                                    name: `${currentMonthData[0].Month}_${currentMonthData[0].Year}_Last_Call`,
                                  }}
                                >
                                  {parseInt(
                                    fetchStatusSum(
                                      currentMonthData === undefined ? [] : currentMonthData,
                                      'Last_Call',
                                    ),
                                  )}
                                  *
                                </Link>
                              </div>
                              <div
                                className={`absolute top-0 right-0 -mr-1 -mt-0 w-2 h-2 rounded-full bg-[${getBadgeColor(
                                  'Last_Call',
                                )}] animate-ping`}
                                style={{
                                  backgroundColor: `${getBadgeColor('Last_Call')}`,
                                }}
                              ></div>
                              <div
                                className={`absolute top-0 right-0 -mr-1 -mt-0 w-2 h-2 rounded-full bg-[${getBadgeColor(
                                  'Last_Call',
                                )}]`}
                                style={{
                                  backgroundColor: `${getBadgeColor('Last_Call')}`,
                                }}
                              ></div>
                            </label>
                          </CTableDataCell>
                        </CTableRow>
                      )}
                      {parseInt(
                        fetchStatusSum(
                          currentMonthData === undefined ? [] : currentMonthData,
                          'Stagnant',
                        ),
                      ) === 0 ? (
                        ''
                      ) : (
                        <CTableRow>
                          <CTableHeaderCell scope="row">
                            <CBadge
                              style={{
                                color: `${getBadgeColor('Stagnant')}`,
                                backgroundColor: `${getBadge('Stagnant')}`,
                                fontSize: '13px',
                              }}
                            >
                              Stagnant
                            </CBadge>
                          </CTableHeaderCell>
                          <CTableDataCell>
                            <label className="relative cursor-pointer">
                              <div
                                className={`h-7
              shadow-2xl font-extrabold rounded-[8px] bg-[${getBadge(
                'Stagnant',
              )}] text-[${getBadgeColor(
                                  'Stagnant',
                                )}] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer`}
                                style={{
                                  color: `${getBadgeColor('Stagnant')}`,
                                  backgroundColor: `${getBadge('Stagnant')}`,
                                }}
                              >
                                <Link
                                  to="/currentMonthTable"
                                  style={{
                                    textDecoration: 'none',

                                    color: `${getBadgeColor('Stagnant')}`,
                                    backgroundColor: `${getBadge('Stagnant')}`,
                                  }}
                                  className={`githubIcon h-7
              shadow-2xl font-extrabold rounded-[8px]  text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer`}
                                  state={{
                                    type: '',
                                    status: 'Stagnant',
                                    category: '',
                                    month: `${month}`,
                                    year: `${year}`,
                                    name: `${currentMonthData[0].Month}_${currentMonthData[0].Year}_Stagnant`,
                                  }}
                                >
                                  {parseInt(
                                    fetchStatusSum(
                                      currentMonthData === undefined ? [] : currentMonthData,
                                      'Stagnant',
                                    ),
                                  )}
                                  *
                                </Link>
                              </div>
                              <div
                                className={`absolute top-0 right-0 -mr-1 -mt-0 w-2 h-2 rounded-full bg-[${getBadgeColor(
                                  'Stagnant',
                                )}] animate-ping`}
                                style={{
                                  backgroundColor: `${getBadgeColor('Stagnant')}`,
                                }}
                              ></div>
                              <div
                                className={`absolute top-0 right-0 -mr-1 -mt-0 w-2 h-2 rounded-full bg-[${getBadgeColor(
                                  'Stagnant',
                                )}]`}
                                style={{
                                  backgroundColor: `${getBadgeColor('Stagnant')}`,
                                }}
                              ></div>
                            </label>
                          </CTableDataCell>
                        </CTableRow>
                      )}
                      {parseInt(
                        fetchStatusSum(
                          currentMonthData === undefined ? [] : currentMonthData,
                          'Withdrawn',
                        ),
                      ) === 0 ? (
                        ''
                      ) : (
                        <CTableRow>
                          <CTableHeaderCell scope="row">
                            <CBadge
                              style={{
                                color: `${getBadgeColor('Withdrawn')}`,
                                backgroundColor: `${getBadge('Withdrawn')}`,
                                fontSize: '13px',
                              }}
                            >
                              Withdrawn
                            </CBadge>
                          </CTableHeaderCell>
                          <CTableDataCell>
                            <label className="relative cursor-pointer">
                              <div
                                className={`h-7
              shadow-2xl font-extrabold rounded-[8px] bg-[${getBadge(
                'Withdrawn',
              )}] text-[${getBadgeColor(
                                  'Withdrawn',
                                )}] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer`}
                                style={{
                                  color: `${getBadgeColor('Withdrawn')}`,
                                  backgroundColor: `${getBadge('Withdrawn')}`,
                                }}
                              >
                                <Link
                                  to="/currentMonthTable"
                                  style={{
                                    textDecoration: 'none',

                                    color: `${getBadgeColor('Withdrawn')}`,
                                    backgroundColor: `${getBadge('Withdrawn')}`,
                                  }}
                                  className={`githubIcon h-7
              shadow-2xl font-extrabold rounded-[8px]  text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer`}
                                  state={{
                                    type: '',
                                    status: 'Withdrawn',
                                    category: '',
                                    month: `${month}`,
                                    year: `${year}`,
                                    name: `${currentMonthData[0].Month}_${currentMonthData[0].Year}_Withdrawn`,
                                  }}
                                >
                                  {parseInt(
                                    fetchStatusSum(
                                      currentMonthData === undefined ? [] : currentMonthData,
                                      'Withdrawn',
                                    ),
                                  )}
                                  *
                                </Link>
                              </div>
                              <div
                                className={`absolute top-0 right-0 -mr-1 -mt-0 w-2 h-2 rounded-full bg-[${getBadgeColor(
                                  'Withdrawn',
                                )}] animate-ping`}
                                style={{
                                  backgroundColor: `${getBadgeColor('Withdrawn')}`,
                                }}
                              ></div>
                              <div
                                className={`absolute top-0 right-0 -mr-1 -mt-0 w-2 h-2 rounded-full bg-[${getBadgeColor(
                                  'Withdrawn',
                                )}]`}
                                style={{
                                  backgroundColor: `${getBadgeColor('Withdrawn')}`,
                                }}
                              ></div>
                            </label>
                          </CTableDataCell>
                        </CTableRow>
                      )}
                      {parseInt(
                        fetchStatusSum(
                          currentMonthData === undefined ? [] : currentMonthData,
                          'Living',
                        ),
                      ) === 0 ? (
                        ''
                      ) : (
                        <CTableRow>
                          <CTableHeaderCell scope="row">
                            <CBadge
                              style={{
                                color: `${getBadgeColor('Living')}`,
                                backgroundColor: `${getBadge('Living')}`,
                                fontSize: '13px',
                              }}
                            >
                              Living
                            </CBadge>
                          </CTableHeaderCell>
                          <CTableDataCell>
                            <label className="relative cursor-pointer">
                              <div
                                className={`h-7
              shadow-2xl font-extrabold rounded-[8px] bg-[${getBadge(
                'Living',
              )}] text-[${getBadgeColor(
                                  'Living',
                                )}] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer`}
                                style={{
                                  color: `${getBadgeColor('Living')}`,
                                  backgroundColor: `${getBadge('Living')}`,
                                }}
                              >
                                <Link
                                  to="/currentMonthTable"
                                  style={{
                                    textDecoration: 'none',

                                    color: `${getBadgeColor('Living')}`,
                                    backgroundColor: `${getBadge('Living')}`,
                                  }}
                                  className={`githubIcon h-7
              shadow-2xl font-extrabold rounded-[8px]  text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer`}
                                  state={{
                                    type: '',
                                    status: 'Living',
                                    category: '',
                                    month: `${month}`,
                                    year: `${year}`,
                                    name: `${currentMonthData[0].Month}_${currentMonthData[0].Year}_Living`,
                                  }}
                                >
                                  {parseInt(
                                    fetchStatusSum(
                                      currentMonthData === undefined ? [] : currentMonthData,
                                      'Living',
                                    ),
                                  )}
                                  *
                                </Link>
                              </div>
                              <div
                                className={`absolute top-0 right-0 -mr-1 -mt-0 w-2 h-2 rounded-full bg-[${getBadgeColor(
                                  'Living',
                                )}] animate-ping`}
                                style={{
                                  backgroundColor: `${getBadgeColor('Living')}`,
                                }}
                              ></div>
                              <div
                                className={`absolute top-0 right-0 -mr-1 -mt-0 w-2 h-2 rounded-full bg-[${getBadgeColor(
                                  'Living',
                                )}]`}
                                style={{
                                  backgroundColor: `${getBadgeColor('Living')}`,
                                }}
                              ></div>
                            </label>
                          </CTableDataCell>
                        </CTableRow>
                      )}
                    </CTableBody>
                  </CTable>
                </CCardBody>
                <CCardFooter
                  className="cardFooter bg-[#e7f5ff] text-[#1c7ed6]"
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <label style={{ color: '#1c7ed6', fontSize: '15px', fontWeight: 'bold' }}>
                    *Click to see more
                  </label>
                  <label style={{ color: '#1c7ed6', fontSize: '10px' }}>{date}</label>
                </CCardFooter>
              </CCard>
            </div>
            <div className="p-2" style={{ width: matches ? '100%' : '50%' }}>
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
                          <CTableDataCell>3940</CTableDataCell>
                        </CTableRow>

                        <CTableRow>
                          <CTableHeaderCell scope="row">Users</CTableHeaderCell>
                          <CTableDataCell>925</CTableDataCell>
                        </CTableRow>

                        <CTableRow>
                          <CTableHeaderCell scope="row">Authors</CTableHeaderCell>
                          <CTableDataCell>38</CTableDataCell>
                        </CTableRow>

                        <CTableRow>
                          <CTableHeaderCell scope="row">Files</CTableHeaderCell>
                          <CTableDataCell>95</CTableDataCell>
                        </CTableRow>
                      </CTableBody>
                    </CTable>
                  </CCardBody>
                </CCard>
                <CCardFooter
                  className="cardFooter bg-[#e7f5ff] text-[#1c7ed6]"
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <label></label>
                  <label style={{ color: '#1c7ed6', fontSize: '10px' }}>{date}</label>
                </CCardFooter>
              </CCol>
            </div>
          </div>

          <CRow>
            <CCol xs={12}>
              <CCard className="mb-4 cardBorder">
                {header('GeneralStats')}

                <CCardBody className="childChartContainer">
                  <Column {...configgeneralStatsCharts(data === undefined ? [] : data)} />
                </CCardBody>
              </CCard>
            </CCol>

            {/* status Information */}
            <CCol xs={matches ? 12 : 6}>
              <CCard className="mb-4 cardBorder">
                <Link
                  to="/currentMonthTable"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  state={{
                    type: '',
                    status: 'Draft',
                    category: '',
                    month: `${month}`,
                    year: `${year}`,
                    name: `${currentMonthData[0].Month}_${currentMonthData[0].Year}_Draft`,
                  }}
                >
                  {header('Draft')}
                </Link>
                <CCardBody className="childChartContainer">
                  {parseInt(
                    fetchStatusSum(currentMonthData === undefined ? [] : currentMonthData, 'Draft'),
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
                  <Column
                    style={{
                      visibility: `${
                        parseInt(
                          fetchStatusSum(
                            currentMonthData === undefined ? [] : currentMonthData,
                            'Draft',
                          ),
                        ) === 0
                          ? 'hidden'
                          : 'visible'
                      }`,
                    }}
                    {...configColumnCharts(
                      'Draft',
                      currentMonthData === undefined ? [] : currentMonthData,
                    )}
                  />
                </CCardBody>
              </CCard>
            </CCol>
            <CCol xs={matches ? 12 : 6}>
              <CCard className="mb-4 cardBorder">
                <Link
                  to="/currentMonthTable"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  state={{
                    type: '',
                    status: 'Final',
                    category: '',
                    month: `${month}`,
                    year: `${year}`,
                    name: `${currentMonthData[0].Month}_${currentMonthData[0].Year}_Final`,
                  }}
                >
                  {header('Final')}
                </Link>
                <CCardBody className="childChartContainer">
                  {parseInt(
                    fetchStatusSum(currentMonthData === undefined ? [] : currentMonthData, 'Final'),
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
                  <Pie
                    style={{
                      visibility: `${
                        parseInt(
                          fetchStatusSum(
                            currentMonthData === undefined ? [] : currentMonthData,
                            'Final',
                          ),
                        ) === 0
                          ? 'hidden'
                          : 'visible'
                      }`,
                    }}
                    {...configPieCharts(
                      'Final',
                      currentMonthData === undefined ? [] : currentMonthData,
                    )}
                  />
                </CCardBody>
              </CCard>
            </CCol>
            <CCol xs={matches ? 12 : 6}>
              <CCard className="mb-4 cardBorder">
                <Link
                  to="/currentMonthTable"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  state={{
                    type: '',
                    status: 'Review',
                    category: '',
                    month: `${month}`,
                    year: `${year}`,
                    name: `${currentMonthData[0].Month}_${currentMonthData[0].Year}_Review`,
                  }}
                >
                  {header('Review')}
                </Link>
                <CCardBody className="childChartContainer">
                  {parseInt(
                    fetchStatusSum(
                      currentMonthData === undefined ? [] : currentMonthData,
                      'Review',
                    ),
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
                  <Pie
                    style={{
                      visibility: `${
                        parseInt(
                          fetchStatusSum(
                            currentMonthData === undefined ? [] : currentMonthData,
                            'Review',
                          ),
                        ) === 0
                          ? 'hidden'
                          : 'visible'
                      }`,
                    }}
                    {...configDougnutChart(
                      'Review',
                      currentMonthData === undefined ? [] : currentMonthData,
                    )}
                  />
                </CCardBody>
              </CCard>
            </CCol>
            <CCol xs={matches ? 12 : 6}>
              <CCard className="mb-4 cardBorder">
                <Link
                  to="/currentMonthTable"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  state={{
                    type: '',
                    status: 'Last_Call',
                    category: '',
                    month: `${month}`,
                    year: `${year}`,
                    name: `${currentMonthData[0].Month}_${currentMonthData[0].Year}_Last_Call`,
                  }}
                >
                  {header('Last Call')}
                </Link>
                <CCardBody className="childChartContainer">
                  {parseInt(
                    fetchStatusSum(
                      currentMonthData === undefined ? [] : currentMonthData,
                      'Last_Call',
                    ),
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
                  <Area
                    style={{
                      visibility: `${
                        parseInt(
                          fetchStatusSum(
                            currentMonthData === undefined ? [] : currentMonthData,
                            'Last_Call',
                          ),
                        ) === 0
                          ? 'hidden'
                          : 'visible'
                      }`,
                    }}
                    {...configAreaCharts(
                      'Last_Call',
                      currentMonthData === undefined ? [] : currentMonthData,
                    )}
                  />
                </CCardBody>
              </CCard>
            </CCol>
            <CCol xs={matches ? 12 : 6}>
              <CCard className="mb-4 cardBorder">
                <Link
                  to="/currentMonthTable"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  state={{
                    type: '',
                    status: 'Stagnant',
                    category: '',
                    month: `${month}`,
                    year: `${year}`,
                    name: `${currentMonthData[0].Month}_${currentMonthData[0].Year}_Stagnant`,
                  }}
                >
                  {header('Stagnant')}
                </Link>
                <CCardBody className="childChartContainer">
                  {parseInt(
                    fetchStatusSum(
                      currentMonthData === undefined ? [] : currentMonthData,
                      'Stagnant',
                    ),
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
                  <Pie
                    style={{
                      visibility: `${
                        parseInt(
                          fetchStatusSum(
                            currentMonthData === undefined ? [] : currentMonthData,
                            'Stagnant',
                          ),
                        ) === 0
                          ? 'hidden'
                          : 'visible'
                      }`,
                    }}
                    {...configPieCharts(
                      'Stagnant',
                      currentMonthData === undefined ? [] : currentMonthData,
                    )}
                  />
                </CCardBody>
              </CCard>
            </CCol>
            <CCol xs={matches ? 12 : 6}>
              <CCard className="mb-4 cardBorder">
                <Link
                  to="/currentMonthTable"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  state={{
                    type: '',
                    status: 'Withdrawn',
                    category: '',
                    month: `${month}`,
                    year: `${year}`,
                    name: `${currentMonthData[0].Month}_${currentMonthData[0].Year}_Withdrawn`,
                  }}
                >
                  {header('Withdrawn')}
                </Link>
                <CCardBody className="childChartContainer">
                  {parseInt(
                    fetchStatusSum(
                      currentMonthData === undefined ? [] : currentMonthData,
                      'Withdrawn',
                    ),
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
                  <Column
                    style={{
                      visibility: `${
                        parseInt(
                          fetchStatusSum(
                            currentMonthData === undefined ? [] : currentMonthData,
                            'Withdrawn',
                          ),
                        ) === 0
                          ? 'hidden'
                          : 'visible'
                      }`,
                    }}
                    {...configColumnCharts(
                      'Withdrawn',
                      currentMonthData === undefined ? [] : currentMonthData,
                    )}
                  />
                </CCardBody>
              </CCard>
            </CCol>
            <CCol xs={matches ? 12 : 6}>
              <CCard className="mb-4 cardBorder">
                <Link
                  to="/currentMonthTable"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  state={{
                    type: '',
                    status: 'Living',
                    category: '',
                    month: `${month}`,
                    year: `${year}`,
                    name: `${currentMonthData[0].Month}_${currentMonthData[0].Year}_Living`,
                  }}
                >
                  {header('Living')}
                </Link>
                <CCardBody className="childChartContainer">
                  {parseInt(
                    fetchStatusSum(
                      currentMonthData === undefined ? [] : currentMonthData,
                      'Living',
                    ),
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
                  <Column
                    style={{
                      visibility: `${
                        parseInt(
                          fetchStatusSum(
                            currentMonthData === undefined ? [] : currentMonthData,
                            'Living',
                          ),
                        ) === 0
                          ? 'hidden'
                          : 'visible'
                      }`,
                    }}
                    {...configColumnCharts(
                      'Living',
                      currentMonthData === undefined ? [] : currentMonthData,
                    )}
                  />
                </CCardBody>
              </CCard>
            </CCol>

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
                    fetchStatusSum(currentMonthData === undefined ? [] : currentMonthData, 'Draft'),
                  ) === 0 &&
                  parseInt(
                    fetchStatusSum(currentMonthData === undefined ? [] : currentMonthData, 'Final'),
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
                  <Column
                    style={{
                      visibility: `${
                        parseInt(
                          fetchStatusSum(
                            currentMonthData === undefined ? [] : currentMonthData,
                            'Draft',
                          ),
                        ) === 0 &&
                        parseInt(
                          fetchStatusSum(
                            currentMonthData === undefined ? [] : currentMonthData,
                            'Final',
                          ),
                        ) === 0
                          ? 'hidden'
                          : 'visible'
                      }`,
                    }}
                    {...configDraftvsFinalCharts(
                      currentMonthData === undefined ? [] : currentMonthData,
                    )}
                  />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default CurrentMonth
