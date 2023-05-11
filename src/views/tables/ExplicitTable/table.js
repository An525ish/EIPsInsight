/* eslint-disable react-hooks/rules-of-hooks */
import { CBadge, CCard, CCardBody, CCardFooter, CCardHeader, CSmartTable } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { CSVLink } from 'react-csv'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import downloadIcon from 'src/assets/download.png'
import { ip } from 'src/constants'
const statusArr = ['Final', 'Draft', 'Review', 'Last_Call', 'Stagnant', 'Withdrawn', 'Living']

function table() {
  const location = useLocation()
  const [type, setType] = useState()
  const [status, setStatus] = useState()
  const [category, setCategory] = useState()
  const [eips, setEips] = useState()
  const [month, setMonth] = useState()
  const [year, setYear] = useState()
  const [date, setDate] = useState()
  const [name, setName] = useState()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchColumn = (status) => {
    const columns =
      status === 'Last_Call' || status === 'Last Call'
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
                width: '9%',
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
                width: '10%',
                color: `${getBadgeColor(status)}`,
              },
            },
            {
              key: 'Draft Date',
              _style: {
                width: '11%',
                color: `${getBadgeColor(status)}`,
              },
            },

            { key: 'Type', _style: { width: '8%', color: `${getBadgeColor(status)}` } },
            {
              key: 'Category',
              _style: {
                width: '10%',
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
                width: '12%',
                color: `${getBadgeColor(status)}`,
              },
            },
            // {
            //   key: 'PR No.',

            //   _style: { width: '5%', color: `${getBadgeColor(status)}` },
            // },
          ]
        : status === 'Final'
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
                width: '8%',
                color: `${getBadgeColor(status)}`,
              },
              _props: { className: 'fw-semibold' },
              sorter: true,
            },
            {
              key: 'Title',
              _style: {
                width: '25%',
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
              key: 'Draft Date',
              _style: {
                width: '10%',
                color: `${getBadgeColor(status)}`,
              },
            },
            {
              key: 'Final Date',
              _style: {
                width: '10%',
                color: `${getBadgeColor(status)}`,
              },
            },

            { key: 'Type', _style: { width: '10%', color: `${getBadgeColor(status)}` } },
            {
              key: 'Category',
              _style: {
                width: '10%',
                color: `${getBadgeColor(status)}`,
              },
            },
            {
              key: 'status',
              _style: { width: '7%', color: `${getBadgeColor(status)}` },
            },
            // {
            //   key: 'PR No.',

            //   _style: {
            //     width: '5%',
            //     color: `${getBadgeColor(status)}`,
            //   },
            // },
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
                width: '8%',
                color: `${getBadgeColor(status)}`,
              },
              _props: { className: 'fw-semibold' },
              sorter: true,
            },
            {
              key: 'Title',
              _style: {
                width: '25%',
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
              key: 'Draft Date',
              _style: {
                width: '10%',
                color: `${getBadgeColor(status)}`,
              },
            },

            { key: 'Type', _style: { width: '10%', color: `${getBadgeColor(status)}` } },
            {
              key: 'Category',
              _style: {
                width: '10%',
                color: `${getBadgeColor(status)}`,
              },
            },
            {
              key: 'status',
              _style: { width: '7%', color: `${getBadgeColor(status)}` },
            },
            // {
            //   key: 'PR No.',

            //   _style: {
            //     width: '5%',
            //     color: `${getBadgeColor(status)}`,
            //   },
            // },
          ]

    return columns
  }
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

  function getLastCallDate(eipId) {
    if (eips === undefined) return 'N/A'
    for (let i = 0; i < eips.length; i++) {
      if (eips[i].eip === parseInt(eipId)) {
        return eips[i]['last-call-deadline'].substring(0, 10)
      }
    }
    return 'N/A'
  }

  console.log(data)
  const eipData = (data) => {
    let arr = []

    if (data !== undefined) {
      let inc = 1
      for (let i = 0; i < data.length; i++) {
        if (data[i].status === 'Final') {
          arr.push({
            id: inc++,
            Number: data[i].eip.split('.md')[0].split('-')[1],
            Title: data[i].title,
            Type: data[i].type,
            Category:
              data[i].type === 'Standards Track' ? data[i].category : `Type - ${data[i].type}`,
            'Final Date': data[i].merge_date === undefined ? data[i].date : data[i].merge_date,
            'Draft Date': data[i].created,
            status: data[i].status,
            Author: data[i].author,
            'PR No.': data[i].pull,
          })
        } else if (data[i].status === 'Last Call') {
          arr.push({
            id: inc++,
            Number: data[i].eip.split('.md')[0].split('-')[1],
            Title: data[i].title,
            Type: data[i].type,
            Category:
              data[i].type === 'Standards Track' ? data[i].category : `Type - ${data[i].type}`,
            'Draft Date': data[i].created,
            'Last-Call Deadline':
              getLastCallDate(data[i].eip.split('.md')[0].split('-')[1]) !== 'N/A'
                ? getLastCallDate(data[i].eip.split('.md')[0].split('-')[1])
                : data[i].merge_date === undefined
                ? data[i].date
                : data[i].merge_date,
            status: data[i].status,
            Author: data[i].author,
            'PR No.': data[i].pull,
          })
        } else {
          arr.push({
            id: inc++,
            Number: data[i].eip.split('.md')[0].split('-')[1],
            Title: data[i].title,
            Type: data[i].type,
            Category:
              data[i].type === 'Standards Track' ? data[i].category : `Type - ${data[i].type}`,
            'Draft Date': data[i].created,
            status: data[i].status,
            Author: data[i].author,
            'PR No.': data[i].pull,
          })
        }
      }

      // arr.sort((a, b) => (a.Number > b.Number ? 1 : -1))
    }

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
      label: 'Draft Date',
      key: 'Draft Date',
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
    data: eipData(data),
  }

  const factorAuthor = (data) => {
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

  // headers
  const header = (text, status) => {
    return (
      <CCardHeader
        className="cardHeader flex justify-between items-center"
        style={{
          fontFamily: 'Roboto',
          fontWeight: '800',
          fontSize: '16px',
          color: `${getBadgeColor(status)}`,
          backgroundColor: 'white',
          borderBottom: `2px solid ${getBadgeColor(status)}`,
        }}
      >
        <div className="tracking-wider">{text}</div>

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
    setData(location.state.data)
    setStatus(location.state.status)
    setName(location.state.name)
    setEips(location.state.eips)
    fetchDate()
  }, [])

  return (
    <>
      <CCard className="card-container">
        {header(
          `${name
            ?.split('_')
            .toString()
            .replace(',', ' ')
            .replace(',', ' - ')
            .replace(',', ' - ')
            .replace(/^./, name[0].toUpperCase())}`, // regex for making upper case
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
          <CSmartTable
            items={eipData(data)}
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
                              item[item.length - 1].substring(item[item.length - 1].length - 1) ===
                              '>'
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
                      <div>{item['PR No.'] === 0 ? `#` + item.Number : item['PR No.']}</div>
                    </CBadge>
                  </a>
                </td>
              ),
            }}
            // onRowClick={(item) => {
            //
            //   navigate('/EIP-' + item.Number)
            // }}
            sorterValue={{ column: 'name', state: 'asc' }}
            tableHeadProps={{}}
            tableProps={{
              // borderless: true,
              // striped: true,
              hover: true,
              responsive: true,
            }}
          />
        </CCardBody>
        <CCardFooter
          className="cardFooter"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            color: `${getBadgeColor(status)}`,
            backgroundColor: 'white',
          }}
        >
          <label style={{ color: '#1c7ed6', fontSize: '15px', fontWeight: 'bold' }}></label>
          <label
            style={{ fontSize: '10px', fontWeight: 'bold', color: `${getBadgeColor(status)}` }}
            className="tracking-wider"
          >
            {date}
          </label>
        </CCardFooter>
      </CCard>
    </>
  )
}
export default table
