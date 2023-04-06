import { CBadge, CCard, CCardBody, CCardFooter, CCardHeader, CSmartTable } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserAuth } from 'src/Context/AuthContext'
import Loading from '../theme/loading/loading'
import { CSVLink } from 'react-csv'
import downloadIcon from 'src/assets/download.png'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import './allEIPs.css'
import { ip } from 'src/constants'
import { MotionConfig } from 'framer-motion'
const statusArr = ['Final', 'Draft', 'Review', 'Last_Call', 'Stagnant', 'Withdrawn', 'Living']

const AllEIPs = () => {
  const [eips, setEips] = useState()
  const [date, setDate] = useState()
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { allEIPs } = useUserAuth()

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

  const eipData = (eips) => {
    let arr = []

    let defaultStatus = {
      Draft: 'Draft',
      'Last Call': 'Last Call',
      Review: 'Review',
      Final: 'Final',
      Stagnant: 'Stagnant',
      Withdrawn: 'Withdrawn',
      Living: 'Living',
    }
    let changeStatus = {
      Active: 'Living',
      Accepted: 'Final',
      Abandoned: 'Withdrawn',
      Deferred: 'Stagnant',
      Superseded: 'Final',
    }

    let inc = 0

    for (let i = 0; i < eips.length; i++) {
      if (eips[i]['merge_date'] === undefined) {
      }
    }
    for (let i = 0; i < eips.length; i++) {
      const temp = eips[i].eip.split('.md')[0].split('eip-')
      if (temp.length === 2) {
        if (temp[0] === '' && !isNaN(temp[1])) {
          arr.push({
            id: inc++,
            Number: parseInt(temp[1]),
            Title: eips[i].title,
            Type: eips[i].type,
            Category:
              eips[i].type === 'Standards Track' ? eips[i].category : `Type - ${eips[i].type}`,
            'Draft Date': eips[i].created,
            'Final Date':
              eips[i]['merge_date'] === undefined ? (eips[i]['c_date'] === undefined ? eips[i].date : eips[i]['c_date'].slice(4)) : eips[i]['merge_date'],
            status:
              defaultStatus[eips[i].status] === undefined
                ? changeStatus[eips[i].status.trim()]
                : defaultStatus[eips[i].status],
            Author: eips[i].author,
            'PR No.': eips[i].pull,
          })
        }
      }
    }

    arr.sort((a, b) => (a.Number > b.Number ? 1 : -1))
    console.log(arr)

    return arr
  }

  // columns
  const columns = [
    {
      key: 'Number',
      _style: { width: '7%', color: '#1c7ed6', backgroundColor: '#e7f5ff' },
      _props: { className: 'fw-semibold' },
      sorter: true,
    },
    {
      key: 'Title',
      _style: {
        width: '28%',
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
      key: 'Draft Date',
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
        <div className="flex">
          {text}{' '}
          <div className="ml-2 bg-white rounded-[0.7rem] text-[10px] flex justify-center items-center px-2 font-bold text-base">
            {eips !== undefined ? (
              eips.length
            ) : (
              <div className="flex rounded-full justify-center items-center h-[0.4rem] w-[0.4rem] relative bg-blue-500 animate-pulse"></div>
            )}
          </div>
        </div>

        <CSVLink {...csvLink} className="drop-shadow-lg shadow-blue-500/50">
          <motion.img src={downloadIcon} alt="Download Icon" whileTap={{ scale: 0.8 }} />
        </CSVLink>
      </CCardHeader>
    )
  }

  const factorAuthor = (data) => {
    let ans
    //
    let list = data.split(',')
    //
    for (let i = 0; i < list.length; i++) {
      list[i] = list[i].split(' ')
    }
    //
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
    fetchAllData()
    fetchDate()
  }, [])


  return (
    <>
      <CCard className="alleip-card-container">
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
              itemsPerPage={7}
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
                              {item}
                            </a>
                          </CBadge>
                        )
                      })}
                    </div>
                  </td>
                ),
                'Draft Date': (item) => (
                  <td
                    style={{
                      color: `${getBadgeColor(item.status)}`,
                      fontWeight: 'bold',
                    }}
                    className="text-[12px]"
                  >
                    <div>{item['Draft Date']}</div>
                  </td>
                ),

                'Final Date': (item) => (
                  <td
                    style={{
                      color: `${getBadgeColor(item.status)}`,
                      fontWeight: 'bold',
                    }}
                    className="text-[12px]"
                  >
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
                // striped: true,
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
          <label
            style={{ color: '#000000', fontSize: '12px', fontWeight: '500' }}
            className="tracking-wider"
          >
            {date}
          </label>
        </CCardFooter>
      </CCard>
    </>
  )
}

export default AllEIPs
