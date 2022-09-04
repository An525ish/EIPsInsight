/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { CanvasJS, CanvasJSChart } from 'canvasjs-react-charts'
import github from '../../assets/grey_logo.png'
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import {
  CChartBar,
  CChartLine,
  CChartDoughnut,
  CChartRadar,
  CChartPolarArea,
  CChartPie,
} from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import { Chart } from 'react-google-charts'
import { Link } from 'react-router-dom'
import { ip } from 'src/constants'
const Dashboard = (props) => {
  const [data, setData] = useState()
  const [info, setInfo] = useState()
  const [date, setDate] = useState()

  const [post, getPost] = useState()

  const [years, setYears] = useState()

  const API = 'https://eipsinsight.com/api/overallData'
  const fetchPost = () => {
    fetch(API)
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        getPost(res)
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
      console.log(datas)
      setData(datas)

      const yearArr = datas === [] ? [] : [...new Set(datas.map((item) => item.year))]
      setYears(yearArr)
      console.log(yearArr)

      if (!res.status === 200) {
        const error = new Error(res.error)
        throw error
      }
    } catch (err) {
      console.log(err)
    }
  }
  const fetchArrayYearWise = (yearList, name) => {
    let arr = []
    for (let i = 0; i < yearList.length; i++) {
      let sum = 0
      for (let j = 0; j < data.length; j++) {
        if (yearList[i] === data[j].year) {
          console.log(data[j].summary)

          sum += parseInt(data[j].summary[name])
        }
      }
      arr.push(sum)
    }
    console.log(arr)
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
    console.log(data)
    const arr = []
    for (let i = 0; i < data.length; i++) {
      arr.push(data[i][name][section])
    }

    return arr
  }
  const sortRem = (data, name) => {
    data.sort(sorter)
    console.log(data)
    const arr = []
    for (let i = 0; i < data.length; i++) {
      arr.push(data[i]['summary'][name])
    }

    return arr
  }

  useEffect(() => {
    // fetchData()
    allData()
    fetchPost()
    fetchDate()
    console.log(localStorage.getItem('count'))
    if (localStorage.getItem('count') !== 'undefined') {
      setInfo(JSON.parse(localStorage.getItem('count')))
    }
  }, [])

  useEffect(() => {
    if (props.data !== undefined) {
      console.log(props.data)
      setInfo(props.data)
      localStorage.setItem('count', JSON.stringify(props.data))
    } else {
      console.log(props.data)
      localStorage.setItem('count', JSON.stringify(info))
    }
  }, [info])
  CanvasJS.addColorSet('pieChartColor', ['#2F4F4F', '#008080', '#2E8B57', '#3CB371', '#90EE90'])
  console.log(info)
  console.log(post)

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                EIPs
              </h4>
              <div className="small text-medium-emphasis">{date}</div>
            </CCol>
          </CRow>
          <CChartPie
            style={{
              visibility: `${
                parseInt(`${post === undefined ? 0 : post['Standards Track']}`) === 0 &&
                parseInt(`${post === undefined ? 0 : post['Meta']}`) === 0 &&
                parseInt(`${post === undefined ? 0 : post['Informational']}`) === 0
                  ? 'hidden'
                  : 'visible'
              }`,
            }}
            data={{
              labels: ['Standard Track', 'Meta', 'Informational'],
              datasets: [
                {
                  data: [
                    `${post === undefined ? 0 : post['Standards Track']}`,
                    `${post === undefined ? 0 : post['Meta']}`,
                    `${post === undefined ? 0 : post['Informational']}`,
                  ],
                  backgroundColor: [
                    'rgba(250, 82, 82, 0.3)',
                    'rgba(252, 196, 25, 0.3)',
                    'rgba(59, 201, 219, 0.3)',
                    'rgba(55, 178, 77, 0.3)',
                  ],
                  borderColor: [
                    'rgba(250, 82, 82, 1)',
                    'rgba(252, 196, 25, 1)',
                    'rgba(59, 201, 219, 1)',
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
      <WidgetsDropdown data={data} />
      <hr />
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
        Monthly Insights
      </div>
      <CRow>
        <CCol xs={6}>
          <CCard className="mb-4">
            <CCardHeader className="cardHeader" style={{ fontFamily: 'Roboto', fontWeight: '800' }}>
              Draft
            </CCardHeader>
            <CCardBody
              style={{
                // backgroundColor: '#fff9db',
                backgroundImage: `url(${github})`,
                backgroundSize: '33% 50%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right -16px top -32px',
              }}
            >
              <CChartBar
                data={{
                  labels: data === undefined ? [] : sortLabel(data, 'label'),

                  datasets: [
                    {
                      label: 'Core',
                      backgroundColor: ['rgba(59, 201, 219, 0.3)'],
                      borderColor: ['rgba(59, 201, 219, 1)'],
                      borderWidth: 2,
                      data: data === undefined ? [] : sortData(data, 'Draft', 'Core'),
                    },
                    {
                      label: 'ERC',
                      backgroundColor: ['rgba(250, 82, 82, 0.3)'],
                      borderColor: ['rgba(250, 82, 82, 1)'],
                      borderWidth: 2,
                      data: data === undefined ? [] : sortData(data, 'Draft', 'ERC'),
                    },
                    {
                      label: 'Networking',
                      backgroundColor: ['rgba(252, 196, 25, 0.3)'],
                      borderColor: ['rgba(252, 196, 25, 1)'],
                      borderWidth: 2,
                      data: data === undefined ? [] : sortData(data, 'Draft', 'Networking'),
                    },
                    {
                      label: 'Interface',
                      backgroundColor: ['rgba(55, 178, 77, 0.3)'],
                      borderColor: ['rgba(55, 178, 77, 1)'],
                      borderWidth: 2,
                      data: data === undefined ? [] : sortData(data, 'Draft', 'Interface'),
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  // maintainAspectRatio: false,
                  aspectRatio: -2,
                  plugins: {
                    legend: {
                      position: 'top',
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
          <CCard className="mb-4">
            <CCardHeader className="cardHeader" style={{ fontFamily: 'Roboto', fontWeight: '800' }}>
              Final
            </CCardHeader>
            <CCardBody
              style={{
                // backgroundColor: '#fff9db',
                backgroundImage: `url(${github})`,
                backgroundSize: '33% 50%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right -16px top -32px',
              }}
            >
              <CChartLine
                data={{
                  labels: data === undefined ? [] : sortLabel(data, 'label'),
                  datasets: [
                    {
                      label: 'Core',
                      backgroundColor: ['rgba(59, 201, 219, 0.3)'],
                      borderColor: ['rgba(59, 201, 219, 1)'],
                      borderWidth: 2,
                      data: data === undefined ? [] : sortData(data, 'Final', 'Core'),
                    },
                    {
                      label: 'ERC',
                      backgroundColor: ['rgba(250, 82, 82, 0.3)'],
                      borderColor: ['rgba(250, 82, 82, 1)'],
                      borderWidth: 2,
                      data: data === undefined ? [] : sortData(data, 'Final', 'ERC'),
                    },
                    {
                      label: 'Networking',
                      backgroundColor: ['rgba(252, 196, 25, 0.3)'],
                      borderColor: ['rgba(252, 196, 25, 1)'],
                      borderWidth: 2,
                      data: data === undefined ? [] : sortData(data, 'Final', 'Networking'),
                    },
                    {
                      label: 'Interface',
                      backgroundColor: ['rgba(55, 178, 77, 0.3)'],
                      borderColor: ['rgba(55, 178, 77, 1)'],
                      borderWidth: 2,
                      data: data === undefined ? [] : sortData(data, 'Final', 'Interface'),
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
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
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={6}>
          <CCard className="mb-4">
            <CCardHeader className="cardHeader" style={{ fontFamily: 'Roboto', fontWeight: '800' }}>
              Draft EIPs vs Potential Proposal
            </CCardHeader>
            <CCardBody
              style={{
                // backgroundColor: '#fff9db',
                backgroundImage: `url(${github})`,
                backgroundSize: '33% 30%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right -12px bottom -40px',
              }}
            >
              <div
                style={{
                  marginBottom: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                  fontFamily: 'Roboto',
                  fontWeight: '800',
                }}
              >
                Draft EIPs
              </div>
              <CChartDoughnut
                data={{
                  labels: data === undefined ? [] : sortLabel(data, 'label'),
                  datasets: [
                    {
                      label: 'Draft EIPs',
                      borderColor: [
                        '#3bc9db',
                        '#fa5252',
                        '#e64980',
                        '#be4bdb',
                        '#7950f2',
                        '#4c6ef5',
                        '#15aabf',
                        '#12b886',
                        '#40c057',
                        '#fab005',
                        '#fd7e14',
                        '#f76707',
                      ],
                      backgroundColor: [
                        '#c5f6fa',
                        '#ffc9c9',
                        '#fcc2d7',
                        '#eebefa',
                        '#d0bfff',
                        '#bac8ff',
                        '#a5d8ff',
                        '#b2f2bb',
                        '#96f2d7',
                        '#ffec99',
                        '#ffd8a8',
                      ],
                      data: data === undefined ? [] : sortRem(data, 'Draft'),
                    },
                  ],
                }}
                options={{
                  aspectRatio: 2,
                  responsive: true,
                  plugins: {
                    tooltip: {
                      callbacks: {
                        label: (context) => {
                          return `Draft: ${context.parsed}`
                        },
                      },
                    },
                    legend: {
                      position: 'top',
                      align: 'center',
                      marginBottom: 50,
                      labels: {
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
              <div
                style={{
                  marginBottom: '10px',
                  marginTop: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                  fontFamily: 'Roboto',
                  fontWeight: '800',
                }}
              >
                Potential Proposal
              </div>
              <CChartDoughnut
                data={{
                  labels: [
                    'Aug 2021',
                    'Sep 2021',
                    'Oct 2021',
                    'Nov 2021',
                    'Dec 2021',
                    'Jan 2022',
                    'Feb 2022',
                    'Mar 2022',
                    'Apr 2022',
                    'May 2022',
                    'June 2022',
                  ],
                  datasets: [
                    {
                      label: 'Potential Proposal',
                      borderColor: [
                        '#3bc9db',
                        '#fa5252',
                        '#e64980',
                        '#be4bdb',
                        '#7950f2',
                        '#4c6ef5',
                        '#15aabf',
                        '#12b886',
                        '#40c057',
                        '#fab005',
                        '#fd7e14',
                        '#f76707',
                      ],
                      backgroundColor: [
                        '#c5f6fa',
                        '#ffc9c9',
                        '#fcc2d7',
                        '#eebefa',
                        '#d0bfff',
                        '#bac8ff',
                        '#a5d8ff',
                        '#b2f2bb',
                        '#96f2d7',
                        '#ffec99',
                        '#ffd8a8',
                      ],
                      data: data === undefined ? [] : sortRem(data, 'potentialProposal'),
                    },
                  ],
                }}
                options={{
                  aspectRatio: 2,
                  plugins: {
                    tooltip: {
                      callbacks: {
                        label: (context) => {
                          return `Potential Proposal: ${context.parsed}`
                        },
                      },
                    },
                    legend: {
                      display: false,
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
          <CCard className="mb-4">
            <CCardHeader className="cardHeader" style={{ fontFamily: 'Roboto', fontWeight: '800' }}>
              Final vs Draft
            </CCardHeader>
            <CCardBody
              style={{
                // backgroundColor: '#fff9db',
                backgroundImage: `url(${github})`,
                backgroundSize: '33% 30%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right -12px bottom -40px',
              }}
            >
              <CChartRadar
                data={{
                  labels: data === undefined ? [] : sortLabel(data, 'Draft'),
                  datasets: [
                    {
                      label: 'Draft',
                      backgroundColor: 'rgba(255, 245, 245, 0.4)',
                      borderColor: '#ff8787',
                      pointBackgroundColor: '#f03e3e',
                      pointBorderColor: '#fff',
                      pointHighlightFill: '#fff',
                      pointHighlightStroke: 'rgba(220, 220, 220, 1)',
                      data: data === undefined ? [] : sortRem(data, 'Draft'),
                    },
                    {
                      label: 'Final',
                      backgroundColor: 'rgba(255, 224, 102, 0.2)',
                      borderColor: '#ffe066',
                      pointBackgroundColor: '#fab005',
                      pointBorderColor: '#fff',
                      pointHighlightFill: '#fff',
                      pointHighlightStroke: 'rgba(151, 187, 205, 1)',
                      data: data === undefined ? [] : sortRem(data, 'Final'),
                    },
                  ],
                }}
                options={{
                  scales: {
                    r: {
                      ticks: {
                        display: false,
                      },
                      pointLabels: {
                        font: {
                          family: 'Roboto',
                        },
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      labels: {
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
      <hr />
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
        Yearly Insights
      </div>
      <CRow>
        <CCol xs={6}>
          <CCard className="mb-4 cardBorder">
            <Link to="/mayDraftTable" style={{ textDecoration: 'none', color: 'inherit' }}>
              <CCardHeader className="cardHeader">Draft </CCardHeader>
            </Link>
            <CCardBody
              className="childChartContainer"
              style={{
                backgroundImage: `url(${github})`,
                backgroundSize: '33% 50%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right -16px top -32px',
              }}
            >
              {checkDataPresent(fetchArrayYearWise(years === undefined ? [] : years, 'Draft')) ===
              0 ? (
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
                  labels: years === undefined ? [] : years,
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
                      data: fetchArrayYearWise(years === undefined ? [] : years, 'Draft'),
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
              <CCardHeader className="cardHeader">Final </CCardHeader>
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
              {checkDataPresent(fetchArrayYearWise(years === undefined ? [] : years, 'Final')) ===
              0 ? (
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
                  labels: years === undefined ? [] : years,
                  datasets: [
                    {
                      data: fetchArrayYearWise(years === undefined ? [] : years, 'Final'),
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
              <CCardHeader className="cardHeader">Review </CCardHeader>
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
              {checkDataPresent(fetchArrayYearWise(years === undefined ? [] : years, 'Review')) ===
              0 ? (
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
                  labels: years === undefined ? [] : years,
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
                      data: fetchArrayYearWise(years === undefined ? [] : years, 'Review'),
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
              <CCardHeader className="cardHeader">Last Call </CCardHeader>
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
              {checkDataPresent(
                fetchArrayYearWise(years === undefined ? [] : years, 'LastCall'),
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
              <CChartPolarArea
                style={{
                  visibility: `${
                    checkDataPresent(
                      fetchArrayYearWise(years === undefined ? [] : years, 'LastCall'),
                    ) === 0
                      ? 'hidden'
                      : 'visible'
                  }`,
                }}
                data={{
                  labels: years === undefined ? [] : years,
                  datasets: [
                    {
                      data: fetchArrayYearWise(years === undefined ? [] : years, 'LastCall'),
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
              <CCardHeader className="cardHeader">Stagnant </CCardHeader>
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
              {checkDataPresent(
                fetchArrayYearWise(years === undefined ? [] : years, 'Stagnant'),
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
                  labels: years === undefined ? [] : years,
                  datasets: [
                    {
                      data: fetchArrayYearWise(years === undefined ? [] : years, 'Stagnant'),
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
              <CCardHeader className="cardHeader">Withdrawn </CCardHeader>
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
              {checkDataPresent(
                fetchArrayYearWise(years === undefined ? [] : years, 'Withdrawn'),
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
              <CChartBar
                style={{
                  visibility: `${
                    checkDataPresent(
                      fetchArrayYearWise(years === undefined ? [] : years, 'Withdrawn'),
                    ) === 0
                      ? 'hidden'
                      : 'visible'
                  }`,
                }}
                data={{
                  labels: years === undefined ? [] : years,
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
                      data: fetchArrayYearWise(years === undefined ? [] : years, 'Withdrawn'),
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
        {/* <CCol xs={6}>
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
        </CCol> */}
        <CCol xs={6}>
          <CCard className="mb-4 cardBorder">
            <CCardHeader className="cardHeader">Living </CCardHeader>
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
              {checkDataPresent(fetchArrayYearWise(years === undefined ? [] : years, 'Living')) ===
              0 ? (
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
                    checkDataPresent(
                      fetchArrayYearWise(years === undefined ? [] : years, 'Living'),
                    ) === 0
                      ? 'hidden'
                      : 'visible'
                  }`,
                }}
                data={{
                  labels: years === undefined ? [] : years,
                  datasets: [
                    {
                      data: fetchArrayYearWise(years === undefined ? [] : years, 'Living'),
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
        {/* <CCol xs={6}>
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
        </CTable> */}
      </CRow>
    </>
  )
}

export default Dashboard
