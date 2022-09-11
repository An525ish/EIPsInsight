/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { CSmartTable, CMultiSelect } from '@coreui/react-pro'
import { CanvasJS, CanvasJSChart } from 'canvasjs-react-charts'
import PropTypes from 'prop-types'
import github from '../../assets/grey_logo.png'
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
import {
  CChartBar,
  CChartLine,
  CChartDoughnut,
  CChartRadar,
  CChartPolarArea,
  CChartPie,
} from '@coreui/react-chartjs'
import { ResponsivePie } from '@nivo/pie'
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

import { Column, Pie, G2, Line, Area, Bar } from '@ant-design/plots'
import { each, groupBy } from '@antv/util'
import '../charts/mayCharts.styles.css'
const Dashboard = () => {
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
      arr.push({
        year: yearList[i],
        value: sum,
      })
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
      type: 'Quantity',
    },
    {
      year: 'Informational',
      value: post === undefined ? '' : post['Informational'],
      type: 'Quantity',
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
  const config = {
    data: d1,
    color: ['#1864ab', '#228be6', '#74c0fc', '#a5d8ff', '#dee2e6'],
    isStack: true,
    xField: 'year',
    yField: 'value',
    seriesField: 'type',
    label: false,
    legend: {
      customContent: {
        title: 'Standard Track',
      },
    },

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
    // console.log(arr)
    return arr
  }

  const monthlyDraftConfig = {
    data: draftDataFinding('Draft', data === undefined ? [] : data),
    xField: 'year',
    yField: 'gdp',
    seriesField: 'name',
    color: ['#1864ab', '#228be6', '#74c0fc', '#a5d8ff'],
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
  const monthlyFinalConfig = {
    data: draftDataFinding('Final', data === undefined ? [] : data),
    isGroup: true,
    xField: 'year',
    yField: 'gdp',
    seriesField: 'name',
    color: ['#1864ab', '#228be6', '#74c0fc', '#a5d8ff'],

    /** 设置颜色 */
    //color: ['#1ca9e6', '#f88c24'],

    /** 设置间距 */
    // marginRatio: 0.1,
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'middle', 'bottom'
      // 可配置附加的布局方法
      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: 'interval-adjust-position',
        }, // 数据标签防遮挡
        {
          type: 'interval-hide-overlap',
        }, // 数据标签文颜色自动调整
        {
          type: 'adjust-color',
        },
      ],
    },
    slider: {
      start: 0.0,
      end: 1.0,
    },
  }

  const montlyDraftvsFinalconfig = {
    data: DraftvsPotentialData('summary', data === undefined ? [] : data),
    xField: 'year',
    yField: 'value',
    seriesField: 'name',
    color: ['#1864ab', '#74c0fc'],

    // xAxis: {
    //   type: 'time',
    //   mask: 'YYYY',
    // },
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
    // meta: {
    //   value: {
    //     min: 0,
    //     max: 10,
    //   },
    // },
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
    console.log(arr)
    return arr
  }

  const finalvsDraftconfig = {
    data: finalvsDraftData(data === undefined ? [] : data),
    isStack: true,
    xField: 'year',
    yField: 'value',
    seriesField: 'type',
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
    xField: 'value',
    yField: 'year',
    seriesField: 'year',
    legend: {
      position: 'top-left',
    },
    color: ['#1864ab', '#74c0fc'],
  }
  const yearlyFinalConfig = {
    data: fetchArrayYearWise(years === undefined ? [] : years, 'Final'),
    xField: 'value',
    yField: 'year',
    seriesField: 'year',
    legend: {
      position: 'top-left',
    },
    color: ['#1864ab', '#74c0fc'],
  }
  const yearlyReviewConfig = {
    data: fetchArrayYearWise(years === undefined ? [] : years, 'Review'),
    xField: 'value',
    yField: 'year',
    seriesField: 'year',
    legend: {
      position: 'top-left',
    },
    color: ['#1864ab', '#74c0fc'],
  }
  const G = G2.getEngine('canvas')
  const yearlyLastCallConfig = {
    appendPadding: 10,
    data: fetchArrayYearWise(years === undefined ? [] : years, 'LastCall'),
    angleField: 'value',
    colorField: 'year',
    radius: 0.8,
    legend: false,
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
            text: `${data.year}`,
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
    color: ['#1864ab', '#74c0fc'],
  }

  const yearlyStagnantConfig = {
    appendPadding: 10,
    data: fetchArrayYearWise(years === undefined ? [] : years, 'Stagnant'),
    angleField: 'value',
    colorField: 'year',
    radius: 0.8,
    legend: false,
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
            text: `${data.year}`,
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
    color: ['#1864ab', '#74c0fc'],
  }
  const yearlyWithdrawnConfig = {
    data: fetchArrayYearWise(years === undefined ? [] : years, 'Withdrawn'),
    xField: 'value',
    yField: 'year',
    seriesField: 'year',
    legend: {
      position: 'top-left',
    },
    color: ['#1864ab', '#74c0fc'],
  }
  const yearlyLivingConfig = {
    data: fetchArrayYearWise(years === undefined ? [] : years, 'Living'),
    xField: 'value',
    yField: 'year',
    seriesField: 'year',
    legend: {
      position: 'top-left',
    },
    color: ['#1864ab', '#74c0fc'],
  }

  useEffect(() => {
    // fetchData()

    allData()
    fetchPost()
    fetchDate()
  }, [])

  console.log(info)
  console.log(post)

  // temparary

  return (
    <>
      <CRow>
        <CCol xs={6}>
          <CCard style={{ border: '2px solid #a5d8ff' }} className="mb-2 cardBorder">
            <CCardHeader
              className="cardHeader"
              style={{ fontFamily: 'Roboto', fontWeight: '800', fontSize: '14px' }}
            >
              EIPs{' '}
            </CCardHeader>
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
            <CCardFooter
              className="cardFooter"
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <label style={{ color: 'grey', fontSize: '10px' }}>{date}</label>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol xs={6}>
          <CCard style={{ border: '2px solid #a5d8ff' }}>
            <CCardHeader
              className="cardHeader"
              style={{ fontFamily: 'Roboto', fontWeight: '800', fontSize: '14px' }}
            >
              EIPs Types
            </CCardHeader>
            <CCardBody
              style={{
                overflowX: 'auto',
                overflowY: 'auto',
                height: '300px',
                fontFamily: 'Roboto',
                fontSize: '12px',
              }}
            >
              <CSmartTable
                cleaner
                clickableRows
                columns={[
                  {
                    key: 'name',
                    _style: { width: '70%' },
                  },
                  {
                    key: 'EIPs',
                    _style: { width: '30%' },
                    filter: (values, onChange) => {
                      const unique = [...new Set(values)].sort()
                      return (
                        <CMultiSelect
                          size="sm"
                          onChange={(selected) => {
                            const _selected = selected.map((element) => {
                              return element.value
                            })
                            onChange((item) => {
                              return Array.isArray(_selected) && _selected.length
                                ? _selected.includes(item.toLowerCase())
                                : true
                            })
                          }}
                          options={unique.map((element) => {
                            return {
                              value: element.toLowerCase(),
                              text: element,
                            }
                          })}
                        />
                      )
                    },
                    sorter: false,
                  },
                ]}
                columnFilter
                columnSorter
                footer
                items={[
                  { id: 0, name: 'Core', EIPs: `${post === undefined ? '' : post['Core']}` },
                  { id: 1, name: 'ERC', EIPs: `${post === undefined ? '' : post['ERC']}` },
                  {
                    id: 2,
                    name: 'Networking',
                    EIPs: `${post === undefined ? '' : post['Networking']}`,
                  },
                  {
                    id: 3,
                    name: 'Interface',
                    EIPs: `${post === undefined ? '' : post['Interface']}`,
                  },
                  { id: 4, name: 'Meta', EIPs: `${post === undefined ? '' : post['Meta']}` },
                  {
                    id: 5,
                    name: 'Informational',
                    EIPs: `${post === undefined ? '' : post['Informational']}`,
                  },
                ]}
                itemsPerPageSelect
                itemsPerPage={10}
                pagination
                tableFilter
                tableProps={{
                  hover: true,
                  responsive: true,
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Monthly Insights */}
      <CRow>
        <CCol xs={12} className="mb-4">
          <CCard
            style={{
              backgroundColor: '#dee2e6',
            }}
          >
            <CCardBody
              style={{
                color: '#212529',
                fontWeight: '800',
                fontSize: '18px',
              }}
            >
              Monthly Insights
              <hr
                style={{
                  height: '2px',
                  color: '#212529',
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={12}>
          <CCard style={{ border: '2px solid #a5d8ff' }} className="mb-2 cardBorder">
            <CCardHeader
              className="cardHeader"
              style={{ fontFamily: 'Roboto', fontWeight: '800', fontSize: '14px' }}
            >
              Draft{' '}
            </CCardHeader>
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
              <Line {...monthlyDraftConfig} />
            </CCardBody>
            <CCardFooter
              className="cardFooter"
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <label style={{ color: 'grey', fontSize: '10px' }}>{date}</label>
            </CCardFooter>
          </CCard>
        </CCol>

        <CCol xs={12}>
          <CCard style={{ border: '2px solid #a5d8ff' }} className="mb-2 cardBorder">
            <CCardHeader
              className="cardHeader"
              style={{ fontFamily: 'Roboto', fontWeight: '800', fontSize: '14px' }}
            >
              Final{' '}
            </CCardHeader>
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
              <Column {...monthlyFinalConfig} />
            </CCardBody>
            <CCardFooter
              className="cardFooter"
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <label style={{ color: 'grey', fontSize: '10px' }}>{date}</label>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol xs={6}>
          <CCard style={{ border: '2px solid #a5d8ff' }} className="mb-2 cardBorder">
            <CCardHeader
              className="cardHeader"
              style={{ fontFamily: 'Roboto', fontWeight: '800', fontSize: '14px' }}
            >
              DraftEIPs vs Potential Proposal{' '}
            </CCardHeader>
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
              <Area {...montlyDraftvsFinalconfig} />
            </CCardBody>
            <CCardFooter
              className="cardFooter"
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <label style={{ color: 'grey', fontSize: '10px' }}>{date}</label>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol xs={6}>
          <CCard style={{ border: '2px solid #a5d8ff' }} className="mb-2 cardBorder">
            <CCardHeader
              className="cardHeader"
              style={{ fontFamily: 'Roboto', fontWeight: '800', fontSize: '14px' }}
            >
              Final vs Draft{' '}
            </CCardHeader>
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
              <Column {...finalvsDraftconfig} />
            </CCardBody>
            <CCardFooter
              className="cardFooter"
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <label style={{ color: 'grey', fontSize: '10px' }}>{date}</label>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={12} className="mb-4">
          <CCard
            style={{
              backgroundColor: '#dee2e6',
            }}
          >
            <CCardBody
              style={{
                color: '#212529',
                fontWeight: '800',
                fontSize: '18px',
              }}
            >
              Yearly Insights
              <hr
                style={{
                  height: '2px',
                  color: '#212529',
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={4}>
          <CCard style={{ border: '2px solid #a5d8ff' }} className="mb-2 cardBorder">
            <CCardHeader
              className="cardHeader"
              style={{ fontFamily: 'Roboto', fontWeight: '800', fontSize: '14px' }}
            >
              Draft{' '}
            </CCardHeader>
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
              <Bar {...yearlyDraftConfig} />
            </CCardBody>
            <CCardFooter
              className="cardFooter"
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <label style={{ color: 'grey', fontSize: '10px' }}>{date}</label>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol xs={4}>
          <CCard style={{ border: '2px solid #a5d8ff' }} className="mb-2 cardBorder">
            <CCardHeader
              className="cardHeader"
              style={{ fontFamily: 'Roboto', fontWeight: '800', fontSize: '14px' }}
            >
              Final{' '}
            </CCardHeader>
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
              <Bar {...yearlyFinalConfig} />
            </CCardBody>
            <CCardFooter
              className="cardFooter"
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <label style={{ color: 'grey', fontSize: '10px' }}>{date}</label>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol xs={4}>
          <CCard style={{ border: '2px solid #a5d8ff' }} className="mb-2 cardBorder">
            <CCardHeader
              className="cardHeader"
              style={{ fontFamily: 'Roboto', fontWeight: '800', fontSize: '14px' }}
            >
              Review{' '}
            </CCardHeader>
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
              <Bar {...yearlyReviewConfig} />
            </CCardBody>
            <CCardFooter
              className="cardFooter"
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <label style={{ color: 'grey', fontSize: '10px' }}>{date}</label>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol xs={6}>
          <CCard style={{ border: '2px solid #a5d8ff' }} className="mb-2 cardBorder">
            <CCardHeader
              className="cardHeader"
              style={{ fontFamily: 'Roboto', fontWeight: '800', fontSize: '14px' }}
            >
              Last-Call{' '}
            </CCardHeader>
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
              <Pie {...yearlyLastCallConfig} />
            </CCardBody>
            <CCardFooter
              className="cardFooter"
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <label style={{ color: 'grey', fontSize: '10px' }}>{date}</label>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol xs={6}>
          <CCard style={{ border: '2px solid #a5d8ff' }} className="mb-2 cardBorder">
            <CCardHeader
              className="cardHeader"
              style={{ fontFamily: 'Roboto', fontWeight: '800', fontSize: '14px' }}
            >
              Stagnant{' '}
            </CCardHeader>
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
              <Pie {...yearlyStagnantConfig} />
            </CCardBody>
            <CCardFooter
              className="cardFooter"
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <label style={{ color: 'grey', fontSize: '10px' }}>{date}</label>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol xs={6}>
          <CCard style={{ border: '2px solid #a5d8ff' }} className="mb-2 cardBorder">
            <CCardHeader
              className="cardHeader"
              style={{ fontFamily: 'Roboto', fontWeight: '800', fontSize: '14px' }}
            >
              Withdrawn{' '}
            </CCardHeader>
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
              <Bar {...yearlyWithdrawnConfig} />
            </CCardBody>
            <CCardFooter
              className="cardFooter"
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <label style={{ color: 'grey', fontSize: '10px' }}>{date}</label>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol xs={6}>
          <CCard style={{ border: '2px solid #a5d8ff' }} className="mb-2 cardBorder">
            <CCardHeader
              className="cardHeader"
              style={{ fontFamily: 'Roboto', fontWeight: '800', fontSize: '14px' }}
            >
              Living{' '}
            </CCardHeader>
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
              <Bar {...yearlyLivingConfig} />
            </CCardBody>
            <CCardFooter
              className="cardFooter"
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <label style={{ color: 'grey', fontSize: '10px' }}>{date}</label>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
