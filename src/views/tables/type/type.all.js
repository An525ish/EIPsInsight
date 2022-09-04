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

function typeAll() {
  const [post, getPost] = useState()
  const API = 'https://eipsinsight.com/api/typePage'
  const fetchPost = () => {
    fetch(API)
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        getPost(res)
      })
  }

  useEffect(() => {
    fetchPost()
  }, [])

  console.log(post)

  return (
    <>
      <div
        style={{
          fontSize: '2rem',
          fontWeight: '400',
          marginBottom: '10px',
        }}
      >
        Standard Track{' '}
        <label
          style={{
            fontSize: '1.5rem',
            fontWeight: '800',
          }}
        >
          (
          {post === undefined
            ? 0
            : post['Standards Track']['Core'] +
              post['Standards Track']['ERC'] +
              post['Standards Track']['Networking'] +
              post['Standards Track']['Interface']}
          )
        </label>
      </div>
      <CTable align="middle" responsive>
        <CTableHead color="dark">
          <CTableRow>
            <CTableHeaderCell scope="col" style={{ width: '369px' }}>
              Number
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" style={{ width: '477px' }}>
              Category
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">no. of EIPs</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableHeaderCell scope="row">1</CTableHeaderCell>
            <CTableDataCell>Core</CTableDataCell>
            <CTableDataCell>
              {post !== undefined ? post['Standards Track']['Core'] : 0}
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">2</CTableHeaderCell>
            <CTableDataCell>Networking</CTableDataCell>
            <CTableDataCell align="middle">
              {post !== undefined ? post['Standards Track']['Networking'] : 0}
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">3</CTableHeaderCell>
            <CTableDataCell>Interface</CTableDataCell>
            <CTableDataCell>
              {post !== undefined ? post['Standards Track']['Interface'] : 0}
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">4</CTableHeaderCell>
            <CTableDataCell>ERC</CTableDataCell>
            <CTableDataCell>
              {post !== undefined ? post['Standards Track']['ERC'] : 0}
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>

      <div
        style={{
          fontSize: '30px',
          fontWeight: '400',
          marginBottom: '10px',
        }}
      >
        Meta{' '}
        <label
          style={{
            fontSize: '1.5rem',
            fontWeight: '800',
          }}
        >
          ({post === undefined ? 0 : post['Meta']})
        </label>
      </div>
      <CTable responsive align="middle">
        <CTableHead color="dark">
          <CTableRow>
            <CTableHeaderCell scope="col" style={{ width: '369px' }}>
              Number
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" style={{ width: '477px' }}>
              Type
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">no. of EIPs</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableHeaderCell scope="row">1</CTableHeaderCell>
            <CTableDataCell align="middle">Meta</CTableDataCell>
            <CTableDataCell align="middle">{post !== undefined ? post['Meta'] : 0}</CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
      <div
        style={{
          fontSize: '30px',
          fontWeight: '400',
          marginBottom: '10px',
        }}
      >
        Informational{' '}
        <label
          style={{
            fontSize: '1.5rem',
            fontWeight: '800',
          }}
        >
          ({post === undefined ? 0 : post['Informational']})
        </label>
      </div>
      <CTable>
        <CTableHead color="dark">
          <CTableRow>
            <CTableHeaderCell scope="col" style={{ width: '369px' }}>
              Number
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" style={{ width: '477px' }}>
              Type
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">no. of EIPs</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableHeaderCell scope="row">1</CTableHeaderCell>
            <CTableDataCell align="middle">Informational</CTableDataCell>
            <CTableDataCell align="middle">
              {post !== undefined ? post['Informational'] : 0}
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </>
  )
}

export default typeAll
