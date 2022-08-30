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

function statusStagnant(props) {
  const [info, setInfo] = useState()
  const [stagnantCore, setStagnantCore] = useState([])
  const [stagnantNetworking, setStagnantNetworking] = useState([])
  const [stagnantERC, setStagnantERC] = useState([])
  const [stagnantInterface, setStagnantInterface] = useState([])
  const [stagnantMeta, setStagnantMeta] = useState([])
  const [stagnantInformational, setStagnantInformational] = useState([])

  useEffect(() => {
    setInfo(JSON.parse(localStorage.getItem('count')))
    setStagnantCore(JSON.parse(localStorage.getItem('statusStagnantCore')))
    setStagnantNetworking(JSON.parse(localStorage.getItem('statusStagnantNetworking')))
    setStagnantERC(JSON.parse(localStorage.getItem('statusStagnantERC')))
    setStagnantInterface(JSON.parse(localStorage.getItem('statusStagnantInterface')))
    setStagnantMeta(JSON.parse(localStorage.getItem('statusStagnantMeta')))
    setStagnantInformational(JSON.parse(localStorage.getItem('statusStagnantInformational')))
  }, [])

  useEffect(() => {
    if (props.data !== undefined) {
      setInfo(props.data)
      setStagnantCore(props.data.filter(filterStagnantCore))
      localStorage.setItem('count', JSON.stringify(props.data))
      localStorage.setItem('statusStagnantCore', JSON.stringify(props.data.filter(filterStagnantCore)))
      localStorage.setItem('statusStagnantNetworking', JSON.stringify(props.data.filter(filterStagnantNetworking)))
      localStorage.setItem('statusStagnantERC', JSON.stringify(props.data.filter(filterStagnantERC)))
      localStorage.setItem('statusStagnantInterface', JSON.stringify(props.data.filter(filterStagnantInterface)))
      localStorage.setItem('statusStagnantMeta', JSON.stringify(props.data.filter(filterStagnantMeta)))
      localStorage.setItem('statusStagnantInformational', JSON.stringify(props.data.filter(filterStagnantInformational)))
    } else {
      localStorage.setItem('count', JSON.stringify(info))
      localStorage.setItem('statusStagnantCore', JSON.stringify(info.filter(filterStagnantCore)))
      localStorage.setItem('statusStagnantNetworking', JSON.stringify(info.filter(filterStagnantNetworking)))
      localStorage.setItem('statusStagnantERC', JSON.stringify(info.filter(filterStagnantERC)))
      localStorage.setItem('statusStagnantInterface', JSON.stringify(info.filter(filterStagnantInterface)))
      localStorage.setItem('statusStagnantMeta', JSON.stringify(info.filter(filterStagnantMeta)))
      localStorage.setItem('statusStagnantInformational', JSON.stringify(info.filter(filterStagnantInformational)))
    }
  }, [info])

  console.log(info)
  console.log(stagnantCore)
  console.log(stagnantInformational)

  function filterStagnantCore(item, index) {
    if (index >= 246 && item[1] === 'Stagnant' && item[5] === 'Core') {
      return true
    } else {
      return false
    }
  }
  function filterStagnantNetworking(item, index) {
    if (index >= 246 && item[1] === 'Stagnant' && item[5] === 'Networking') {
      return true
    } else {
      return false
    }
  }
  function filterStagnantInterface(item, index) {
    if (index >= 246 && item[1] === 'Stagnant' && item[5] === 'Interface') {
      return true
    } else {
      return false
    }
  }
  function filterStagnantERC(item, index) {
    if (index >= 246 && item[1] === 'Stagnant' && item[5] === 'ERC') {
      return true
    } else {
      return false
    }
  }
  function filterStagnantMeta(item, index) {
    if (index >= 246 && item[1] === 'Stagnant' && item[5] === 'Meta') {
      return true
    } else {
      return false
    }
  }
  function filterStagnantInformational(item, index) {
    if (index >= 246 && item[1] === 'Stagnant' && item[5] === 'Informational') {
      return true
    } else {
      return false
    }
  }

  return (
    <>
    {stagnantCore.length === 0 ? null : <><div
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
                      {stagnantCore !== undefined ? (
                          stagnantCore.map((item) => (
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
      
      {stagnantNetworking.length === 0 ? null : <><div
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
                      {stagnantNetworking !== undefined ? (
                          stagnantNetworking.map((item) => (
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
      
    {stagnantERC.length === 0 ? null : <><div
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
                      {stagnantERC !== undefined ? (
                          stagnantERC.map((item) => (
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
      
      {stagnantInterface.length === 0 ? null : <><div
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
                      {stagnantInterface !== undefined ? (
                          stagnantInterface.map((item) => (
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
      
      {stagnantMeta.length === 0 ? null : <><div
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
                      {stagnantMeta !== undefined ? (
                          stagnantMeta.map((item) => (
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
      
      {stagnantInformational.length === 0 ? null : <><div
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
                      {stagnantInformational !== undefined ? (
                          stagnantInformational.map((item) => (
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

export default statusStagnant
