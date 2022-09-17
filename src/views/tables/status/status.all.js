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

  const matches = useMediaQuery("(max-width: 600px)")

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
    console.log(arr)
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

  useEffect(() => {
    fetchPost()
    fetchDate()
  }, [])

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
          width: '10rem',
          padding: '10px',
          borderRadius: '5px',
          borderLeft: '4px solid #339af0',
          borderBottom: '2px solid #339af0',
        }}
      >
        <Link to="/draftStatusChart" style={{ textDecoration: 'none', color: 'inherit' }}>
          Draft{' '}
          <label
            style={{
              fontSize: '1.5rem',
              fontWeight: '800',
            }}
          >
            <Link to="/statusDraft" style={{ textDecoration: 'underline', color: 'inherit' }}>
              (
              {post === undefined
                ? 0
                : post['Draft']['Standards Track']['Core'] +
                  post['Draft']['Standards Track']['ERC'] +
                  post['Draft']['Standards Track']['Networking'] +
                  post['Draft']['Standards Track']['Interface'] +
                  post['Draft']['Meta'] +
                  post['Draft']['Informational']}
              )
            </Link>
          </label>
        </Link>
      </div>
      <CRow>
        <CCol xs={matches ? 12: 6}>
          <CCard>
            <CCardBody
              style={{
                height: '300px',
                borderLeft: '2px solid #74c0fc',
              }}
            >
              <Column {...fetchChartData('Draft')} />
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
        <CCol xs={matches ? 12: 6}>
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
                      {post === undefined ? 0 : post['Draft']['Standards Track']['Core']}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row"></CTableHeaderCell>
                    <CTableDataCell>ERC</CTableDataCell>
                    <CTableDataCell>
                      {post === undefined ? 0 : post['Draft']['Standards Track']['ERC']}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row"></CTableHeaderCell>
                    <CTableDataCell>Networking</CTableDataCell>
                    <CTableDataCell>
                      {post === undefined ? 0 : post['Draft']['Standards Track']['Networking']}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row"></CTableHeaderCell>
                    <CTableDataCell>Interface</CTableDataCell>
                    <CTableDataCell>
                      {post === undefined ? 0 : post['Draft']['Standards Track']['Interface']}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">Meta</CTableHeaderCell>
                    <CTableDataCell></CTableDataCell>
                    <CTableDataCell>
                      {post === undefined ? 0 : post['Draft']['Meta']}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">Informational</CTableHeaderCell>
                    <CTableDataCell></CTableDataCell>
                    <CTableDataCell>
                      {post === undefined ? 0 : post['Draft']['Informational']}
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
          width: '10rem',
          padding: '10px',
          borderRadius: '5px',
          borderLeft: '4px solid #339af0',
          borderBottom: '2px solid #339af0',
          marginTop: '2rem',
        }}
      >
        <Link to="/finalStatusChart" style={{ textDecoration: 'none', color: 'inherit' }}>
          Final{' '}
          <label
            style={{
              fontSize: '1.5rem',
              fontWeight: '800',
            }}
          >
            <Link to="/statusFinal" style={{ textDecoration: 'underline', color: 'inherit' }}>
              (
              {post === undefined
                ? 0
                : post['Final']['Standards Track']['Core'] +
                  post['Final']['Standards Track']['ERC'] +
                  post['Final']['Standards Track']['Networking'] +
                  post['Final']['Standards Track']['Interface'] +
                  post['Final']['Meta'] +
                  post['Final']['Informational']}
              )
            </Link>
          </label>
        </Link>
      </div>
      <CRow>
        <CCol xs={matches ? 12: 6}>
          <CCard>
            <CCardBody
              style={{
                height: '300px',
                borderLeft: '2px solid #74c0fc',
              }}
            >
              <Column {...fetchChartData('Final')} />
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
        <CCol xs={matches ? 12: 6}>
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
                      {post === undefined ? 0 : post['Final']['Standards Track']['Core']}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row"></CTableHeaderCell>
                    <CTableDataCell>ERC</CTableDataCell>
                    <CTableDataCell>
                      {post === undefined ? 0 : post['Final']['Standards Track']['ERC']}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row"></CTableHeaderCell>
                    <CTableDataCell>Networking</CTableDataCell>
                    <CTableDataCell>
                      {post === undefined ? 0 : post['Final']['Standards Track']['Networking']}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row"></CTableHeaderCell>
                    <CTableDataCell>Interface</CTableDataCell>
                    <CTableDataCell>
                      {post === undefined ? 0 : post['Final']['Standards Track']['Interface']}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">Meta</CTableHeaderCell>
                    <CTableDataCell></CTableDataCell>
                    <CTableDataCell>
                      {post === undefined ? 0 : post['Final']['Meta']}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">Informational</CTableHeaderCell>
                    <CTableDataCell></CTableDataCell>
                    <CTableDataCell>
                      {post === undefined ? 0 : post['Final']['Informational']}
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
          width: '11rem',
          padding: '10px',
          borderRadius: '5px',
          borderLeft: '4px solid #339af0',
          borderBottom: '2px solid #339af0',
          marginTop: '2rem',
        }}
      >
        <Link to="/reviewStatusChart" style={{ textDecoration: 'none', color: 'inherit' }}>
          Review{' '}
          <label
            style={{
              fontSize: '1.5rem',
              fontWeight: '800',
            }}
          >
            <Link to="/statusReview" style={{ textDecoration: 'underline', color: 'inherit' }}>
              (
              {post === undefined
                ? 0
                : post['Review']['Standards Track']['Core'] +
                  post['Review']['Standards Track']['ERC'] +
                  post['Review']['Standards Track']['Networking'] +
                  post['Review']['Standards Track']['Interface'] +
                  post['Review']['Meta'] +
                  post['Review']['Informational']}
              )
            </Link>
          </label>
        </Link>
      </div>
      <CRow>
        <CCol xs={matches ? 12: 6}>
          <CCard>
            <CCardBody
              style={{
                height: '300px',
                borderLeft: '2px solid #74c0fc',
              }}
            >
              <Column {...fetchChartData('Review')} />
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
        <CCol xs={matches ? 12: 6}>
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
                      {post === undefined ? 0 : post['Review']['Standards Track']['Core']}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row"></CTableHeaderCell>
                    <CTableDataCell>ERC</CTableDataCell>
                    <CTableDataCell>
                      {post === undefined ? 0 : post['Review']['Standards Track']['ERC']}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row"></CTableHeaderCell>
                    <CTableDataCell>Networking</CTableDataCell>
                    <CTableDataCell>
                      {post === undefined ? 0 : post['Review']['Standards Track']['Networking']}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row"></CTableHeaderCell>
                    <CTableDataCell>Interface</CTableDataCell>
                    <CTableDataCell>
                      {post === undefined ? 0 : post['Review']['Standards Track']['Interface']}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">Meta</CTableHeaderCell>
                    <CTableDataCell></CTableDataCell>
                    <CTableDataCell>
                      {post === undefined ? 0 : post['Review']['Meta']}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">Informational</CTableHeaderCell>
                    <CTableDataCell></CTableDataCell>
                    <CTableDataCell>
                      {post === undefined ? 0 : post['Review']['Informational']}
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
          width: '12rem',
          padding: '10px',
          borderRadius: '5px',
          borderLeft: '4px solid #339af0',
          borderBottom: '2px solid #339af0',
          marginTop: '2rem',
        }}
      >
        <Link to="/lastCallStatusChart" style={{ textDecoration: 'none', color: 'inherit' }}>
          Last Call{' '}
          <label
            style={{
              fontSize: '1.5rem',
              fontWeight: '800',
            }}
          >
            <Link to="/statusLastCall" style={{ textDecoration: 'underline', color: 'inherit' }}>
              (
              {post === undefined
                ? 0
                : post['Last Call']['Standards Track']['Core'] +
                  post['Last Call']['Standards Track']['ERC'] +
                  post['Last Call']['Standards Track']['Networking'] +
                  post['Last Call']['Standards Track']['Interface'] +
                  post['Last Call']['Meta'] +
                  post['Last Call']['Informational']}
              )
            </Link>
          </label>
        </Link>
      </div>
      <CRow>
        <CCol xs={matches ? 12: 6}>
          <CCard>
            <CCardBody
              style={{
                height: '300px',
                borderLeft: '2px solid #74c0fc',
              }}
            >
              <Column {...fetchChartData('Last Call')} />
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
        <CCol xs={matches ? 12: 6}>
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
                      {post === undefined ? 0 : post['Last Call']['Standards Track']['Core']}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row"></CTableHeaderCell>
                    <CTableDataCell>ERC</CTableDataCell>
                    <CTableDataCell>
                      {post === undefined ? 0 : post['Last Call']['Standards Track']['ERC']}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row"></CTableHeaderCell>
                    <CTableDataCell>Networking</CTableDataCell>
                    <CTableDataCell>
                      {post === undefined ? 0 : post['Last Call']['Standards Track']['Networking']}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row"></CTableHeaderCell>
                    <CTableDataCell>Interface</CTableDataCell>
                    <CTableDataCell>
                      {post === undefined ? 0 : post['Last Call']['Standards Track']['Interface']}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">Meta</CTableHeaderCell>
                    <CTableDataCell></CTableDataCell>
                    <CTableDataCell>
                      {post === undefined ? 0 : post['Last Call']['Meta']}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">Informational</CTableHeaderCell>
                    <CTableDataCell></CTableDataCell>
                    <CTableDataCell>
                      {post === undefined ? 0 : post['Last Call']['Informational']}
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
          width: '13rem',
          padding: '10px',
          borderRadius: '5px',
          borderLeft: '4px solid #339af0',
          borderBottom: '2px solid #339af0',
          marginTop: '2rem',
        }}
      >
        <Link to="/stagnantStatusChart" style={{ textDecoration: 'none', color: 'inherit' }}>
          Stagnant{' '}
          <label
            style={{
              fontSize: '1.5rem',
              fontWeight: '800',
            }}
          >
            <Link to="/statusStagnant" style={{ textDecoration: 'underline', color: 'inherit' }}>
              (
              {post === undefined
                ? 0
                : post['Stagnant']['Standards Track']['Core'] +
                  post['Stagnant']['Standards Track']['ERC'] +
                  post['Stagnant']['Standards Track']['Networking'] +
                  post['Stagnant']['Standards Track']['Interface'] +
                  post['Stagnant']['Meta'] +
                  post['Stagnant']['Informational']}
              )
            </Link>
          </label>
        </Link>
      </div>
      <CRow>
        <CCol xs={matches ? 12: 6}>
          <CCard>
            <CCardBody
              style={{
                height: '300px',
                borderLeft: '2px solid #74c0fc',
              }}
            >
              <Column {...fetchChartData('Stagnant')} />
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
        <CCol xs={matches ? 12: 6}>
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
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                    <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                    <CTableHeaderCell scope="col">no. of EIPs</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableHeaderCell scope="row">Standard Track</CTableHeaderCell>
                    <CTableDataCell>Core</CTableDataCell>
                    <CTableDataCell>
                      {post === undefined ? 0 : post['Stagnant']['Standards Track']['Core']}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row"></CTableHeaderCell>
                    <CTableDataCell>ERC</CTableDataCell>
                    <CTableDataCell>
                      {post === undefined ? 0 : post['Stagnant']['Standards Track']['ERC']}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row"></CTableHeaderCell>
                    <CTableDataCell>Networking</CTableDataCell>
                    <CTableDataCell>
                      {post === undefined ? 0 : post['Stagnant']['Standards Track']['Networking']}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row"></CTableHeaderCell>
                    <CTableDataCell>Interface</CTableDataCell>
                    <CTableDataCell>
                      {post === undefined ? 0 : post['Stagnant']['Standards Track']['Interface']}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">Meta</CTableHeaderCell>
                    <CTableDataCell></CTableDataCell>
                    <CTableDataCell>
                      {post === undefined ? 0 : post['Stagnant']['Meta']}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">Informational</CTableHeaderCell>
                    <CTableDataCell></CTableDataCell>
                    <CTableDataCell>
                      {post === undefined ? 0 : post['Stagnant']['Informational']}
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
          width: '14rem',
          padding: '10px',
          borderRadius: '5px',
          borderLeft: '4px solid #339af0',
          borderBottom: '2px solid #339af0',
          marginTop: '2rem',
        }}
      >
        <Link to="/withdrawnStatusChart" style={{ textDecoration: 'none', color: 'inherit' }}>
          Withdrawn{' '}
          <label
            style={{
              fontSize: '1.5rem',
              fontWeight: '800',
            }}
          >
            <Link to="/statusWithdrawn" style={{ textDecoration: 'underline', color: 'inherit' }}>
              (
              {post === undefined
                ? 0
                : post['Withdrawn']['Standards Track']['Core'] +
                  post['Withdrawn']['Standards Track']['ERC'] +
                  post['Withdrawn']['Standards Track']['Networking'] +
                  post['Withdrawn']['Standards Track']['Interface'] +
                  post['Withdrawn']['Meta'] +
                  post['Withdrawn']['Informational']}
              )
            </Link>
          </label>
        </Link>
      </div>
      <CRow>
        <CCol xs={matches ? 12: 6}>
          <CCard>
            <CCardBody
              style={{
                height: '300px',
                borderLeft: '2px solid #74c0fc',
              }}
            >
              <Column {...fetchChartData('Withdrawn')} />
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
        <CCol xs={matches ? 12: 6}>
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
                      {post === undefined ? 0 : post['Withdrawn']['Standards Track']['Core']}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row"></CTableHeaderCell>
                    <CTableDataCell>ERC</CTableDataCell>
                    <CTableDataCell>
                      {post === undefined ? 0 : post['Withdrawn']['Standards Track']['ERC']}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row"></CTableHeaderCell>
                    <CTableDataCell>Networking</CTableDataCell>
                    <CTableDataCell>
                      {post === undefined ? 0 : post['Withdrawn']['Standards Track']['Networking']}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row"></CTableHeaderCell>
                    <CTableDataCell>Interface</CTableDataCell>
                    <CTableDataCell>
                      {post === undefined ? 0 : post['Withdrawn']['Standards Track']['Interface']}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">Meta</CTableHeaderCell>
                    <CTableDataCell></CTableDataCell>
                    <CTableDataCell>
                      {post === undefined ? 0 : post['Withdrawn']['Meta']}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">Informational</CTableHeaderCell>
                    <CTableDataCell></CTableDataCell>
                    <CTableDataCell>
                      {post === undefined ? 0 : post['Withdrawn']['Informational']}
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
        <Link to="/livingStatusChart" style={{ textDecoration: 'none', color: 'inherit' }}>
          Living{' '}
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
                : post['Living']['Standards Track']['Core'] +
                  post['Living']['Standards Track']['ERC'] +
                  post['Living']['Standards Track']['Networking'] +
                  post['Living']['Standards Track']['Interface'] +
                  post['Living']['Meta'] +
                  post['Living']['Informational']}
              )
            </Link>
          </label>
        </Link>
      </div>
      <CRow>
        <CCol xs={matches ? 12: 6}>
          <CCard>
            <CCardBody
              style={{
                height: '300px',
                borderLeft: '2px solid #74c0fc',
              }}
            >
              <Column {...fetchChartData('Living')} />
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
        <CCol xs={matches ? 12: 6}>
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
                      {post === undefined ? 0 : post['Living']['Standards Track']['Core']}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row"></CTableHeaderCell>
                    <CTableDataCell>ERC</CTableDataCell>
                    <CTableDataCell>
                      {post === undefined ? 0 : post['Living']['Standards Track']['ERC']}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row"></CTableHeaderCell>
                    <CTableDataCell>Networking</CTableDataCell>
                    <CTableDataCell>
                      {post === undefined ? 0 : post['Living']['Standards Track']['Networking']}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row"></CTableHeaderCell>
                    <CTableDataCell>Interface</CTableDataCell>
                    <CTableDataCell>
                      {post === undefined ? 0 : post['Living']['Standards Track']['Interface']}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">Meta</CTableHeaderCell>
                    <CTableDataCell></CTableDataCell>
                    <CTableDataCell>
                      {post === undefined ? 0 : post['Living']['Meta']}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">Informational</CTableHeaderCell>
                    <CTableDataCell></CTableDataCell>
                    <CTableDataCell>
                      {post === undefined ? 0 : post['Living']['Informational']}
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

export default statusAll
