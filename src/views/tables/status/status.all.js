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
import { Link } from 'react-router-dom'
import { CCard, CCardBody, CCardFooter, CCol, CRow } from '@coreui/react-pro'
import { Column, Pie, G2, Line, Area, Bar } from '@ant-design/plots'
import { each, groupBy } from '@antv/util'
import useMediaQuery from 'src/scss/useMediaQuery'

import '../type/type.css'

function statusAll(props) {
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

  const fetchData = (data, name) => {
    let arr = []

    arr.push(
      {
        name: 'Core',
        value: data[name] === undefined ? 0 : data[name]['Standards Track']['Core'],
        type: 'Standard Track',
      },
      {
        name: 'ERC',
        value: data[name] === undefined ? 0 : data[name]['Standards Track']['ERC'],
        type: 'Standard Track',
      },
      {
        name: 'Networking',
        value: data[name] === undefined ? 0 : data[name]['Standards Track']['Networking'],
        type: 'Standard Track',
      },
      {
        name: 'Interface',
        value: data[name] === undefined ? 0 : data[name]['Standards Track']['Interface'],
        type: 'Standard Track',
      },
      {
        name: 'Meta',
        value: data[name] === undefined ? 0 : data[name]['Meta'],
        type: 'Meta',
      },
      {
        name: 'Informational',
        value: data[name] === undefined ? 0 : data[name]['Informational'],
        type: 'Informational',
      },
    )

    return arr
  }
  const fetchChartData = (name) => {
    const config = {
      data: fetchData(post === undefined ? [] : post, name),
      color: ['#228be6', '#66d9e8', '#ffa8a8', '#ffe066', '#e599f7', '#c0eb75'],
      isStack: true,
      xField: 'type',
      yField: 'value',
      seriesField: 'name',
      label: false,

      annotations: fetchAnnotations(fetchData(post === undefined ? [] : post, name)),
    }
    return config
  }

  const customTableChart = (name, title) => {
    return (
      <>
        <div
          style={{
            fontSize: '30px',
            fontWeight: '400',
            marginBottom: '00px',
            backgroundColor: 'white',
            border: 'none',

            padding: '15px',
            borderRadius: '5px',
            borderLeft: '4px solid #339af0',
            borderBottom: '2px solid #339af0',
            marginTop: '2rem',
            display: 'inline-block',
          }}
        >
          <Link to="/livingStatusChart" style={{ textDecoration: 'none', color: 'inherit' }}>
            {title}{' '}
            <label
              style={{
                fontSize: '1.5rem',
                fontWeight: '800',
              }}
            >
              <Link to="/statusLiving" style={{ textDecoration: 'underline', color: 'inherit' }}>
                (
                {post === undefined
                  ? 0
                  : post[name]['Standards Track']['Core'] +
                    post[name]['Standards Track']['ERC'] +
                    post[name]['Standards Track']['Networking'] +
                    post[name]['Standards Track']['Interface'] +
                    post[name]['Meta'] +
                    post[name]['Informational']}
                )
              </Link>
            </label>
          </Link>
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
                <Column {...fetchChartData(name)} />
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
                }}
                className="scrollbarDesign"
              >
                <CTable>
                  <CTableHead style={{ borderBottom: '2px solid #4dabf7' }}>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Type</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                      <CTableHeaderCell scope="col">no. of EIPs</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    <CTableRow>
                      <CTableHeaderCell scope="row">Standard Track</CTableHeaderCell>
                      <CTableDataCell>Core</CTableDataCell>
                      <CTableDataCell>
                        {post === undefined ? 0 : post[name]['Standards Track']['Core']}
                      </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell scope="row"></CTableHeaderCell>
                      <CTableDataCell>ERC</CTableDataCell>
                      <CTableDataCell>
                        {post === undefined ? 0 : post[name]['Standards Track']['ERC']}
                      </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell scope="row"></CTableHeaderCell>
                      <CTableDataCell>Networking</CTableDataCell>
                      <CTableDataCell>
                        {post === undefined ? 0 : post[name]['Standards Track']['Networking']}
                      </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell scope="row"></CTableHeaderCell>
                      <CTableDataCell>Interface</CTableDataCell>
                      <CTableDataCell>
                        {post === undefined ? 0 : post[name]['Standards Track']['Interface']}
                      </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell scope="row">Meta</CTableHeaderCell>
                      <CTableDataCell></CTableDataCell>
                      <CTableDataCell>{post === undefined ? 0 : post[name]['Meta']}</CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell scope="row">Informational</CTableHeaderCell>
                      <CTableDataCell></CTableDataCell>
                      <CTableDataCell>
                        {post === undefined ? 0 : post[name]['Informational']}
                      </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell scope="row" style={{ color: '#1c7ed6', fontSize: '15px' }}>
                        Total
                      </CTableHeaderCell>
                      <CTableDataCell></CTableDataCell>
                      <CTableDataCell
                        style={{
                          fontWeight: '800',
                          fontSize: '15px',
                          display: 'inline-block',
                          borderRadius: '12px',
                          color: '#1c7ed6',
                          background: '#e7f5ff',
                        }}
                      >
                        {post === undefined
                          ? 0
                          : post[name]['Standards Track']['Core'] +
                            post[name]['Standards Track']['ERC'] +
                            post[name]['Standards Track']['Networking'] +
                            post[name]['Standards Track']['Interface'] +
                            post[name]['Meta'] +
                            post[name]['Informational']}
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

  useEffect(() => {
    fetchPost()
    fetchDate()
  }, [])

  return (
    <>
      {customTableChart('Living', 'Living')}
      {customTableChart('Final', 'Final')}
      {customTableChart('Last Call', 'Last-Call')}
      {customTableChart('Review', 'Review')}
      {customTableChart('Draft', 'Draft')}
      {customTableChart('Stagnant', 'Stagnant')}
      {customTableChart('Withdrawn', 'Withdrawn')}
    </>
  )
}

export default statusAll
