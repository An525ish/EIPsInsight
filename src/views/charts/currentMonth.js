/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */

import React, { useEffect, useState } from 'react'
import github from '../../assets/grey_logo.png'
import { GeneralStatsColor, ip, TypeColors, months } from './../../constants'
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
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

import useMediaQuery from 'src/scss/useMediaQuery'

import { Column, Pie, G2, Line, Area, Bar, measureTextWidth } from '@ant-design/plots'
import { each, groupBy } from '@antv/util'

import { CBadge, CCardFooter } from '@coreui/react-pro'
import { useUserAuth } from 'src/Context/AuthContext'
import Loading from '../theme/loading/loading'
import Page404 from '../pages/page404/Page404'

import './currentMonth.css'

const CurrentMonth = () => {
  const [month, setMonth] = useState()
  const [year, setYear] = useState()
  const [date, setDate] = useState()
  const param = useParams()
 
  const [loading, setLoading] = useState(false)

  const G = G2.getEngine('canvas')
  
  const matches = useMediaQuery('(max-width: 767px)')
  const { click1, click2, click3, setClick1Function, setClick2Function, setClick3Function } =
    useUserAuth()
  
  let [currentMonthData, setCurrentMonthData] = useState()

  const [eip, setEip] = useState()

  const API2 = `${ip}/allInfo`
  const fetchAllEIps = async (ignore) => {
    const data = await fetch(API2)
    const post = await data.json()

    if (!ignore) {
      setEip(post)
    }
  }

  const fetchCurrentMonthData = async () => {
    const monthName = param['*'].split('-')[0][0].toUpperCase() + param['*'].split('-')[0].slice(1)
    const response = await fetch(`${ip}/currentMonth/${param['*'].split('-')[1]}/${monthName}`)

    let data = await response.json()

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
      color: TypeColors,
      isStack: true,
      xField: 'type',
      yField: 'value',
      seriesField: 'type',
      yAxis:{

      },
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
      legend: {
        position : 'top',
      },
      // color: ['#228be6', '#66d9e8', '#ffa8a8', '#ffe066', '#e599f7', '#c0eb75', '#20c997'],
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
      // color: ['#228be6', '#66d9e8', '#ffa8a8', '#ffe066', '#e599f7', '#c0eb75', '#20c997'],
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

  const fetchStatusCategorySum = (monthData, status, category) => {
    let arr = []

    let statusArr = monthData.filter((elem) => {
      return elem.Status === status
    })

    if (statusArr.length === 0) return 0
    for (let i = 0; i < statusArr[0][category][0]; i++) {
      arr.push(statusArr[0][category][i + 1])
    }

    if (status !== 'Final') {
      for (let i = 0; i < statusArr[0]['Undefined'][0]; i++) {
        for (let j = 0; j < arr.length; j++) {
          if (arr[j] === statusArr[0]['Undefined'][i + 1]) {
            arr.splice(j, 1)
          }
        }
      }
    }

    return arr.length
  }

  // draft vs Final Charts
  const annotations = []

  const d1 = [
    {
      year: 'Draft',
      value: fetchStatusCategorySum(
        currentMonthData === undefined ? [] : currentMonthData,
        'Draft',
        'Core',
      ),
      type: 'Core',
    },
    {
      year: 'Draft',
      value: fetchStatusCategorySum(
        currentMonthData === undefined ? [] : currentMonthData,
        'Draft',
        'ERC',
      ),
      type: 'ERC',
    },
    {
      year: 'Draft',
      value: fetchStatusCategorySum(
        currentMonthData === undefined ? [] : currentMonthData,
        'Draft',
        'Networking',
      ),
      type: 'Networking',
    },
    {
      year: 'Draft',
      value: fetchStatusCategorySum(
        currentMonthData === undefined ? [] : currentMonthData,
        'Draft',
        'Interface',
      ),
      type: 'Interface',
    },
    {
      year: 'Draft',
      value: fetchStatusCategorySum(
        currentMonthData === undefined ? [] : currentMonthData,
        'Draft',
        'Meta',
      ),
      type: 'Meta',
    },
    {
      year: 'Draft',
      value: fetchStatusCategorySum(
        currentMonthData === undefined ? [] : currentMonthData,
        'Draft',
        'Informational',
      ),
      type: 'Informational',
    },
    {
      year: 'Final',
      value: fetchStatusCategorySum(
        currentMonthData === undefined ? [] : currentMonthData,
        'Final',
        'Core',
      ),
      type: 'Core',
    },
    {
      year: 'Final',
      value: fetchStatusCategorySum(
        currentMonthData === undefined ? [] : currentMonthData,
        'Final',
        'ERC',
      ),
      type: 'ERC',
    },
    {
      year: 'Final',
      value: fetchStatusCategorySum(
        currentMonthData === undefined ? [] : currentMonthData,
        'Final',
        'Networking',
      ),
      type: 'Networking',
    },
    {
      year: 'Final',
      value: fetchStatusCategorySum(
        currentMonthData === undefined ? [] : currentMonthData,
        'Final',
        'Interface',
      ),
      type: 'Interface',
    },

    {
      year: 'Final',
      value: fetchStatusCategorySum(
        currentMonthData === undefined ? [] : currentMonthData,
        'Final',
        'Meta',
      ),
      type: 'Meta',
    },
    {
      year: 'Final',
      value: fetchStatusCategorySum(
        currentMonthData === undefined ? [] : currentMonthData,
        'Final',
        'Informational',
      ),
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

  // header
  const header = (text) => {
    return (
      <CCardHeader
        className="cardHeader flex tracking-widest text-[1.3rem] font-bold"
        style={{
          background: `white`,
        }}
      >
        {text === 'GeneralStats' ? 'General Stats' : text === 'LastCall' ? 'Last Call' : text}{' '}
        {text !== 'GeneralStats' && (
          <div className="ml-2 rounded-[0.6rem] shadow-2xl text-[10px] flex justify-center items-center px-2">
            {text === 'GeneralStats' ? (
              ''
            ) : (
              <label
                style={{
                  fontWeight: '700',
                  fontFamily: 'Big Shoulders Display',
                  color: getBadgeColor(text),
                  backgroundColor: getBadge(text),
                }}
                className="tracking-wider text-[1rem] px-3 py-1 rounded-md"
              >
                {parseInt(
                  fetchStatusSum(
                    currentMonthData === undefined ? [] : currentMonthData,
                    text === 'Last Call' ? 'Last_Call' : text,
                  ),
                )}
              </label>
            )}
          </div>
        )}
      </CCardHeader>
    )
  }

  // const findTotalValueZero = (data, name) => {
  //   if (data.length !== 0) {
  //     return (
  //       parseInt(data === undefined ? 0 : data[0][name].Core) +
  //       parseInt(data === undefined ? 0 : data[0][name].ERC) +
  //       parseInt(data === undefined ? 0 : data[0][name].Networking) +
  //       parseInt(data === undefined ? 0 : data[0][name].Interface)
  //     )
  //   }
  //   return 0
  // }
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
        sum += parseInt(monthData[i].Core[0])
        sum += parseInt(monthData[i].ERC[0])
        sum += parseInt(monthData[i].Networking[0])
        sum += parseInt(monthData[i].Interface[0])
        sum += parseInt(monthData[i].Meta[0])
        sum += parseInt(monthData[i].Informational[0])
        if (status !== 'Final') sum -= parseInt(monthData[i].Undefined[0])
      }
    }

    return sum
  }

  const statusRows = (name) => {
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
                to={`/current-${name}`}
                style={{
                  textDecoration: 'none',
                  color: `${getBadgeColor(name)}`,
                  backgroundColor: `${getBadge(name)}`,
                  fontFamily: 'Big Shoulders Display',
                  eips: eip === undefined ? eip : eip[3]['Last_Call'],
                }}
                className={`githubIcon h-7
            shadow-md font-extrabold rounded-[8px]  text-[1rem] flex justify-center items-center min-w-max px-2 drop-shadow-sm cursor-pointer tracking-wider`}
                state={{
                  status: name,
                  name: `${currentMonthData[0].Month}_${currentMonthData[0].Year}_${name}`,
                }}
              >
                {parseInt(
                  fetchStatusSum(currentMonthData === undefined ? [] : currentMonthData, name),
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

  
  const statusChartTemplate = (status, ChartType, configChartType) => {
    return (
      <CCard
        className="current-month-card-container"
        style={{
          borderTop: `2px solid ${getBadgeColor(status)}`,
        }}
      >
        <Link
          to={`/current-${status}`}
          style={{ textDecoration: 'none', color: 'inherit', zIndex: 3, }}
          state={{
            type: '',
            status: status,
            category: '',
            month: `${month}`,
            year: `${year}`,
            name: `${currentMonthData[0].Month}_${currentMonthData[0].Year}_${status}`,
            eips: eip === undefined ? eip : eip[3]['Last_Call'],
          }}
        >
          {header(status)}
        </Link>
        <CCardBody className="childChartContainer">
          {parseInt(
            fetchStatusSum(currentMonthData === undefined ? [] : currentMonthData, status),
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
          <ChartType
            style={{
              visibility: `${
                parseInt(
                  fetchStatusSum(currentMonthData === undefined ? [] : currentMonthData, status),
                ) === 0
                  ? 'hidden'
                  : 'visible'
              }`,
            }}
            {...configChartType(status, currentMonthData === undefined ? [] : currentMonthData)}
          />
        </CCardBody>
      </CCard>
    )
  }

  useEffect(() => {
    fetchDate()
    if (param['*'] === 'autoCharts') {
      setClick1Function(false)
      setClick2Function(false)
      setClick3Function(false)
    }
    fetchAllEIps()
    for (let i = 0; i < 2; i++) fetchCurrentMonthData()
    // setInfo(localStorage.getItem('count'))
  }, [param['*']])

  return (
    <>
      {loading ? (
        currentMonthData === undefined || currentMonthData.length === 0 ? (
          <Page404 />
        ) : (
          <div>
            <CRow>
              <CCol xs={matches ? 12 : 6}>
                <div className="p-2">
                  <CCard className="current-month-card-container">
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
                            fetchStatusSum(
                              currentMonthData === undefined ? [] : currentMonthData,
                              'Final',
                            ),
                          ) === 0
                            ? ''
                            : statusRows('Final')}

                          {parseInt(
                            fetchStatusSum(
                              currentMonthData === undefined ? [] : currentMonthData,
                              'Last_Call',
                            ),
                          ) === 0
                            ? ''
                            : statusRows('Last_Call')}
                          {parseInt(
                            fetchStatusSum(
                              currentMonthData === undefined ? [] : currentMonthData,
                              'Review',
                            ),
                          ) === 0
                            ? ''
                            : statusRows('Review')}

                          {parseInt(
                            fetchStatusSum(
                              currentMonthData === undefined ? [] : currentMonthData,
                              'Draft',
                            ),
                          ) === 0
                            ? ''
                            : statusRows('Draft')}
                          {parseInt(
                            fetchStatusSum(
                              currentMonthData === undefined ? [] : currentMonthData,
                              'Stagnant',
                            ),
                          ) === 0
                            ? ''
                            : statusRows('Stagnant')}

                          {parseInt(
                            fetchStatusSum(
                              currentMonthData === undefined ? [] : currentMonthData,
                              'Withdrawn',
                            ),
                          ) === 0
                            ? ''
                            : statusRows('Withdrawn')}
                          {parseInt(
                            fetchStatusSum(
                              currentMonthData === undefined ? [] : currentMonthData,
                              'Living',
                            ),
                          ) === 0
                            ? ''
                            : statusRows('Living')}
                        </CTableBody>
                      </CTable>
                    </CCardBody>
                    <CCardFooter
                      className="text-[black]"
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        backgroundColor: 'white',
                      }}
                    >
                      <label
                        style={{ color: 'black', fontSize: '15px', fontWeight: 'bold' }}
                        className="tracking-wider"
                      >
                        * Click to see more
                      </label>
                      <label
                        style={{
                          color: 'black',
                          fontSize: '10px',
                          fontFamily: 'Big Shoulders Display',
                        }}
                        className="tracking-widest text-[1.0rem]"
                      >
                        {date}
                      </label>
                    </CCardFooter>
                  </CCard>
                </div>
              </CCol>

              {/* status Information */}

              <CCol xs={matches ? 12 : 6}>
                {statusChartTemplate('Final', Pie, configPieCharts)}
              </CCol>

              <CCol xs={matches ? 12 : 6}>
                {statusChartTemplate('Last_Call', Area, configAreaCharts)}
              </CCol>

              <CCol xs={matches ? 12 : 6}>
                {statusChartTemplate('Review', Pie, configDougnutChart)}
              </CCol>

              <CCol xs={matches ? 12 : 6}>
                {statusChartTemplate('Draft', Column, configColumnCharts)}
              </CCol>

              <CCol xs={matches ? 12 : 6}>
                {statusChartTemplate('Stagnant', Pie, configPieCharts)}
              </CCol>

              <CCol xs={matches ? 12 : 6}>
                {statusChartTemplate('Withdrawn', Column, configColumnCharts)}
              </CCol>

              <CCol xs={matches ? 12 : 6}>
                {statusChartTemplate('Living', Column, configColumnCharts)}
              </CCol>

              <CCol xs={matches ? 12 : 6}>
                <CCard className="current-month-card-container">
                  <CCardHeader
                    className="cardHeader tracking-widest font-bold text-[1.3rem]"
                    style={{
                      color: `black`,
                      background: `white`,
                      fontFamily: 'Helvetica',
                    }}
                  >
                    Final vs Draft
                  </CCardHeader>
                  <CCardBody className="childChartContainer">
                    {parseInt(
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
        )
      ) : (
        <Loading />
      )}
    </>
  )
}

export default CurrentMonth
