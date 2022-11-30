/* eslint-disable react-hooks/rules-of-hooks */
import { CBadge, CCard, CCardBody, CCardFooter, CCardHeader, CSmartTable } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { CSVLink } from 'react-csv'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Loading from 'src/views/theme/loading/loading'
import { motion } from 'framer-motion'
import downloadIcon from 'src/assets/download.png'

function tableCurrent() {
  const location = useLocation()
  const [status, setStatus] = useState()
  const [eips, setEips] = useState()
  const [date, setDate] = useState()
  const [currentMonth, setCurrentMonth] = useState()
  const navigate = useNavigate()
  const API2 = 'https://eipsinsight.com/api/rawData'
  const API3 = 'https://eipsinsight.com/api/currentMonth'
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState()

  const fetchAllEIPs = () => {
    fetch(API2)
      .then((res) => res.json())
      .then((res) => {
        setEips(res)
        setLoading(false)
      })
  }
  const fetchCurrentMonthEIPs = () => {
    fetch(API3)
      .then((res) => res.json())
      .then((res) => {
        setCurrentMonth(res)
      })
  }
  const fetchColumn = (status) => {
    console.log(status)
    const columns =
      status === 'Last Call'
        ? [
            {
              key: 'id',
              _style: { width: '5%', color: '#1c7ed6' },
              _props: { className: 'fw-semibold' },
              sorter: true,
            },
            {
              key: 'Number',
              _style: { width: '10%', color: '#1c7ed6', backgroundColor: '#e7f5ff' },
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
            { key: 'Type', _style: { width: '10%', color: '#1c7ed6' } },

            { key: 'Last-Call Deadline', _style: { width: '10%', color: '#1c7ed6' } },
            { key: 'Category', _style: { width: '5%', color: '#1c7ed6' } },
            {
              key: 'status',
              _style: { width: '5%', color: '#1c7ed6', backgroundColor: '#e7f5ff' },
            },
            {
              key: 'PR No.',
              _style: { width: '5%', color: '#1c7ed6' },
            },
          ]
        : [
            {
              key: 'id',
              _style: { width: '5%', color: '#1c7ed6' },
              _props: { className: 'fw-semibold' },
              sorter: true,
            },
            {
              key: 'Number',
              _style: { width: '10%', color: '#1c7ed6', backgroundColor: '#e7f5ff' },
              _props: { className: 'fw-semibold' },
              sorter: true,
            },
            {
              key: 'Title',
              _style: {
                width: '35%',
                color: '#1c7ed6',
              },
            },
            {
              key: 'Author',
              _style: {
                width: '15%',
                color: '#1c7ed6',
                backgroundColor: '#e7f5ff',
              },
            },
            { key: 'Type', _style: { width: '15%', color: '#1c7ed6' } },
            { key: 'Category', _style: { width: '10%', color: '#1c7ed6' } },
            {
              key: 'status',
              _style: { width: '5%', color: '#1c7ed6', backgroundColor: '#e7f5ff' },
            },
            {
              key: 'PR No.',
              _style: { width: '5%', color: '#1c7ed6' },
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
  const findAllEIPs = (eips, data, status) => {
    let arr = []
    let inc = 1
    if (data.length !== 0 && eips.length !== 0) {
      console.log({ data })
      let filterData = data?.filter((item) => item.Status === status)
      console.log({ filterData })

      let ans = []
      ans.push(findEIPNum(filterData[0], 'Core'))
      ans.push(findEIPNum(filterData[0], 'ERC'))
      ans.push(findEIPNum(filterData[0], 'Networking'))
      ans.push(findEIPNum(filterData[0], 'Interface'))
      ans.push(findEIPNum(filterData[0], 'Meta'))
      // category
      // ans.push(findEIPNum(filterData[0], 'Category'))
      ans.push(findEIPNum(filterData[0], 'Informational'))

      ans = ans.flat(Infinity)
      console.log({ ans })

      for (let i = 0; i < ans.length; i++) {
        let findEip = eips.filter((item) => item.data.eip === ans[i])
        console.log({ findEip })
        console.log(findEip[0].type)
        arr.push({
          id: inc++,
          Number: findEip[0].data.eip,
          Title: findEip[0].data.title,
          Type: findEip[0].data.type,
          Category:
            findEip[0].data.type === 'Standards Track'
              ? findEip[0].data.category
              : `Type - ${findEip[0].data.type}`,
          status: findEip[0].data.status,
          Author: findEip[0].data.author,
          'PR No.': '#' + findEip[0].data.eip,
        })
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
      key: 'PR No.',
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
  const header = (text) => {
    return (
      <CCardHeader
        className="cardHeader flex justify-between items-center"
        style={{
          fontFamily: 'Roboto',
          fontWeight: '800',
          fontSize: '14px',
          color: `${getBadgeColor(text)}`,
          background: `${getBadge(text)}`,
          borderBottom: `2px solid ${getBadgeColor(text)}`,
        }}
      >
        <div>{text}</div>

        <CSVLink {...csvLink} className="drop-shadow-lg shadow-blue-500/50">
          <motion.img src={downloadIcon} alt="Download Icon" whileTap={{ scale: 0.8 }} />
        </CSVLink>
      </CCardHeader>
    )
  }

  useEffect(() => {
    fetchCurrentMonthEIPs()
    setStatus(location.state.status)
    setName(location.state.name)
    fetchDate()
    fetchAllEIPs()
  }, [])

  console.log({ status })

  return (
    <>
      <CCard style={{ border: '2px solid #a5d8ff' }}>
        {header(
          `${name
            ?.split('_')
            .toString()
            .replace(',', ' ')
            .replace(',', ' - ')
            .replace(',', ' - ')
            .replace(/^./, name[0].toUpperCase())}`,
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
                status: (item) => (
                  <td>
                    <CBadge
                      style={{
                        color: `${getBadgeColor(item.status)}`,
                        backgroundColor: `${getBadge(item.status)}`,
                      }}
                    >
                      {item.status}
                    </CBadge>
                  </td>
                ),
                'PR No.': (item) => (
                  <td>
                    <a
                      href={`https://github.com/ethereum/EIPs/pull/${item.Number}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <CBadge
                        style={{
                          color: `${getBadgeColor('Random')}`,
                          backgroundColor: `${getBadge('Random')}`,
                        }}
                      >
                        #{item.Number}
                      </CBadge>
                    </a>
                  </td>
                ),
                Author: (it) => (
                  <td>
                    <div className="flex">
                      {factorAuthor(it.Author).map((item, index) => {
                        let t = item[item.length - 1].substring(1, item[item.length - 1].length - 1)

                        return (
                          <CBadge
                            key={index}
                            className="mr-1"
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
                Number: (item) => (
                  <td>
                    <label className="relative cursor-pointer">
                      <div
                        className={`h-7
            shadow-2xl font-extrabold rounded-[8px] bg-[${getBadge(
              item.status,
            )}] text-[${getBadgeColor(
                          item.status,
                        )}] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer`}
                        style={{
                          color: `${getBadgeColor(item.status)}`,
                          backgroundColor: `${getBadge(item.status)}`,
                        }}
                      >
                        <Link
                          to={`/EIP-${item.Number}`}
                          className={`githubIcon h-7
            shadow-2xl font-extrabold rounded-[8px]  text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer`}
                          style={{
                            color: `${getBadgeColor(item.status)}`,
                            backgroundColor: `${getBadge(item.status)}`,
                          }}
                        >
                          {item.Number}*
                        </Link>
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
                  </td>
                ),
              }}
              onRowClick={(item) => {}}
              sorterValue={{ column: 'name', state: 'asc' }}
              tableHeadProps={{}}
              tableProps={{
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
          className="cardFooter bg-[#e7f5ff] text-[#1c7ed6]"
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <label style={{ color: '#1c7ed6', fontSize: '15px', fontWeight: 'bold' }}>
            *Click to see more
          </label>
          <label style={{ color: '#1c7ed6', fontSize: '10px' }}>{date}</label>
        </CCardFooter>
      </CCard>
    </>
  )
}
export default tableCurrent
