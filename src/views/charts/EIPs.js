import { CCardBody } from '@coreui/react'
import {
  CCard,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ip } from 'src/constants'

const EIPs = () => {
  const params = useParams()
  const [data, setData] = useState()
  const [allData, setAllData] = useState()
  const fetchAllData = async () => {
    try {
      const res = await fetch(`${ip}/rawData`, {
        // method: 'GET',
        // headers: {
        //   Accept: 'application/json',
        //   'Content-Type': 'application',
        // },
        // credentials: 'include',
      })
      let datas = []
      datas = await res.json()
      console.log(datas)

      setData(datas)

      const filterData = datas.filter(function (e) {
        return e.data.eip === parseInt(params.id)
      })

      setAllData(filterData)
    } catch (err) {
      console.log({ err })
    }
  }

  useEffect(() => {
    fetchAllData()
  }, [])

  console.log(allData)

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
          borderLeft: `4px solid #339af0`,
          borderBottom: `2px solid #339af0`,
          marginTop: '2rem',
          display: 'inline-block',
          color: `#339af0`,
        }}
      >
        <label className="font-[900]">
          EIP-{allData === undefined ? 0 : allData[0]?.data?.eip}:
        </label>{' '}
        {allData === undefined ? 0 : allData[0]?.data?.title}
      </div>
      <CCard>
        <CCardBody
          style={{
            overflowX: 'auto',
            overflowY: 'auto',
            width: '100%',
            fontFamily: 'Roboto',
            fontSize: '15px',
            borderBottom: '2px solid #74c0fc',
          }}
        >
          <CTable align="middle" responsive bordered stripedColumns>
            <CTableBody>
              <CTableRow>
                <CTableDataCell className="bg-[#e9ecef] font-[900]">Author</CTableDataCell>
                <CTableDataCell>
                  {allData === undefined ? 0 : allData[0]?.data?.author}
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell className="bg-[#e9ecef] font-[900]">Status</CTableDataCell>
                <CTableDataCell className="bg-[#f1f3f5]">
                  {allData === undefined ? 0 : allData[0]?.data?.status}
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell className="bg-[#e9ecef] font-[900]">Type</CTableDataCell>
                <CTableDataCell>
                  {allData === undefined ? 0 : allData[0]?.data?.type}
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell className="bg-[#e9ecef] font-[900]">Created</CTableDataCell>
                <CTableDataCell className="bg-[#f1f3f5]">
                  {allData === undefined ? 0 : allData[0]?.data?.created.substring(0, 10)}
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default EIPs
