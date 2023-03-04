/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
import React, { useEffect, useMemo, useState } from 'react'
import {
  CTable,
  CTableHeaderCell,
  CTableHead,
  CTableRow,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import { CCard, CCardBody, CCardFooter, CCol, CRow } from '@coreui/react-pro'
import { Column, Pie, G2, Line, Area, Bar, measureTextWidth } from '@ant-design/plots'
import { each, groupBy } from '@antv/util'
import './type.css'
import useMediaQuery from 'src/scss/useMediaQuery'
import { Link, useNavigate } from 'react-router-dom'
import { useUserAuth } from 'src/Context/AuthContext'
import Loading from 'src/views/theme/loading/loading'
import { StatusColors, TypeColors } from 'src/constants'
import { ip } from 'src/constants'
import AllEIPs from 'src/views/charts/allEIPs'

function typeAll() {
  const [post, getPost] = useState()
  const [date, setDate] = useState()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [eips, setEips] = useState([])
  // const [allData, setAllData] = useState([])
  const matches = useMediaQuery('(max-width: 767px)')

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

    if (!ignore) {
      setEips(factorOutDuplicate(Object.values(post[0])))
      setLoading(true)
    }
  }

  const API = 'https://eipsinsight.com/api/statusPage'
  const fetchPost = () => {
    fetch(API)
      .then((res) => res.json())
      .then((res) => {
        getPost(res)
      })
  }
  const fetchAnnotations = (d) => {
    const annotations = []
    each(groupBy(d, 'type'), (values, k) => {
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
  const fetchDate = () => {
    let date = new Date().toDateString()
    setDate(date)
  }
  const fetchTableData = (data, name, status) => {
    const keys = Object.keys(data)
    let res = 0
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] === status) {
        res =
          data[keys[i]][name]['Core'] +
          data[keys[i]][name]['ERC'] +
          data[keys[i]][name]['Networking'] +
          data[keys[i]][name]['Interface']
      }
    }

    return res
  }
  const fetchTableDataExtra = (data, name, status) => {
    const keys = Object.keys(data)
    let res = 0
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] === status) {
        res = data[keys[i]][name]
      }
    }

    return res
  }

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

  useEffect(() => {
    fetchPost()
    fetchDate()
    fetchAllEIps()
    fetchAllData()
  }, [])

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

  const fetchChartData = (post, name) => {
    const arr = []
    let allData = distributeData(eips)
    allData = name === 'Meta' ? allData[4].data : allData[5].data

    let livingData = allData.filter((item) => item.status === 'Living').length
    let finalData = allData.filter((item) => item.status === 'Final').length
    let lastCallData = allData.filter((item) => item.status === 'Last Call').length
    let reviewData = allData.filter((item) => item.status === 'Review').length
    let draftData = allData.filter((item) => item.status === 'Draft').length
    let stagnantData = allData.filter((item) => item.status === 'Stagnant').length
    let withdrawnData = allData.filter((item) => item.status === 'Withdrawn').length

    arr.push(
      {
        type: 'Living',
        value: livingData,
      },
      {
        type: 'Final',
        value: finalData,
      },
      {
        type: 'Last_Call',
        value: lastCallData,
      },
      {
        type: 'Review',
        value: reviewData,
      },
      {
        type: 'Draft',
        value: draftData,
      },

      {
        type: 'Stagnant',
        value: stagnantData,
      },
      {
        type: 'Withdrawn',
        value: withdrawnData,
      },
    )

    return arr
  }
  const getStandardAttribute = (post, name) => {
    return post.length === 0
      ? 0
      : post['Final']['Standard_Track'] === undefined
      ? 0
      : post['Final']['Standard_Track'][name] +
        post['Draft']['Standard_Track'][name] +
        post['Review']['Standard_Track'][name] +
        post['Last_Call']['Standard_Track'][name] +
        post['Stagnant']['Standard_Track'][name] +
        post['Withdrawn']['Standard_Track'][name] +
        post['Living']['Standard_Track'][name]
  }

  // get meta and informational Data
  const getMetaAndInformational = (name) => {
    return post === undefined
      ? 0
      : fetchTableDataExtra(post === undefined ? [] : post, name, 'Living') +
          fetchTableDataExtra(post === undefined ? [] : post, name, 'Final') +
          fetchTableDataExtra(post === undefined ? [] : post, name, 'Withdrawn') +
          fetchTableDataExtra(post === undefined ? [] : post, name, 'Draft') +
          fetchTableDataExtra(post === undefined ? [] : post, name, 'Review') +
          fetchTableDataExtra(post === undefined ? [] : post, name, 'Last_Call') +
          fetchTableDataExtra(post === undefined ? [] : post, name, 'Stagnant')
  }
  const fetchChartDataStandardTrack = (post) => {
    let arr = []
    let allData = distributeData(eips)
    arr.push(
      {
        type: 'Core',
        value: allData[0].total,
      },
      {
        type: 'ERC',
        value: allData[1].total,
      },
      {
        type: 'Networking',
        value: allData[2].total,
      },
      {
        type: 'Interface',
        value: allData[3].total,
      },
    )
    return arr
  }
  const getChartInfo = (post, name) => {
    const config = {
      appendPadding: 10,
      data:
        name === 'Standard_Track'
          ? fetchChartDataStandardTrack(post.length === 0 ? [] : post)
          : fetchChartData(post === undefined ? [] : post, name),
      color: name === 'Standard_Track' ? TypeColors : StatusColors,
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
  const coloring = (text) => {
    switch (text) {
      case 'text':
        return '#1c7ed6'
      case 'back':
        return '#ffffff'
      default:
        return '#e7f5ff'
    }
  }

  const totalEIPs = () => {
    const total =
      allData[0].total +
      allData[1].total +
      allData[2].total +
      allData[3].total +
      allData[4].total +
      allData[5].total

    return total
  }

  return (
    <>
      {loading ? (
        <div>
          <div className="flex justify-center items-center">
            <div
              style={{
                fontSize: '3rem',
                marginBottom: '00px',
                backgroundColor: 'white',
                border: 'none',

                padding: '20px',
                borderRadius: '5px',

                borderTop: '4px solid #339af0',
                // textTransform: 'uppercase',
              }}
              className="flex justify-center items-center shadow-md"
            >
              Type - Category{' '}
              <label
                style={{
                  fontSize: '1.5rem',
                  fontWeight: '800',
                }}
              >
                <Link
                  to="/EIPs"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  state={{
                    type: 'Standards Track',
                    status: '',
                    category: '',
                    name: 'Standard_Track',
                  }}
                >
                  <div
                    className='className="h-7
            shadow-md font-extrabold rounded-[8px] bg-[#e7f5ff] text-[#1c7ed6] text-[2.5rem] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out ml-3 tracking-wider'
                    style={{
                      fontFamily: 'Big Shoulders Display',
                    }}
                  >
                    {allData[0].total +
                      allData[1].total +
                      allData[2].total +
                      allData[3].total +
                      allData[4].total +
                      allData[5].total}
                  </div>
                </Link>
              </label>
            </div>
          </div>
          <Link
            to="/StandardsTrack"
            style={{ textDecoration: 'none', color: 'inherit' }}
            state={{
              type: 'Standards Track',
              status: '',
              category: '',
              name: 'Standard_Track',
              data: eips.filter((eip) => eip.type === 'Standards Track'),
              eips: eip[3]['Last Call'],
            }}
          >
            <div
              style={{
                marginTop: '30px',
              }}
              className="type-heading border-t-2 border-[#1c7ed6] hover:scale-105 ease-in-out transition-all duration-300 cursor-pointer"
            >
              Standard Track{' '}
              <label
                style={{
                  fontSize: '1.5rem',
                  fontWeight: '800',
                }}
              >
                <div
                  // className='type-heading-number'
                  className='className="h-7
            shadow-md font-extrabold rounded-[8px] bg-[#e7f5ff] text-[#1c7ed6] text-[1.5rem] inline-block p-[4px] px-3 drop-shadow-sm cursor-pointer transition duration-700 ease-in-out tracking-wider ml-2'
                  style={{ fontFamily: 'Big Shoulders Display' }}
                >
                  {allData[0].total + allData[1].total + allData[2].total + allData[3].total}
                </div>
              </label>
            </div>
          </Link>
          <CRow>
            <CCol xs={matches ? 12 : 6}>
              <CCard className="type-card-container">
                <CCardBody>
                  <Pie
                    {...getChartInfo(post === undefined ? [] : post, 'Standard_Track')}
                    style={{ height: '280px' }}
                  />
                </CCardBody>
                <CCardFooter
                  className="cardFooter"
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    background: `${coloring('back')}`,
                  }}
                >
                  <label style={{ fontSize: '12px', color: `black` }}>{date}</label>
                </CCardFooter>
              </CCard>
            </CCol>
            <CCol xs={matches ? 12 : 6}>
              <CCard className="type-card-container">
                <CCardBody
                  style={{
                    overflowX: 'auto',
                    overflowY: 'auto',
                    height: '312px',
                    fontFamily: 'Roboto',
                    fontSize: '12px',
                    borderRight: '2px solid #74c0fc',
                    '--main-color': `#1c7ed6`,
                    '--main-color-background': `#e7f5ff`,
                  }}
                  className="scrollbarDesign"
                >
                  <CTable align="middle" responsive>
                    <CTableHead style={{ borderBottom: '2px solid #4dabf7' }}>
                      <CTableRow>
                        <CTableHeaderCell style={{ fontSize: '16px' }} scope="col">
                          Type-Category
                        </CTableHeaderCell>
                        <CTableHeaderCell style={{ fontSize: '16px' }} scope="col">
                          no. of EIPs
                        </CTableHeaderCell>
                        <CTableHeaderCell style={{ fontSize: '16px' }} scope="col">
                          %
                        </CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      <CTableRow>
                        <CTableDataCell>
                          <Link
                            to="/Standard-Core"
                            style={{ textDecoration: 'none', color: 'inherit' }}
                            state={{
                              type: 'Standards Track',
                              status: '',
                              category: 'Core',
                              name: 'Standard_Track_Core',
                              data: eips.filter(
                                (eip) => eip.type === 'Standards Track' && eip.category === 'Core',
                              ),
                              eips: eip[3]['Last_Call'],
                            }}
                          >
                            <div
                              className='className="h-7
            shadow-2xl font-bold rounded-[8px] hover:bg-[#e7f5ff] hover:text-[#1c7ed6] text-[14px] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out'
                            >
                              Standard - Core
                            </div>
                          </Link>
                        </CTableDataCell>
                        <CTableDataCell>{allData[0].total}</CTableDataCell>
                        <CTableDataCell>
                          <label
                            style={{ fontFamily: 'Big Shoulders Display' }}
                            className="tracking-wider text-[0.8rem]"
                          >
                            {((allData[0].total / totalEIPs()) * 100).toFixed(2)}%
                          </label>
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell>
                          <Link
                            to="/Standard-ERC"
                            style={{ textDecoration: 'none', color: 'inherit' }}
                            state={{
                              type: 'Standards Track',
                              status: '',
                              category: 'ERC',
                              name: 'Standard_Track_ERC',
                              data: eips.filter(
                                (eip) => eip.type === 'Standards Track' && eip.category === 'ERC',
                              ),
                              eips: eip[3]['Last_Call'],
                            }}
                          >
                            <div
                              className='className="h-7
            shadow-2xl font-bold rounded-[8px] hover:bg-[#e7f5ff] hover:text-[#1c7ed6] text-[14px] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out'
                            >
                              Standard - ERC
                            </div>
                          </Link>
                        </CTableDataCell>
                        <CTableDataCell>{allData[1].total}</CTableDataCell>
                        <CTableDataCell>
                          <label
                            style={{ fontFamily: 'Big Shoulders Display' }}
                            className="tracking-wider text-[0.8rem]"
                          >
                            {((allData[1].total / totalEIPs()) * 100).toFixed(2)}%
                          </label>
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell>
                          <Link
                            to="/Standard-Networking"
                            style={{ textDecoration: 'none', color: 'inherit' }}
                            state={{
                              type: 'Standards Track',
                              status: '',
                              category: 'Networking',
                              name: 'Standard_Track_Networking',
                              data: eips.filter(
                                (eip) =>
                                  eip.type === 'Standards Track' && eip.category === 'Networking',
                              ),
                              eips: eip[3]['Last_Call'],
                            }}
                          >
                            <div
                              className='className="h-7
            shadow-2xl font-bold rounded-[8px] hover:bg-[#e7f5ff] hover:text-[#1c7ed6] text-[14px] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out'
                            >
                              Standard - Networking
                            </div>
                          </Link>
                        </CTableDataCell>
                        <CTableDataCell>{allData[2].total}</CTableDataCell>
                        <CTableDataCell>
                          <label
                            style={{ fontFamily: 'Big Shoulders Display' }}
                            className="tracking-wider text-[0.8rem]"
                          >
                            {((allData[2].total / totalEIPs()) * 100).toFixed(2)}%
                          </label>
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell>
                          <Link
                            to="/Standard-Interface"
                            style={{ textDecoration: 'none', color: 'inherit' }}
                            state={{
                              type: 'Standards Track',
                              status: '',
                              category: 'Interface',
                              name: 'Standard_Track_Interface',
                              data: eips.filter(
                                (eip) =>
                                  eip.type === 'Standards Track' && eip.category === 'Interface',
                              ),
                              eips: eip[3]['Last_Call'],
                            }}
                          >
                            <div
                              className='className="h-7
            shadow-2xl font-bold rounded-[8px] hover:bg-[#e7f5ff] hover:text-[#1c7ed6] text-[14px] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out'
                            >
                              Standard - Interface
                            </div>
                          </Link>
                        </CTableDataCell>
                        <CTableDataCell>{allData[3].total}</CTableDataCell>
                        <CTableDataCell>
                          <label
                            style={{ fontFamily: 'Big Shoulders Display' }}
                            className="tracking-wider text-[0.8rem]"
                          >
                            {((allData[3].total / totalEIPs()) * 100).toFixed(2)}%
                          </label>
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell>
                          <Link
                            to="/Meta"
                            style={{ textDecoration: 'none', color: 'inherit' }}
                            state={{
                              type: 'Standards Track',
                              status: '',
                              category: 'Interface',
                              name: 'Meta',
                              data: eips.filter((eip) => eip.type === 'Meta'),
                              eips: eip[3]['Last_Call'],
                            }}
                          >
                            <div
                              className='className="h-7
            shadow-2xl font-bold rounded-[8px] hover:bg-[#e7f5ff] hover:text-[#1c7ed6] text-[14px] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out'
                            >
                              Meta
                            </div>
                          </Link>
                        </CTableDataCell>
                        <CTableDataCell>{allData[4].total}</CTableDataCell>
                        <CTableDataCell>
                          <label
                            style={{ fontFamily: 'Big Shoulders Display' }}
                            className="tracking-wider text-[0.8rem]"
                          >
                            {((allData[4].total / totalEIPs()) * 100).toFixed(2)}%
                          </label>
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell>
                          <Link
                            to="/Informational"
                            style={{ textDecoration: 'none', color: 'inherit' }}
                            state={{
                              type: 'Standards Track',
                              status: '',
                              category: 'Interface',
                              name: 'Informational',
                              data: eips.filter((eip) => eip.type === 'Informational'),
                              eips: eip[3]['Last_Call'],
                            }}
                          >
                            <div
                              className='className="h-7
            shadow-2xl font-bold rounded-[8px] hover:bg-[#e7f5ff] hover:text-[#1c7ed6] text-[14px] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out'
                            >
                              Informational
                            </div>
                          </Link>
                        </CTableDataCell>
                        <CTableDataCell>{allData[5].total}</CTableDataCell>
                        <CTableDataCell>
                          <label
                            style={{ fontFamily: 'Big Shoulders Display' }}
                            className="tracking-wider text-[0.8rem]"
                          >
                            {((allData[5].total / totalEIPs()) * 100).toFixed(2)}%
                          </label>
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell>
                          <Link
                            to="/EIPs"
                            style={{ textDecoration: 'none', color: 'inherit' }}
                            state={{
                              type: 'Standards Track',
                              status: '',
                              category: 'Interface',
                              name: 'Standard_Track_Interface',
                              eips: eip[3]['Last_Call'],
                            }}
                          >
                            <div
                              className='className="h-7
            shadow-2xl font-extrabold rounded-[8px] hover:bg-[#e7f5ff] hover:text-[#1c7ed6] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out'
                            >
                              Total
                            </div>
                          </Link>
                        </CTableDataCell>
                        <CTableDataCell>
                          <Link to="/EIPs">
                            <label
                              style={{
                                color: `${'#1c7ed6'}`,
                                background: `${'#e7f5ff'}`,
                                fontWeight: '800',
                                fontSize: '15px',
                                borderRadius: '12px',
                                fontFamily: 'Big Shoulders Display',
                              }}
                              className="p-1.5 shadow-md tracking-wider cursor-pointer"
                            >
                              {totalEIPs()}
                            </label>
                          </Link>
                        </CTableDataCell>
                        <CTableDataCell>
                          <label
                            style={{ fontFamily: 'Big Shoulders Display' }}
                            className="tracking-wider text-[1rem]"
                          >
                            100%
                          </label>
                        </CTableDataCell>
                      </CTableRow>
                    </CTableBody>
                  </CTable>
                </CCardBody>
                <CCardFooter
                  className="cardFooter"
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    background: `${coloring('back')}`,
                  }}
                >
                  <label style={{ fontSize: '12px', color: `black` }}>{date}</label>
                </CCardFooter>
              </CCard>
            </CCol>
          </CRow>
          <div className="flex justify-between">
            <div
              style={{}}
              className="type-heading border-t-2 border-[#1c7ed6] hover:scale-105 ease-in-out transition-all duration-300 cursor-pointer"
            >
              Meta{' '}
              <label
                style={{
                  fontSize: '1.5rem',
                  fontWeight: '800',
                }}
              >
                <Link
                  to="/Meta"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  state={{
                    type: 'Meta',
                    status: '',
                    category: '',
                    name: 'Meta',
                    data: eips.filter((eip) => eip.type === 'Meta'),
                    eips: eip[3]['Last_Call'],
                  }}
                >
                  <div
                    className='className="h-7
            shadow-md font-extrabold rounded-[8px] bg-[#e7f5ff] text-[#1c7ed6] text-[1.5rem] inline-block p-[4px] px-3 drop-shadow-sm cursor-pointer transition duration-700 ease-in-out tracking-wider ml-2'
                    style={{ fontFamily: 'Big Shoulders Display' }}
                  >
                    {allData[4].total}
                  </div>
                </Link>
              </label>
            </div>
            <div className="type-heading border-t-2 border-[#1c7ed6] hover:scale-105 ease-in-out transition-all duration-300 cursor-pointer">
              Informational{' '}
              <label
                style={{
                  fontSize: '1.5rem',
                  fontWeight: '800',
                }}
              >
                <Link
                  to="/Informational"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  state={{
                    type: 'Informational',
                    status: '',
                    category: '',
                    name: 'Informational',
                    data: eips.filter((eip) => eip.type === 'Informational'),
                    eips: eip[3]['Last_Call'],
                  }}
                >
                  <div
                    className='className="h-7
            shadow-md font-extrabold rounded-[8px] bg-[#e7f5ff] text-[#1c7ed6] px-3 text-[1.5rem] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out tracking-wider ml-2'
                    style={{ fontFamily: 'Big Shoulders Display' }}
                  >
                    {allData[5].total}
                  </div>
                </Link>
              </label>
            </div>
          </div>
          <CRow>
            <CCol xs={matches ? 12 : 6}>
              <CCard className="type-card-container">
                <CCardBody
                  style={{
                    height: '300px',
                  }}
                >
                  <Pie
                    {...getChartInfo(post === undefined ? [] : post, 'Meta')}
                    style={{ height: '280px' }}
                  />
                  ;
                </CCardBody>
                <CCardFooter
                  className="cardFooter"
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    background: `${coloring('back')}`,
                  }}
                >
                  <label style={{ fontSize: '12px', color: `black` }}>{date}</label>
                </CCardFooter>
              </CCard>
            </CCol>

            <CCol xs={matches ? 12 : 6}>
              <CCard className="type-card-container">
                <CCardBody
                  style={{
                    height: '300px',
                  }}
                >
                  <Pie
                    {...getChartInfo(post === undefined ? [] : post, 'Informational')}
                    style={{ height: '280px' }}
                  />
                  ;
                </CCardBody>
                <CCardFooter
                  className="cardFooter"
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    background: `${coloring('back')}`,
                  }}
                >
                  <label style={{ fontSize: '12px', color: `black` }}>{date}</label>
                </CCardFooter>
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

export default typeAll
