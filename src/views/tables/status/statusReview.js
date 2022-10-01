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

function statusReview(props) {
  const [info, setInfo] = useState()
  const [reviewCore, setReviewCore] = useState([])
  const [reviewNetworking, setReviewNetworking] = useState([])
  const [reviewERC, setReviewERC] = useState([])
  const [reviewInterface, setReviewInterface] = useState([])
  const [reviewMeta, setReviewMeta] = useState([])
  const [reviewInformational, setReviewInformational] = useState([])

  useEffect(() => {
    setInfo(JSON.parse(localStorage.getItem('count')))
    setReviewCore(JSON.parse(localStorage.getItem('statusReviewCore')))
    setReviewNetworking(JSON.parse(localStorage.getItem('statusReviewNetworking')))
    setReviewERC(JSON.parse(localStorage.getItem('statusReviewERC')))
    setReviewInterface(JSON.parse(localStorage.getItem('statusReviewInterface')))
    setReviewMeta(JSON.parse(localStorage.getItem('statusReviewMeta')))
    setReviewInformational(JSON.parse(localStorage.getItem('statusReviewInformational')))
  }, [])

  useEffect(() => {
    if (props.data !== undefined) {
      setInfo(props.data)
      setReviewCore(props.data.filter(filterReviewCore))
      localStorage.setItem('count', JSON.stringify(props.data))
      localStorage.setItem('statusReviewCore', JSON.stringify(props.data.filter(filterReviewCore)))
      localStorage.setItem(
        'statusReviewNetworking',
        JSON.stringify(props.data.filter(filterReviewNetworking)),
      )
      localStorage.setItem('statusReviewERC', JSON.stringify(props.data.filter(filterReviewERC)))
      localStorage.setItem(
        'statusReviewInterface',
        JSON.stringify(props.data.filter(filterReviewInterface)),
      )
      localStorage.setItem('statusReviewMeta', JSON.stringify(props.data.filter(filterReviewMeta)))
      localStorage.setItem(
        'statusReviewInformational',
        JSON.stringify(props.data.filter(filterReviewInformational)),
      )
    } else {
      localStorage.setItem('count', JSON.stringify(info))
      localStorage.setItem('statusReviewCore', JSON.stringify(info.filter(filterReviewCore)))
      localStorage.setItem(
        'statusReviewNetworking',
        JSON.stringify(info.filter(filterReviewNetworking)),
      )
      localStorage.setItem('statusReviewERC', JSON.stringify(info.filter(filterReviewERC)))
      localStorage.setItem(
        'statusReviewInterface',
        JSON.stringify(info.filter(filterReviewInterface)),
      )
      localStorage.setItem('statusReviewMeta', JSON.stringify(info.filter(filterReviewMeta)))
      localStorage.setItem(
        'statusReviewInformational',
        JSON.stringify(info.filter(filterReviewInformational)),
      )
    }
  }, [info])

  function filterReviewCore(item, index) {
    if (index >= 246 && item[1] === 'Review' && item[5] === 'Core') {
      return true
    } else {
      return false
    }
  }
  function filterReviewNetworking(item, index) {
    if (index >= 246 && item[1] === 'Review' && item[5] === 'Networking') {
      return true
    } else {
      return false
    }
  }
  function filterReviewInterface(item, index) {
    if (index >= 246 && item[1] === 'Review' && item[5] === 'Interface') {
      return true
    } else {
      return false
    }
  }
  function filterReviewERC(item, index) {
    if (index >= 246 && item[1] === 'Review' && item[5] === 'ERC') {
      return true
    } else {
      return false
    }
  }
  function filterReviewMeta(item, index) {
    if (index >= 246 && item[1] === 'Review' && item[5] === 'Meta') {
      return true
    } else {
      return false
    }
  }
  function filterReviewInformational(item, index) {
    if (index >= 246 && item[1] === 'Review' && item[5] === 'Informational') {
      return true
    } else {
      return false
    }
  }

  return (
    <>
      {reviewCore.length === 0 ? null : (
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
              {reviewCore !== undefined ? (
                reviewCore.map((item) => (
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

      {reviewNetworking.length === 0 ? null : (
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
              {reviewNetworking !== undefined ? (
                reviewNetworking.map((item) => (
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

      {reviewERC.length === 0 ? null : (
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
              {reviewERC !== undefined ? (
                reviewERC.map((item) => (
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

      {reviewInterface.length === 0 ? null : (
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
              {reviewInterface !== undefined ? (
                reviewInterface.map((item) => (
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

      {reviewMeta.length === 0 ? null : (
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
              {reviewMeta !== undefined ? (
                reviewMeta.map((item) => (
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

      {reviewInformational.length === 0 ? null : (
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
              {reviewInformational !== undefined ? (
                reviewInformational.map((item) => (
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

export default statusReview
