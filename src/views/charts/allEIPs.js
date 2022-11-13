import { CBadge, CCard, CCardBody, CCardFooter, CCardHeader, CSmartTable } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserAuth } from 'src/Context/AuthContext'
import Loading from '../theme/loading/loading'

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
      let inc = 0
      for (let i = 0; i < eips[0]['Final'].length; i++) {
        arr.push({
          id: inc++,
          Number: eips[0]['Final'][i].eip,
          Title: eips[0]['Final'][i].title,
          Type: eips[0]['Final'][i].type,
          Category:
            eips[0]['Final'][i].type === 'Standards Track'
              ? eips[0]['Final'][i].category
              : `Type - ${eips[0]['Final'][i].type}`,
          status: eips[0]['Final'][i].status,
          Author: eips[0]['Final'][i].author,
        })
      }
      for (let i = 0; i < eips[1]['Draft'].length; i++) {
        arr.push({
          id: inc++,
          Number: eips[1]['Draft'][i].eip,
          Title: eips[1]['Draft'][i].title,
          Type: eips[1]['Draft'][i].type,
          Category:
            eips[1]['Draft'][i].type === 'Standards Track'
              ? eips[1]['Draft'][i].category
              : `Type - ${eips[1]['Draft'][i].type}`,
          status: eips[1]['Draft'][i].status,
          Author: eips[1]['Draft'][i].author,
        })
      }
      for (let i = 0; i < eips[2]['Review'].length; i++) {
        arr.push({
          id: inc++,
          Number: eips[2]['Review'][i].eip,
          Title: eips[2]['Review'][i].title,
          Type: eips[2]['Review'][i].type,
          Category:
            eips[2]['Review'][i]?.type === 'Standards Track'
              ? eips[2]['Review'][i]?.category
              : `Type - ${eips[2]['Review'][i].type}`,
          status: eips[2]['Review'][i].status,
          Author: eips[2]['Review'][i].author,
        })
      }
      for (let i = 0; i < eips[3]['Last_Call'].length; i++) {
        arr.push({
          id: inc++,
          Number: eips[3]['Last_Call'][i].eip,
          Title: eips[3]['Last_Call'][i].title,
          Type: eips[3]['Last_Call'][i].type,
          Category:
            eips[3]['Last_Call'][i].type === 'Standards Track'
              ? eips[3]['Last_Call'][i].category
              : `Type - ${eips[3]['Last_Call'][i].type}`,
          status: eips[3]['Last_Call'][i].status,
          Author: eips[3]['Last_Call'][i].author,
        })
      }

      for (let i = 0; i < eips[4]['Stagnant'].length; i++) {
        arr.push({
          id: inc++,
          Number: eips[4]['Stagnant'][i].eip,
          Title: eips[4]['Stagnant'][i].title,
          Type: eips[4]['Stagnant'][i].type,
          Category:
            eips[4]['Stagnant'][i].type === 'Standards Track'
              ? eips[4]['Stagnant'][i].category
              : `Type - ${eips[4]['Stagnant'][i].type}`,
          status: eips[4]['Stagnant'][i].status,
          Author: eips[4]['Stagnant'][i].author,
        })
      }
      for (let i = 0; i < eips[5]['Withdrawn'].length; i++) {
        arr.push({
          id: inc++,
          Number: eips[5]['Withdrawn'][i].eip,
          Title: eips[5]['Withdrawn'][i].title,
          Type: eips[5]['Withdrawn'][i].type,
          Category:
            eips[5]['Withdrawn'][i].type === 'Standards Track'
              ? eips[5]['Withdrawn'][i].category
              : `Type - ${eips[5]['Withdrawn'][i].type}`,
          status: eips[5]['Withdrawn'][i].status,
          Author: eips[5]['Withdrawn'][i].author,
        })
      }
      for (let i = 0; i < eips[6]['Living'].length; i++) {
        arr.push({
          id: inc++,
          Number: eips[6]['Living'][i].eip,
          Title: eips[6]['Living'][i].title,
          Type: eips[6]['Living'][i].type,
          Category:
            eips[6]['Living'][i].type === 'Standards Track'
              ? eips[6]['Living'][i].category
              : `Type - ${eips[6]['Living'][i].type}`,
          status: eips[6]['Living'][i].status,
          Author: eips[6]['Living'][i].author,
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
      _style: { width: '10%', color: '#1c7ed6', backgroundColor: '#e7f5ff' },
      _props: { className: 'fw-semibold' },
      sorter: true,
    },
    {
      key: 'Title',
      _style: {
        width: '40%',
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
    { key: 'Category', _style: { width: '10%', color: '#1c7ed6' } },
    { key: 'status', _style: { width: '10%', color: '#1c7ed6', backgroundColor: '#e7f5ff' } },
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

  // header
  const header = (text) => {
    return (
      <CCardHeader
        className="cardHeader"
        style={{
          fontFamily: 'Roboto',
          fontWeight: '800',
          fontSize: '14px',
          color: `${getBadgeColor(text)}`,
          background: `${getBadge(text)}`,
          borderBottom: `2px solid ${getBadgeColor(text)}`,
        }}
      >
        {text} ({allEIPs})
      </CCardHeader>
    )
  }

  // date
  const fetchDate = () => {
    let date = new Date().toDateString()
    setDate(date)
  }

  useEffect(() => {
    fetchAllEIPs()
    fetchDate()
    fetchPost()
  }, [])
  return (
    <>
      <CCard style={{ border: '2px solid #a5d8ff' }}>
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
    shadow-2xl font-extrabold rounded-[8px] bg-[${getBadge(item.status)}] text-[${getBadgeColor(
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
          className="cardFooter bg-[#e7f5ff] text-[#1c7ed6] border-b-[#1c7ed6] border-b-[2px]"
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

export default AllEIPs
