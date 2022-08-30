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
import { Link, useLocation } from 'react-router-dom'
import './mayCharts.styles.css'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { element } from 'prop-types'
import { CanvasJS, CanvasJSChart } from 'canvasjs-react-charts'

const autoCharts = (props) => {
  // const [info, setInfo] = useState()
  let location = useLocation()

  let [data, setData] = useState() // i set the data here

  const allData = async (d) => {
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
      console.log(datas) // fine

      let att = d.substring(1)
      console.log(att) // this taking the name of the month we are fetching
      let filterData = datas.filter((e) => {
        return e.name.toLowerCase() === att.toLowerCase()
      }) // we filter from here
      console.log(filterData)
      setData(filterData)

      if (!res.status === 200) {
        const error = new Error(res.error)
        throw error
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    allData(location.state.from)
    // setInfo(localStorage.getItem('count'))
  }, [location.state.from])

  console.log(data)

  return (
    <>
      <div
        style={{
          fontSize: '40px',
          fontWeight: '800',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textTransform: 'uppercase',
        }}
      >
        {data === undefined ? '' : data[0].name + ' ' + data[0].year} Insights
      </div>
      <p className="h3">Summary</p>
      <hr />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div className="p-2" style={{ width: '50%' }}>
          <CTable align="middle">
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                <CTableHeaderCell scope="col">Number</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {parseInt(data === undefined ? 0 : data[0].summary.Draft) === 0 ? (
                ''
              ) : (
                <CTableRow>
                  <CTableHeaderCell scope="row" style={{ fontSize: '34px' }}>
                    Draft
                  </CTableHeaderCell>
                  <CTableDataCell style={{ fontSize: '34px' }}>
                    {parseInt(data === undefined ? 0 : data[0].summary.Draft)}
                  </CTableDataCell>
                </CTableRow>
              )}

              {parseInt(data === undefined ? 0 : data[0].summary.Final) === 0 ? (
                ''
              ) : (
                <CTableRow>
                  <CTableHeaderCell scope="row" style={{ fontSize: '34px' }}>
                    Final
                  </CTableHeaderCell>
                  <CTableDataCell style={{ fontSize: '34px' }}>
                    {parseInt(data === undefined ? 0 : data[0].summary.Final)}
                  </CTableDataCell>
                </CTableRow>
              )}

              {parseInt(data === undefined ? 0 : data[0].summary.Review) === 0 ? (
                ''
              ) : (
                <CTableRow>
                  <CTableHeaderCell scope="row" style={{ fontSize: '34px' }}>
                    Review
                  </CTableHeaderCell>
                  <CTableDataCell style={{ fontSize: '34px' }}>
                    {parseInt(data === undefined ? 0 : data[0].summary.Review)}
                  </CTableDataCell>
                </CTableRow>
              )}
              {parseInt(data === undefined ? 0 : data[0].summary.LastCall) === 0 ? (
                ''
              ) : (
                <CTableRow style={{ fontSize: '34px' }}>
                  <CTableHeaderCell scope="row" style={{ fontSize: '34px' }}>
                    Last Call
                  </CTableHeaderCell>
                  <CTableDataCell>
                    {parseInt(data === undefined ? 0 : data[0].summary.LastCall)}
                  </CTableDataCell>
                </CTableRow>
              )}
              {parseInt(data === undefined ? 0 : data[0].summary.Stagnant) === 0 ? (
                ''
              ) : (
                <CTableRow>
                  <CTableHeaderCell scope="row" style={{ fontSize: '34px' }}>
                    Stagnant
                  </CTableHeaderCell>
                  <CTableDataCell style={{ fontSize: '34px' }}>
                    {parseInt(data === undefined ? 0 : data[0].summary.Stagnant)}
                  </CTableDataCell>
                </CTableRow>
              )}
              {parseInt(data === undefined ? 0 : data[0].summary.Withdrawn) === 0 ? (
                ''
              ) : (
                <CTableRow>
                  <CTableHeaderCell scope="row" style={{ fontSize: '34px' }}>
                    Withdrawn
                  </CTableHeaderCell>
                  <CTableDataCell style={{ fontSize: '34px' }}>
                    {parseInt(data === undefined ? 0 : data[0].summary.Withdrawn)}
                  </CTableDataCell>
                </CTableRow>
              )}
              {parseInt(data === undefined ? 0 : data[0].summary.Living) === 0 ? (
                ''
              ) : (
                <CTableRow>
                  <CTableHeaderCell scope="row" style={{ fontSize: '34px' }}>
                    Living
                  </CTableHeaderCell>
                  <CTableDataCell style={{ fontSize: '34px' }}>
                    {parseInt(data === undefined ? 0 : data[0].summary.Living)}
                  </CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>
        </div>
        <div className="p-2" style={{ width: '50%' }}>
          {data === undefined ? null : data[0].summary.SummaryInfo === '' ? null : (
            <div className="p-3 mb-2 bg-white text-black" style={{ borderRadius: '20px' }}>
              <p className="font-monospace">{data[0].summary.SummaryInfo}</p>{' '}
            </div>
          )}
          <ul>
            {data === undefined ? null : data[0].summary.HighlightText === '' ? null : (
              <li>
                <p>
                  <h1 className="display-6" style={{ fontSize: '1.3rem', fontStyle: 'italic' }}>
                    {data[0].summary.HighlightText}
                  </h1>
                </p>
              </li>
            )}
          </ul>
        </div>
      </div>

      <hr />
      <CRow>
        <CCol xs={6}>
          <CCard className="mb-4 cardBorder">
            <Link to="/mayDraftTable" style={{ textDecoration: 'none', color: 'inherit' }}>
              <CCardHeader className="cardHeader">
                Draft{' '}
                <label style={{ fontWeight: '700' }}>
                  {'('}
                  {parseInt(
                    data === undefined
                      ? 0
                      : parseInt(data[0].Draft.Core) +
                          parseInt(data[0].Draft.ERC) +
                          parseInt(data[0].Draft.Networking) +
                          parseInt(data[0].Draft.Interface),
                  )}
                  {')'}
                </label>
              </CCardHeader>
            </Link>
            <CCardBody
              className="childChartContainer"
              style={{
                // backgroundColor: '#fff9db',
                backgroundImage: `url(${github})`,
                backgroundSize: '33% 50%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right -16px top -32px',
              }}
            >
              {parseInt(data === undefined ? 0 : data[0].Draft.Core) === 0 &&
              parseInt(data === undefined ? 0 : data[0].Draft.ERC) === 0 &&
              parseInt(data === undefined ? 0 : data[0].Draft.Networking) === 0 &&
              parseInt(data === undefined ? 0 : data[0].Draft.Interface) === 0 ? (
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
              <CChartBar
                // plugins={[ChartDataLabels]}
                colours="[ { fillColor: '#ffff00' }, { fillColor: '#0066ff' } ]"
                data={{
                  // backgroundImage: 'url(../../assets/images/github.png)',
                  // backgroundImage: 'url(../../assets/images/github.png)',
                  labels: ['Core', 'ERC', 'Networking', 'Interface'],
                  datasets: [
                    {
                      label: 'Draft',
                      tension: 0,
                      backgroundColor: [
                        'rgba(59, 201, 219, 0.3)',
                        'rgba(250, 82, 82, 0.3)',
                        'rgba(252, 196, 25, 0.3)',
                        'rgba(55, 178, 77, 0.3)',
                      ],
                      borderColor: [
                        'rgba(59, 201, 219, 1)',
                        'rgba(250, 82, 82, 1)',
                        'rgba(252, 196, 25, 1)',
                        'rgba(55, 178, 77, 1)',
                      ],
                      borderWidth: 2,
                      data: [
                        parseInt(data === undefined ? 0 : data[0].Draft.Core),
                        parseInt(data === undefined ? 0 : data[0].Draft.ERC),
                        parseInt(data === undefined ? 0 : data[0].Draft.Networking),
                        parseInt(data === undefined ? 0 : data[0].Draft.Interface),
                      ],
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      callbacks: {
                        title: (context) => {
                          return ''
                        },
                        label: (context) => {
                          console.log(context)
                          return `${context.label}: ${context.parsed.y}`
                        },
                      },
                    },
                  },

                  scales: {
                    yAxis: {
                      ticks: {
                        stepSize: 1,
                        font: {
                          family: 'Roboto',
                        },
                      },
                      grid: {
                        display: false,
                      },
                    },

                    XAxis: {
                      ticks: {
                        font: {
                          family: 'Roboto',
                        },
                      },
                    },
                  },
                }}
                labels="months"
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={6}>
          <CCard className="mb-4 cardBorder">
            <Link to="/mayFinalTable" style={{ textDecoration: 'none', color: 'inherit' }}>
              <CCardHeader className="cardHeader">
                Final{' '}
                <label style={{ fontWeight: '700' }}>
                  {'('}
                  {parseInt(
                    data === undefined
                      ? 0
                      : parseInt(data[0].Final.Core) +
                          parseInt(data[0].Final.ERC) +
                          parseInt(data[0].Final.Networking) +
                          parseInt(data[0].Final.Interface),
                  )}
                  {')'}
                </label>
              </CCardHeader>
            </Link>
            <CCardBody
              className="childChartContainer"
              style={{
                // backgroundColor: '#fff9db',
                backgroundImage: `url(${github})`,
                backgroundSize: '33% 50%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right -16px top -32px',
              }}
            >
              {parseInt(data === undefined ? 0 : data[0].Final.Core) === 0 &&
              parseInt(data === undefined ? 0 : data[0].Final.ERC) === 0 &&
              parseInt(data === undefined ? 0 : data[0].Final.Networking) === 0 &&
              parseInt(data === undefined ? 0 : data[0].Final.Interface) === 0 ? (
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
              <CChartPie
                // plugins={[ChartDataLabels]}
                colours="[ { fillColor: '#ffff00' }, { fillColor: '#0066ff' } ]"
                data={{
                  labels: ['Core', 'ERC', 'Networking', 'Interface'],
                  datasets: [
                    {
                      data: [
                        parseInt(data === undefined ? 0 : data[0].Final.Core),
                        parseInt(data === undefined ? 0 : data[0].Final.ERC),
                        parseInt(data === undefined ? 0 : data[0].Final.Networking),
                        parseInt(data === undefined ? 0 : data[0].Final.Interface),
                      ],
                      backgroundColor: [
                        'rgba(59, 201, 219, 0.3)',
                        'rgba(250, 82, 82, 0.3)',
                        'rgba(252, 196, 25, 0.3)',
                        'rgba(55, 178, 77, 0.3)',
                      ],
                      borderColor: [
                        'rgba(59, 201, 219, 1)',
                        'rgba(250, 82, 82, 1)',
                        'rgba(252, 196, 25, 1)',
                        'rgba(55, 178, 77, 1)',
                      ],
                      borderWidth: 2,
                    },
                  ],
                }}
                options={{
                  aspectRatio: 2,
                  plugins: {
                    legend: {
                      position: 'right',
                      align: 'center',
                      marginBottom: 50,
                      labels: {
                        usePointStyle: true,
                        font: {
                          family: 'Roboto',
                        },
                      },
                    },
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={6}>
          <CCard className="mb-4 cardBorder">
            <Link to="/mayReviewTable" style={{ textDecoration: 'none', color: 'inherit' }}>
              <CCardHeader className="cardHeader">
                Review{' '}
                <label style={{ fontWeight: '700' }}>
                  {'('}
                  {parseInt(
                    data === undefined
                      ? 0
                      : parseInt(data[0].Review.Core) +
                          parseInt(data[0].Review.ERC) +
                          parseInt(data[0].Review.Networking) +
                          parseInt(data[0].Review.Interface),
                  )}
                  {')'}
                </label>
              </CCardHeader>
            </Link>
            <CCardBody
              className="childChartContainer"
              style={{
                // backgroundColor: '#fff9db',
                backgroundImage: `url(${github})`,
                backgroundSize: '33% 50%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right -16px top -32px',
              }}
            >
              {parseInt(data === undefined ? 0 : data[0].Review.Core) === 0 &&
              parseInt(data === undefined ? 0 : data[0].Review.ERC) === 0 &&
              parseInt(data === undefined ? 0 : data[0].Review.Networking) === 0 &&
              parseInt(data === undefined ? 0 : data[0].Review.Interface) === 0 ? (
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
              <CChartBar
                data={{
                  labels: ['Core', 'ERC', 'Networking', 'Interface'],
                  datasets: [
                    {
                      pointBorderColor: '#000000',
                      backgroundColor: [
                        'rgba(59, 201, 219, 0.3)',
                        'rgba(250, 82, 82, 0.3)',
                        'rgba(252, 196, 25, 0.3)',
                        'rgba(55, 178, 77, 0.3)',
                      ],
                      borderColor: [
                        'rgba(59, 201, 219, 1)',
                        'rgba(250, 82, 82, 1)',
                        'rgba(252, 196, 25, 1)',
                        'rgba(55, 178, 77, 1)',
                      ],
                      borderWidth: 2,
                      data: [
                        parseInt(data === undefined ? 0 : data[0].Review.Core),
                        parseInt(data === undefined ? 0 : data[0].Review.ERC),
                        parseInt(data === undefined ? 0 : data[0].Review.Networking),
                        parseInt(data === undefined ? 0 : data[0].Review.Interface),
                      ],
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    yAxis: {
                      ticks: {
                        stepSize: 1,
                        font: {
                          family: 'Roboto',
                        },
                      },
                      grid: {
                        display: false,
                      },
                    },

                    XAxis: {
                      ticks: {
                        font: {
                          family: 'Roboto',
                        },
                      },
                    },
                  },
                }}
                labels="months"
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={6}>
          <CCard className="mb-4 cardBorder">
            <Link to="/mayLastCallTable" style={{ textDecoration: 'none', color: 'inherit' }}>
              <CCardHeader className="cardHeader">
                Last Call{' '}
                <label style={{ fontWeight: '700' }}>
                  {'('}
                  {parseInt(
                    data === undefined
                      ? 0
                      : parseInt(data[0].LastCall.Core) +
                          parseInt(data[0].LastCall.ERC) +
                          parseInt(data[0].LastCall.Networking) +
                          parseInt(data[0].LastCall.Interface),
                  )}
                  {')'}
                </label>
              </CCardHeader>
            </Link>
            <CCardBody
              className="childChartContainer"
              style={{
                // backgroundColor: '#fff9db',
                backgroundImage: `url(${github})`,
                backgroundSize: '33% 50%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right -16px top -32px',
              }}
            >
              {parseInt(data === undefined ? 0 : data[0].LastCall.Core) === 0 &&
              parseInt(data === undefined ? 0 : data[0].LastCall.ERC) === 0 &&
              parseInt(data === undefined ? 0 : data[0].LastCall.Networking) === 0 &&
              parseInt(data === undefined ? 0 : data[0].LastCall.Interface) === 0 ? (
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
              <CChartPolarArea
                style={{
                  visibility: `${
                    parseInt(data === undefined ? 0 : data[0].LastCall.Core) === 0 &&
                    parseInt(data === undefined ? 0 : data[0].LastCall.ERC) === 0 &&
                    parseInt(data === undefined ? 0 : data[0].LastCall.Networking) === 0 &&
                    parseInt(data === undefined ? 0 : data[0].LastCall.Interface) === 0
                      ? 'hidden'
                      : 'visible'
                  }`,
                }}
                data={{
                  labels: ['Core', 'ERC', 'Networking', 'Interface'],
                  datasets: [
                    {
                      data: [
                        parseInt(data === undefined ? 0 : data[0].LastCall.Core),
                        parseInt(data === undefined ? 0 : data[0].LastCall.ERC),
                        parseInt(data === undefined ? 0 : data[0].LastCall.Networking),
                        parseInt(data === undefined ? 0 : data[0].LastCall.Interface),
                      ],
                      backgroundColor: [
                        'rgba(59, 201, 219, 0.3)',
                        'rgba(250, 82, 82, 0.3)',
                        'rgba(252, 196, 25, 0.3)',
                        'rgba(55, 178, 77, 0.3)',
                      ],
                      borderColor: [
                        'rgba(59, 201, 219, 1)',
                        'rgba(250, 82, 82, 1)',
                        'rgba(252, 196, 25, 1)',
                        'rgba(55, 178, 77, 1)',
                      ],
                      borderWidth: 2,
                    },
                  ],
                }}
                options={{
                  aspectRatio: 2,
                  scales: {
                    yAxis: {
                      ticks: {
                        stepSize: 1,
                      },
                    },
                    r: {
                      ticks: {
                        display: false,
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      position: 'right',
                      align: 'center',
                      marginBottom: 50,
                      labels: {
                        usePointStyle: true,
                        font: {
                          family: 'Roboto',
                        },
                      },
                    },
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={6}>
          <CCard className="mb-4 cardBorder">
            <Link to="/mayStagnantTable" style={{ textDecoration: 'none', color: 'inherit' }}>
              <CCardHeader className="cardHeader">
                Stagnant{' '}
                <label style={{ fontWeight: '700' }}>
                  {'('}
                  {parseInt(
                    data === undefined
                      ? 0
                      : parseInt(data[0].Stagnant.Core) +
                          parseInt(data[0].Stagnant.ERC) +
                          parseInt(data[0].Stagnant.Networking) +
                          parseInt(data[0].Stagnant.Interface),
                  )}
                  {')'}
                </label>
              </CCardHeader>
            </Link>
            <CCardBody
              className="childChartContainer"
              style={{
                // backgroundColor: '#fff9db',
                backgroundImage: `url(${github})`,
                backgroundSize: '33% 50%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right -16px top -32px',
              }}
            >
              {parseInt(data === undefined ? 0 : data[0].Stagnant.Core) === 0 &&
              parseInt(data === undefined ? 0 : data[0].Stagnant.ERC) === 0 &&
              parseInt(data === undefined ? 0 : data[0].Stagnant.Networking) === 0 &&
              parseInt(data === undefined ? 0 : data[0].Stagnant.Interface) === 0 ? (
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
              <CChartPie
                style={{
                  visibility: `${
                    parseInt(data === undefined ? 0 : data[0].Stagnant.Core) === 0 &&
                    parseInt(data === undefined ? 0 : data[0].Stagnant.ERC) === 0 &&
                    parseInt(data === undefined ? 0 : data[0].Stagnant.Networking) === 0 &&
                    parseInt(data === undefined ? 0 : data[0].Stagnant.Interface) === 0
                      ? 'hidden'
                      : 'visible'
                  }`,
                }}
                // plugins={[ChartDataLabels]}
                data={{
                  labels: ['Core', 'ERC', 'Networking', 'Interface'],
                  datasets: [
                    {
                      data: [
                        parseInt(data === undefined ? 0 : data[0].Stagnant.Core),
                        parseInt(data === undefined ? 0 : data[0].Stagnant.ERC),
                        parseInt(data === undefined ? 0 : data[0].Stagnant.Networking),
                        parseInt(data === undefined ? 0 : data[0].Stagnant.Interface),
                      ],
                      backgroundColor: [
                        'rgba(59, 201, 219, 0.3)',
                        'rgba(250, 82, 82, 0.3)',
                        'rgba(252, 196, 25, 0.3)',
                        'rgba(55, 178, 77, 0.3)',
                      ],
                      borderColor: [
                        'rgba(59, 201, 219, 1)',
                        'rgba(250, 82, 82, 1)',
                        'rgba(252, 196, 25, 1)',
                        'rgba(55, 178, 77, 1)',
                      ],
                      borderWidth: 2,
                    },
                  ],
                }}
                options={{
                  aspectRatio: 2,
                  plugins: {
                    legend: {
                      position: 'right',
                      align: 'center',
                      marginBottom: 50,
                      labels: {
                        usePointStyle: true,
                        font: {
                          family: 'Roboto',
                        },
                      },
                    },
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={6}>
          <CCard className="mb-4 cardBorder">
            <Link to="/mayWithdrawnTable" style={{ textDecoration: 'none', color: 'inherit' }}>
              <CCardHeader className="cardHeader">
                Withdrawn{' '}
                <label style={{ fontWeight: '700' }}>
                  {'('}
                  {parseInt(
                    data === undefined
                      ? 0
                      : parseInt(data[0].Withdrawn.Core) +
                          parseInt(data[0].Withdrawn.ERC) +
                          parseInt(data[0].Withdrawn.Networking) +
                          parseInt(data[0].Withdrawn.Interface),
                  )}
                  {')'}
                </label>
              </CCardHeader>
            </Link>
            <CCardBody
              className="childChartContainer"
              style={{
                // backgroundColor: '#fff9db',
                backgroundImage: `url(${github})`,
                backgroundSize: '33% 50%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right -16px top -32px',
              }}
            >
              {parseInt(data === undefined ? 0 : data[0].Withdrawn.Core) === 0 &&
              parseInt(data === undefined ? 0 : data[0].Withdrawn.ERC) === 0 &&
              parseInt(data === undefined ? 0 : data[0].Withdrawn.Networking) === 0 &&
              parseInt(data === undefined ? 0 : data[0].Withdrawn.Interface) === 0 ? (
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
              <CChartBar
                style={{
                  visibility: `${
                    parseInt(data === undefined ? 0 : data[0].Withdrawn.Core) === 0 &&
                    parseInt(data === undefined ? 0 : data[0].Withdrawn.ERC) === 0 &&
                    parseInt(data === undefined ? 0 : data[0].Withdrawn.Networking) === 0 &&
                    parseInt(data === undefined ? 0 : data[0].Withdrawn.Interface) === 0
                      ? 'hidden'
                      : 'visible'
                  }`,
                }}
                data={{
                  labels: ['Core', 'ERC', 'Networking', 'Interface'],
                  datasets: [
                    {
                      label: 'Withdrawn',
                      pointBorderColor: '#000000',
                      backgroundColor: [
                        'rgba(59, 201, 219, 0.3)',
                        'rgba(250, 82, 82, 0.3)',
                        'rgba(252, 196, 25, 0.3)',
                        'rgba(55, 178, 77, 0.3)',
                      ],
                      borderColor: [
                        'rgba(59, 201, 219, 1)',
                        'rgba(250, 82, 82, 1)',
                        'rgba(252, 196, 25, 1)',
                        'rgba(55, 178, 77, 1)',
                      ],
                      borderWidth: 2,
                      data: [
                        parseInt(data === undefined ? 0 : data[0].Withdrawn.Core),
                        parseInt(data === undefined ? 0 : data[0].Withdrawn.ERC),
                        parseInt(data === undefined ? 0 : data[0].Withdrawn.Networking),
                        parseInt(data === undefined ? 0 : data[0].Withdrawn.Interface),
                      ],
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    yAxis: {
                      ticks: {
                        stepSize: 1,
                        font: {
                          family: 'Roboto',
                        },
                      },
                      grid: {
                        display: false,
                      },
                    },

                    XAxis: {
                      ticks: {
                        font: {
                          family: 'Roboto',
                        },
                      },
                    },
                  },
                }}
                labels="months"
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={6}>
          <CCard className="mb-4 cardBorder">
            <CCardHeader className="cardHeader">Draft EIPs vs Potential Proposal</CCardHeader>
            <CCardBody
              className="childChartContainer"
              style={{
                // backgroundColor: '#fff9db',
                backgroundImage: `url(${github})`,
                backgroundSize: '33% 50%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right -16px top -32px',
              }}
            >
              <CChartBar
                // plugins={[ChartDataLabels]}
                data={{
                  labels: ['Draft', 'Potential Proposal'],
                  datasets: [
                    {
                      label: 'Draft',
                      tension: 0,
                      backgroundColor: [
                        'rgba(59, 201, 219, 0.3)',
                        'rgba(250, 82, 82, 0.3)',
                        'rgba(252, 196, 25, 0.3)',
                        'rgba(55, 178, 77, 0.3)',
                      ],
                      borderColor: [
                        'rgba(59, 201, 219, 1)',
                        'rgba(250, 82, 82, 1)',
                        'rgba(252, 196, 25, 1)',
                        'rgba(55, 178, 77, 1)',
                      ],
                      borderWidth: 2,
                      data: [parseInt(data === undefined ? 0 : data[0].summary.Draft), 0],
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: true,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },

                  scales: {
                    yAxis: {
                      ticks: {
                        stepSize: 1,
                        font: {
                          family: 'Roboto',
                        },
                      },
                      grid: {
                        display: false,
                      },
                    },

                    XAxis: {
                      ticks: {
                        font: {
                          family: 'Roboto',
                        },
                      },
                    },
                  },
                }}
                labels="months"
              />
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs={6}>
          <CCard className="mb-4 cardBorder">
            <CCardHeader className="cardHeader">Final vs Draft</CCardHeader>
            <CCardBody
              className="childChartContainer"
              style={{
                // backgroundColor: '#fff9db',
                backgroundImage: `url(${github})`,
                backgroundSize: '33% 50%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right -16px top -32px',
              }}
            >
              {parseInt(data === undefined ? 0 : data[0].summary.Draft) === 0 &&
              parseInt(data === undefined ? 0 : data[0].summary.Final) === 0 ? (
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
              <CChartDoughnut
                data={{
                  labels: ['Final', 'Draft'],
                  datasets: [
                    {
                      label: 'Draft EIPs',
                      backgroundColor: [
                        'rgba(59, 201, 219, 0.3)',
                        'rgba(250, 82, 82, 0.3)',
                        'rgba(252, 196, 25, 0.3)',
                        'rgba(55, 178, 77, 0.3)',
                      ],
                      borderColor: [
                        'rgba(59, 201, 219, 1)',
                        'rgba(250, 82, 82, 1)',
                        'rgba(252, 196, 25, 1)',
                        'rgba(55, 178, 77, 1)',
                      ],
                      borderWidth: 2,
                      data: [
                        parseInt(data === undefined ? 0 : data[0].summary.Draft),
                        parseInt(data === undefined ? 0 : data[0].summary.Final),
                      ],
                    },
                  ],
                }}
                options={{
                  aspectRatio: 2,
                  maintainAspectRatio: true,
                  plugins: {
                    tooltip: {
                      callbacks: {
                        label: (context) => {
                          return `${context.label}: ${context.parsed}`
                        },
                      },
                    },
                    legend: {
                      position: 'right',
                      align: 'center',
                      marginBottom: 50,
                      labels: {
                        usePointStyle: true,
                        font: {
                          family: 'Roboto',
                        },
                      },
                    },
                  },

                  tooltips: {
                    enabled: true,
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={6}>
          <CCard className="mb-4 cardBorder">
            <CCardHeader className="cardHeader">
              Living{' '}
              <label style={{ fontWeight: '700' }}>
                {'('}
                {parseInt(
                  data === undefined
                    ? 0
                    : parseInt(data[0].Living.Core) +
                        parseInt(data[0].Living.ERC) +
                        parseInt(data[0].Living.Networking) +
                        parseInt(data[0].Living.Interface),
                )}
                {')'}
              </label>
            </CCardHeader>
            <CCardBody
              className="childChartContainer"
              style={{
                // backgroundColor: '#fff9db',
                backgroundImage: `url(${github})`,
                backgroundSize: '33% 50%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right -16px top -32px',
              }}
            >
              {parseInt(data === undefined ? 0 : data[0].Living.Core) === 0 &&
              parseInt(data === undefined ? 0 : data[0].Living.ERC) === 0 &&
              parseInt(data === undefined ? 0 : data[0].Living.Networking) === 0 &&
              parseInt(data === undefined ? 0 : data[0].Living.Interface) === 0 ? (
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
              <CChartPie
                // plugins={[ChartDataLabels]}
                style={{
                  visibility: `${
                    parseInt(data === undefined ? 0 : data[0].Living.Core) === 0 &&
                    parseInt(data === undefined ? 0 : data[0].Living.ERC) === 0 &&
                    parseInt(data === undefined ? 0 : data[0].Living.Networking) === 0 &&
                    parseInt(data === undefined ? 0 : data[0].Living.Interface) === 0
                      ? 'hidden'
                      : 'visible'
                  }`,
                }}
                data={{
                  labels: ['Core', 'ERC', 'Networking', 'Interface'],
                  datasets: [
                    {
                      data: [
                        parseInt(data === undefined ? 0 : data[0].Living.Core),
                        parseInt(data === undefined ? 0 : data[0].Living.ERC),
                        parseInt(data === undefined ? 0 : data[0].Living.Networking),
                        parseInt(data === undefined ? 0 : data[0].Living.Interface),
                      ],
                      backgroundColor: [
                        'rgba(59, 201, 219, 0.3)',
                        'rgba(250, 82, 82, 0.3)',
                        'rgba(252, 196, 25, 0.3)',
                        'rgba(55, 178, 77, 0.3)',
                      ],
                      borderColor: [
                        'rgba(59, 201, 219, 1)',
                        'rgba(250, 82, 82, 1)',
                        'rgba(252, 196, 25, 1)',
                        'rgba(55, 178, 77, 1)',
                      ],
                      borderWidth: 2,
                    },
                  ],
                }}
                options={{
                  aspectRatio: 2,
                  plugins: {
                    legend: {
                      position: 'right',
                      align: 'center',
                      marginBottom: 50,
                      labels: {
                        usePointStyle: true,
                        font: {
                          family: 'Roboto',
                        },
                      },
                    },
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={6}>
          <CCard className="mb-4 cardBorder">
            <Link to="/mayDraftTable" style={{ textDecoration: 'none', color: 'inherit' }}>
              <CCardHeader className="cardHeader">General Stats </CCardHeader>
            </Link>
            <CCardBody
              className="childChartContainer"
              style={{
                // backgroundColor: '#fff9db',
                backgroundImage: `url(${github})`,
                backgroundSize: '33% 50%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right -16px top -32px',
              }}
            >
              <CChartBar
                // plugins={[ChartDataLabels]}
                colours="[ { fillColor: '#ffff00' }, { fillColor: '#0066ff' } ]"
                data={{
                  // backgroundImage: 'url(../../assets/images/github.png)',
                  // backgroundImage: 'url(../../assets/images/github.png)',
                  labels: ['Open PR', 'Merged PR', 'Closed Issues', 'New Issues'],
                  datasets: [
                    {
                      label: 'Draft',
                      tension: 0,
                      backgroundColor: [
                        'rgba(59, 201, 219, 0.3)',
                        'rgba(250, 82, 82, 0.3)',
                        'rgba(252, 196, 25, 0.3)',
                        'rgba(55, 178, 77, 0.3)',
                      ],
                      borderColor: [
                        'rgba(59, 201, 219, 1)',
                        'rgba(250, 82, 82, 1)',
                        'rgba(252, 196, 25, 1)',
                        'rgba(55, 178, 77, 1)',
                      ],
                      borderWidth: 2,
                      data: [
                        parseInt(data === undefined ? 0 : data[0].GeneralStats.OpenPR),
                        parseInt(data === undefined ? 0 : data[0].GeneralStats.MergedPR),
                        parseInt(data === undefined ? 0 : data[0].GeneralStats.ClosedIssues),
                        parseInt(data === undefined ? 0 : data[0].GeneralStats.NewIssues),
                      ],
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      callbacks: {
                        title: (context) => {
                          return ''
                        },
                        label: (context) => {
                          console.log(context)
                          return `${context.label}: ${context.parsed.y}`
                        },
                      },
                    },
                  },

                  scales: {
                    yAxis: {
                      ticks: {
                        stepSize: 1,
                        font: {
                          family: 'Roboto',
                        },
                      },
                      grid: {
                        display: false,
                      },
                    },

                    XAxis: {
                      ticks: {
                        font: {
                          family: 'Roboto',
                        },
                      },
                    },
                  },
                }}
                labels="months"
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CTable align="middle">
          <CTableHead color="dark">
            <CTableRow>
              <CTableHeaderCell scope="col">Other Stats</CTableHeaderCell>
              <CTableHeaderCell scope="col">Number</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
              <CTableHeaderCell scope="row">Forks</CTableHeaderCell>
              <CTableDataCell>
                {parseInt(data === undefined ? 0 : data[0].OtherStats.Forks)}
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">Users</CTableHeaderCell>
              <CTableDataCell>
                {parseInt(data === undefined ? 0 : data[0].OtherStats.Users)}
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">Authors</CTableHeaderCell>
              <CTableDataCell>
                {parseInt(data === undefined ? 0 : data[0].OtherStats.Authors)}
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableHeaderCell scope="row">Files</CTableHeaderCell>
              <CTableDataCell>
                {parseInt(data === undefined ? 0 : data[0].OtherStats.Files)}
              </CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </CRow>
    </>
  )
}

export default autoCharts
