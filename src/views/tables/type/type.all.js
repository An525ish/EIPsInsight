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

function typeAll() {
  const [post, getPost] = useState()
  const [date, setDate] = useState()

  const API = 'https://eipsinsight.com/api/statusPage'
  const fetchPost = () => {
    fetch(API)
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        getPost(res)
      })
  }
  const fetchAnnotations = (d) => {
    const annotations = []
    each(groupBy(d, 'type'), (values, k) => {
      const value = values.reduce((a, b) => a + b.value, 0)
      console.log(value)
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
          name === 'Standards Track'
            ? fetchTableData(post, name, 'Draft')
            : fetchTableDataExtra(post, name, 'Draft'),
      },
      {
        type: 'Final',
        value:
          name === 'Standards Track'
            ? fetchTableData(post, name, 'Final')
            : fetchTableDataExtra(post, name, 'Final'),
      },
      {
        type: 'Review',
        value:
          name === 'Standards Track'
            ? fetchTableData(post, name, 'Review')
            : fetchTableDataExtra(post, name, 'Review'),
      },
      {
        type: 'Last Call',
        value:
          name === 'Standards Track'
            ? fetchTableData(post, name, 'Last Call')
            : fetchTableDataExtra(post, name, 'Last Call'),
      },
      {
        type: 'Stagnant',
        value:
          name === 'Standards Track'
            ? fetchTableData(post, name, 'Stagnant')
            : fetchTableDataExtra(post, name, 'Stagnant'),
      },
      {
        type: 'Withdrawn',
        value:
          name === 'Standards Track'
            ? fetchTableData(post, name, 'Withdrawn')
            : fetchTableDataExtra(post, name, 'Withdrawn'),
      },
      {
        type: 'Living',
        value:
          name === 'Standards Track'
            ? fetchTableData(post, name, 'Living')
            : fetchTableDataExtra(post, name, 'Living'),
      },
    )
    console.log(arr)
    return arr
  }
  const getChartInfo = (post, name) => {
    const config = {
      appendPadding: 10,
      data: fetchChartData(post === undefined ? [] : post, name),
      color: ['#ffa8a8', '#c0eb75', '#e599f7', '#ffe066', '#228be6', '#66d9e8'],
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

  console.log(post)

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
          (
          {post === undefined
            ? 0
            : fetchTableData(post === undefined ? [] : post, 'Standards Track', 'Living') +
              fetchTableData(post === undefined ? [] : post, 'Standards Track', 'Final') +
              fetchTableData(post === undefined ? [] : post, 'Standards Track', 'Withdrawn') +
              fetchTableData(post === undefined ? [] : post, 'Standards Track', 'Draft') +
              fetchTableData(post === undefined ? [] : post, 'Standards Track', 'Review') +
              fetchTableData(post === undefined ? [] : post, 'Standards Track', 'Last Call') +
              fetchTableData(post === undefined ? [] : post, 'Standards Track', 'Stagnant')}
          )
        </label>
      </div>
      <CRow>
        <CCol xs={6}>
          <CCard>
            <CCardBody
              style={{
                height: '300px',

                borderLeft: '2px solid #74c0fc',
              }}
            >
              <Pie
                {...getChartInfo(post === undefined ? [] : post, 'Standards Track')}
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
              }}
            >
              <label style={{ color: 'grey', fontSize: '10px' }}>{date}</label>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol xs={6}>
          <CCard>
            <CCardBody
              style={{
                overflowX: 'auto',
                overflowY: 'auto',
                height: '300px',
                fontFamily: 'Roboto',
                fontSize: '12px',
                borderRight: '2px solid #74c0fc',
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
                    <CTableDataCell>Living</CTableDataCell>
                    <CTableDataCell>
                      {fetchTableData(post === undefined ? [] : post, 'Standards Track', 'Living')}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Final</CTableDataCell>
                    <CTableDataCell>
                      {fetchTableData(post === undefined ? [] : post, 'Standards Track', 'Final')}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Last-Call</CTableDataCell>
                    <CTableDataCell>
                      {fetchTableData(
                        post === undefined ? [] : post,
                        'Standards Track',
                        'Last Call',
                      )}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Review</CTableDataCell>
                    <CTableDataCell>
                      {fetchTableData(post === undefined ? [] : post, 'Standards Track', 'Review')}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Draft</CTableDataCell>
                    <CTableDataCell>
                      {fetchTableData(post === undefined ? [] : post, 'Standards Track', 'Draft')}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Stagnant</CTableDataCell>
                    <CTableDataCell>
                      {fetchTableData(
                        post === undefined ? [] : post,
                        'Standards Track',
                        'Stagnant',
                      )}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Withdrawn</CTableDataCell>
                    <CTableDataCell>
                      {fetchTableData(
                        post === undefined ? [] : post,
                        'Standards Track',
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
              }}
            >
              <label style={{ color: 'grey', fontSize: '10px' }}>{date}</label>
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
          (
          {post === undefined
            ? 0
            : fetchTableDataExtra(post === undefined ? [] : post, 'Meta', 'Living') +
              fetchTableDataExtra(post === undefined ? [] : post, 'Meta', 'Final') +
              fetchTableDataExtra(post === undefined ? [] : post, 'Meta', 'Withdrawn') +
              fetchTableDataExtra(post === undefined ? [] : post, 'Meta', 'Draft') +
              fetchTableDataExtra(post === undefined ? [] : post, 'Meta', 'Review') +
              fetchTableDataExtra(post === undefined ? [] : post, 'Meta', 'Last Call') +
              fetchTableDataExtra(post === undefined ? [] : post, 'Meta', 'Stagnant')}
          )
        </label>
      </div>
      <CRow>
        <CCol xs={6}>
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
              }}
            >
              <label style={{ color: 'grey', fontSize: '10px' }}>{date}</label>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol xs={6}>
          <CCard>
            <CCardBody
              style={{
                overflowX: 'auto',
                overflowY: 'auto',
                height: '300px',
                fontFamily: 'Roboto',
                fontSize: '12px',
                borderRight: '2px solid #74c0fc',
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
                    <CTableDataCell>Living</CTableDataCell>
                    <CTableDataCell>
                      {fetchTableDataExtra(post === undefined ? [] : post, 'Meta', 'Living')}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Final</CTableDataCell>
                    <CTableDataCell>
                      {fetchTableDataExtra(post === undefined ? [] : post, 'Meta', 'Final')}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Last-Call</CTableDataCell>
                    <CTableDataCell>
                      {fetchTableDataExtra(post === undefined ? [] : post, 'Meta', 'Last Call')}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Review</CTableDataCell>
                    <CTableDataCell>
                      {fetchTableDataExtra(post === undefined ? [] : post, 'Meta', 'Review')}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Draft</CTableDataCell>
                    <CTableDataCell>
                      {fetchTableDataExtra(post === undefined ? [] : post, 'Meta', 'Draft')}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Stagnant</CTableDataCell>
                    <CTableDataCell>
                      {fetchTableDataExtra(post === undefined ? [] : post, 'Meta', 'Stagnant')}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Withdrawn</CTableDataCell>
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
              }}
            >
              <label style={{ color: 'grey', fontSize: '10px' }}>{date}</label>
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
          (
          {post === undefined
            ? 0
            : fetchTableDataExtra(post === undefined ? [] : post, 'Informational', 'Living') +
              fetchTableDataExtra(post === undefined ? [] : post, 'Informational', 'Final') +
              fetchTableDataExtra(post === undefined ? [] : post, 'Informational', 'Withdrawn') +
              fetchTableDataExtra(post === undefined ? [] : post, 'Informational', 'Draft') +
              fetchTableDataExtra(post === undefined ? [] : post, 'Informational', 'Review') +
              fetchTableDataExtra(post === undefined ? [] : post, 'Informational', 'Last Call') +
              fetchTableDataExtra(post === undefined ? [] : post, 'Informational', 'Stagnant')}
          )
        </label>
      </div>
      <CRow>
        <CCol xs={6}>
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
              }}
            >
              <label style={{ color: 'grey', fontSize: '10px' }}>{date}</label>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol xs={6}>
          <CCard>
            <CCardBody
              style={{
                overflowX: 'auto',
                overflowY: 'auto',
                height: '300px',
                fontFamily: 'Roboto',
                fontSize: '12px',
                borderRight: '2px solid #74c0fc',
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
                    <CTableDataCell>Living</CTableDataCell>
                    <CTableDataCell>
                      {fetchTableDataExtra(
                        post === undefined ? [] : post,
                        'Informational',
                        'Living',
                      )}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Final</CTableDataCell>
                    <CTableDataCell>
                      {fetchTableDataExtra(
                        post === undefined ? [] : post,
                        'Informational',
                        'Final',
                      )}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Last-Call</CTableDataCell>
                    <CTableDataCell>
                      {fetchTableDataExtra(
                        post === undefined ? [] : post,
                        'Informational',
                        'Last Call',
                      )}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Review</CTableDataCell>
                    <CTableDataCell>
                      {fetchTableDataExtra(
                        post === undefined ? [] : post,
                        'Informational',
                        'Review',
                      )}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Draft</CTableDataCell>
                    <CTableDataCell>
                      {fetchTableDataExtra(
                        post === undefined ? [] : post,
                        'Informational',
                        'Draft',
                      )}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Stagnant</CTableDataCell>
                    <CTableDataCell>
                      {fetchTableDataExtra(
                        post === undefined ? [] : post,
                        'Informational',
                        'Stagnant',
                      )}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Withdrawn</CTableDataCell>
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
              }}
            >
              <label style={{ color: 'grey', fontSize: '10px' }}>{date}</label>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default typeAll
