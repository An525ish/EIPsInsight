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

import { element } from 'prop-types'
import { CanvasJS, CanvasJSChart } from 'canvasjs-react-charts'
import useMediaQuery from 'src/scss/useMediaQuery'

import { Column, Pie, G2, Line, Area, Bar, measureTextWidth } from '@ant-design/plots'
import { each, groupBy } from '@antv/util'
import { cilBold } from '@coreui/icons'

const autoCharts = (props) => {
  // const [info, setInfo] = useState()

  const G = G2.getEngine('canvas')
  let location = useLocation()
  const matches = useMediaQuery('(max-width: 600px)')

  let [data, setData] = useState() // i set the data here

  const allData = async (d, y) => {
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
      console.log(location)
      console.log(d)
      let att = d.substring(1)
      console.log(att) // this taking the name of the month we are fetching
      let filterData = datas.filter((e) => {
        return e.name.toLowerCase() === att.toLowerCase() && e.year === y
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
          value: data.length === 0 ? 0 : parseInt(data[0].summary.Draft),
        },
        {
          type: 'Potential Proposal',
          value: data.length === 0 ? 0 : parseInt(data[0].summary.potentialProposal),
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
  const configDraftvsFinalCharts = (data) => {
    const config = {
      appendPadding: 10,
      data: [
        {
          type: 'Draft',
          value: data.length === 0 ? 0 : parseInt(data[0].summary.Draft),
        },
        {
          type: 'Final',
          value: data.length === 0 ? 0 : parseInt(data[0].summary.Final),
        },
      ],
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
  const configgeneralStatsCharts = (data) => {
    const config = {
      data: [
        {
          type: 'Open PR',
          value: data.length === 0 ? 0 : parseInt(data[0].GeneralStats.OpenPR),
        },
        {
          type: 'Merged PR',
          value: data.length === 0 ? 0 : parseInt(data[0].GeneralStats.MergedPR),
        },
        {
          type: 'New Issues',
          value: data.length === 0 ? 0 : parseInt(data[0].GeneralStats.NewIssues),
        },
        {
          type: 'closed Issues',
          value: data.length === 0 ? 0 : parseInt(data[0].GeneralStats.ClosedIssues),
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
  useEffect(() => {
    allData(location.state.from, location.state.year)
    // setInfo(localStorage.getItem('count'))
  }, [location.state.from, location.state.year])

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
        <CCard
          style={{
            display: 'inline-block',
            padding: '2rem',

            borderBottom: '4px solid #339af0',
            borderLeft: '2px solid #339af0',
            borderRight: '2px solid #339af0',
            // borderBottomLeftRadius: '2rem',
            // borderBottomRightRadius: '2rem',
            fontFamily: 'colombo',
            borderRadius: '2rem',
            borderTop: '4px solid #339af0',
          }}
        >
          {data === undefined ? '' : data[0].name + ' ' + data[0].year} Insights
        </CCard>
      </div>
      <CCol xs={12} className="mb-1">
        <div
          style={{
            fontSize: '30px',
            fontWeight: '400',
            marginBottom: '00px',
            backgroundColor: 'white',
            border: 'none',
            width: '17rem',
            padding: '14px',
            borderRadius: '5px',
            borderLeft: '4px solid #339af0',
            borderBottom: '2px solid #339af0',
            marginTop: '2rem',
            marginLeft: '8px',
          }}
        >
          Monthly Insights
        </div>
      </CCol>

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
                borderRight: '2px solid #74c0fc',
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
                  {parseInt(data === undefined ? 0 : data[0].summary.Draft) === 0 ? (
                    ''
                  ) : (
                    <CTableRow>
                      <CTableHeaderCell scope="row">Draft</CTableHeaderCell>
                      <CTableDataCell>
                        {parseInt(data === undefined ? 0 : data[0].summary.Draft)}
                      </CTableDataCell>
                    </CTableRow>
                  )}

                  {parseInt(data === undefined ? 0 : data[0].summary.Final) === 0 ? (
                    ''
                  ) : (
                    <CTableRow>
                      <CTableHeaderCell scope="row">Final</CTableHeaderCell>
                      <CTableDataCell>
                        {parseInt(data === undefined ? 0 : data[0].summary.Final)}
                      </CTableDataCell>
                    </CTableRow>
                  )}

                  {parseInt(data === undefined ? 0 : data[0].summary.Review) === 0 ? (
                    ''
                  ) : (
                    <CTableRow>
                      <CTableHeaderCell scope="row">Review</CTableHeaderCell>
                      <CTableDataCell>
                        {parseInt(data === undefined ? 0 : data[0].summary.Review)}
                      </CTableDataCell>
                    </CTableRow>
                  )}
                  {parseInt(data === undefined ? 0 : data[0].summary.LastCall) === 0 ? (
                    ''
                  ) : (
                    <CTableRow>
                      <CTableHeaderCell scope="row">Last Call</CTableHeaderCell>
                      <CTableDataCell>
                        {parseInt(data === undefined ? 0 : data[0].summary.LastCall)}
                      </CTableDataCell>
                    </CTableRow>
                  )}
                  {parseInt(data === undefined ? 0 : data[0].summary.Stagnant) === 0 ? (
                    ''
                  ) : (
                    <CTableRow>
                      <CTableHeaderCell scope="row">Stagnant</CTableHeaderCell>
                      <CTableDataCell>
                        {parseInt(data === undefined ? 0 : data[0].summary.Stagnant)}
                      </CTableDataCell>
                    </CTableRow>
                  )}
                  {parseInt(data === undefined ? 0 : data[0].summary.Withdrawn) === 0 ? (
                    ''
                  ) : (
                    <CTableRow>
                      <CTableHeaderCell scope="row">Withdrawn</CTableHeaderCell>
                      <CTableDataCell>
                        {parseInt(data === undefined ? 0 : data[0].summary.Withdrawn)}
                      </CTableDataCell>
                    </CTableRow>
                  )}
                  {parseInt(data === undefined ? 0 : data[0].summary.Living) === 0 ? (
                    ''
                  ) : (
                    <CTableRow>
                      <CTableHeaderCell scope="row">Living</CTableHeaderCell>
                      <CTableDataCell>
                        {parseInt(data === undefined ? 0 : data[0].summary.Living)}
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </div>
        <div className="p-2" style={{ width: matches ? '100%' : '50%' }}>
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
        <CCol xs={matches ? 12 : 6}>
          <CCard className="mb-4 cardBorder">
            <Link to="/mayDraftTable" style={{ textDecoration: 'none', color: 'inherit' }}>
              <CCardHeader className="cardHeader">
                Draft{' '}
                <label style={{ fontWeight: '700' }}>
                  {'('}
                  {parseInt(
                    data === undefined
                      ? 0
                      : findTotalValueZero(data === undefined ? [] : data, 'Draft'),
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
              {findTotalValueZero(data === undefined ? [] : data, 'Draft') === 0 ? (
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
                    findTotalValueZero(data === undefined ? [] : data, 'Draft') === 0
                      ? 'hidden'
                      : 'visible'
                  }`,
                }}
                {...configColumnCharts('Draft', data === undefined ? [] : data)}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={matches ? 12 : 6}>
          <CCard className="mb-4 cardBorder">
            <Link to="/mayFinalTable" style={{ textDecoration: 'none', color: 'inherit' }}>
              <CCardHeader className="cardHeader">
                Final{' '}
                <label style={{ fontWeight: '700' }}>
                  {'('}
                  {parseInt(
                    data === undefined
                      ? 0
                      : findTotalValueZero(data === undefined ? [] : data, 'Final'),
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
              {findTotalValueZero(data === undefined ? [] : data, 'Final') === 0 ? (
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
                    findTotalValueZero(data === undefined ? [] : data, 'Final') === 0
                      ? 'hidden'
                      : 'visible'
                  }`,
                }}
                {...configPieCharts('Final', data === undefined ? [] : data)}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={matches ? 12 : 6}>
          <CCard className="mb-4 cardBorder">
            <Link to="/mayReviewTable" style={{ textDecoration: 'none', color: 'inherit' }}>
              <CCardHeader className="cardHeader">
                Review{' '}
                <label style={{ fontWeight: '700' }}>
                  {'('}
                  {parseInt(
                    data === undefined
                      ? 0
                      : findTotalValueZero(data === undefined ? [] : data, 'Review'),
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
              {findTotalValueZero(data === undefined ? [] : data, 'Review') === 0 ? (
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
                    findTotalValueZero(data === undefined ? [] : data, 'Review') === 0
                      ? 'hidden'
                      : 'visible'
                  }`,
                }}
                {...configDougnutChart('Review', data === undefined ? [] : data)}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={matches ? 12 : 6}>
          <CCard className="mb-4 cardBorder">
            <Link to="/mayLastCallTable" style={{ textDecoration: 'none', color: 'inherit' }}>
              <CCardHeader className="cardHeader">
                Last Call{' '}
                <label style={{ fontWeight: '700' }}>
                  {'('}
                  {parseInt(
                    data === undefined
                      ? 0
                      : findTotalValueZero(data === undefined ? [] : data, 'LastCall'),
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
              {findTotalValueZero(data === undefined ? [] : data, 'LastCall') === 0 ? (
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
                    findTotalValueZero(data === undefined ? [] : data, 'LastCall') === 0
                      ? 'hidden'
                      : 'visible'
                  }`,
                }}
                {...configAreaCharts('LastCall', data === undefined ? [] : data)}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={matches ? 12 : 6}>
          <CCard className="mb-4 cardBorder">
            <Link to="/mayStagnantTable" style={{ textDecoration: 'none', color: 'inherit' }}>
              <CCardHeader className="cardHeader">
                Stagnant{' '}
                <label style={{ fontWeight: '700' }}>
                  {'('}
                  {parseInt(
                    data === undefined
                      ? 0
                      : findTotalValueZero(data === undefined ? [] : data, 'Stagnant'),
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
              {findTotalValueZero(data === undefined ? [] : data, 'Stagnant') === 0 ? (
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
                    findTotalValueZero(data === undefined ? [] : data, 'Stagnant') === 0
                      ? 'hidden'
                      : 'visible'
                  }`,
                }}
                {...configPieCharts('Stagnant', data === undefined ? [] : data)}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={matches ? 12 : 6}>
          <CCard className="mb-4 cardBorder">
            <Link to="/mayWithdrawnTable" style={{ textDecoration: 'none', color: 'inherit' }}>
              <CCardHeader className="cardHeader">
                Withdrawn{' '}
                <label style={{ fontWeight: '700' }}>
                  {'('}
                  {parseInt(
                    data === undefined
                      ? 0
                      : findTotalValueZero(data === undefined ? [] : data, 'Withdrawn'),
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
              {findTotalValueZero(data === undefined ? [] : data, 'Withdrawn') === 0 ? (
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
                    findTotalValueZero(data === undefined ? [] : data, 'Withdrawn') === 0
                      ? 'hidden'
                      : 'visible'
                  }`,
                }}
                {...configColumnCharts('Withdrawn', data === undefined ? [] : data)}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={matches ? 12 : 6}>
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
              {parseInt(data === undefined ? 0 : data[0].summary.Draft) === 0 &&
              parseInt(data === undefined ? 0 : data[0].summary.potentialProposal) === 0 ? (
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
                    parseInt(data === undefined ? 0 : data[0].summary.Draft) === 0 &&
                    parseInt(data === undefined ? 0 : data[0].summary.potentialProposal) === 0
                      ? 'hidden'
                      : 'visible'
                  }`,
                }}
                {...configDraftvsPotentialCharts(data === undefined ? [] : data)}
              />
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs={matches ? 12 : 6}>
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
              <Pie
                style={{
                  visibility: `${
                    parseInt(data === undefined ? 0 : data[0].summary.Draft) === 0 &&
                    parseInt(data === undefined ? 0 : data[0].summary.Final) === 0
                      ? 'hidden'
                      : 'visible'
                  }`,
                }}
                {...configDraftvsFinalCharts(data === undefined ? [] : data)}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={matches ? 12 : 6}>
          <CCard className="mb-4 cardBorder">
            <CCardHeader className="cardHeader">
              Living{' '}
              <label style={{ fontWeight: '700' }}>
                {'('}
                {parseInt(
                  data === undefined
                    ? 0
                    : findTotalValueZero(data === undefined ? [] : data, 'Living'),
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
              {findTotalValueZero(data === undefined ? [] : data, 'Living') === 0 ? (
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
                    findTotalValueZero(data === undefined ? [] : data, 'Living') === 0
                      ? 'hidden'
                      : 'visible'
                  }`,
                }}
                {...configColumnCharts('Living', data === undefined ? [] : data)}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={matches ? 12 : 6}>
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
              {parseInt(data === undefined ? 0 : data[0].GeneralStats.OpenPR) === 0 &&
              parseInt(data === undefined ? 0 : data[0].GeneralStats.MergePR) === 0 &&
              parseInt(data === undefined ? 0 : data[0].GeneralStats.NewIssues) === 0 &&
              parseInt(data === undefined ? 0 : data[0].GeneralStats.ClosedIssues) === 0 ? (
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
                    parseInt(data === undefined ? 0 : data[0].GeneralStats.OpenPR) === 0 &&
                    parseInt(data === undefined ? 0 : data[0].GeneralStats.MergePR) === 0 &&
                    parseInt(data === undefined ? 0 : data[0].GeneralStats.NewIssues) === 0 &&
                    parseInt(data === undefined ? 0 : data[0].GeneralStats.ClosedIssues) === 0
                      ? 'hidden'
                      : 'visible'
                  }`,
                }}
                {...configgeneralStatsCharts(data === undefined ? [] : data)}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={12}>
          <CCard>
            <CCardBody
              style={{
                overflowX: 'auto',
                overflowY: 'auto',
                width: '100%',
                fontFamily: 'Roboto',
                fontSize: '15px',
                borderRight: '2px solid #74c0fc',
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
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default autoCharts
