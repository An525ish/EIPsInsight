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

function statusFinal(props) {
  const [info, setInfo] = useState()
  const [finalCore, setFinalCore] = useState([])
  const [finalNetworking, setFinalNetworking] = useState([])
  const [finalERC, setFinalERC] = useState([])
  const [finalInterface, setFinalInterface] = useState([])
  const [finalMeta, setFinalMeta] = useState([])
  const [finalInformational, setFinalInformational] = useState([])

  useEffect(() => {
    setInfo(JSON.parse(localStorage.getItem('count')))
    setFinalCore(JSON.parse(localStorage.getItem('statusFinalCore')))
    setFinalNetworking(JSON.parse(localStorage.getItem('statusFinalNetworking')))
    setFinalERC(JSON.parse(localStorage.getItem('statusFinalERC')))
    setFinalInterface(JSON.parse(localStorage.getItem('statusFinalInterface')))
    setFinalMeta(JSON.parse(localStorage.getItem('statusFinalMeta')))
    setFinalInformational(JSON.parse(localStorage.getItem('statusFinalInformational')))
  }, [])

  useEffect(() => {
    if (props.data !== undefined) {
      setInfo(props.data)
      setFinalCore(props.data.filter(filterFinalCore))
      localStorage.setItem('count', JSON.stringify(props.data))
      localStorage.setItem('statusFinalCore', JSON.stringify(props.data.filter(filterFinalCore)))
      localStorage.setItem('statusFinalNetworking', JSON.stringify(props.data.filter(filterFinalNetworking)))
      localStorage.setItem('statusFinalERC', JSON.stringify(props.data.filter(filterFinalERC)))
      localStorage.setItem('statusFinalInterface', JSON.stringify(props.data.filter(filterFinalInterface)))
      localStorage.setItem('statusFinalMeta', JSON.stringify(props.data.filter(filterFinalMeta)))
      localStorage.setItem('statusFinalInformational', JSON.stringify(props.data.filter(filterFinalInformational)))
    } else {
      localStorage.setItem('count', JSON.stringify(info))
      localStorage.setItem('statusFinalCore', JSON.stringify(info.filter(filterFinalCore)))
      localStorage.setItem('statusFinalNetworking', JSON.stringify(info.filter(filterFinalNetworking)))
      localStorage.setItem('statusFinalERC', JSON.stringify(info.filter(filterFinalERC)))
      localStorage.setItem('statusFinalInterface', JSON.stringify(info.filter(filterFinalInterface)))
      localStorage.setItem('statusFinalMeta', JSON.stringify(info.filter(filterFinalMeta)))
      localStorage.setItem('statusFinalInformational', JSON.stringify(info.filter(filterFinalInformational)))
    }
  }, [info])

  console.log(info)
  console.log(finalCore)
  console.log(finalInformational)

  function filterFinalCore(item, index) {
    if (index >= 246 && item[1] === 'Final' && item[5] === 'Core') {
      return true
    } else {
      return false
    }
  }
  function filterFinalNetworking(item, index) {
    if (index >= 246 && item[1] === 'Final' && item[5] === 'Networking') {
      return true
    } else {
      return false
    }
  }
  function filterFinalInterface(item, index) {
    if (index >= 246 && item[1] === 'Final' && item[5] === 'Interface') {
      return true
    } else {
      return false
    }
  }
  function filterFinalERC(item, index) {
    if (index >= 246 && item[1] === 'Final' && item[5] === 'ERC') {
      return true
    } else {
      return false
    }
  }
  function filterFinalMeta(item, index) {
    if (index >= 246 && item[1] === 'Final' && item[5] === 'Meta') {
      return true
    } else {
      return false
    }
  }
  function filterFinalInformational(item, index) {
    if (index >= 246 && item[1] === 'Final' && item[5] === 'Informational') {
      return true
    } else {
      return false
    }
  }

  return (
    <>
    {finalCore.length === 0 ? null : <><div
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
                      {finalCore !== undefined ? (
                          finalCore.map((item) => (
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
      
      {finalNetworking.length === 0 ? null : <><div
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
                      {finalNetworking !== undefined ? (
                          finalNetworking.map((item) => (
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
      
    {finalERC.length === 0 ? null : <><div
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
                      {finalERC !== undefined ? (
                          finalERC.map((item) => (
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
      
      {finalInterface.length === 0 ? null : <><div
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
                      {finalInterface !== undefined ? (
                          finalInterface.map((item) => (
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
      
      {finalMeta.length === 0 ? null : <><div
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
                      {finalMeta !== undefined ? (
                          finalMeta.map((item) => (
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
      
      {finalInformational.length === 0 ? null : <><div
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
                      {finalInformational !== undefined ? (
                          finalInformational.map((item) => (
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

export default statusFinal
