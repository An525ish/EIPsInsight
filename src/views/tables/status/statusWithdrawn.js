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

function statusWithdrawn(props) {
  const [info, setInfo] = useState()
  const [withdrawnCore, setWithdrawnCore] = useState([])
  const [withdrawnNetworking, setWithdrawnNetworking] = useState([])
  const [withdrawnERC, setWithdrawnERC] = useState([])
  const [withdrawnInterface, setWithdrawnInterface] = useState([])
  const [withdrawnMeta, setWithdrawnMeta] = useState([])
  const [withdrawnInformational, setWithdrawnInformational] = useState([])

  useEffect(() => {
    setInfo(JSON.parse(localStorage.getItem('count')))
    setWithdrawnCore(JSON.parse(localStorage.getItem('statusWithdrawnCore')))
    setWithdrawnNetworking(JSON.parse(localStorage.getItem('statusWithdrawnNetworking')))
    setWithdrawnERC(JSON.parse(localStorage.getItem('statusWithdrawnERC')))
    setWithdrawnInterface(JSON.parse(localStorage.getItem('statusWithdrawnInterface')))
    setWithdrawnMeta(JSON.parse(localStorage.getItem('statusWithdrawnMeta')))
    setWithdrawnInformational(JSON.parse(localStorage.getItem('statusWithdrawnInformational')))
  }, [])

  useEffect(() => {
    if (props.data !== undefined) {
      setInfo(props.data)
      setWithdrawnCore(props.data.filter(filterWithdrawnCore))
      localStorage.setItem('count', JSON.stringify(props.data))
      localStorage.setItem(
        'statusWithdrawnCore',
        JSON.stringify(props.data.filter(filterWithdrawnCore)),
      )
      localStorage.setItem(
        'statusWithdrawnNetworking',
        JSON.stringify(props.data.filter(filterWithdrawnNetworking)),
      )
      localStorage.setItem(
        'statusWithdrawnERC',
        JSON.stringify(props.data.filter(filterWithdrawnERC)),
      )
      localStorage.setItem(
        'statusWithdrawnInterface',
        JSON.stringify(props.data.filter(filterWithdrawnInterface)),
      )
      localStorage.setItem(
        'statusWithdrawnMeta',
        JSON.stringify(props.data.filter(filterWithdrawnMeta)),
      )
      localStorage.setItem(
        'statusWithdrawnInformational',
        JSON.stringify(props.data.filter(filterWithdrawnInformational)),
      )
    } else {
      localStorage.setItem('count', JSON.stringify(info))
      localStorage.setItem('statusWithdrawnCore', JSON.stringify(info.filter(filterWithdrawnCore)))
      localStorage.setItem(
        'statusWithdrawnNetworking',
        JSON.stringify(info.filter(filterWithdrawnNetworking)),
      )
      localStorage.setItem('statusWithdrawnERC', JSON.stringify(info.filter(filterWithdrawnERC)))
      localStorage.setItem(
        'statusWithdrawnInterface',
        JSON.stringify(info.filter(filterWithdrawnInterface)),
      )
      localStorage.setItem('statusWithdrawnMeta', JSON.stringify(info.filter(filterWithdrawnMeta)))
      localStorage.setItem(
        'statusWithdrawnInformational',
        JSON.stringify(info.filter(filterWithdrawnInformational)),
      )
    }
  }, [info])

  function filterWithdrawnCore(item, index) {
    if (index >= 246 && item[1] === 'Withdrawn' && item[5] === 'Core') {
      return true
    } else {
      return false
    }
  }
  function filterWithdrawnNetworking(item, index) {
    if (index >= 246 && item[1] === 'Withdrawn' && item[5] === 'Networking') {
      return true
    } else {
      return false
    }
  }
  function filterWithdrawnInterface(item, index) {
    if (index >= 246 && item[1] === 'Withdrawn' && item[5] === 'Interface') {
      return true
    } else {
      return false
    }
  }
  function filterWithdrawnERC(item, index) {
    if (index >= 246 && item[1] === 'Withdrawn' && item[5] === 'ERC') {
      return true
    } else {
      return false
    }
  }
  function filterWithdrawnMeta(item, index) {
    if (index >= 246 && item[1] === 'Withdrawn' && item[5] === 'Meta') {
      return true
    } else {
      return false
    }
  }
  function filterWithdrawnInformational(item, index) {
    if (index >= 246 && item[1] === 'Withdrawn' && item[5] === 'Informational') {
      return true
    } else {
      return false
    }
  }

  return (
    <>
      {withdrawnCore.length === 0 ? null : (
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
              {withdrawnCore !== undefined ? (
                withdrawnCore.map((item) => (
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

      {withdrawnNetworking.length === 0 ? null : (
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
              {withdrawnNetworking !== undefined ? (
                withdrawnNetworking.map((item) => (
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

      {withdrawnERC.length === 0 ? null : (
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
              {withdrawnERC !== undefined ? (
                withdrawnERC.map((item) => (
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

      {withdrawnInterface.length === 0 ? null : (
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
              {withdrawnInterface !== undefined ? (
                withdrawnInterface.map((item) => (
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

      {withdrawnMeta.length === 0 ? null : (
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
              {withdrawnMeta !== undefined ? (
                withdrawnMeta.map((item) => (
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

      {withdrawnInformational.length === 0 ? null : (
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
              {withdrawnInformational !== undefined ? (
                withdrawnInformational.map((item) => (
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

export default statusWithdrawn
