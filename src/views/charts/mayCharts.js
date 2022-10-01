/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */

import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCol, CCardHeader, CRow } from '@coreui/react'
import github from '../../assets/grey_logo.png'
import {
  CChartBar,
  CChartDoughnut,
  CChartLine,
  CChartPie,
  CChartPolarArea,
  CChartRadar,
} from '@coreui/react-chartjs'
import { DocsCallout } from 'src/components'
import { Link } from 'react-router-dom'
import './mayCharts.styles.css'

const mayCharts = (props) => {
  const [info, setInfo] = useState()

  useEffect(() => {
    setInfo(localStorage.getItem('count'))
  }, [])

  useEffect(() => {
    if (props.data !== undefined) {
      setInfo(props.data)
      localStorage.setItem('count', JSON.stringify(props.data))
    } else {
      localStorage.setItem('count', JSON.stringify(info))
    }
  }, [info])

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
        May Insights
      </div>

      <CRow>
        {/* <CCol xs={12}>
        <DocsCallout
          name="Chart"
          href="components/chart"
          content="React wrapper component for Chart.js 3.0, the most popular charting library."
        />
      </CCol> */}
        <CCol xs={6}>
          <CCard className="mb-4 cardBorder">
            <Link to="/mayDraftTable" style={{ textDecoration: 'none', color: 'inherit' }}>
              <CCardHeader className="cardHeader">
                Draft{' '}
                <label style={{ fontWeight: '700' }}>
                  {'('}
                  {parseInt(`${info === undefined ? 0 : parseInt(info[55][3])}`) +
                    parseInt(`${info === undefined ? 0 : parseInt(info[55][4])}`) +
                    parseInt(`${info === undefined ? 0 : parseInt(info[55][5])}`) +
                    parseInt(`${info === undefined ? 0 : parseInt(info[55][6])}`)}
                  {')'}
                </label>
              </CCardHeader>
            </Link>
            <CCardBody
              className="childChartContainer"
              style={{
                backgroundColor: '#fff9db',
                backgroundImage: `url(${github})`,
                backgroundSize: '33% 50%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            >
              {parseInt(`${info === undefined ? '0' : info[55][3]}`) === 0 &&
              parseInt(`${info === undefined ? '0' : info[55][4]}`) === 0 &&
              parseInt(`${info === undefined ? '0' : info[55][5]}`) === 0 &&
              parseInt(`${info === undefined ? '0' : info[55][6]}`) === 0 ? (
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
                        `${info === undefined ? '0' : info[55][3]}`,
                        `${info === undefined ? '0' : info[55][4]}`,
                        `${info === undefined ? '0' : info[55][5]}`,
                        `${info === undefined ? '0' : info[55][6]}`,
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
                  {parseInt(`${info === undefined ? '0' : info[55][8]}`) +
                    parseInt(`${info === undefined ? '0' : info[55][9]}`) +
                    parseInt(`${info === undefined ? '0' : info[55][10]}`) +
                    parseInt(`${info === undefined ? '0' : info[55][11]}`)}
                  {')'}
                </label>
              </CCardHeader>
            </Link>
            <CCardBody
              className="childChartContainer"
              style={{
                backgroundColor: '#fff9db',
                backgroundImage: `url(${github})`,
                backgroundSize: '33% 50%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            >
              {parseInt(`${info === undefined ? 0 : info[55][8]}`) === 0 &&
              parseInt(`${info === undefined ? 0 : info[55][9]}`) === 0 &&
              parseInt(`${info === undefined ? 0 : info[55][10]}`) === 0 &&
              parseInt(`${info === undefined ? 0 : info[55][11]}`) === 0 ? (
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
                        `${info === undefined ? '0' : info[55][8]}`,
                        `${info === undefined ? '0' : info[55][9]}`,
                        `${info === undefined ? '0' : info[55][10]}`,
                        `${info === undefined ? '0' : info[55][11]}`,
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
                  {parseInt(`${info === undefined ? '0' : info[60][2]}`) +
                    parseInt(`${info === undefined ? '0' : info[61][2]}`) +
                    parseInt(`${info === undefined ? '0' : info[62][2]}`) +
                    parseInt(`${info === undefined ? '0' : info[63][2]}`)}
                  {')'}
                </label>
              </CCardHeader>
            </Link>
            <CCardBody
              className="childChartContainer"
              style={{
                backgroundColor: '#fff9db',
                backgroundImage: `url(${github})`,
                backgroundSize: '33% 50%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            >
              {parseInt(`${info === undefined ? 0 : info[60][2]}`) === 0 &&
              parseInt(`${info === undefined ? 0 : info[61][2]}`) === 0 &&
              parseInt(`${info === undefined ? 0 : info[62][2]}`) === 0 &&
              parseInt(`${info === undefined ? 0 : info[63][2]}`) === 0 ? (
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
                        `${info === undefined ? '0' : info[60][2]}`,
                        `${info === undefined ? '0' : info[61][2]}`,
                        `${info === undefined ? '0' : info[62][2]}`,
                        `${info === undefined ? '0' : info[63][2]}`,
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
                  {parseInt(`${info === undefined ? '0' : info[60][3]}`) +
                    parseInt(`${info === undefined ? '0' : info[61][3]}`) +
                    parseInt(`${info === undefined ? '0' : info[62][3]}`) +
                    parseInt(`${info === undefined ? '0' : info[63][3]}`)}
                  {')'}
                </label>
              </CCardHeader>
            </Link>
            <CCardBody
              className="childChartContainer"
              style={{
                backgroundColor: '#fff9db',
                backgroundImage: `url(${github})`,
                backgroundSize: '33% 50%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            >
              {parseInt(`${info === undefined ? 0 : info[60][3]}`) === 0 &&
              parseInt(`${info === undefined ? 0 : info[61][3]}`) === 0 &&
              parseInt(`${info === undefined ? 0 : info[62][3]}`) === 0 &&
              parseInt(`${info === undefined ? 0 : info[63][3]}`) === 0 ? (
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
                    parseInt(`${info === undefined ? 0 : info[60][3]}`) === 0 &&
                    parseInt(`${info === undefined ? 0 : info[61][3]}`) === 0 &&
                    parseInt(`${info === undefined ? 0 : info[62][3]}`) === 0 &&
                    parseInt(`${info === undefined ? 0 : info[63][3]}`) === 0
                      ? 'hidden'
                      : 'visible'
                  }`,
                }}
                data={{
                  labels: ['Core', 'ERC', 'Networking', 'Interface'],
                  datasets: [
                    {
                      data: [
                        parseInt(`${info === undefined ? 0 : info[60][3]}`),
                        parseInt(`${info === undefined ? 0 : info[61][3]}`),
                        parseInt(`${info === undefined ? 0 : info[62][3]}`),
                        parseInt(`${info === undefined ? 0 : info[63][3]}`),
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
                  {parseInt(`${info === undefined ? '0' : info[60][4]}`) +
                    parseInt(`${info === undefined ? '0' : info[61][4]}`) +
                    parseInt(`${info === undefined ? '0' : info[62][4]}`) +
                    parseInt(`${info === undefined ? '0' : info[63][4]}`)}
                  {')'}
                </label>
              </CCardHeader>
            </Link>
            <CCardBody
              className="childChartContainer"
              style={{
                backgroundColor: '#fff9db',
                backgroundImage: `url(${github})`,
                backgroundSize: '33% 50%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            >
              {parseInt(`${info === undefined ? 0 : info[60][4]}`) === 0 &&
              parseInt(`${info === undefined ? 0 : info[61][4]}`) === 0 &&
              parseInt(`${info === undefined ? 0 : info[62][4]}`) === 0 &&
              parseInt(`${info === undefined ? 0 : info[63][4]}`) === 0 ? (
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
                    parseInt(`${info === undefined ? 0 : info[60][4]}`) === 0 &&
                    parseInt(`${info === undefined ? 0 : info[61][4]}`) === 0 &&
                    parseInt(`${info === undefined ? 0 : info[62][4]}`) === 0 &&
                    parseInt(`${info === undefined ? 0 : info[63][4]}`) === 0
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
                        `${info === undefined ? '0' : info[60][4]}`,
                        `${info === undefined ? '0' : info[61][4]}`,
                        `${info === undefined ? '0' : info[62][4]}`,
                        `${info === undefined ? '0' : info[63][4]}`,
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
                  {parseInt(`${info === undefined ? '0' : info[60][5]}`) +
                    parseInt(`${info === undefined ? '0' : info[61][5]}`) +
                    parseInt(`${info === undefined ? '0' : info[62][5]}`) +
                    parseInt(`${info === undefined ? '0' : info[63][5]}`)}
                  {')'}
                </label>
              </CCardHeader>
            </Link>
            <CCardBody
              className="childChartContainer"
              style={{
                backgroundColor: '#fff9db',
                backgroundImage: `url(${github})`,
                backgroundSize: '33% 50%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            >
              {parseInt(`${info === undefined ? '0' : info[60][5]}`) === 0 &&
              parseInt(`${info === undefined ? '0' : info[61][5]}`) === 0 &&
              parseInt(`${info === undefined ? '0' : info[62][5]}`) === 0 &&
              parseInt(`${info === undefined ? '0' : info[63][5]}`) === 0 ? (
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
                    parseInt(`${info === undefined ? '0' : info[60][5]}`) === 0 &&
                    parseInt(`${info === undefined ? '0' : info[61][5]}`) === 0 &&
                    parseInt(`${info === undefined ? '0' : info[62][5]}`) === 0 &&
                    parseInt(`${info === undefined ? '0' : info[63][5]}`) === 0
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
                        `${info === undefined ? '0' : info[60][5]}`,
                        `${info === undefined ? '0' : info[61][5]}`,
                        `${info === undefined ? '0' : info[62][5]}`,
                        `${info === undefined ? '0' : info[63][5]}`,
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
                backgroundColor: '#fff9db',
                backgroundImage: `url(${github})`,
                backgroundSize: '33% 50%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
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
                      data: [
                        `${info === undefined ? '0' : info[55][2]}`,
                        `${info === undefined ? '0' : info[55][12]}`,
                      ],
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
                backgroundColor: '#fff9db',
                backgroundImage: `url(${github})`,
                backgroundSize: '33% 50%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            >
              {parseInt(`${info === undefined ? '0' : info[55][2]}`) === 0 &&
              parseInt(`${info === undefined ? '0' : info[55][7]}`) === 0 ? (
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
                        `${info === undefined ? '0' : info[55][7]}`,
                        `${info === undefined ? '0' : info[55][2]}`,
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
                {parseInt(`${info === undefined ? '0' : info[60][6]}`) +
                  parseInt(`${info === undefined ? '0' : info[61][6]}`) +
                  parseInt(`${info === undefined ? '0' : info[62][6]}`) +
                  parseInt(`${info === undefined ? '0' : info[63][6]}`)}
                {')'}
              </label>
            </CCardHeader>
            <CCardBody
              className="childChartContainer"
              style={{
                backgroundColor: '#fff9db',
                backgroundImage: `url(${github})`,
                backgroundSize: '33% 50%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            >
              {parseInt(`${info === undefined ? 0 : info[60][6]}`) === 0 &&
              parseInt(`${info === undefined ? 0 : info[61][6]}`) === 0 &&
              parseInt(`${info === undefined ? 0 : info[62][6]}`) === 0 &&
              parseInt(`${info === undefined ? 0 : info[63][6]}`) === 0 ? (
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
                    parseInt(`${info === undefined ? 0 : info[60][6]}`) === 0 &&
                    parseInt(`${info === undefined ? 0 : info[61][6]}`) === 0 &&
                    parseInt(`${info === undefined ? 0 : info[62][6]}`) === 0 &&
                    parseInt(`${info === undefined ? 0 : info[63][6]}`) === 0
                      ? 'hidden'
                      : 'visible'
                  }`,
                }}
                data={{
                  labels: ['Core', 'ERC', 'Networking', 'Interface'],
                  datasets: [
                    {
                      data: [
                        `${info === undefined ? '0' : info[60][6]}`,
                        `${info === undefined ? '0' : info[61][6]}`,
                        `${info === undefined ? '0' : info[62][6]}`,
                        `${info === undefined ? '0' : info[63][6]}`,
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
      </CRow>
    </>
  )
}

export default mayCharts
