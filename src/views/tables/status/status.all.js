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
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { CCard, CCardBody, CCardFooter, CCol, CRow } from '@coreui/react-pro'
import { Column, Pie, G2, Line, Area, Bar } from '@ant-design/plots'
import { each, groupBy } from '@antv/util'
import useMediaQuery from 'src/scss/useMediaQuery'
import { ip } from 'src/constants'
import '../type/type.css'
import { faLeftLong, faLessThan } from '@fortawesome/free-solid-svg-icons'
import Loading from 'src/views/theme/loading/loading'
import { TypeColors } from 'src/constants'

function statusAll(props) {
  const [post, getPost] = useState()
  const [date, setDate] = useState()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [eips, setEips] = useState([])
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

  function factorStatus(name) {
    let StatusData
    if (name === 'Living') {
      StatusData = allData[6].data
    }
    if (name === 'Final') {
      StatusData = allData[7].data
    }
    if (name === 'Last_Call') {
      StatusData = allData[8].data
    }
    if (name === 'Review') {
      StatusData = allData[9].data
    }
    if (name === 'Draft') {
      StatusData = allData[10].data
    }
    if (name === 'Stagnant') {
      StatusData = allData[11].data
    }
    if (name === 'Withdrawn') {
      StatusData = allData[12].data
    }

    let arr = []
    arr.push(
      StatusData.filter((item) => item.type === 'Standards Track' && item.category === 'Core')
        .length,
    )
    arr.push(
      StatusData.filter((item) => item.type === 'Standards Track' && item.category === 'ERC')
        .length,
    )
    arr.push(
      StatusData.filter((item) => item.type === 'Standards Track' && item.category === 'Networking')
        .length,
    )
    arr.push(
      StatusData.filter((item) => item.type === 'Standards Track' && item.category === 'Interface')
        .length,
    )
    arr.push(StatusData.filter((item) => item.type === 'Meta').length)
    arr.push(StatusData.filter((item) => item.type === 'Informational').length)
    return arr
  }

  const fetchData = (data, name) => {
    let arr = []
    let StatusData = factorStatus(name)
    arr.push(
      {
        name: 'Core',
        value: StatusData[0],
        type: 'Standard Track',
      },
      {
        name: 'ERC',
        value: StatusData[1],
        type: 'Standard Track',
      },
      {
        name: 'Networking',
        value: StatusData[2],
        type: 'Standard Track',
      },
      {
        name: 'Interface',
        value: StatusData[3],
        type: 'Standard Track',
      },
      {
        name: 'Meta',
        value: StatusData[4],
        type: 'Meta',
      },
      {
        name: 'Informational',
        value: StatusData[5],
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
    switch (name) {
      case 'Living':
        return 6
      case 'Final':
        return 7
      case 'Last_Call':
        return 8
      case 'Review':
        return 9
      case 'Draft':
        return 10
      case 'Stagnant':
        return 11
      case 'Withdrawn':
        return 12
      default:
        return 0
    }
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
            borderLeft: `4px solid ${getBadgeColor(name)}`,
            borderBottom: `2px solid ${getBadgeColor(name)}`,
            marginTop: '2rem',
            display: 'inline-block',
            color: `${getBadgeColor(name)}`,
          }}
          className="shadow-lg"
        >
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
              state={{
                type: '',
                status: title,
                category: '',
                name: `${title}`,
                data: allData[totalData(name)].data,
                eips: eip[3]['Last_Call'],
              }}
            >
              <div
                className={`className="h-7
            shadow-md font-extrabold rounded-[8px] bg-[${getBadge(name)}] text-[${getBadgeColor(
                  name,
                )}] text-[1.5rem] flex justify-center items-center p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out tracking-wider ml-2`}
                style={{
                  backgroundColor: `${getBadge(name)}`,
                  fontFamily: 'Big Shoulders Display',
                }}
              >
                {allData[totalData(name)].total}
              </div>
            </Link>
          </label>
        </div>
        <CRow>
          <CCol xs={matches ? 12 : 6}>
            <CCard className="shadow-sm">
              <CCardBody
                style={{
                  height: '300px',
                  borderLeft: `2px solid ${getBadgeColor(name)}`,
                }}
              >
                <Column {...fetchChartData(name, allData[totalData(name)].total)} />
              </CCardBody>
              <CCardFooter
                className="cardFooter"
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  borderLeft: `2px solid ${getBadgeColor(name)}`,
                  borderBottom: `2px solid ${getBadgeColor(name)}`,
                  background: `${getBadge(name)}`,
                }}
              >
                <label style={{ color: `${getBadgeColor(name)}`, fontSize: '10px' }}>{date}</label>
              </CCardFooter>
            </CCard>
          </CCol>
          <CCol xs={matches ? 12 : 6}>
            <CCard className="shadow-sm">
              <CCardBody
                style={{
                  overflowX: 'auto',
                  overflowY: 'auto',
                  height: '300px',
                  fontFamily: 'Roboto',
                  fontSize: '12px',
                  borderRight: `2px solid ${getBadgeColor(name)}`,
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
                            data: allData[totalData(name)].data.filter(
                              (e) => e.type === 'Standards Track',
                            ),
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
                            data: allData[totalData(name)].data.filter(
                              (e) => e.type === 'Standards Track' && e.category === 'Core',
                            ),
                            eips: eip[3]['Last_Call'],
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
                      <CTableDataCell>{factorStatus(name)[0]}</CTableDataCell>
                      <CTableDataCell
                        style={{ fontFamily: 'Big Shoulders Display' }}
                        className="tracking-wider text-[0.8rem]"
                      >
                        {((factorStatus(name)[0] / allData[totalData(name)].total) * 100).toFixed(
                          2,
                        )}
                        %
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
                            data: allData[totalData(name)].data.filter(
                              (e) => e.type === 'Standards Track' && e.category === 'ERC',
                            ),
                            eips: eip[3]['Last_Call'],
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
                      <CTableDataCell>{factorStatus(name)[1]}</CTableDataCell>
                      <CTableDataCell
                        style={{ fontFamily: 'Big Shoulders Display' }}
                        className="tracking-wider text-[0.8rem]"
                      >
                        {((factorStatus(name)[1] / allData[totalData(name)].total) * 100).toFixed(
                          2,
                        )}
                        %
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
                            data: allData[totalData(name)].data.filter(
                              (e) => e.type === 'Standards Track' && e.category === 'Networking',
                            ),
                            eips: eip[3]['Last_Call'],
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
                      <CTableDataCell>{factorStatus(name)[2]}</CTableDataCell>
                      <CTableDataCell
                        style={{ fontFamily: 'Big Shoulders Display' }}
                        className="tracking-wider text-[0.8rem]"
                      >
                        {((factorStatus(name)[2] / allData[totalData(name)].total) * 100).toFixed(
                          2,
                        )}
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
                            data: allData[totalData(name)].data.filter(
                              (e) => e.type === 'Standards Track' && e.category === 'Interface',
                            ),
                            eips: eip[3]['Last_Call'],
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
                      <CTableDataCell>{factorStatus(name)[3]}</CTableDataCell>
                      <CTableDataCell
                        style={{ fontFamily: 'Big Shoulders Display' }}
                        className="tracking-wider text-[0.8rem]"
                      >
                        {((factorStatus(name)[3] / allData[totalData(name)].total) * 100).toFixed(
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
                            type: 'Meta',
                            status: name,
                            category: '',
                            name: title + '_Meta',
                            data: allData[totalData(name)].data.filter((e) => e.type === 'Meta'),
                            eips: eip[3]['Last_Call'],
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
                      <CTableDataCell>{factorStatus(name)[4]}</CTableDataCell>
                      <CTableDataCell
                        style={{ fontFamily: 'Big Shoulders Display' }}
                        className="tracking-wider text-[0.8rem]"
                      >
                        {((factorStatus(name)[4] / allData[totalData(name)].total) * 100).toFixed(
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
                            data: allData[totalData(name)].data.filter(
                              (e) => e.type === 'Informational',
                            ),
                            eips: eip[3]['Last_Call'],
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
                      <CTableDataCell>{factorStatus(name)[5]}</CTableDataCell>
                      <CTableDataCell
                        style={{ fontFamily: 'Big Shoulders Display' }}
                        className="tracking-wider text-[0.8rem]"
                      >
                        {((factorStatus(name)[5] / allData[totalData(name)].total) * 100).toFixed(
                          2,
                        )}
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
                          state={{
                            type: '',
                            status: title,
                            category: '',
                            name: `${title}`,
                            data: allData[totalData(name)].data,
                            eips: eip[3]['Last_Call'],
                          }}
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
                            {allData[totalData(name)].total}
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
                  borderRight: `2px solid ${getBadgeColor(name)}`,
                  borderBottom: `2px solid ${getBadgeColor(name)}`,
                  background: `${getBadge(name)}`,
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
    fetchAllEIps()
    fetchAllData()
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
                    {allData[6].total +
                      allData[7].total +
                      allData[8].total +
                      allData[9].total +
                      allData[10].total +
                      allData[11].total +
                      allData[12].total}
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
