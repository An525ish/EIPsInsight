import { CBadge, CCard, CCardBody, CCardFooter, CCardHeader, CSmartTable } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserAuth } from 'src/Context/AuthContext'
import Loading from '../theme/loading/loading'
import { CSVLink } from 'react-csv'
import downloadIcon from 'src/assets/download.png'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import './allEIPs.css'
import { MotionConfig } from 'framer-motion'

const AllEIPs = () => {
  const [eips, setEips] = useState()
  const [date, setDate] = useState()
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { allEIPs } = useUserAuth()
  const API2 = 'https://eipsinsight.com/api/allinfo'
  const APII = 'https://eipsinsight.com/api/typePage'
  const fetchPost = () => {
    fetch(APII)
      .then((res) => res.json())
      .then((res) => {
        setData(res)
      })
  }
  const fetchAllEIPs = () => {
    fetch(API2)
      .then((res) => res.json())
      .then((res) => {
        setEips(res)
        setLoading(true)
      })
  }

  const eipData = (eips) => {
    let arr = []
    if (eips[0] !== undefined) {
      let inc = 1
      for (let i = 0; i < eips[0]['Final'].length; i++) {
        arr.push({
          Number: eips[0]['Final'][i].eip,
          Title: eips[0]['Final'][i].title,
          Type: eips[0]['Final'][i].type,
          Category:
            eips[0]['Final'][i].type === 'Standards Track'
              ? eips[0]['Final'][i].category
              : `Type - ${eips[0]['Final'][i].type}`,
          status: eips[0]['Final'][i].status,
          Author: eips[0]['Final'][i].author,
          'PR No.': '#' + eips[0]['Final'][i].eip,
        })
      }
      for (let i = 0; i < eips[1]['Draft'].length; i++) {
        arr.push({
          Number: eips[1]['Draft'][i].eip,
          Title: eips[1]['Draft'][i].title,
          Type: eips[1]['Draft'][i].type,
          Category:
            eips[1]['Draft'][i].type === 'Standards Track'
              ? eips[1]['Draft'][i].category
              : `Type - ${eips[1]['Draft'][i].type}`,
          status: eips[1]['Draft'][i].status,
          Author: eips[1]['Draft'][i].author,
          'PR No.': '#' + eips[1]['Draft'][i].eip,
        })
      }
      for (let i = 0; i < eips[2]['Review'].length; i++) {
        arr.push({
          Number: eips[2]['Review'][i].eip,
          Title: eips[2]['Review'][i].title,
          Type: eips[2]['Review'][i].type,
          Category:
            eips[2]['Review'][i]?.type === 'Standards Track'
              ? eips[2]['Review'][i]?.category
              : `Type - ${eips[2]['Review'][i].type}`,
          status: eips[2]['Review'][i].status,
          Author: eips[2]['Review'][i].author,
          'PR No.': '#' + eips[2]['Review'][i].eip,
        })
      }
      for (let i = 0; i < eips[3]['Last_Call'].length; i++) {
        arr.push({
          Number: eips[3]['Last_Call'][i].eip,
          Title: eips[3]['Last_Call'][i].title,
          Type: eips[3]['Last_Call'][i].type,
          Category:
            eips[3]['Last_Call'][i].type === 'Standards Track'
              ? eips[3]['Last_Call'][i].category
              : `Type - ${eips[3]['Last_Call'][i].type}`,
          status: eips[3]['Last_Call'][i].status,
          Author: eips[3]['Last_Call'][i].author,
          'PR No.': '#' + eips[3]['Last_Call'][i].eip,
        })
      }

      for (let i = 0; i < eips[4]['Stagnant'].length; i++) {
        arr.push({
          Number: eips[4]['Stagnant'][i].eip,
          Title: eips[4]['Stagnant'][i].title,
          Type: eips[4]['Stagnant'][i].type,
          Category:
            eips[4]['Stagnant'][i].type === 'Standards Track'
              ? eips[4]['Stagnant'][i].category
              : `Type - ${eips[4]['Stagnant'][i].type}`,
          status: eips[4]['Stagnant'][i].status,
          Author: eips[4]['Stagnant'][i].author,
          'PR No.': '#' + eips[4]['Stagnant'][i].eip,
        })
      }
      for (let i = 0; i < eips[5]['Withdrawn'].length; i++) {
        arr.push({
          Number: eips[5]['Withdrawn'][i].eip,
          Title: eips[5]['Withdrawn'][i].title,
          Type: eips[5]['Withdrawn'][i].type,
          Category:
            eips[5]['Withdrawn'][i].type === 'Standards Track'
              ? eips[5]['Withdrawn'][i].category
              : `Type - ${eips[5]['Withdrawn'][i].type}`,
          status: eips[5]['Withdrawn'][i].status,
          Author: eips[5]['Withdrawn'][i].author,
          'PR No.': '#' + eips[5]['Withdrawn'][i].eip,
        })
      }
      for (let i = 0; i < eips[6]['Living'].length; i++) {
        arr.push({
          Number: eips[6]['Living'][i].eip,
          Title: eips[6]['Living'][i].title,
          Type: eips[6]['Living'][i].type,
          Category:
            eips[6]['Living'][i].type === 'Standards Track'
              ? eips[6]['Living'][i].category
              : `Type - ${eips[6]['Living'][i].type}`,
          status: eips[6]['Living'][i].status,
          Author: eips[6]['Living'][i].author,
          'PR No.': '#' + eips[6]['Living'][i].eip,
        })
      }
      arr.sort((a, b) => (a.Number > b.Number ? 1 : -1))
    }
    return arr
  }

  // columns
  const columns = [
    {
      key: 'Number',
      _style: { width: '5%', color: '#1c7ed6', backgroundColor: '#e7f5ff' },
      _props: { className: 'fw-semibold' },
      sorter: true,
    },
    {
      key: 'Title',
      _style: {
        width: '30%',
        color: '#1c7ed6',
      },
    },
    {
      key: 'Author',
      _style: {
        width: '20%',
        color: '#1c7ed6',
        backgroundColor: '#e7f5ff',
      },
    },
    {
      key: 'Start Date',
      _style: {
        width: '10%',
        color: '#1c7ed6',
      },
    },
    {
      key: 'Final Date',
      _style: {
        width: '8%',
        color: '#1c7ed6',
        backgroundColor: '#e7f5ff',
      },
    },
    { key: 'Type', _style: { width: '7%', color: '#1c7ed6' } },
    { key: 'Category', _style: { width: '7%', color: '#1c7ed6', backgroundColor: '#e7f5ff' } },
    { key: 'status', _style: { width: '8%', color: '#1c7ed6' } },
    { key: 'PR No.', _style: { width: '5%', color: '#1c7ed6', backgroundColor: '#e7f5ff' } },
  ]
  // colouring
  const getBadge = (status) => {
    switch (status) {
      case 'Final':
        return '#c3fae8'
      case 'Last_Call':
        return '#d3f9d8'
      case 'Last Call':
        return '#d3f9d8'
      case 'Draft':
        return '#fff3bf'
      case 'Stagnant':
        return '#ffe8cc'
      case 'Withdrawn':
        return '#ffe3e3'
      case 'Review':
        return '#d0ebff'
      case 'Living':
        return '#c5f6fa'
      default:
        return '#e7f5ff'
    }
  }
  const getBadgeColor = (status) => {
    switch (status) {
      case 'Final':
        return '#0ca678'
      case 'Last_Call':
        return '#37b24d'
      case 'Last Call':
        return '#37b24d'
      case 'Draft':
        return '#f08c00'
      case 'Stagnant':
        return '#e8590c'
      case 'Withdrawn':
        return '#e03131'
      case 'Review':
        return '#1971c2'
      case 'Living':
        return '#0c8599'
      default:
        return '#1c7ed6'
    }
  }

  const getBadgeShadowColor = (status) => {
    switch (status) {
      case 'Final':
        return 'shadow-[#0ca678]'
      case 'Last_Call':
        return 'shadow-[#37b24d]'
      case 'Last Call':
        return 'shadow-[#37b24d]'
      case 'Draft':
        return 'shadow-[#f08c00]'
      case 'Stagnant':
        return 'shadow-[#e8590c]'
      case 'Withdrawn':
        return 'shadow-[#e03131]'
      case 'Review':
        return 'shadow-[#1971c2]'
      case 'Living':
        return 'shadow-[#0c8599]'
      default:
        return 'shadow-[#1c7ed6]'
    }
  }

  // header
  const header = (text) => {
    return (
      <CCardHeader
        className="cardHeader flex justify-between items-center"
        style={{
          fontFamily: 'Roboto',
          fontWeight: '500',
          fontSize: '18px',
          color: `black`,
          background: `white`,
          borderBottom: `2px solid ${getBadgeColor(text)}`,
        }}
      >
        <div>
          {text} ({allEIPs})
        </div>

        <CSVLink {...csvLink} className="drop-shadow-lg shadow-blue-500/50">
          <motion.img src={downloadIcon} alt="Download Icon" whileTap={{ scale: 0.8 }} />
        </CSVLink>
      </CCardHeader>
    )
  }

  const factorAuthor = (data) => {
    let ans
    // console.log({ data })
    let list = data.split(',')
    // console.log({ list })
    for (let i = 0; i < list.length; i++) {
      list[i] = list[i].split(' ')
    }
    // console.log({ list })
    if (list[list.length - 1][list[list.length - 1].length - 1] === 'al.') {
      list.pop()
    }
    return list
  }

  const getString = (data) => {
    let ans = ''
    for (let i = 0; i < data.length - 1; i++) {
      ans += data[i] + ' '
    }
    return ans
  }

  // date
  const fetchDate = () => {
    let date = new Date().toDateString()
    setDate(date)
  }

  // csv Download
  const headers = [
    {
      label: 'EIP No.',
      key: 'Number',
    },
    {
      label: 'Title',
      key: 'Title',
    },
    {
      label: 'Type',
      key: 'Type',
    },
    {
      label: 'Category',
      key: 'Category',
    },
    {
      label: 'Status',
      key: 'status',
    },
    {
      label: 'PR No.',
      key: 'PR No.',
    },
  ]
  const csvLink = {
    filename: 'EIPs.csv',
    headers: headers,
    data: eipData(eips === undefined ? [] : eips),
  }
  useEffect(() => {
    fetchAllEIPs()
    fetchDate()
    fetchPost()
  }, [])
  return (
    <>
      <CCard className='alleip-card-container'>
        {header('All EIPs')}
        <CCardBody
          style={{
            overflowX: 'auto',
            overflowY: 'auto',

            fontFamily: 'Roboto',
            fontSize: '12px',
          }}
          className="scrollbarDesign"
        >
          {loading ? (
            <CSmartTable
              items={eipData(eips === undefined ? [] : eips)}
              activePage={1}
              color="success"
              clickableRows
              columns={columns}
              columnFilter
              columnSorter
              itemsPerPage={15}
              pagination
              onRowClick={(t) => {}}
              scopedColumns={{
                id: (item) => (
                  <td>
                    <div
                      style={{
                        color: `${getBadgeColor(item.status)}`,
                        fontWeight: 'bold',
                      }}
                    >
                      {item.id}.
                    </div>
                  </td>
                ),
                Number: (item) => (
                  <td>
                    <Link to={`/EIP-${item.Number}`}>
                      <div>
                        <label className="relative cursor-pointer">
                          <div
                            className={`h-7
            font-extrabold rounded-[8px] bg-[${getBadge(item.status)}] text-[${getBadgeColor(
                              item.status,
                            )}] text-[12px] inline-block p-[4px] drop-shadow-sm ${getBadgeShadowColor(
                              item.status,
                            )} shadow-md cursor-pointer px-[8px]`}
                            style={{
                              color: `${getBadgeColor(item.status)}`,
                              backgroundColor: `${getBadge(item.status)}`,
                            }}
                          >
                            {item.Number}
                          </div>
                          <div
                            className={`absolute top-0 right-0 -mr-1 -mt-0 w-2 h-2 rounded-full bg-[${getBadgeColor(
                              item.status,
                            )}] animate-ping`}
                            style={{
                              backgroundColor: `${getBadgeColor(item.status)}`,
                            }}
                          ></div>
                          <div
                            className={`absolute top-0 right-0 -mr-1 -mt-0 w-2 h-2 rounded-full bg-[${getBadgeColor(
                              item.status,
                            )}]`}
                            style={{
                              backgroundColor: `${getBadgeColor(item.status)}`,
                            }}
                          ></div>
                        </label>
                      </div>
                    </Link>
                  </td>
                ),
                Title: (item) => (
                  <td
                    style={{
                      // borderBottomWidth: item.id % 2 !== 0 ? '1px' : '',
                      // borderColor: item.id % 2 !== 0 ? `${getBadgeColor(item.status)}` : '',
                      color: `${getBadgeColor(item.status)}`,

                      fontWeight: 'bold',
                      height: '100%',
                    }}
                    className="hover:text-[#1c7ed6]"
                  >
                    <Link to={`/EIP-${item.Number}`} className="hover:text-[#1c7ed6] text-[13px]">
                      {item.Title}
                    </Link>
                  </td>
                ),

                Author: (it) => (
                  <td>
                    <div>
                      {factorAuthor(it.Author).map((item, index) => {
                        let t = item[item.length - 1].substring(1, item[item.length - 1].length - 1)

                        return (
                          <CBadge
                            key={index}
                            className={`mr-1 drop-shadow-sm ${getBadgeShadowColor(
                              it.status,
                            )} shadow-sm`}
                            style={{
                              color: `${getBadgeColor(it.status)}`,
                              backgroundColor: `${getBadge(it.status)}`,
                            }}
                          >
                            <a
                              key={index}
                              href={`${
                                item[item.length - 1].substring(
                                  item[item.length - 1].length - 1,
                                ) === '>'
                                  ? 'mailto:' + t
                                  : 'https://github.com/' + t.substring(1)
                              }`}
                              target="_blank"
                              rel="noreferrer"
                              className="hoverAuthor text-[10px]"
                              style={{ '--author-color': `${getBadgeColor(it.status)}` }}
                            >
                              {getString(item)}
                            </a>
                          </CBadge>
                        )
                      })}
                    </div>
                  </td>
                ),
                'Start Date': (item) => (
                  <td>
                    <div>{item['Start Date']}</div>
                  </td>
                ),

                'Final Date': (item) => (
                  <td>
                    <div>{item['Final Date']}</div>
                  </td>
                ),
                Type: (item) => (
                  <td
                    style={{
                      color: `${getBadgeColor(item.status)}`,
                      fontWeight: 'bold',
                    }}
                    className="text-[12px]"
                  >
                    {item.Type}
                  </td>
                ),
                Category: (item) => (
                  <td
                    style={{
                      color: `${getBadgeColor(item.status)}`,
                      fontWeight: 'bold',
                    }}
                  >
                    <div className=" text-[12px]">{item.Category}</div>
                  </td>
                ),
                status: (item) => (
                  <td style={{}}>
                    <CBadge
                      style={{
                        color: `${getBadgeColor(item.status)}`,
                        backgroundColor: `${getBadge(item.status)}`,
                      }}
                      className={`drop-shadow-sm ${getBadgeShadowColor(item.status)} shadow-md`}
                    >
                      {item.status}
                    </CBadge>
                  </td>
                ),
                'PR No.': (item) => (
                  <td>
                    <a
                      href={`https://github.com/ethereum/EIPs/pull/${
                        item['PR No.'] === 0 ? item.Number : item['PR No.']
                      }`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <CBadge
                        style={{
                          color: `${getBadgeColor('Random')}`,
                          backgroundColor: `${getBadge('Random')}`,
                        }}
                        className={`drop-shadow-sm ${getBadgeShadowColor(
                          'Random',
                        )} shadow-md  z-auto`}
                      >
                        <div>{item['PR No.'] === 0 ? item.Number : item['PR No.']}</div>
                      </CBadge>
                    </a>
                  </td>
                ),
              }}
              sorterValue={{ column: 'name', state: 'asc' }}
              tableHeadProps={{}}
              tableProps={{
                // borderless: true,
                striped: true,
                hover: true,
                responsive: true,
              }}
            />
          ) : (
            <Loading />
          )}
        </CCardBody>
        <CCardFooter
          className="cardFooter bg-[#ffffff] text-[#000000]"
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <label style={{ color: '#000000', fontSize: '15px', fontWeight: 'bold' }}></label>
          <label style={{ color: '#000000', fontSize: '12px', fontWeight: '500' }}>{date}</label>
        </CCardFooter>
      </CCard>
    </>
  )
}

export default AllEIPs
