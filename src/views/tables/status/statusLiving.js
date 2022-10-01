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

function statusLiving(props) {
  const [info, setInfo] = useState()
  const [livingCore, setLivingCore] = useState([])
  const [livingNetworking, setLivingNetworking] = useState([])
  const [livingERC, setLivingERC] = useState([])
  const [livingInterface, setLivingInterface] = useState([])
  const [livingMeta, setLivingMeta] = useState([])
  const [livingInformational, setLivingInformational] = useState([])

  useEffect(() => {
    setInfo(JSON.parse(localStorage.getItem('count')))
    setLivingCore(JSON.parse(localStorage.getItem('statusLivingCore')))
    setLivingNetworking(JSON.parse(localStorage.getItem('statusLivingNetworking')))
    setLivingERC(JSON.parse(localStorage.getItem('statusLivingERC')))
    setLivingInterface(JSON.parse(localStorage.getItem('statusLivingInterface')))
    setLivingMeta(JSON.parse(localStorage.getItem('statusLivingMeta')))
    setLivingInformational(JSON.parse(localStorage.getItem('statusLivingInformational')))
  }, [])

  useEffect(() => {
    if (props.data !== undefined) {
      setInfo(props.data)
      setLivingCore(props.data.filter(filterLivingCore))
      localStorage.setItem('count', JSON.stringify(props.data))
      localStorage.setItem('statusLivingCore', JSON.stringify(props.data.filter(filterLivingCore)))
      localStorage.setItem(
        'statusLivingNetworking',
        JSON.stringify(props.data.filter(filterLivingNetworking)),
      )
      localStorage.setItem('statusLivingERC', JSON.stringify(props.data.filter(filterLivingERC)))
      localStorage.setItem(
        'statusLivingInterface',
        JSON.stringify(props.data.filter(filterLivingInterface)),
      )
      localStorage.setItem('statusLivingMeta', JSON.stringify(props.data.filter(filterLivingMeta)))
      localStorage.setItem(
        'statusLivingInformational',
        JSON.stringify(props.data.filter(filterLivingInformational)),
      )
    } else {
      localStorage.setItem('count', JSON.stringify(info))
      localStorage.setItem('statusLivingCore', JSON.stringify(info.filter(filterLivingCore)))
      localStorage.setItem(
        'statusLivingNetworking',
        JSON.stringify(info.filter(filterLivingNetworking)),
      )
      localStorage.setItem('statusLivingERC', JSON.stringify(info.filter(filterLivingERC)))
      localStorage.setItem(
        'statusLivingInterface',
        JSON.stringify(info.filter(filterLivingInterface)),
      )
      localStorage.setItem('statusLivingMeta', JSON.stringify(info.filter(filterLivingMeta)))
      localStorage.setItem(
        'statusLivingInformational',
        JSON.stringify(info.filter(filterLivingInformational)),
      )
    }
  }, [info])

  function filterLivingCore(item, index) {
    if (index >= 246 && item[1] === 'Living' && item[5] === 'Core') {
      return true
    } else {
      return false
    }
  }
  function filterLivingNetworking(item, index) {
    if (index >= 246 && item[1] === 'Living' && item[5] === 'Networking') {
      return true
    } else {
      return false
    }
  }
  function filterLivingInterface(item, index) {
    if (index >= 246 && item[1] === 'Living' && item[5] === 'Interface') {
      return true
    } else {
      return false
    }
  }
  function filterLivingERC(item, index) {
    if (index >= 246 && item[1] === 'Living' && item[5] === 'ERC') {
      return true
    } else {
      return false
    }
  }
  function filterLivingMeta(item, index) {
    if (index >= 246 && item[1] === 'Living' && item[5] === 'Meta') {
      return true
    } else {
      return false
    }
  }
  function filterLivingInformational(item, index) {
    if (index >= 246 && item[1] === 'Living' && item[5] === 'Informational') {
      return true
    } else {
      return false
    }
  }

  return (
    <>
      {livingCore.length === 0 ? null : (
        <>
          <div
            style={{
              fontSize: '40px',
              fontWeight: '800',
              marginBottom: '10px',
            }}
          >
            Core
          </div>
          <CTable>
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                <CTableHeaderCell scope="col">Author</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {livingCore !== undefined ? (
                livingCore.map((item) => (
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
          </CTable>
        </>
      )}

      {livingNetworking.length === 0 ? null : (
        <>
          <div
            style={{
              fontSize: '40px',
              fontWeight: '800',
              marginBottom: '10px',
            }}
          >
            Networking
          </div>
          <CTable>
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                <CTableHeaderCell scope="col">Author</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {livingNetworking !== undefined ? (
                livingNetworking.map((item) => (
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
          </CTable>
        </>
      )}

      {livingERC.length === 0 ? null : (
        <>
          <div
            style={{
              fontSize: '40px',
              fontWeight: '800',
              marginBottom: '10px',
            }}
          >
            ERC
          </div>
          <CTable>
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                <CTableHeaderCell scope="col">Author</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {livingERC !== undefined ? (
                livingERC.map((item) => (
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
          </CTable>
        </>
      )}

      {livingInterface.length === 0 ? null : (
        <>
          <div
            style={{
              fontSize: '40px',
              fontWeight: '800',
              marginBottom: '10px',
            }}
          >
            Interface
          </div>
          <CTable>
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                <CTableHeaderCell scope="col">Author</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {livingInterface !== undefined ? (
                livingInterface.map((item) => (
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
          </CTable>
        </>
      )}

      {livingMeta.length === 0 ? null : (
        <>
          <div
            style={{
              fontSize: '40px',
              fontWeight: '800',
              marginBottom: '10px',
            }}
          >
            Meta
          </div>
          <CTable>
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                <CTableHeaderCell scope="col">Author</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {livingMeta !== undefined ? (
                livingMeta.map((item) => (
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
          </CTable>
        </>
      )}

      {livingInformational.length === 0 ? null : (
        <>
          <div
            style={{
              fontSize: '40px',
              fontWeight: '800',
              marginBottom: '10px',
            }}
          >
            Informational
          </div>
          <CTable>
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                <CTableHeaderCell scope="col">Author</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {livingInformational !== undefined ? (
                livingInformational.map((item) => (
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
          </CTable>
        </>
      )}
    </>
  )
}

export default statusLiving
