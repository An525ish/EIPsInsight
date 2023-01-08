/* eslint-disable react-hooks/rules-of-hooks */
import { CBadge, CCard, CCardBody, CCardFooter, CCardHeader, CSmartTable } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { CSVLink } from 'react-csv'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Loading from 'src/views/theme/loading/loading'
import { motion } from 'framer-motion'
import downloadIcon from 'src/assets/download.png'

const currentDate = new Date()

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

function tableCurrent() {
  const location = useLocation()
  const [status, setStatus] = useState()
  const [eips, setEips] = useState()
  const [date, setDate] = useState()
  const [currentMonth, setCurrentMonth] = useState()
  const navigate = useNavigate()
  const API2 = 'https://eipsinsight.com/api/rawData'

  const [loading, setLoading] = useState(true)
  const [name, setName] = useState()
  const [eip, setEip] = useState()

  const fetchAllEIPs = () => {
    fetch(API2)
      .then((res) => res.json())
      .then((res) => {
        setEips(res)
        setLoading(false)
      })
  }
  const fetchCurrentMonthEIPs = () => {
    const API3 = `https://eipsinsight.com/api/currentMonth/${currentDate.getFullYear()}/${
      months[currentDate.getMonth()]
    }`
    fetch(API3)
      .then((res) => res.json())
      .then((res) => {
        setCurrentMonth(res)
      })
  }
  const fetchColumn = (status) => {
    console.log(status)
    const columns =
      status === 'Last_Call'
        ? [
            {
              key: 'id',
              _style: { width: '5%', color: `${getBadgeColor(status)}` },
              _props: { className: 'fw-semibold' },
              sorter: true,
            },
            {
              key: 'Number',
              _style: {
                width: '5%',
                color: `${getBadgeColor(status)}`,
              },
              _props: { className: 'fw-semibold' },
              sorter: true,
            },

            {
              key: 'Title',
              _style: {
                width: '20%',
                color: `${getBadgeColor(status)}`,
              },
            },
            {
              key: 'Author',
              _style: {
                width: '14%',
                color: `${getBadgeColor(status)}`,
              },
            },
            {
              key: 'Draft Date',
              _style: {
                width: '10%',
                color: `${getBadgeColor(status)}`,
              },
            },

            { key: 'Type', _style: { width: '8%', color: `${getBadgeColor(status)}` } },
            {
              key: 'Category',
              _style: {
                width: '8%',
                color: `${getBadgeColor(status)}`,
              },
            },
            {
              key: 'Last-Call Deadline',
              _style: { width: '10%', color: `${getBadgeColor(status)}` },
            },
            {
              key: 'status',
              _style: {
                width: '5%',
                color: `${getBadgeColor(status)}`,
              },
            },
            {
              key: 'PR No.',

              _style: { width: '5%', color: `${getBadgeColor(status)}` },
            },
          ]
        : [
            {
              key: 'id',
              _style: { width: '5%', color: `${getBadgeColor(status)}` },
              _props: { className: 'fw-semibold' },
              sorter: true,
            },
            {
              key: 'Number',
              _style: {
                width: '5%',
                color: `${getBadgeColor(status)}`,
              },
              _props: { className: 'fw-semibold' },
              sorter: true,
            },
            {
              key: 'Title',
              _style: {
                width: '30%',
                color: `${getBadgeColor(status)}`,
              },
            },
            {
              key: 'Author',
              _style: {
                width: '15%',
                color: `${getBadgeColor(status)}`,
              },
            },
            {
              key: status === 'Final' ? 'Final Date' : 'Draft Date',
              _style: {
                width: '10%',
                color: `${getBadgeColor(status)}`,
              },
            },

            { key: 'Type', _style: { width: '10%', color: `${getBadgeColor(status)}` } },
            {
              key: 'Category',
              _style: {
                width: '5%',
                color: `${getBadgeColor(status)}`,
              },
            },
            {
              key: 'status',
              _style: { width: '5%', color: `${getBadgeColor(status)}` },
            },
            {
              key: 'PR No.',

              _style: {
                width: '5%',
                color: `${getBadgeColor(status)}`,
              },
            },
          ]

    return columns
  }

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

  const findEIPNum = (list, category) => {
    const ans = []
    console.log({ list })
    console.log(list[category])
    if (parseInt(list[category][0]) !== 0) {
      for (let i = 1; i < list[category].length; i++) {
        ans.push(parseInt(list[category][i].substring(4)))
      }
    }
    return ans
  }

  function getLastCallDate(eipId) {
    if (eip === undefined) return 'N/A'
    for (let i = 0; i < eip.length; i++) {
      if (eip[i].eip === parseInt(eipId)) {
        return eip[i]['last-call-deadline'].substring(0, 10)
      }
    }
    return 'N/A'
  }
  const findAllEIPs = (eips, data, status) => {
    console.log({ name })
    let arr = []
    let inc = 1
    if (data.length !== 0 && eips.length !== 0) {
      console.log({ data })
      let filterData = data?.filter((item) => item.Status === status)
      console.log({ filterData })

      let ans = []
      if (filterData.length !== 0) {
        ans.push(findEIPNum(filterData[0], 'Core'))
        ans.push(findEIPNum(filterData[0], 'ERC'))
        ans.push(findEIPNum(filterData[0], 'Networking'))
        ans.push(findEIPNum(filterData[0], 'Interface'))
        ans.push(findEIPNum(filterData[0], 'Meta'))

        ans.push(findEIPNum(filterData[0], 'Informational'))

        let undefinedEIPs = findEIPNum(filterData[0], 'Undefined')
        console.log({ undefinedEIPs })

        ans = ans.flat(Infinity)

        // here we remove undefined EIPs from the list ... if the status is not final
        if (status !== 'Final') {
          for (let i = 0; i < undefinedEIPs.length; i++) {
            if (ans.includes(undefinedEIPs[i])) {
              ans.splice(ans.indexOf(undefinedEIPs[i]), 1)
            }
          }
        }
      }
      console.log({ ans })

      for (let i = 0; i < ans.length; i++) {
        let findEip = eips.filter((item) => item.data.eip === ans[i])
        console.log({ findEip })
        console.log(findEip[0].type)
        if (status === 'Last_Call') {
          arr.push({
            id: inc++,
            Number: findEip[0].data.eip,
            Title: findEip[0].data.title,
            Type: findEip[0].data.type,
            Category:
              findEip[0].data.type === 'Standards Track'
                ? findEip[0].data.category
                : `Type - ${findEip[0].data.type}`,
            'Last-Call Deadline':
              getLastCallDate(findEip[0].data.eip) !== 'N/A'
                ? getLastCallDate(findEip[0].data.eip)
                : findEip[0].data.created.substring(0, 10),
            'Draft Date': findEip[0].data.created.substring(0, 10),
            status: findEip[0].data.status,
            Author: findEip[0].data.author,
            'PR No.': '#' + findEip[0].data.eip,
          })
        } else {
          if (status === 'Final') {
            arr.push({
              id: inc++,
              Number: findEip[0].data.eip,
              Title: findEip[0].data.title,
              Type: findEip[0].data.type,
              Category:
                findEip[0].data.type === 'Standards Track'
                  ? findEip[0].data.category
                  : `Type - ${findEip[0].data.type}`,

              'Final Date': findEip[0].data.created.substring(0, 10),
              status: findEip[0].data.status,
              Author: findEip[0].data.author,
              'PR No.': '#' + findEip[0].data.eip,
            })
          } else {
            arr.push({
              id: inc++,
              Number: findEip[0].data.eip,
              Title: findEip[0].data.title,
              Type: findEip[0].data.type,
              Category:
                findEip[0].data.type === 'Standards Track'
                  ? findEip[0].data.category
                  : `Type - ${findEip[0].data.type}`,

              'Draft Date': findEip[0].data.created.substring(0, 10),
              status: findEip[0].data.status,
              Author: findEip[0].data.author,
              'PR No.': '#' + findEip[0].data.eip,
            })
          }
        }
      }
      // console.log({ arr })
    }
    console.log({ arr })
    return arr
  }

  const fetchDate = () => {
    let date = new Date().toDateString()
    setDate(date)
  }
  // csv Download
  const headers = [
    {
      label: 'id',
      key: 'id',
    },
    {
      label: 'EIP No.',
      key: 'Number',
    },
    {
      label: 'Title',
      key: 'Title',
    },
    {
      label: 'Author',
      key: 'Author',
    },
    {
      label: 'Start Date',
      key: 'Start Date',
    },
    {
      label: 'Final Date',
      key: 'Final Date',
    },
    {
      label: 'Type',
      key: 'Type',
    },
    {
      label: 'Category',
      key: 'Category',
    },
    { label: 'Last Call Deadline', key: 'Last-Call Deadline' },
    {
      label: 'Status',
      key: 'status',
    },
    {
      label: 'PR No.',
      key: 'Number',
    },
  ]
  const csvLink = {
    filename: name,
    headers: headers,
    data: findAllEIPs(
      eips === undefined ? [] : eips,
      currentMonth === undefined ? [] : currentMonth,
      status,
    ),
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

  // headers
  const header = (text, status) => {
    return (
      <CCardHeader
        className="cardHeader flex justify-between items-center"
        style={{
          fontFamily: 'Roboto',
          fontWeight: '800',
          fontSize: '14px',
          color: `${getBadgeColor(status)}`,
          background: `${getBadge(status)}`,
          borderBottom: `2px solid ${getBadgeColor(status)}`,
        }}
      >
        <div>{text}</div>

        <CSVLink {...csvLink}>
          <motion.img
            src={downloadIcon}
            alt="Download Icon"
            whileTap={{ scale: 0.8 }}
            style={{ fill: `${getBadgeColor(status)}` }}
          />
        </CSVLink>
      </CCardHeader>
    )
  }

  useEffect(() => {
    setStatus(location.state.status)
    setName(location.state.name)
    setEip(location.state.eips)
    fetchDate()
    fetchAllEIPs()
    fetchCurrentMonthEIPs()
  }, [])

  console.log({ status })

  return (
    <>
      <CCard>
        {header(
          `${name
            ?.split('_')
            .toString()
            .replace(',', ' ')
            .replace(',', ' - ')
            .replace(',', ' - ')
            .replace(/^./, name[0].toUpperCase())}`,
          status,
        )}
        <CCardBody
          style={{
            overflowX: 'auto',
            overflowY: 'auto',

            fontFamily: 'Roboto',
            fontSize: '15px',
          }}
          className="scrollbarDesign"
        >
          {!loading ? (
            <CSmartTable
              items={findAllEIPs(
                eips === undefined ? [] : eips,
                currentMonth === undefined ? [] : currentMonth,
                status,
              )}
              activePage={1}
              clickableRows
              columns={fetchColumn(status)}
              columnFilter
              columnSorter
              itemsPerPage={15}
              pagination
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
                'Last-Call Deadline': (item) => (
                  <td
                    style={{
                      color: `${getBadgeColor(item.status)}`,
                      fontWeight: 'bold',
                    }}
                    className="text-[12px]"
                  >
                    <div>{item['Last-Call Deadline']}</div>
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
              // onRowClick={(item) => {
              //   console.log(item)
              //   navigate('/EIP-' + item.Number)
              // }}
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
          className="cardFooter"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            color: `${getBadgeColor(status)}`,
            backgroundColor: `${getBadge(status)}`,
          }}
        >
          <label style={{ color: '#1c7ed6', fontSize: '15px', fontWeight: 'bold' }}></label>
          <label
            style={{ fontSize: '10px', fontWeight: 'bold', color: `${getBadgeColor(status)}` }}
          >
            {date}
          </label>
        </CCardFooter>
      </CCard>
    </>
  )
}
export default tableCurrent
