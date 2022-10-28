/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
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
import { Link } from 'react-router-dom'

function typeAll() {
  const [post, getPost] = useState()
  const [date, setDate] = useState()

  const matches = useMediaQuery('(max-width: 600px)')

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

  useEffect(() => {
    fetchPost()
    fetchDate()
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
    arr.push(
      {
        type: 'Draft',
        value:
          name === 'Standard_Track'
            ? fetchTableData(post, name, 'Draft')
            : fetchTableDataExtra(post, name, 'Draft'),
      },
      {
        type: 'Final',
        value:
          name === 'Standard_Track'
            ? fetchTableData(post, name, 'Final')
            : fetchTableDataExtra(post, name, 'Final'),
      },
      {
        type: 'Review',
        value:
          name === 'Standard_Track'
            ? fetchTableData(post, name, 'Review')
            : fetchTableDataExtra(post, name, 'Review'),
      },
      {
        type: 'Last_Call',
        value:
          name === 'Standard_Track'
            ? fetchTableData(post, name, 'Last_Call')
            : fetchTableDataExtra(post, name, 'Last_Call'),
      },
      {
        type: 'Stagnant',
        value:
          name === 'Standard_Track'
            ? fetchTableData(post, name, 'Stagnant')
            : fetchTableDataExtra(post, name, 'Stagnant'),
      },
      {
        type: 'Withdrawn',
        value:
          name === 'Standard_Track'
            ? fetchTableData(post, name, 'Withdrawn')
            : fetchTableDataExtra(post, name, 'Withdrawn'),
      },
      {
        type: 'Living',
        value:
          name === 'Standard_Track'
            ? fetchTableData(post, name, 'Living')
            : fetchTableDataExtra(post, name, 'Living'),
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
  const fetchChartDataStandardTrack = (post) => {
    let arr = []
    arr.push(
      {
        type: 'Core',
        value: getStandardAttribute(post.length === 0 ? [] : post, 'Core'),
      },
      {
        type: 'ERC',
        value: getStandardAttribute(post.length === 0 ? [] : post, 'ERC'),
      },
      {
        type: 'Networking',
        value: getStandardAttribute(post.length === 0 ? [] : post, 'Networking'),
      },
      {
        type: 'Interface',
        value: getStandardAttribute(post.length === 0 ? [] : post, 'Interface'),
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

  const totalEIPs = () => {
    const total =
      getStandardAttribute(post === undefined ? [] : post, 'Core') +
      getStandardAttribute(post === undefined ? [] : post, 'ERC') +
      getStandardAttribute(post === undefined ? [] : post, 'Networking') +
      getStandardAttribute(post === undefined ? [] : post, 'Interface') +
      fetchTableDataExtra(post === undefined ? [] : post, 'Meta', 'Living') +
      fetchTableDataExtra(post === undefined ? [] : post, 'Meta', 'Final') +
      fetchTableDataExtra(post === undefined ? [] : post, 'Meta', 'Withdrawn') +
      fetchTableDataExtra(post === undefined ? [] : post, 'Meta', 'Draft') +
      fetchTableDataExtra(post === undefined ? [] : post, 'Meta', 'Review') +
      fetchTableDataExtra(post === undefined ? [] : post, 'Meta', 'Last_Call') +
      fetchTableDataExtra(post === undefined ? [] : post, 'Meta', 'Stagnant') +
      fetchTableDataExtra(post === undefined ? [] : post, 'Informational', 'Living') +
      fetchTableDataExtra(post === undefined ? [] : post, 'Informational', 'Final') +
      fetchTableDataExtra(post === undefined ? [] : post, 'Informational', 'Withdrawn') +
      fetchTableDataExtra(post === undefined ? [] : post, 'Informational', 'Draft') +
      fetchTableDataExtra(post === undefined ? [] : post, 'Informational', 'Review') +
      fetchTableDataExtra(post === undefined ? [] : post, 'Informational', 'Last_Call') +
      fetchTableDataExtra(post === undefined ? [] : post, 'Informational', 'Stagnant')
    return total
  }

  return (
    <>
      <div
        style={{
          fontSize: '30px',
          fontWeight: '400',
          marginBottom: '00px',
          backgroundColor: 'white',
          border: 'none',
          width: '18rem',
          padding: '10px',
          borderRadius: '5px',
          borderLeft: '4px solid #339af0',
          borderBottom: '2px solid #339af0',
        }}
      >
        Standard Track{' '}
        <label
          style={{
            fontSize: '1.5rem',
            fontWeight: '800',
          }}
        >
          <Link
            to="/chartTable"
            style={{ textDecoration: 'none', color: 'inherit' }}
            state={{ type: 'Standards Track', status: '', category: '' }}
          >
            <div
              className='className="h-7
            shadow-2xl font-extrabold rounded-[8px] bg-[#e7f5ff] text-[#1c7ed6] text-[1.5rem] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out'
            >
              {post === undefined
                ? 0
                : fetchTableData(post === undefined ? [] : post, 'Standard_Track', 'Living') +
                  fetchTableData(post === undefined ? [] : post, 'Standard_Track', 'Final') +
                  fetchTableData(post === undefined ? [] : post, 'Standard_Track', 'Withdrawn') +
                  fetchTableData(post === undefined ? [] : post, 'Standard_Track', 'Draft') +
                  fetchTableData(post === undefined ? [] : post, 'Standard_Track', 'Review') +
                  fetchTableData(post === undefined ? [] : post, 'Standard_Track', 'Last_Call') +
                  fetchTableData(post === undefined ? [] : post, 'Standard_Track', 'Stagnant')}
            </div>
          </Link>
        </label>
      </div>
      <CRow>
        <CCol xs={matches ? 12 : 6}>
          <CCard>
            <CCardBody
              style={{
                height: '300px',

                borderLeft: '2px solid #74c0fc',
              }}
            >
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
                borderLeft: '2px solid #74c0fc',
                borderBottom: '2px solid #74c0fc',
                background: `${coloring('back')}`,
              }}
            >
              <label style={{ fontSize: '10px', color: `${coloring('text')}` }}>{date}</label>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol xs={matches ? 12 : 6}>
          <CCard>
            <CCardBody
              style={{
                overflowX: 'auto',
                overflowY: 'auto',
                height: '300px',
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
                    <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                    <CTableHeaderCell scope="col">no. of EIPs</CTableHeaderCell>
                    <CTableHeaderCell scope="col">%</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableDataCell>
                      <Link
                        to="/chartTable"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        state={{ type: 'Standards Track', status: '', category: 'Core' }}
                      >
                        <div
                          className='className="h-7
            shadow-2xl font-extrabold rounded-[8px] hover:bg-[#e7f5ff] hover:text-[#1c7ed6] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out'
                        >
                          Core
                        </div>
                      </Link>
                    </CTableDataCell>
                    <CTableDataCell>
                      {getStandardAttribute(post === undefined ? [] : post, 'Core')}
                    </CTableDataCell>
                    <CTableDataCell>
                      <label className="font-[800]">
                        {(
                          (getStandardAttribute(post === undefined ? [] : post, 'Core') /
                            totalEIPs()) *
                          100
                        ).toFixed(2)}
                        %
                      </label>
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>
                      <Link
                        to="/chartTable"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        state={{ type: 'Standards Track', status: '', category: 'ERC' }}
                      >
                        <div
                          className='className="h-7
            shadow-2xl font-extrabold rounded-[8px] hover:bg-[#e7f5ff] hover:text-[#1c7ed6] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out'
                        >
                          ERC
                        </div>
                      </Link>
                    </CTableDataCell>
                    <CTableDataCell>
                      {getStandardAttribute(post === undefined ? [] : post, 'ERC')}
                    </CTableDataCell>
                    <CTableDataCell>
                      <label className="font-[800]">
                        {(
                          (getStandardAttribute(post === undefined ? [] : post, 'ERC') /
                            totalEIPs()) *
                          100
                        ).toFixed(2)}
                        %
                      </label>
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>
                      <Link
                        to="/chartTable"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        state={{ type: 'Standards Track', status: '', category: 'Networking' }}
                      >
                        <div
                          className='className="h-7
            shadow-2xl font-extrabold rounded-[8px] hover:bg-[#e7f5ff] hover:text-[#1c7ed6] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out'
                        >
                          Networking
                        </div>
                      </Link>
                    </CTableDataCell>
                    <CTableDataCell>
                      {getStandardAttribute(post === undefined ? [] : post, 'Networking')}
                    </CTableDataCell>
                    <CTableDataCell>
                      <label className="font-[800]">
                        {(
                          (getStandardAttribute(post === undefined ? [] : post, 'Networking') /
                            totalEIPs()) *
                          100
                        ).toFixed(2)}
                        %
                      </label>
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>
                      <Link
                        to="/chartTable"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        state={{ type: 'Standards Track', status: '', category: 'Interface' }}
                      >
                        <div
                          className='className="h-7
            shadow-2xl font-extrabold rounded-[8px] hover:bg-[#e7f5ff] hover:text-[#1c7ed6] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out'
                        >
                          Interface
                        </div>
                      </Link>
                    </CTableDataCell>
                    <CTableDataCell>
                      {getStandardAttribute(post === undefined ? [] : post, 'Interface')}
                    </CTableDataCell>
                    <CTableDataCell>
                      <label className="font-[800]">
                        {(
                          (getStandardAttribute(post === undefined ? [] : post, 'Interface') /
                            totalEIPs()) *
                          100
                        ).toFixed(2)}
                        %
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
                borderRight: '2px solid #74c0fc',
                borderBottom: '2px solid #74c0fc',
                background: `${coloring('back')}`,
              }}
            >
              <label style={{ fontSize: '10px', color: `${coloring('text')}` }}>{date}</label>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>

      <div
        style={{
          fontSize: '30px',
          fontWeight: '400',
          marginBottom: '00px',
          backgroundColor: 'white',
          border: 'none',
          width: '9rem',
          padding: '10px',
          borderRadius: '5px',
          borderLeft: '4px solid #339af0',
          borderBottom: '2px solid #339af0',
          marginTop: '2rem',
        }}
      >
        Meta{' '}
        <label
          style={{
            fontSize: '1.5rem',
            fontWeight: '800',
          }}
        >
          <Link
            to="/chartTable"
            style={{ textDecoration: 'none', color: 'inherit' }}
            state={{ type: 'Meta', status: '', category: '' }}
          >
            <div
              className='className="h-7
            shadow-2xl font-extrabold rounded-[8px] bg-[#e7f5ff] text-[#1c7ed6] text-[1.5rem] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out'
            >
              {post === undefined
                ? 0
                : fetchTableDataExtra(post === undefined ? [] : post, 'Meta', 'Living') +
                  fetchTableDataExtra(post === undefined ? [] : post, 'Meta', 'Final') +
                  fetchTableDataExtra(post === undefined ? [] : post, 'Meta', 'Withdrawn') +
                  fetchTableDataExtra(post === undefined ? [] : post, 'Meta', 'Draft') +
                  fetchTableDataExtra(post === undefined ? [] : post, 'Meta', 'Review') +
                  fetchTableDataExtra(post === undefined ? [] : post, 'Meta', 'Last_Call') +
                  fetchTableDataExtra(post === undefined ? [] : post, 'Meta', 'Stagnant')}
            </div>
          </Link>
        </label>
      </div>
      <CRow>
        <CCol xs={matches ? 12 : 6}>
          <CCard>
            <CCardBody
              style={{
                height: '300px',
                borderLeft: '2px solid #74c0fc',
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
                borderLeft: '2px solid #74c0fc',
                borderBottom: '2px solid #74c0fc',
                background: `${coloring('back')}`,
              }}
            >
              <label style={{ fontSize: '10px', color: `${coloring('text')}` }}>{date}</label>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol xs={matches ? 12 : 6}>
          <CCard>
            <CCardBody
              style={{
                overflowX: 'auto',
                overflowY: 'auto',
                height: '300px',
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
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col">no. of EIPs</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableDataCell>
                      <Link
                        to="/chartTable"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        state={{ type: 'Meta', status: 'Living', category: '' }}
                      >
                        <div
                          className='className="h-7
            shadow-2xl font-extrabold rounded-[8px] hover:bg-[#e7f5ff] hover:text-[#1c7ed6] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out'
                        >
                          Living
                        </div>
                      </Link>
                    </CTableDataCell>
                    <CTableDataCell>
                      {fetchTableDataExtra(post === undefined ? [] : post, 'Meta', 'Living')}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>
                      <Link
                        to="/chartTable"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        state={{ type: 'Meta', status: 'Final', category: '' }}
                      >
                        <div
                          className='className="h-7
            shadow-2xl font-extrabold rounded-[8px] hover:bg-[#e7f5ff] hover:text-[#1c7ed6] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out'
                        >
                          Final
                        </div>
                      </Link>
                    </CTableDataCell>
                    <CTableDataCell>
                      {fetchTableDataExtra(post === undefined ? [] : post, 'Meta', 'Final')}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>
                      <Link
                        to="/chartTable"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        state={{ type: 'Meta', status: 'Last_Call', category: '' }}
                      >
                        <div
                          className='className="h-7
            shadow-2xl font-extrabold rounded-[8px] hover:bg-[#e7f5ff] hover:text-[#1c7ed6] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out'
                        >
                          Last-Call
                        </div>
                      </Link>
                    </CTableDataCell>
                    <CTableDataCell>
                      {fetchTableDataExtra(post === undefined ? [] : post, 'Meta', 'Last_Call')}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>
                      <Link
                        to="/chartTable"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        state={{ type: 'Meta', status: 'Review', category: '' }}
                      >
                        <div
                          className='className="h-7
            shadow-2xl font-extrabold rounded-[8px] hover:bg-[#e7f5ff] hover:text-[#1c7ed6] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out'
                        >
                          Review
                        </div>
                      </Link>
                    </CTableDataCell>
                    <CTableDataCell>
                      {fetchTableDataExtra(post === undefined ? [] : post, 'Meta', 'Review')}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>
                      <Link
                        to="/chartTable"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        state={{ type: 'Meta', status: 'Draft', category: '' }}
                      >
                        <div
                          className='className="h-7
            shadow-2xl font-extrabold rounded-[8px] hover:bg-[#e7f5ff] hover:text-[#1c7ed6] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out'
                        >
                          Draft
                        </div>
                      </Link>
                    </CTableDataCell>
                    <CTableDataCell>
                      {fetchTableDataExtra(post === undefined ? [] : post, 'Meta', 'Draft')}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>
                      <Link
                        to="/chartTable"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        state={{ type: 'Meta', status: 'Stagnant', category: '' }}
                      >
                        <div
                          className='className="h-7
            shadow-2xl font-extrabold rounded-[8px] hover:bg-[#e7f5ff] hover:text-[#1c7ed6] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out'
                        >
                          Stagnant
                        </div>
                      </Link>
                    </CTableDataCell>
                    <CTableDataCell>
                      {fetchTableDataExtra(post === undefined ? [] : post, 'Meta', 'Stagnant')}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>
                      <Link
                        to="/chartTable"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        state={{ type: 'Meta', status: 'Withdrawn', category: '' }}
                      >
                        <div
                          className='className="h-7
            shadow-2xl font-extrabold rounded-[8px] hover:bg-[#e7f5ff] hover:text-[#1c7ed6] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out'
                        >
                          Withdrawn
                        </div>
                      </Link>
                    </CTableDataCell>
                    <CTableDataCell>
                      {fetchTableDataExtra(post === undefined ? [] : post, 'Meta', 'Withdrawn')}
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
                borderRight: '2px solid #74c0fc',
                borderBottom: '2px solid #74c0fc',
                background: `${coloring('back')}`,
              }}
            >
              <label style={{ fontSize: '10px', color: `${coloring('text')}` }}>{date}</label>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>

      <div
        style={{
          fontSize: '30px',
          fontWeight: '400',
          marginBottom: '00px',
          backgroundColor: 'white',
          border: 'none',
          width: '15rem',
          padding: '10px',
          borderRadius: '5px',
          borderLeft: '4px solid #339af0',
          borderBottom: '2px solid #339af0',
          marginTop: '2rem',
        }}
      >
        Informational{' '}
        <label
          style={{
            fontSize: '1.5rem',
            fontWeight: '800',
          }}
        >
          <Link
            to="/chartTable"
            style={{ textDecoration: 'none', color: 'inherit' }}
            state={{ type: 'Informational', status: '', category: '' }}
          >
            <div
              className='className="h-7
            shadow-2xl font-extrabold rounded-[8px] bg-[#e7f5ff] text-[#1c7ed6] text-[1.5rem] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out'
            >
              {post === undefined
                ? 0
                : fetchTableDataExtra(post === undefined ? [] : post, 'Informational', 'Living') +
                  fetchTableDataExtra(post === undefined ? [] : post, 'Informational', 'Final') +
                  fetchTableDataExtra(
                    post === undefined ? [] : post,
                    'Informational',
                    'Withdrawn',
                  ) +
                  fetchTableDataExtra(post === undefined ? [] : post, 'Informational', 'Draft') +
                  fetchTableDataExtra(post === undefined ? [] : post, 'Informational', 'Review') +
                  fetchTableDataExtra(
                    post === undefined ? [] : post,
                    'Informational',
                    'Last_Call',
                  ) +
                  fetchTableDataExtra(post === undefined ? [] : post, 'Informational', 'Stagnant')}
            </div>
          </Link>
        </label>
      </div>
      <CRow>
        <CCol xs={matches ? 12 : 6}>
          <CCard>
            <CCardBody
              style={{
                height: '300px',
                borderLeft: '2px solid #74c0fc',
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
                borderLeft: '2px solid #74c0fc',
                borderBottom: '2px solid #74c0fc',
                background: `${coloring('back')}`,
              }}
            >
              <label style={{ fontSize: '10px', color: `${coloring('text')}` }}>{date}</label>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol xs={matches ? 12 : 6}>
          <CCard>
            <CCardBody
              style={{
                overflowX: 'auto',
                overflowY: 'auto',
                height: '300px',
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
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col">no. of EIPs</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableDataCell>
                      <Link
                        to="/chartTable"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        state={{ type: 'Informational', status: 'Living', category: '' }}
                      >
                        <div
                          className='className="h-7
            shadow-2xl font-extrabold rounded-[8px] hover:bg-[#e7f5ff] hover:text-[#1c7ed6] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out'
                        >
                          Living
                        </div>
                      </Link>
                    </CTableDataCell>
                    <CTableDataCell>
                      {fetchTableDataExtra(
                        post === undefined ? [] : post,
                        'Informational',
                        'Living',
                      )}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>
                      <Link
                        to="/chartTable"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        state={{ type: 'Informational', status: 'Final', category: '' }}
                      >
                        <div
                          className='className="h-7
            shadow-2xl font-extrabold rounded-[8px] hover:bg-[#e7f5ff] hover:text-[#1c7ed6] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out'
                        >
                          Final
                        </div>
                      </Link>
                    </CTableDataCell>
                    <CTableDataCell>
                      {fetchTableDataExtra(
                        post === undefined ? [] : post,
                        'Informational',
                        'Final',
                      )}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>
                      <Link
                        to="/chartTable"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        state={{ type: 'Informational', status: 'Last_Call', category: '' }}
                      >
                        <div
                          className='className="h-7
            shadow-2xl font-extrabold rounded-[8px] hover:bg-[#e7f5ff] hover:text-[#1c7ed6] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out'
                        >
                          Last-Call
                        </div>
                      </Link>
                    </CTableDataCell>
                    <CTableDataCell>
                      {fetchTableDataExtra(
                        post === undefined ? [] : post,
                        'Informational',
                        'Last_Call',
                      )}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>
                      <Link
                        to="/chartTable"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        state={{ type: 'Informational', status: 'Review', category: '' }}
                      >
                        <div
                          className='className="h-7
            shadow-2xl font-extrabold rounded-[8px] hover:bg-[#e7f5ff] hover:text-[#1c7ed6] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out'
                        >
                          Review
                        </div>
                      </Link>
                    </CTableDataCell>
                    <CTableDataCell>
                      {fetchTableDataExtra(
                        post === undefined ? [] : post,
                        'Informational',
                        'Review',
                      )}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>
                      <Link
                        to="/chartTable"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        state={{ type: 'Informational', status: 'Draft', category: '' }}
                      >
                        <div
                          className='className="h-7
            shadow-2xl font-extrabold rounded-[8px] hover:bg-[#e7f5ff] hover:text-[#1c7ed6] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out'
                        >
                          Draft
                        </div>
                      </Link>
                    </CTableDataCell>
                    <CTableDataCell>
                      {fetchTableDataExtra(
                        post === undefined ? [] : post,
                        'Informational',
                        'Draft',
                      )}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>
                      <Link
                        to="/chartTable"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        state={{ type: 'Informational', status: 'Stagnant', category: '' }}
                      >
                        <div
                          className='className="h-7
            shadow-2xl font-extrabold rounded-[8px] hover:bg-[#e7f5ff] hover:text-[#1c7ed6] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out'
                        >
                          Stagnant
                        </div>
                      </Link>
                    </CTableDataCell>
                    <CTableDataCell>
                      {fetchTableDataExtra(
                        post === undefined ? [] : post,
                        'Informational',
                        'Stagnant',
                      )}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>
                      <Link
                        to="/chartTable"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        state={{ type: 'Informational', status: 'Withdrawn', category: '' }}
                      >
                        <div
                          className='className="h-7
            shadow-2xl font-extrabold rounded-[8px] hover:bg-[#e7f5ff] hover:text-[#1c7ed6] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out'
                        >
                          Withdrawn
                        </div>
                      </Link>
                    </CTableDataCell>
                    <CTableDataCell>
                      {fetchTableDataExtra(
                        post === undefined ? [] : post,
                        'Informational',
                        'Withdrawn',
                      )}
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
                borderRight: '2px solid #74c0fc',
                borderBottom: '2px solid #74c0fc',
                background: `${coloring('back')}`,
              }}
            >
              <label style={{ fontSize: '10px', color: `${coloring('text')}` }}>{date}</label>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default typeAll
