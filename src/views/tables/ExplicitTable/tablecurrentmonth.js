/* eslint-disable react-hooks/rules-of-hooks */
import { CBadge, CCard, CCardBody, CCardFooter, CSmartTable } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Loading from 'src/views/theme/loading/loading'

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
                width: '35%',
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
            {
              key: 'status',
              _style: { width: '10%', color: '#1c7ed6', backgroundColor: '#e7f5ff' },
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
                width: '50%',
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
            {
              key: 'status',
              _style: { width: '10%', color: '#1c7ed6', backgroundColor: '#e7f5ff' },
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
    let inc = 0
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
      ans.push(findEIPNum(filterData[0], 'Informational'))

      ans = ans.flat(Infinity)
      console.log({ ans })

      for (let i = 0; i < ans.length; i++) {
        let findEip = eips.filter((item) => item.data.eip === ans[i])
        console.log({ findEip })
        arr.push({
          id: inc++,
          Number: findEip[0].data.eip,
          Title: findEip[0].data.title,
          Type: findEip[0].data.type,
          status: findEip[0].data.status,
          Author: findEip[0].data.author,
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

  useEffect(() => {
    fetchCurrentMonthEIPs()
    setStatus(location.state.status)
    fetchDate()
    fetchAllEIPs()
  }, [])

  console.log({ status })

  return (
    <>
      <CCard>
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
