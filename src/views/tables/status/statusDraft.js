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

function statusDraft(props) {
  const [info, setInfo] = useState()
  const [draftCore, setDraftCore] = useState([])
  const [draftNetworking, setDraftNetworking] = useState([])
  const [draftERC, setDraftERC] = useState([])
  const [draftInterface, setDraftInterface] = useState([])
  const [draftMeta, setDraftMeta] = useState([])
  const [draftInformational, setDraftInformational] = useState([])

  useEffect(() => {
    setInfo(JSON.parse(localStorage.getItem('count')))
    setDraftCore(JSON.parse(localStorage.getItem('statusDraftCore')))
    setDraftNetworking(JSON.parse(localStorage.getItem('statusDraftNetworking')))
    setDraftERC(JSON.parse(localStorage.getItem('statusDraftERC')))
    setDraftInterface(JSON.parse(localStorage.getItem('statusDraftInterface')))
    setDraftMeta(JSON.parse(localStorage.getItem('statusDraftMeta')))
    setDraftInformational(JSON.parse(localStorage.getItem('statusDraftInformational')))
  }, [])

  useEffect(() => {
    if (props.data !== undefined) {
      setInfo(props.data)
      setDraftCore(props.data.filter(filterDraftCore))
      localStorage.setItem('count', JSON.stringify(props.data))
      localStorage.setItem('statusDraftCore', JSON.stringify(props.data.filter(filterDraftCore)))
      localStorage.setItem(
        'statusDraftNetworking',
        JSON.stringify(props.data.filter(filterDraftNetworking)),
      )
      localStorage.setItem('statusDraftERC', JSON.stringify(props.data.filter(filterDraftERC)))
      localStorage.setItem(
        'statusDraftInterface',
        JSON.stringify(props.data.filter(filterDraftInterface)),
      )
      localStorage.setItem('statusDraftMeta', JSON.stringify(props.data.filter(filterDraftMeta)))
      localStorage.setItem(
        'statusDraftInformational',
        JSON.stringify(props.data.filter(filterDraftInformational)),
      )
    } else {
      localStorage.setItem('count', JSON.stringify(info))
      localStorage.setItem('statusDraftCore', JSON.stringify(info.filter(filterDraftCore)))
      localStorage.setItem(
        'statusDraftNetworking',
        JSON.stringify(info.filter(filterDraftNetworking)),
      )
      localStorage.setItem('statusDraftERC', JSON.stringify(info.filter(filterDraftERC)))
      localStorage.setItem(
        'statusDraftInterface',
        JSON.stringify(info.filter(filterDraftInterface)),
      )
      localStorage.setItem('statusDraftMeta', JSON.stringify(info.filter(filterDraftMeta)))
      localStorage.setItem(
        'statusDraftInformational',
        JSON.stringify(info.filter(filterDraftInformational)),
      )
    }
  }, [info])

  function filterDraftCore(item, index) {
    if (index >= 246 && item[1] === 'Draft' && item[5] === 'Core') {
      return true
    } else {
      return false
    }
  }
  function filterDraftNetworking(item, index) {
    if (index >= 246 && item[1] === 'Draft' && item[5] === 'Networking') {
      return true
    } else {
      return false
    }
  }
  function filterDraftInterface(item, index) {
    if (index >= 246 && item[1] === 'Draft' && item[5] === 'Interface') {
      return true
    } else {
      return false
    }
  }
  function filterDraftERC(item, index) {
    if (index >= 246 && item[1] === 'Draft' && item[5] === 'ERC') {
      return true
    } else {
      return false
    }
  }
  function filterDraftMeta(item, index) {
    if (index >= 246 && item[1] === 'Draft' && item[5] === 'Meta') {
      return true
    } else {
      return false
    }
  }
  function filterDraftInformational(item, index) {
    if (index >= 246 && item[1] === 'Draft' && item[5] === 'Informational') {
      return true
    } else {
      return false
    }
  }

  return (
    <>
      {draftCore.length === 0 ? null : (
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
              {draftCore !== undefined ? (
                draftCore.map((item) => (
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

      {draftNetworking.length === 0 ? null : (
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
              {draftNetworking !== undefined ? (
                draftNetworking.map((item) => (
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

      {draftERC.length === 0 ? null : (
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
              {draftERC !== undefined ? (
                draftERC.map((item) => (
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

      {draftInterface.length === 0 ? null : (
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
              {draftInterface !== undefined ? (
                draftInterface.map((item) => (
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

      {draftMeta.length === 0 ? null : (
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
              {draftMeta !== undefined ? (
                draftMeta.map((item) => (
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

      {draftInformational.length === 0 ? null : (
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
              {draftInformational !== undefined ? (
                draftInformational.map((item) => (
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

export default statusDraft
