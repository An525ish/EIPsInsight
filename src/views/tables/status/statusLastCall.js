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

function statusLastCall(props) {
  const [info, setInfo] = useState()
  const [lastCallCore, setLastCallCore] = useState([])
  const [lastCallNetworking, setLastCallNetworking] = useState([])
  const [lastCallERC, setLastCallERC] = useState([])
  const [lastCallInterface, setLastCallInterface] = useState([])
  const [lastCallMeta, setLastCallMeta] = useState([])
  const [lastCallInformational, setLastCallInformational] = useState([])

  useEffect(() => {
    setInfo(JSON.parse(localStorage.getItem('count')))
    setLastCallCore(JSON.parse(localStorage.getItem('statusLastCallCore')))
    setLastCallNetworking(JSON.parse(localStorage.getItem('statusLastCallNetworking')))
    setLastCallERC(JSON.parse(localStorage.getItem('statusLastCallERC')))
    setLastCallInterface(JSON.parse(localStorage.getItem('statusLastCallInterface')))
    setLastCallMeta(JSON.parse(localStorage.getItem('statusLastCallMeta')))
    setLastCallInformational(JSON.parse(localStorage.getItem('statusLastCallInformational')))
  }, [])

  useEffect(() => {
    if (props.data !== undefined) {
      setInfo(props.data)
      setLastCallCore(props.data.filter(filterLastCallCore))
      localStorage.setItem('count', JSON.stringify(props.data))
      localStorage.setItem('statusLastCallCore', JSON.stringify(props.data.filter(filterLastCallCore)))
      localStorage.setItem('statusLastCallNetworking', JSON.stringify(props.data.filter(filterLastCallNetworking)))
      localStorage.setItem('statusLastCallERC', JSON.stringify(props.data.filter(filterLastCallERC)))
      localStorage.setItem('statusLastCallInterface', JSON.stringify(props.data.filter(filterLastCallInterface)))
      localStorage.setItem('statusLastCallMeta', JSON.stringify(props.data.filter(filterLastCallMeta)))
      localStorage.setItem('statusLastCallInformational', JSON.stringify(props.data.filter(filterLastCallInformational)))
    } else {
      localStorage.setItem('count', JSON.stringify(info))
      localStorage.setItem('statusLastCallCore', JSON.stringify(info.filter(filterLastCallCore)))
      localStorage.setItem('statusLastCallNetworking', JSON.stringify(info.filter(filterLastCallNetworking)))
      localStorage.setItem('statusLastCallERC', JSON.stringify(info.filter(filterLastCallERC)))
      localStorage.setItem('statusLastCallInterface', JSON.stringify(info.filter(filterLastCallInterface)))
      localStorage.setItem('statusLastCallMeta', JSON.stringify(info.filter(filterLastCallMeta)))
      localStorage.setItem('statusLastCallInformational', JSON.stringify(info.filter(filterLastCallInformational)))
    }
  }, [info])

  console.log(info)
  console.log(lastCallCore)
  console.log(lastCallInformational)

  function filterLastCallCore(item, index) {
    if (index >= 246 && item[1] === 'Last Call' && item[5] === 'Core') {
      return true
    } else {
      return false
    }
  }
  function filterLastCallNetworking(item, index) {
    if (index >= 246 && item[1] === 'Last Call' && item[5] === 'Networking') {
      return true
    } else {
      return false
    }
  }
  function filterLastCallInterface(item, index) {
    if (index >= 246 && item[1] === 'Last Call' && item[5] === 'Interface') {
      return true
    } else {
      return false
    }
  }
  function filterLastCallERC(item, index) {
    if (index >= 246 && item[1] === 'Last Call' && item[5] === 'ERC') {
      return true
    } else {
      return false
    }
  }
  function filterLastCallMeta(item, index) {
    if (index >= 246 && item[1] === 'Last Call' && item[5] === 'Meta') {
      return true
    } else {
      return false
    }
  }
  function filterLastCallInformational(item, index) {
    if (index >= 246 && item[1] === 'Last Call' && item[5] === 'Informational') {
      return true
    } else {
      return false
    }
  }

  return (
    <>
    {lastCallCore.length === 0 ? null : <><div
              style={{
                  fontSize: '40px',
                  fontWeight: '800',
                  marginBottom: '10px'
              }}
          >
              Core
          </div><CTable>
                  <CTableHead color="dark">
                      <CTableRow>
                          <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Author</CTableHeaderCell>
                      </CTableRow>
                  </CTableHead>
                  <CTableBody>
                      {lastCallCore !== undefined ? (
                          lastCallCore.map((item) => (
                              <CTableRow>
                                  <CTableHeaderCell scope="row">
                                      {item[2] !== null ? parseInt(item[2]) : 1}
                                  </CTableHeaderCell>
                                  <CTableDataCell>{item[3] != null ? item[3] : 1}</CTableDataCell>
                                  <CTableDataCell>{item[4] !== null ? item[4] : 1}</CTableDataCell>
                              </CTableRow>
                          ))
                      ) : (
                          <CTableRow>
                              <CTableHeaderCell scope="row">1</CTableHeaderCell>
                              <CTableDataCell>Mark</CTableDataCell>
                              <CTableDataCell>Otto</CTableDataCell>
                          </CTableRow>
                      )}
                      {/* <CTableRow>
      <CTableHeaderCell scope="row">1</CTableHeaderCell>
      <CTableDataCell>Mark</CTableDataCell>
      <CTableDataCell>Otto</CTableDataCell>
    </CTableRow>
    <CTableRow>
      <CTableHeaderCell scope="row">2</CTableHeaderCell>
      <CTableDataCell>Jacob</CTableDataCell>
      <CTableDataCell>Thornton</CTableDataCell>
    </CTableRow>
    <CTableRow>
      <CTableHeaderCell scope="row">3</CTableHeaderCell>
      <CTableDataCell colSpan="2">Larry the Bird</CTableDataCell>
    </CTableRow> */}
                  </CTableBody>
              </CTable></>}
      
      {lastCallNetworking.length === 0 ? null : <><div
              style={{
                fontSize: '40px',
                  fontWeight: '800',
                  marginBottom: '10px'
              }}
          >
              Networking
          </div><CTable>
                  <CTableHead color="dark">
                      <CTableRow>
                          <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Author</CTableHeaderCell>
                      </CTableRow>
                  </CTableHead>
                  <CTableBody>
                      {lastCallNetworking !== undefined ? (
                          lastCallNetworking.map((item) => (
                              <CTableRow>
                                  <CTableHeaderCell scope="row">
                                      {item[2] !== null ? parseInt(item[2]) : 1}
                                  </CTableHeaderCell>
                                  <CTableDataCell>{item[3] != null ? item[3] : 1}</CTableDataCell>
                                  <CTableDataCell>{item[4] !== null ? item[4] : 1}</CTableDataCell>
                              </CTableRow>
                          ))
                      ) : (
                          <CTableRow>
                              <CTableHeaderCell scope="row">1</CTableHeaderCell>
                              <CTableDataCell>Mark</CTableDataCell>
                              <CTableDataCell>Otto</CTableDataCell>
                          </CTableRow>
                      )}
                      {/* <CTableRow>
      <CTableHeaderCell scope="row">1</CTableHeaderCell>
      <CTableDataCell>Mark</CTableDataCell>
      <CTableDataCell>Otto</CTableDataCell>
    </CTableRow>
    <CTableRow>
      <CTableHeaderCell scope="row">2</CTableHeaderCell>
      <CTableDataCell>Jacob</CTableDataCell>
      <CTableDataCell>Thornton</CTableDataCell>
    </CTableRow>
    <CTableRow>
      <CTableHeaderCell scope="row">3</CTableHeaderCell>
      <CTableDataCell colSpan="2">Larry the Bird</CTableDataCell>
    </CTableRow> */}
                  </CTableBody>
              </CTable></>}
      
    {lastCallERC.length === 0 ? null : <><div
              style={{
                fontSize: '40px',
                  fontWeight: '800',
                  marginBottom: '10px'
              }}
          >
              ERC
          </div><CTable>
                  <CTableHead color="dark">
                      <CTableRow>
                          <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Author</CTableHeaderCell>
                      </CTableRow>
                  </CTableHead>
                  <CTableBody>
                      {lastCallERC !== undefined ? (
                          lastCallERC.map((item) => (
                              <CTableRow>
                                  <CTableHeaderCell scope="row">
                                      {item[2] !== null ? parseInt(item[2]) : 1}
                                  </CTableHeaderCell>
                                  <CTableDataCell>{item[3] != null ? item[3] : 1}</CTableDataCell>
                                  <CTableDataCell>{item[4] !== null ? item[4] : 1}</CTableDataCell>
                              </CTableRow>
                          ))
                      ) : (
                          <CTableRow>
                              <CTableHeaderCell scope="row">1</CTableHeaderCell>
                              <CTableDataCell>Mark</CTableDataCell>
                              <CTableDataCell>Otto</CTableDataCell>
                          </CTableRow>
                      )}
                      {/* <CTableRow>
      <CTableHeaderCell scope="row">1</CTableHeaderCell>
      <CTableDataCell>Mark</CTableDataCell>
      <CTableDataCell>Otto</CTableDataCell>
    </CTableRow>
    <CTableRow>
      <CTableHeaderCell scope="row">2</CTableHeaderCell>
      <CTableDataCell>Jacob</CTableDataCell>
      <CTableDataCell>Thornton</CTableDataCell>
    </CTableRow>
    <CTableRow>
      <CTableHeaderCell scope="row">3</CTableHeaderCell>
      <CTableDataCell colSpan="2">Larry the Bird</CTableDataCell>
    </CTableRow> */}
                  </CTableBody>
              </CTable></>}
      
      {lastCallInterface.length === 0 ? null : <><div
              style={{
                fontSize: '40px',
                  fontWeight: '800',
                  marginBottom: '10px'
              }}
          >
              Interface
          </div><CTable>
                  <CTableHead color="dark">
                      <CTableRow>
                          <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Author</CTableHeaderCell>
                      </CTableRow>
                  </CTableHead>
                  <CTableBody>
                      {lastCallInterface !== undefined ? (
                          lastCallInterface.map((item) => (
                              <CTableRow>
                                  <CTableHeaderCell scope="row">
                                      {item[2] !== null ? parseInt(item[2]) : 1}
                                  </CTableHeaderCell>
                                  <CTableDataCell>{item[3] != null ? item[3] : 1}</CTableDataCell>
                                  <CTableDataCell>{item[4] !== null ? item[4] : 1}</CTableDataCell>
                              </CTableRow>
                          ))
                      ) : (
                          <CTableRow>
                              <CTableHeaderCell scope="row">1</CTableHeaderCell>
                              <CTableDataCell>Mark</CTableDataCell>
                              <CTableDataCell>Otto</CTableDataCell>
                          </CTableRow>
                      )}
                      {/* <CTableRow>
      <CTableHeaderCell scope="row">1</CTableHeaderCell>
      <CTableDataCell>Mark</CTableDataCell>
      <CTableDataCell>Otto</CTableDataCell>
    </CTableRow>
    <CTableRow>
      <CTableHeaderCell scope="row">2</CTableHeaderCell>
      <CTableDataCell>Jacob</CTableDataCell>
      <CTableDataCell>Thornton</CTableDataCell>
    </CTableRow>
    <CTableRow>
      <CTableHeaderCell scope="row">3</CTableHeaderCell>
      <CTableDataCell colSpan="2">Larry the Bird</CTableDataCell>
    </CTableRow> */}
                  </CTableBody>
              </CTable></>}
      
      {lastCallMeta.length === 0 ? null : <><div
              style={{
                fontSize: '40px',
                  fontWeight: '800',
                  marginBottom: '10px'
              }}
          >
              Meta
          </div><CTable>
                  <CTableHead color="dark">
                      <CTableRow>
                          <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Author</CTableHeaderCell>
                      </CTableRow>
                  </CTableHead>
                  <CTableBody>
                      {lastCallMeta !== undefined ? (
                          lastCallMeta.map((item) => (
                              <CTableRow>
                                  <CTableHeaderCell scope="row">
                                      {item[2] !== null ? parseInt(item[2]) : 1}
                                  </CTableHeaderCell>
                                  <CTableDataCell>{item[3] != null ? item[3] : 1}</CTableDataCell>
                                  <CTableDataCell>{item[4] !== null ? item[4] : 1}</CTableDataCell>
                              </CTableRow>
                          ))
                      ) : (
                          <CTableRow>
                              <CTableHeaderCell scope="row">1</CTableHeaderCell>
                              <CTableDataCell>Mark</CTableDataCell>
                              <CTableDataCell>Otto</CTableDataCell>
                          </CTableRow>
                      )}
                      {/* <CTableRow>
      <CTableHeaderCell scope="row">1</CTableHeaderCell>
      <CTableDataCell>Mark</CTableDataCell>
      <CTableDataCell>Otto</CTableDataCell>
    </CTableRow>
    <CTableRow>
      <CTableHeaderCell scope="row">2</CTableHeaderCell>
      <CTableDataCell>Jacob</CTableDataCell>
      <CTableDataCell>Thornton</CTableDataCell>
    </CTableRow>
    <CTableRow>
      <CTableHeaderCell scope="row">3</CTableHeaderCell>
      <CTableDataCell colSpan="2">Larry the Bird</CTableDataCell>
    </CTableRow> */}
                  </CTableBody>
              </CTable></>}
      
      {lastCallInformational.length === 0 ? null : <><div
              style={{
                fontSize: '40px',
                  fontWeight: '800',
                  marginBottom: '10px'
              }}
          >
              Informational
          </div><CTable>
                  <CTableHead color="dark">
                      <CTableRow>
                          <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Author</CTableHeaderCell>
                      </CTableRow>
                  </CTableHead>
                  <CTableBody>
                      {lastCallInformational !== undefined ? (
                          lastCallInformational.map((item) => (
                              <CTableRow>
                                  <CTableHeaderCell scope="row">
                                      {item[2] !== null ? parseInt(item[2]) : 1}
                                  </CTableHeaderCell>
                                  <CTableDataCell>{item[3] != null ? item[3] : 1}</CTableDataCell>
                                  <CTableDataCell>{item[4] !== null ? item[4] : 1}</CTableDataCell>
                              </CTableRow>
                          ))
                      ) : (
                          <CTableRow>
                              <CTableHeaderCell scope="row">1</CTableHeaderCell>
                              <CTableDataCell>Mark</CTableDataCell>
                              <CTableDataCell>Otto</CTableDataCell>
                          </CTableRow>
                      )}
                      {/* <CTableRow>
      <CTableHeaderCell scope="row">1</CTableHeaderCell>
      <CTableDataCell>Mark</CTableDataCell>
      <CTableDataCell>Otto</CTableDataCell>
    </CTableRow>
    <CTableRow>
      <CTableHeaderCell scope="row">2</CTableHeaderCell>
      <CTableDataCell>Jacob</CTableDataCell>
      <CTableDataCell>Thornton</CTableDataCell>
    </CTableRow>
    <CTableRow>
      <CTableHeaderCell scope="row">3</CTableHeaderCell>
      <CTableDataCell colSpan="2">Larry the Bird</CTableDataCell>
    </CTableRow> */}
                  </CTableBody>
              </CTable></>}
      
    </>
  )
}

export default statusLastCall
