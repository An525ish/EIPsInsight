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
import { Link } from 'react-router-dom'

function statusAll(props) {
  const [post, getPost] = useState()
  const API = 'https://eipsinsight.com/statusPage'
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
          fontSize: '30px',
          fontWeight: '400',
          marginBottom: '00px',
        }}
      >
        <Link to="/draftStatusChart" style={{ textDecoration: 'none', color: 'inherit' }}>
          Draft{' '}
          <label
            style={{
              fontSize: '1.5rem',
              fontWeight: '800',
            }}
          >
            <Link to="/statusDraft" style={{ textDecoration: 'underline', color: 'inherit' }}>
              (
              {post === undefined
                ? 0
                : post['Draft']['Standards Track']['Core'] +
                  post['Draft']['Standards Track']['ERC'] +
                  post['Draft']['Standards Track']['Networking'] +
                  post['Draft']['Standards Track']['Interface'] +
                  post['Draft']['Meta'] +
                  post['Draft']['Informational']}
              )
            </Link>
          </label>
        </Link>
      </div>
      <CTable>
        <CTableHead color="dark">
          <CTableRow>
            <CTableHeaderCell scope="col">Type</CTableHeaderCell>
            <CTableHeaderCell scope="col">Category</CTableHeaderCell>
            <CTableHeaderCell scope="col">no. of EIPs</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableHeaderCell scope="row">Standard Track</CTableHeaderCell>
            <CTableDataCell>Core</CTableDataCell>
            <CTableDataCell>
              {post === undefined ? 0 : post['Draft']['Standards Track']['Core']}
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row"></CTableHeaderCell>
            <CTableDataCell>ERC</CTableDataCell>
            <CTableDataCell>
              {post === undefined ? 0 : post['Draft']['Standards Track']['ERC']}
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row"></CTableHeaderCell>
            <CTableDataCell>Networking</CTableDataCell>
            <CTableDataCell>
              {post === undefined ? 0 : post['Draft']['Standards Track']['Networking']}
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row"></CTableHeaderCell>
            <CTableDataCell>Interface</CTableDataCell>
            <CTableDataCell>
              {post === undefined ? 0 : post['Draft']['Standards Track']['Interface']}
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">Meta</CTableHeaderCell>
            <CTableDataCell></CTableDataCell>
            <CTableDataCell>{post === undefined ? 0 : post['Draft']['Meta']}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">Informational</CTableHeaderCell>
            <CTableDataCell></CTableDataCell>
            <CTableDataCell>
              {post === undefined ? 0 : post['Draft']['Informational']}
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>

      <div
        style={{
          fontSize: '30px',
          fontWeight: '400',
          marginBottom: '00px',
        }}
      >
        <Link to="/finalStatusChart" style={{ textDecoration: 'none', color: 'inherit' }}>
          Final{' '}
          <label
            style={{
              fontSize: '1.5rem',
              fontWeight: '800',
            }}
          >
            <Link to="/statusFinal" style={{ textDecoration: 'underline', color: 'inherit' }}>
              (
              {post === undefined
                ? 0
                : post['Final']['Standards Track']['Core'] +
                  post['Final']['Standards Track']['ERC'] +
                  post['Final']['Standards Track']['Networking'] +
                  post['Final']['Standards Track']['Interface'] +
                  post['Final']['Meta'] +
                  post['Final']['Informational']}
              )
            </Link>
          </label>
        </Link>
      </div>
      <CTable>
        <CTableHead color="dark">
          <CTableRow>
            <CTableHeaderCell scope="col">Type</CTableHeaderCell>
            <CTableHeaderCell scope="col">Category</CTableHeaderCell>
            <CTableHeaderCell scope="col">no. of EIPs</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableHeaderCell scope="row">Standard Track</CTableHeaderCell>
            <CTableDataCell>Core</CTableDataCell>
            <CTableDataCell>
              {post === undefined ? 0 : post['Final']['Standards Track']['Core']}
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row"></CTableHeaderCell>
            <CTableDataCell>ERC</CTableDataCell>
            <CTableDataCell>
              {post === undefined ? 0 : post['Final']['Standards Track']['ERC']}
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row"></CTableHeaderCell>
            <CTableDataCell>Networking</CTableDataCell>
            <CTableDataCell>
              {post === undefined ? 0 : post['Final']['Standards Track']['Networking']}
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row"></CTableHeaderCell>
            <CTableDataCell>Interface</CTableDataCell>
            <CTableDataCell>
              {post === undefined ? 0 : post['Final']['Standards Track']['Interface']}
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">Meta</CTableHeaderCell>
            <CTableDataCell></CTableDataCell>
            <CTableDataCell>{post === undefined ? 0 : post['Final']['Meta']}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">Informational</CTableHeaderCell>
            <CTableDataCell></CTableDataCell>
            <CTableDataCell>
              {post === undefined ? 0 : post['Final']['Informational']}
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>

      <div
        style={{
          fontSize: '30px',
          fontWeight: '400',
          marginBottom: '00px',
        }}
      >
        <Link to="/reviewStatusChart" style={{ textDecoration: 'none', color: 'inherit' }}>
          Review{' '}
          <label
            style={{
              fontSize: '1.5rem',
              fontWeight: '800',
            }}
          >
            <Link to="/statusReview" style={{ textDecoration: 'underline', color: 'inherit' }}>
              (
              {post === undefined
                ? 0
                : post['Review']['Standards Track']['Core'] +
                  post['Review']['Standards Track']['ERC'] +
                  post['Review']['Standards Track']['Networking'] +
                  post['Review']['Standards Track']['Interface'] +
                  post['Review']['Meta'] +
                  post['Review']['Informational']}
              )
            </Link>
          </label>
        </Link>
      </div>
      <CTable>
        <CTableHead color="dark">
          <CTableRow>
            <CTableHeaderCell scope="col">Type</CTableHeaderCell>
            <CTableHeaderCell scope="col">Category</CTableHeaderCell>
            <CTableHeaderCell scope="col">no. of EIPs</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableHeaderCell scope="row">Standard Track</CTableHeaderCell>
            <CTableDataCell>Core</CTableDataCell>
            <CTableDataCell>
              {post === undefined ? 0 : post['Review']['Standards Track']['Core']}
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row"></CTableHeaderCell>
            <CTableDataCell>ERC</CTableDataCell>
            <CTableDataCell>
              {post === undefined ? 0 : post['Review']['Standards Track']['ERC']}
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row"></CTableHeaderCell>
            <CTableDataCell>Networking</CTableDataCell>
            <CTableDataCell>
              {post === undefined ? 0 : post['Review']['Standards Track']['Networking']}
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row"></CTableHeaderCell>
            <CTableDataCell>Interface</CTableDataCell>
            <CTableDataCell>
              {post === undefined ? 0 : post['Review']['Standards Track']['Interface']}
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">Meta</CTableHeaderCell>
            <CTableDataCell></CTableDataCell>
            <CTableDataCell>{post === undefined ? 0 : post['Review']['Meta']}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">Informational</CTableHeaderCell>
            <CTableDataCell></CTableDataCell>
            <CTableDataCell>
              {post === undefined ? 0 : post['Review']['Informational']}
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>

      <div
        style={{
          fontSize: '30px',
          fontWeight: '400',
          marginBottom: '00px',
        }}
      >
        <Link to="/lastCallStatusChart" style={{ textDecoration: 'none', color: 'inherit' }}>
          Last Call{' '}
          <label
            style={{
              fontSize: '1.5rem',
              fontWeight: '800',
            }}
          >
            <Link to="/statusLastCall" style={{ textDecoration: 'underline', color: 'inherit' }}>
              (
              {post === undefined
                ? 0
                : post['Last Call']['Standards Track']['Core'] +
                  post['Last Call']['Standards Track']['ERC'] +
                  post['Last Call']['Standards Track']['Networking'] +
                  post['Last Call']['Standards Track']['Interface'] +
                  post['Last Call']['Meta'] +
                  post['Last Call']['Informational']}
              )
            </Link>
          </label>
        </Link>
      </div>
      <CTable>
        <CTableHead color="dark">
          <CTableRow>
            <CTableHeaderCell scope="col">Type</CTableHeaderCell>
            <CTableHeaderCell scope="col">Category</CTableHeaderCell>
            <CTableHeaderCell scope="col">no. of EIPs</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableHeaderCell scope="row">Standard Track</CTableHeaderCell>
            <CTableDataCell>Core</CTableDataCell>
            <CTableDataCell>
              {post === undefined ? 0 : post['Last Call']['Standards Track']['Core']}
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row"></CTableHeaderCell>
            <CTableDataCell>ERC</CTableDataCell>
            <CTableDataCell>
              {post === undefined ? 0 : post['Last Call']['Standards Track']['ERC']}
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row"></CTableHeaderCell>
            <CTableDataCell>Networking</CTableDataCell>
            <CTableDataCell>
              {post === undefined ? 0 : post['Last Call']['Standards Track']['Networking']}
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row"></CTableHeaderCell>
            <CTableDataCell>Interface</CTableDataCell>
            <CTableDataCell>
              {post === undefined ? 0 : post['Last Call']['Standards Track']['Interface']}
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">Meta</CTableHeaderCell>
            <CTableDataCell></CTableDataCell>
            <CTableDataCell>{post === undefined ? 0 : post['Last Call']['Meta']}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">Informational</CTableHeaderCell>
            <CTableDataCell></CTableDataCell>
            <CTableDataCell>
              {post === undefined ? 0 : post['Last Call']['Informational']}
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>

      <div
        style={{
          fontSize: '30px',
          fontWeight: '400',
          marginBottom: '00px',
        }}
      >
        <Link to="/stagnantStatusChart" style={{ textDecoration: 'none', color: 'inherit' }}>
          Stagnant{' '}
          <label
            style={{
              fontSize: '1.5rem',
              fontWeight: '800',
            }}
          >
            <Link to="/statusStagnant" style={{ textDecoration: 'underline', color: 'inherit' }}>
              (
              {post === undefined
                ? 0
                : post['Stagnant']['Standards Track']['Core'] +
                  post['Stagnant']['Standards Track']['ERC'] +
                  post['Stagnant']['Standards Track']['Networking'] +
                  post['Stagnant']['Standards Track']['Interface'] +
                  post['Stagnant']['Meta'] +
                  post['Stagnant']['Informational']}
              )
            </Link>
          </label>
        </Link>
      </div>
      <CTable>
        <CTableHead color="dark">
          <CTableRow>
            <CTableHeaderCell scope="col"></CTableHeaderCell>
            <CTableHeaderCell scope="col">Category</CTableHeaderCell>
            <CTableHeaderCell scope="col">no. of EIPs</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableHeaderCell scope="row">Standard Track</CTableHeaderCell>
            <CTableDataCell>Core</CTableDataCell>
            <CTableDataCell>
              {post === undefined ? 0 : post['Stagnant']['Standards Track']['Core']}
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row"></CTableHeaderCell>
            <CTableDataCell>ERC</CTableDataCell>
            <CTableDataCell>
              {post === undefined ? 0 : post['Stagnant']['Standards Track']['ERC']}
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row"></CTableHeaderCell>
            <CTableDataCell>Networking</CTableDataCell>
            <CTableDataCell>
              {post === undefined ? 0 : post['Stagnant']['Standards Track']['Networking']}
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row"></CTableHeaderCell>
            <CTableDataCell>Interface</CTableDataCell>
            <CTableDataCell>
              {post === undefined ? 0 : post['Stagnant']['Standards Track']['Interface']}
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">Meta</CTableHeaderCell>
            <CTableDataCell></CTableDataCell>
            <CTableDataCell>{post === undefined ? 0 : post['Stagnant']['Meta']}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">Informational</CTableHeaderCell>
            <CTableDataCell></CTableDataCell>
            <CTableDataCell>
              {post === undefined ? 0 : post['Stagnant']['Informational']}
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>

      <div
        style={{
          fontSize: '30px',
          fontWeight: '400',
          marginBottom: '00px',
        }}
      >
        <Link to="/withdrawnStatusChart" style={{ textDecoration: 'none', color: 'inherit' }}>
          Withdrawn{' '}
          <label
            style={{
              fontSize: '1.5rem',
              fontWeight: '800',
            }}
          >
            <Link to="/statusWithdrawn" style={{ textDecoration: 'underline', color: 'inherit' }}>
              (
              {post === undefined
                ? 0
                : post['Withdrawn']['Standards Track']['Core'] +
                  post['Withdrawn']['Standards Track']['ERC'] +
                  post['Withdrawn']['Standards Track']['Networking'] +
                  post['Withdrawn']['Standards Track']['Interface'] +
                  post['Withdrawn']['Meta'] +
                  post['Withdrawn']['Informational']}
              )
            </Link>
          </label>
        </Link>
      </div>
      <CTable>
        <CTableHead color="dark">
          <CTableRow>
            <CTableHeaderCell scope="col">Type</CTableHeaderCell>
            <CTableHeaderCell scope="col">Category</CTableHeaderCell>
            <CTableHeaderCell scope="col">no. of EIPs</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableHeaderCell scope="row">Standard Track</CTableHeaderCell>
            <CTableDataCell>Core</CTableDataCell>
            <CTableDataCell>
              {post === undefined ? 0 : post['Withdrawn']['Standards Track']['Core']}
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row"></CTableHeaderCell>
            <CTableDataCell>ERC</CTableDataCell>
            <CTableDataCell>
              {post === undefined ? 0 : post['Withdrawn']['Standards Track']['ERC']}
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row"></CTableHeaderCell>
            <CTableDataCell>Networking</CTableDataCell>
            <CTableDataCell>
              {post === undefined ? 0 : post['Withdrawn']['Standards Track']['Networking']}
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row"></CTableHeaderCell>
            <CTableDataCell>Interface</CTableDataCell>
            <CTableDataCell>
              {post === undefined ? 0 : post['Withdrawn']['Standards Track']['Interface']}
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">Meta</CTableHeaderCell>
            <CTableDataCell></CTableDataCell>
            <CTableDataCell>{post === undefined ? 0 : post['Withdrawn']['Meta']}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">Informational</CTableHeaderCell>
            <CTableDataCell></CTableDataCell>
            <CTableDataCell>
              {post === undefined ? 0 : post['Withdrawn']['Informational']}
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
      <div
        style={{
          fontSize: '30px',
          fontWeight: '400',
          marginBottom: '00px',
        }}
      >
        <Link to="/livingStatusChart" style={{ textDecoration: 'none', color: 'inherit' }}>
          Living{' '}
          <label
            style={{
              fontSize: '1.5rem',
              fontWeight: '800',
            }}
          >
            <Link to="/statusLiving" style={{ textDecoration: 'underline', color: 'inherit' }}>
              (
              {post === undefined
                ? 0
                : post['Living']['Standards Track']['Core'] +
                  post['Living']['Standards Track']['ERC'] +
                  post['Living']['Standards Track']['Networking'] +
                  post['Living']['Standards Track']['Interface'] +
                  post['Living']['Meta'] +
                  post['Living']['Informational']}
              )
            </Link>
          </label>
        </Link>
      </div>
      <CTable>
        <CTableHead color="dark">
          <CTableRow>
            <CTableHeaderCell scope="col">Type</CTableHeaderCell>
            <CTableHeaderCell scope="col">Category</CTableHeaderCell>
            <CTableHeaderCell scope="col">no. of EIPs</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableHeaderCell scope="row">Standard Track</CTableHeaderCell>
            <CTableDataCell>Core</CTableDataCell>
            <CTableDataCell>
              {post === undefined ? 0 : post['Living']['Standards Track']['Core']}
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row"></CTableHeaderCell>
            <CTableDataCell>ERC</CTableDataCell>
            <CTableDataCell>
              {post === undefined ? 0 : post['Living']['Standards Track']['ERC']}
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row"></CTableHeaderCell>
            <CTableDataCell>Networking</CTableDataCell>
            <CTableDataCell>
              {post === undefined ? 0 : post['Living']['Standards Track']['Networking']}
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row"></CTableHeaderCell>
            <CTableDataCell>Interface</CTableDataCell>
            <CTableDataCell>
              {post === undefined ? 0 : post['Living']['Standards Track']['Interface']}
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">Meta</CTableHeaderCell>
            <CTableDataCell></CTableDataCell>
            <CTableDataCell>{post === undefined ? 0 : post['Living']['Meta']}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">Informational</CTableHeaderCell>
            <CTableDataCell></CTableDataCell>
            <CTableDataCell>
              {post === undefined ? 0 : post['Living']['Informational']}
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </>
  )
}

export default statusAll
