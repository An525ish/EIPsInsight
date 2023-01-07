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
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { CCard, CCardBody, CCardFooter, CCol, CRow } from '@coreui/react-pro'
import { Column, Pie, G2, Line, Area, Bar } from '@ant-design/plots'
import { each, groupBy } from '@antv/util'
import useMediaQuery from 'src/scss/useMediaQuery'

import '../type/type.css'
import './status.css'
import { faLeftLong, faLeftLong, faLessThan } from '@fortawesome/free-solid-svg-icons'
import Loading from 'src/views/theme/loading/loading'
import { TypeColors } from 'src/constants'

function statusAll(props) {
  const [post, getPost] = useState()
  const [date, setDate] = useState()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const matches = useMediaQuery('(max-width: 767px)')

  const API = 'https://eipsinsight.com/api/statusPage'
  const fetchPost = () => {
    fetch(API)
      .then((res) => res.json())
      .then((res) => {
        getPost(res)
        setLoading(true)
      })
  }
  const fetchAnnotations = (d, data) => {
    const annotations = []
    each(groupBy(d, 'type'), (values, k) => {
      const value = values.reduce((a, b) => a + b.value, 0)

      annotations.push({
        type: 'text',
        position: [k, value],
        content: `${((value / data) * 100).toFixed(2) + '%'}`,
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
        value: data[name] === undefined ? 0 : data[name]['Standard_Track']['Core'],
        type: 'Standard Track',
      },
      {
        name: 'ERC',
        value: data[name] === undefined ? 0 : data[name]['Standard_Track']['ERC'],
        type: 'Standard Track',
      },
      {
        name: 'Networking',
        value: data[name] === undefined ? 0 : data[name]['Standard_Track']['Networking'],
        type: 'Standard Track',
      },
      {
        name: 'Interface',
        value: data[name] === undefined ? 0 : data[name]['Standard_Track']['Interface'],
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
  const fetchChartData = (name, data) => {
    const config = {
      data: fetchData(post === undefined ? [] : post, name),
      color: TypeColors,
      isStack: true,
      xField: 'type',
      yField: 'value',
      seriesField: 'name',
      // isPercent: true,
      xAxis: {
        label: {
          style: {
            fill: `${getBadgeColor(name)}`,
          },
        },
      },
      axis: {
        min: 0,
        max: data + 10,
        position: 'top',
      },

      annotations: fetchAnnotations(fetchData(post === undefined ? [] : post, name), data),
    }
    return config
  }

  const getBadge = (status) => {
    switch (status) {
      case 'Final':
        return '#c3fae8'
      case 'Last_Call':
        return '#d3f9d8'
      case 'Draft':
        return '#fff3bf'
      case 'Stagnant':
        return '#ffe8cc'
      case 'Withdrawn':
        return '#ffe3e3'
      case 'Review':
        return '#d0ebff'
      default:
        return '#c5f6fa'
    }
  }
  const getBadgeColor = (status) => {
    switch (status) {
      case 'Final':
        return '#0ca678'
      case 'Last_Call':
        return '#37b24d'
      case 'Draft':
        return '#f08c00'
      case 'Stagnant':
        return '#e8590c'
      case 'Withdrawn':
        return '#e03131'
      case 'Review':
        return '#1971c2'
      default:
        return '#0c8599'
    }
  }

  // get standard Track data
  const getStandardTrackData = (name, dataName) => {
    return post === undefined
      ? 0
      : post[name] === undefined
      ? 0
      : post[name]['Standard_Track'][dataName]
  }

  const getMetaAndInformational = (name, dataName) => {
    return post === undefined ? 0 : post[name] === undefined ? 0 : post[name][dataName]
  }

  const totalData = (name) => {
    return post === undefined
      ? 0
      : post[name] === undefined
      ? 0
      : post[name]['Standard_Track']['Core'] +
        post[name]['Standard_Track']['ERC'] +
        post[name]['Standard_Track']['Networking'] +
        post[name]['Standard_Track']['Interface'] +
        post[name]['Meta'] +
        post[name]['Informational']
  }

  const customTableChart = (name, title) => {
    return (
      <>
        <div className='status-heading'>
          {title}{' '}
          <label
            style={{
              fontSize: '1.5rem',
              fontWeight: '800',
            }}
          >
            <Link
              to="/chartTable"
              style={{ textDecoration: 'none', color: 'inherit' }}
              state={{ type: '', status: title, category: '', name: `${title}` }}
            >
              <div className='status-heading-number'>
                {totalData(name)}
              </div>
            </Link>
          </label>
        </div>
        <CRow>
          <CCol xs={matches ? 12 : 6}>
            <CCard className='status-card-container'>
              <CCardBody style={{height:"300px"}}>
                <Column {...fetchChartData(name)} />
              </CCardBody>
              <CCardFooter
                className="cardFooter"
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  backgroundColor: 'white'
                }}
              >
                <label style={{ color: `${getBadgeColor(name)}`, fontSize: '10px' }}>{date}</label>
              </CCardFooter>
            </CCard>
          </CCol>
          <CCol xs={matches ? 12 : 6}>
            <CCard  className='status-card-container'>
              <CCardBody
                style={{
                  overflowX: 'auto',
                  overflowY: 'auto',
                  height: '300px',
                  fontFamily: 'Roboto',
                  fontSize: '12px',
                  '--main-color': `${getBadgeColor(name)}`,
                  '--main-color-background': `${getBadge(name)}`,
                }}
                className="scrollbarDesign"
              >
                <CTable>
                  <CTableHead style={{ borderBottom: `2px solid ${getBadgeColor(name)}` }}>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Type</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                      <CTableHeaderCell scope="col">no. of EIPs</CTableHeaderCell>
                      <CTableHeaderCell scope="col">%</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    <CTableRow>
                      <CTableHeaderCell scope="row">
                        <NavLink
                          to="/chartTable"
                          state={{
                            type: 'Standards Track',
                            status: name,
                            category: '',
                            name: `${title}_Standard_Track`,
                          }}
                        >
                          <label
                            className="h-7
            shadow-2xl font-extrabold rounded-[8px] hover:bg-[#e7f5ff] hover:text-[#1c7ed6] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out"
                          >
                            Standard Track{' '}
                          </label>
                        </NavLink>
                      </CTableHeaderCell>{' '}
                      <CTableDataCell>
                        <NavLink
                          to="/chartTable"
                          state={{
                            type: 'Standards Track',
                            status: name,
                            category: 'Core',
                            name: title + '_Standard_Track_Core',
                          }}
                        >
                          <label
                            className="h-7
            shadow-2xl font-extrabold rounded-[8px] hover:bg-[#e7f5ff] hover:text-[#1c7ed6] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out"
                          >
                            Core
                          </label>
                        </NavLink>
                      </CTableDataCell>
                      <CTableDataCell>{getStandardTrackData(name, 'Core')}</CTableDataCell>
                      <CTableDataCell
                        style={{ fontFamily: 'Big Shoulders Display' }}
                        className="tracking-wider text-[0.8rem]"
                      >
                        {((getStandardTrackData(name, 'Core') / totalData(name)) * 100).toFixed(2)}%
                      </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell scope="row"></CTableHeaderCell>
                      <CTableDataCell>
                        <NavLink
                          to="/chartTable"
                          state={{
                            type: 'Standards Track',
                            status: name === 'Last_Call' ? 'Last Call' : name,
                            category: 'ERC',
                            name: title + '_Standard_Track_ERC',
                          }}
                        >
                          <label
                            className="h-7
            shadow-2xl font-extrabold rounded-[8px] hover:bg-[#e7f5ff] hover:text-[#1c7ed6] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out"
                          >
                            ERC
                          </label>
                        </NavLink>
                      </CTableDataCell>
                      <CTableDataCell>{getStandardTrackData(name, 'ERC')}</CTableDataCell>
                      <CTableDataCell
                        style={{ fontFamily: 'Big Shoulders Display' }}
                        className="tracking-wider text-[0.8rem]"
                      >
                        {((getStandardTrackData(name, 'ERC') / totalData(name)) * 100).toFixed(2)}%
                      </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell scope="row"></CTableHeaderCell>
                      <CTableDataCell>
                        <NavLink
                          to="/chartTable"
                          state={{
                            type: 'Standards Track',
                            status: name,
                            category: 'Networking',
                            name: title + '_Standard_Track_Networking',
                          }}
                        >
                          <label
                            className="h-7
            shadow-2xl font-extrabold rounded-[8px] hover:bg-[#e7f5ff] hover:text-[#1c7ed6] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out"
                          >
                            Networking
                          </label>
                        </NavLink>
                      </CTableDataCell>
                      <CTableDataCell>{getStandardTrackData(name, 'Networking')}</CTableDataCell>
                      <CTableDataCell
                        style={{ fontFamily: 'Big Shoulders Display' }}
                        className="tracking-wider text-[0.8rem]"
                      >
                        {(
                          (getStandardTrackData(name, 'Networking') / totalData(name)) *
                          100
                        ).toFixed(2)}
                        %
                      </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell scope="row"></CTableHeaderCell>
                      <CTableDataCell>
                        <NavLink
                          to="/chartTable"
                          state={{
                            type: 'Standard_Track',
                            status: name,
                            category: 'Interface',
                            name: title + '_Standard_Track_Interface',
                          }}
                        >
                          <label
                            className="h-7
            shadow-2xl font-extrabold rounded-[8px] hover:bg-[#e7f5ff] hover:text-[#1c7ed6] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out"
                          >
                            Interface
                          </label>
                        </NavLink>
                      </CTableDataCell>
                      <CTableDataCell>{getStandardTrackData(name, 'Interface')}</CTableDataCell>
                      <CTableDataCell
                        style={{ fontFamily: 'Big Shoulders Display' }}
                        className="tracking-wider text-[0.8rem]"
                      >
                        {(
                          (getStandardTrackData(name, 'Interface') / totalData(name)) *
                          100
                        ).toFixed(2)}
                        %
                      </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell scope="row">
                        <NavLink
                          to="/chartTable"
                          state={{
                            type: 'Meta',
                            status: name,
                            category: '',
                            name: title + '_Meta',
                          }}
                        >
                          <label
                            className="h-7
            shadow-2xl font-extrabold rounded-[8px] hover:bg-[#e7f5ff] hover:text-[#1c7ed6] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out"
                          >
                            Meta
                          </label>
                        </NavLink>
                      </CTableHeaderCell>
                      <CTableDataCell></CTableDataCell>
                      <CTableDataCell>{getMetaAndInformational(name, 'Meta')}</CTableDataCell>
                      <CTableDataCell
                        style={{ fontFamily: 'Big Shoulders Display' }}
                        className="tracking-wider text-[0.8rem]"
                      >
                        {((getMetaAndInformational(name, 'Meta') / totalData(name)) * 100).toFixed(
                          2,
                        )}
                        %
                      </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell scope="row">
                        <NavLink
                          to="/chartTable"
                          state={{
                            type: 'Informational',
                            status: name,
                            category: '',
                            name: title + '_Informational',
                          }}
                        >
                          <label
                            className="h-7
            shadow-2xl font-extrabold rounded-[8px] hover:bg-[#e7f5ff] hover:text-[#1c7ed6] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out"
                          >
                            Informational
                          </label>
                        </NavLink>
                      </CTableHeaderCell>
                      <CTableDataCell></CTableDataCell>
                      <CTableDataCell>
                        {getMetaAndInformational(name, 'Informational')}
                      </CTableDataCell>
                      <CTableDataCell
                        style={{ fontFamily: 'Big Shoulders Display' }}
                        className="tracking-wider text-[0.8rem]"
                      >
                        {(
                          (getMetaAndInformational(name, 'Informational') / totalData(name)) *
                          100
                        ).toFixed(2)}
                        %
                      </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell
                        scope="row"
                        style={{ color: `${getBadgeColor(name)}`, fontSize: '15px' }}
                      >
                        Total
                      </CTableHeaderCell>
                      <CTableDataCell></CTableDataCell>
                      <CTableDataCell>
                        <Link
                          to="/chartTable"
                          state={{ type: '', status: title, category: '', name: `${title}` }}
                        >
                          <label
                            style={{
                              color: `${getBadgeColor(name)}`,
                              background: `${getBadge(name)}`,
                              fontWeight: '800',
                              fontSize: '15px',
                              borderRadius: '12px',
                              fontFamily: 'Big Shoulders Display',
                            }}
                            className="p-1.5 shadow-md tracking-wider cursor-pointer"
                          >
                            {totalData(name)}
                          </label>
                        </Link>
                      </CTableDataCell>
                      <CTableDataCell
                        style={{ fontFamily: 'Big Shoulders Display' }}
                        className="tracking-wider text-[1rem]"
                      >
                        100%
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
                  backgroundColor: 'white'
                }}
              >
                <label style={{ color: `${getBadgeColor(name)}`, fontSize: '10px' }}>{date}</label>
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
              }}
              className="flex justify-center items-center shadow-md"
            >
              Status{' '}
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
                    {totalData('Living') +
                      totalData('Final') +
                      totalData('Last_Call') +
                      totalData('Review') +
                      totalData('Draft') +
                      totalData('Stagnant') +
                      totalData('Withdrawn')}
                  </div>
                </Link>
              </label>
            </div>
          </div>
          {customTableChart('Living', 'Living')}
          {customTableChart('Final', 'Final')}
          {customTableChart('Last_Call', 'Last Call')}
          {customTableChart('Review', 'Review')}
          {customTableChart('Draft', 'Draft')}
          {customTableChart('Stagnant', 'Stagnant')}
          {customTableChart('Withdrawn', 'Withdrawn')}
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default statusAll
