/* eslint-disable react-hooks/rules-of-hooks */
import { CBadge, CCard, CCardBody, CCardFooter, CSmartTable } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function table() {
  const location = useLocation()
  const [type, setType] = useState()
  const [status, setStatus] = useState()
  const [category, setCategory] = useState()
  const [eips, setEips] = useState()
  const [month, setMonth] = useState()
  const [year, setYear] = useState()
  const [date, setDate] = useState()
  const API2 = 'https://eipsinsight.com/api/allinfo'

  const fetchAllEIPs = () => {
    fetch(API2)
      .then((res) => res.json())
      .then((res) => {
        setEips(res)
      })
  }
  const columns = [
    {
      key: 'Number',
      _style: { width: '10%', color: '#1c7ed6', backgroundColor: '#e7f5ff' },
      _props: { className: 'fw-semibold' },
      sorter: true,
    },
    {
      key: 'Title',
      _style: {
        width: '50%',
        color: '#1c7ed6',
      },
    },
    {
      key: 'Author',
      _style: {
        width: '20%',
        color: '#1c7ed6',
        backgroundColor: '#e7f5ff',
      },
    },
    { key: 'Type', _style: { width: '10%', color: '#1c7ed6' } },
    { key: 'status', _style: { width: '10%', color: '#1c7ed6', backgroundColor: '#e7f5ff' } },
  ]
  const getBadge = (status) => {
    switch (status) {
      case 'Final':
        return '#c3fae8'
      case 'Last_Call':
        return '#d3f9d8'
      case 'Draft':
        return '#fff3bf'
      case 'Stagnant':
        return '#ffe8cc'
      case 'Withdrawn':
        return '#ffe3e3'
      case 'Review':
        return '#d0ebff'
      default:
        return '#c5f6fa'
    }
  }
  const getBadgeColor = (status) => {
    switch (status) {
      case 'Final':
        return '#0ca678'
      case 'Last_Call':
        return '#37b24d'
      case 'Draft':
        return '#f08c00'
      case 'Stagnant':
        return '#e8590c'
      case 'Withdrawn':
        return '#e03131'
      case 'Review':
        return '#1971c2'
      default:
        return '#0c8599'
    }
  }
  const eipData = (eips, status, type) => {
    let arr = []
    if (eips[0] !== undefined) {
      let inc = 0
      for (let i = 0; i < eips[0]['Final'].length; i++) {
        if (eips[0]['Final'][i].status === status && eips[0]['Final'][i].type === type) {
          arr.push({
            id: inc++,
            Number: eips[0]['Final'][i].eip,
            Title: eips[0]['Final'][i].title,
            Type: eips[0]['Final'][i].type,
            status: eips[0]['Final'][i].status,
            Author: eips[0]['Final'][i].author,
          })
        }
      }
      for (let i = 0; i < eips[1]['Draft'].length; i++) {
        if (eips[1]['Draft'][i].status === status && eips[1]['Draft'][i].type === type) {
          arr.push({
            id: inc++,
            Number: eips[1]['Draft'][i].eip,
            Title: eips[1]['Draft'][i].title,
            Type: eips[1]['Draft'][i].type,
            status: eips[1]['Draft'][i].status,
            Author: eips[1]['Draft'][i].author,
          })
        }
      }
      for (let i = 0; i < eips[2]['Review'].length; i++) {
        if (eips[2]['Review'][i].status === status && eips[2]['Review'][i].type === type) {
          arr.push({
            id: inc++,
            Number: eips[2]['Review'][i].eip,
            Title: eips[2]['Review'][i].title,
            Type: eips[2]['Review'][i].type,
            status: eips[2]['Review'][i].status,
            Author: eips[2]['Review'][i].author,
          })
        }
      }
      for (let i = 0; i < eips[3]['Last_Call'].length; i++) {
        if (eips[3]['Last_Call'][i].status === status && eips[3]['Last_Call'][i].type === type) {
          arr.push({
            id: inc++,
            Number: eips[3]['Last_Call'][i].eip,
            Title: eips[3]['Last_Call'][i].title,
            Type: eips[3]['Last_Call'][i].type,
            status: eips[3]['Last_Call'][i].status,
            Author: eips[3]['Last_Call'][i].author,
          })
        }
      }

      for (let i = 0; i < eips[4]['Stagnant'].length; i++) {
        if (eips[4]['Stagnant'][i].status === status && eips[4]['Stagnant'][i].type === type) {
          arr.push({
            id: inc++,
            Number: eips[4]['Stagnant'][i].eip,
            Title: eips[4]['Stagnant'][i].title,
            Type: eips[4]['Stagnant'][i].type,
            status: eips[4]['Stagnant'][i].status,
            Author: eips[4]['Stagnant'][i].author,
          })
        }
      }
      for (let i = 0; i < eips[5]['Withdrawn'].length; i++) {
        if (eips[5]['Withdrawn'][i].status === status && eips[5]['Withdrawn'][i].type === type) {
          arr.push({
            id: inc++,
            Number: eips[5]['Withdrawn'][i].eip,
            Title: eips[5]['Withdrawn'][i].title,
            Type: eips[5]['Withdrawn'][i].type,
            status: eips[5]['Withdrawn'][i].status,
            Author: eips[5]['Withdrawn'][i].author,
          })
        }
      }
      for (let i = 0; i < eips[6]['Living'].length; i++) {
        if (eips[6]['Living'][i].status === status && eips[6]['Living'][i].type === type) {
          arr.push({
            id: inc++,
            Number: eips[6]['Living'][i].eip,
            Title: eips[6]['Living'][i].title,
            Type: eips[6]['Living'][i].type,
            status: eips[6]['Living'][i].status,
            Author: eips[6]['Living'][i].author,
          })
        }
      }
      arr.sort((a, b) => (a.Number > b.Number ? 1 : -1))
    }
    return arr
  }
  const eipDataCategory = (eips, type, status, category) => {
    let arr = []
    if (eips[0] !== undefined) {
      let inc = 0
      for (let i = 0; i < eips[0]['Final'].length; i++) {
        if (
          eips[0]['Final'][i].status === status &&
          eips[0]['Final'][i].type === type &&
          eips[0]['Final'][i].category === category
        ) {
          arr.push({
            id: inc++,
            Number: eips[0]['Final'][i].eip,
            Title: eips[0]['Final'][i].title,
            Type: eips[0]['Final'][i].type,
            status: eips[0]['Final'][i].status,
            Author: eips[0]['Final'][i].author,
          })
        }
      }
      for (let i = 0; i < eips[1]['Draft'].length; i++) {
        if (
          eips[1]['Draft'][i].status === status &&
          eips[1]['Draft'][i].type === type &&
          eips[1]['Draft'][i].category === category
        ) {
          arr.push({
            id: inc++,
            Number: eips[1]['Draft'][i].eip,
            Title: eips[1]['Draft'][i].title,
            Type: eips[1]['Draft'][i].type,
            status: eips[1]['Draft'][i].status,
            Author: eips[1]['Draft'][i].author,
          })
        }
      }
      for (let i = 0; i < eips[2]['Review'].length; i++) {
        if (
          eips[2]['Review'][i].status === status &&
          eips[2]['Review'][i].type === type &&
          eips[2]['Review'][i].category === category
        ) {
          arr.push({
            id: inc++,
            Number: eips[2]['Review'][i].eip,
            Title: eips[2]['Review'][i].title,
            Type: eips[2]['Review'][i].type,
            status: eips[2]['Review'][i].status,
            Author: eips[2]['Review'][i].author,
          })
        }
      }
      for (let i = 0; i < eips[3]['Last_Call'].length; i++) {
        if (
          eips[3]['Last_Call'][i].status === status &&
          eips[3]['Last_Call'][i].type === type &&
          eips[3]['Last_Call'][i].category === category
        ) {
          arr.push({
            id: inc++,
            Number: eips[3]['Last_Call'][i].eip,
            Title: eips[3]['Last_Call'][i].title,
            Type: eips[3]['Last_Call'][i].type,
            status: eips[3]['Last_Call'][i].status,
            Author: eips[3]['Last_Call'][i].author,
          })
        }
      }

      for (let i = 0; i < eips[4]['Stagnant'].length; i++) {
        if (
          eips[4]['Stagnant'][i].status === status &&
          eips[4]['Stagnant'][i].type === type &&
          eips[4]['Stagnant'][i].category === category
        ) {
          arr.push({
            id: inc++,
            Number: eips[4]['Stagnant'][i].eip,
            Title: eips[4]['Stagnant'][i].title,
            Type: eips[4]['Stagnant'][i].type,
            status: eips[4]['Stagnant'][i].status,
            Author: eips[4]['Stagnant'][i].author,
          })
        }
      }
      for (let i = 0; i < eips[5]['Withdrawn'].length; i++) {
        if (
          eips[5]['Withdrawn'][i].status === status &&
          eips[5]['Withdrawn'][i].type === type &&
          eips[5]['Withdrawn'][i].category === category
        ) {
          arr.push({
            id: inc++,
            Number: eips[5]['Withdrawn'][i].eip,
            Title: eips[5]['Withdrawn'][i].title,
            Type: eips[5]['Withdrawn'][i].type,
            status: eips[5]['Withdrawn'][i].status,
            Author: eips[5]['Withdrawn'][i].author,
          })
        }
      }
      for (let i = 0; i < eips[6]['Living'].length; i++) {
        if (
          eips[6]['Living'][i].status === status &&
          eips[6]['Living'][i].type === type &&
          eips[6]['Living'][i].category === category
        ) {
          arr.push({
            id: inc++,
            Number: eips[6]['Living'][i].eip,
            Title: eips[6]['Living'][i].title,
            Type: eips[6]['Living'][i].type,
            status: eips[6]['Living'][i].status,
            Author: eips[6]['Living'][i].author,
          })
        }
      }
      arr.sort((a, b) => (a.Number > b.Number ? 1 : -1))
    }
    return arr
  }
  const eipDataStatus = (eips, status) => {
    let arr = []
    if (eips[0] !== undefined) {
      let inc = 0
      for (let i = 0; i < eips[0]['Final'].length; i++) {
        if (eips[0]['Final'][i].status === status) {
          arr.push({
            id: inc++,
            Number: eips[0]['Final'][i].eip,
            Title: eips[0]['Final'][i].title,
            Type: eips[0]['Final'][i].type,
            status: eips[0]['Final'][i].status,
            Author: eips[0]['Final'][i].author,
          })
        }
      }
      for (let i = 0; i < eips[1]['Draft'].length; i++) {
        if (eips[1]['Draft'][i].status === status) {
          arr.push({
            id: inc++,
            Number: eips[1]['Draft'][i].eip,
            Title: eips[1]['Draft'][i].title,
            Type: eips[1]['Draft'][i].type,
            status: eips[1]['Draft'][i].status,
            Author: eips[1]['Draft'][i].author,
          })
        }
      }
      for (let i = 0; i < eips[2]['Review'].length; i++) {
        if (eips[2]['Review'][i].status === status) {
          arr.push({
            id: inc++,
            Number: eips[2]['Review'][i].eip,
            Title: eips[2]['Review'][i].title,
            Type: eips[2]['Review'][i].type,
            status: eips[2]['Review'][i].status,
            Author: eips[2]['Review'][i].author,
          })
        }
      }
      for (let i = 0; i < eips[3]['Last_Call'].length; i++) {
        if (eips[3]['Last_Call'][i].status === status) {
          arr.push({
            id: inc++,
            Number: eips[3]['Last_Call'][i].eip,
            Title: eips[3]['Last_Call'][i].title,
            Type: eips[3]['Last_Call'][i].type,
            status: eips[3]['Last_Call'][i].status,
            Author: eips[3]['Last_Call'][i].author,
          })
        }
      }

      for (let i = 0; i < eips[4]['Stagnant'].length; i++) {
        if (eips[4]['Stagnant'][i].status === status) {
          arr.push({
            id: inc++,
            Number: eips[4]['Stagnant'][i].eip,
            Title: eips[4]['Stagnant'][i].title,
            Type: eips[4]['Stagnant'][i].type,
            status: eips[4]['Stagnant'][i].status,
            Author: eips[4]['Stagnant'][i].author,
          })
        }
      }
      for (let i = 0; i < eips[5]['Withdrawn'].length; i++) {
        if (eips[5]['Withdrawn'][i].status === status) {
          arr.push({
            id: inc++,
            Number: eips[5]['Withdrawn'][i].eip,
            Title: eips[5]['Withdrawn'][i].title,
            Type: eips[5]['Withdrawn'][i].type,
            status: eips[5]['Withdrawn'][i].status,
            Author: eips[5]['Withdrawn'][i].author,
          })
        }
      }
      for (let i = 0; i < eips[6]['Living'].length; i++) {
        if (eips[6]['Living'][i].status === status) {
          arr.push({
            id: inc++,
            Number: eips[6]['Living'][i].eip,
            Title: eips[6]['Living'][i].title,
            Type: eips[6]['Living'][i].type,
            status: eips[6]['Living'][i].status,
            Author: eips[6]['Living'][i].author,
          })
        }
      }
      arr.sort((a, b) => (a.Number > b.Number ? 1 : -1))
    }
    return arr
  }
  const eipDataStatusExtra = (eips, status, month, year) => {
    let arr = []
    if (eips[0] !== undefined) {
      let inc = 0
      for (let i = 0; i < eips[0]['Final'].length; i++) {
        if (
          eips[0]['Final'][i].status === status &&
          eips[0]['Final'][i].created.substring(0, 4) === year &&
          parseInt(eips[0]['Final'][i].created.substring(5, 7)) === parseInt(month)
        ) {
          arr.push({
            id: inc++,
            Number: eips[0]['Final'][i].eip,
            Title: eips[0]['Final'][i].title,
            Type: eips[0]['Final'][i].type,
            status: eips[0]['Final'][i].status,
            Author: eips[0]['Final'][i].author,
          })
        }
      }
      for (let i = 0; i < eips[1]['Draft'].length; i++) {
        if (
          eips[1]['Draft'][i].status === status &&
          eips[1]['Draft'][i].created.substring(0, 4) === year &&
          parseInt(eips[1]['Draft'][i].created.substring(5, 7)) === parseInt(month)
        ) {
          arr.push({
            id: inc++,
            Number: eips[1]['Draft'][i].eip,
            Title: eips[1]['Draft'][i].title,
            Type: eips[1]['Draft'][i].type,
            status: eips[1]['Draft'][i].status,
            Author: eips[1]['Draft'][i].author,
          })
        }
      }
      for (let i = 0; i < eips[2]['Review'].length; i++) {
        if (
          eips[2]['Review'][i].status === status &&
          eips[2]['Review'][i].created.substring(0, 4) === year &&
          parseInt(eips[2]['Review'][i].created.substring(5, 7)) === parseInt(month)
        ) {
          arr.push({
            id: inc++,
            Number: eips[2]['Review'][i].eip,
            Title: eips[2]['Review'][i].title,
            Type: eips[2]['Review'][i].type,
            status: eips[2]['Review'][i].status,
            Author: eips[2]['Review'][i].author,
          })
        }
      }
      for (let i = 0; i < eips[3]['Last_Call'].length; i++) {
        if (
          eips[3]['Last_Call'][i].status === status &&
          eips[3]['Last_Call'][i].created.substring(0, 4) === year &&
          parseInt(eips[3]['Last_Call'][i].created.substring(5, 7)) === parseInt(month)
        ) {
          arr.push({
            id: inc++,
            Number: eips[3]['Last_Call'][i].eip,
            Title: eips[3]['Last_Call'][i].title,
            Type: eips[3]['Last_Call'][i].type,
            status: eips[3]['Last_Call'][i].status,
            Author: eips[3]['Last_Call'][i].author,
          })
        }
      }

      for (let i = 0; i < eips[4]['Stagnant'].length; i++) {
        if (
          eips[4]['Stagnant'][i].status === status &&
          eips[4]['Stagnant'][i].created.substring(0, 4) === year &&
          parseInt(eips[4]['Stagnant'][i].created.substring(5, 7)) === parseInt(month)
        ) {
          arr.push({
            id: inc++,
            Number: eips[4]['Stagnant'][i].eip,
            Title: eips[4]['Stagnant'][i].title,
            Type: eips[4]['Stagnant'][i].type,
            status: eips[4]['Stagnant'][i].status,
            Author: eips[4]['Stagnant'][i].author,
          })
        }
      }
      for (let i = 0; i < eips[5]['Withdrawn'].length; i++) {
        if (
          eips[5]['Withdrawn'][i].status === status &&
          eips[5]['Withdrawn'][i].created.substring(0, 4) === year &&
          parseInt(eips[5]['Withdrawn'][i].created.substring(5, 7)) === parseInt(month)
        ) {
          arr.push({
            id: inc++,
            Number: eips[5]['Withdrawn'][i].eip,
            Title: eips[5]['Withdrawn'][i].title,
            Type: eips[5]['Withdrawn'][i].type,
            status: eips[5]['Withdrawn'][i].status,
            Author: eips[5]['Withdrawn'][i].author,
          })
        }
      }
      for (let i = 0; i < eips[6]['Living'].length; i++) {
        if (
          eips[6]['Living'][i].status === status &&
          eips[6]['Living'][i].created.substring(0, 4) === year &&
          parseInt(eips[6]['Living'][i].created.substring(5, 7)) === parseInt(month)
        ) {
          arr.push({
            id: inc++,
            Number: eips[6]['Living'][i].eip,
            Title: eips[6]['Living'][i].title,
            Type: eips[6]['Living'][i].type,
            status: eips[6]['Living'][i].status,
            Author: eips[6]['Living'][i].author,
          })
        }
      }
      arr.sort((a, b) => (a.Number > b.Number ? 1 : -1))
    }
    return arr
  }
  const eipDataCategoryType = (eips, type, category) => {
    let arr = []
    if (eips[0] !== undefined) {
      let inc = 0
      for (let i = 0; i < eips[0]['Final'].length; i++) {
        if (eips[0]['Final'][i].type === type && eips[0]['Final'][i].category === category) {
          arr.push({
            id: inc++,
            Number: eips[0]['Final'][i].eip,
            Title: eips[0]['Final'][i].title,
            Type: eips[0]['Final'][i].type,
            status: eips[0]['Final'][i].status,
            Author: eips[0]['Final'][i].author,
          })
        }
      }
      for (let i = 0; i < eips[1]['Draft'].length; i++) {
        if (eips[1]['Draft'][i].type === type && eips[1]['Draft'][i].category === category) {
          arr.push({
            id: inc++,
            Number: eips[1]['Draft'][i].eip,
            Title: eips[1]['Draft'][i].title,
            Type: eips[1]['Draft'][i].type,
            status: eips[1]['Draft'][i].status,
            Author: eips[1]['Draft'][i].author,
          })
        }
      }
      for (let i = 0; i < eips[2]['Review'].length; i++) {
        if (eips[2]['Review'][i].type === type && eips[2]['Review'][i].category === category) {
          arr.push({
            id: inc++,
            Number: eips[2]['Review'][i].eip,
            Title: eips[2]['Review'][i].title,
            Type: eips[2]['Review'][i].type,
            status: eips[2]['Review'][i].status,
            Author: eips[2]['Review'][i].author,
          })
        }
      }
      for (let i = 0; i < eips[3]['Last_Call'].length; i++) {
        if (
          eips[3]['Last_Call'][i].type === type &&
          eips[3]['Last_Call'][i].category === category
        ) {
          arr.push({
            id: inc++,
            Number: eips[3]['Last_Call'][i].eip,
            Title: eips[3]['Last_Call'][i].title,
            Type: eips[3]['Last_Call'][i].type,
            status: eips[3]['Last_Call'][i].status,
            Author: eips[3]['Last_Call'][i].author,
          })
        }
      }

      for (let i = 0; i < eips[4]['Stagnant'].length; i++) {
        if (eips[4]['Stagnant'][i].type === type && eips[4]['Stagnant'][i].category === category) {
          arr.push({
            id: inc++,
            Number: eips[4]['Stagnant'][i].eip,
            Title: eips[4]['Stagnant'][i].title,
            Type: eips[4]['Stagnant'][i].type,
            status: eips[4]['Stagnant'][i].status,
            Author: eips[4]['Stagnant'][i].author,
          })
        }
      }
      for (let i = 0; i < eips[5]['Withdrawn'].length; i++) {
        if (
          eips[5]['Withdrawn'][i].type === type &&
          eips[5]['Withdrawn'][i].category === category
        ) {
          arr.push({
            id: inc++,
            Number: eips[5]['Withdrawn'][i].eip,
            Title: eips[5]['Withdrawn'][i].title,
            Type: eips[5]['Withdrawn'][i].type,
            status: eips[5]['Withdrawn'][i].status,
            Author: eips[5]['Withdrawn'][i].author,
          })
        }
      }
      for (let i = 0; i < eips[6]['Living'].length; i++) {
        if (eips[6]['Living'][i].type === type && eips[6]['Living'][i].category === category) {
          arr.push({
            id: inc++,
            Number: eips[6]['Living'][i].eip,
            Title: eips[6]['Living'][i].title,
            Type: eips[6]['Living'][i].type,
            status: eips[6]['Living'][i].status,
            Author: eips[6]['Living'][i].author,
          })
        }
      }
      arr.sort((a, b) => (a.Number > b.Number ? 1 : -1))
    }
    return arr
  }
  const eipDataMain = (eips, type) => {
    let arr = []
    if (eips[0] !== undefined) {
      let inc = 0
      for (let i = 0; i < eips[0]['Final'].length; i++) {
        if (eips[0]['Final'][i].type === type) {
          arr.push({
            id: inc++,
            Number: eips[0]['Final'][i].eip,
            Title: eips[0]['Final'][i].title,
            Type: eips[0]['Final'][i].type,
            status: eips[0]['Final'][i].status,
            Author: eips[0]['Final'][i].author,
          })
        }
      }
      for (let i = 0; i < eips[1]['Draft'].length; i++) {
        if (eips[1]['Draft'][i].type === type) {
          arr.push({
            id: inc++,
            Number: eips[1]['Draft'][i].eip,
            Title: eips[1]['Draft'][i].title,
            Type: eips[1]['Draft'][i].type,
            status: eips[1]['Draft'][i].status,
            Author: eips[1]['Draft'][i].author,
          })
        }
      }
      for (let i = 0; i < eips[2]['Review'].length; i++) {
        if (eips[2]['Review'][i].type === type) {
          arr.push({
            id: inc++,
            Number: eips[2]['Review'][i].eip,
            Title: eips[2]['Review'][i].title,
            Type: eips[2]['Review'][i].type,
            status: eips[2]['Review'][i].status,
            Author: eips[2]['Review'][i].author,
          })
        }
      }
      for (let i = 0; i < eips[3]['Last_Call'].length; i++) {
        if (eips[3]['Last_Call'][i].type === type) {
          arr.push({
            id: inc++,
            Number: eips[3]['Last_Call'][i].eip,
            Title: eips[3]['Last_Call'][i].title,
            Type: eips[3]['Last_Call'][i].type,
            status: eips[3]['Last_Call'][i].status,
            Author: eips[3]['Last_Call'][i].author,
          })
        }
      }

      for (let i = 0; i < eips[4]['Stagnant'].length; i++) {
        if (eips[4]['Stagnant'][i].type === type) {
          arr.push({
            id: inc++,
            Number: eips[4]['Stagnant'][i].eip,
            Title: eips[4]['Stagnant'][i].title,
            Type: eips[4]['Stagnant'][i].type,
            status: eips[4]['Stagnant'][i].status,
            Author: eips[4]['Stagnant'][i].author,
          })
        }
      }
      for (let i = 0; i < eips[5]['Withdrawn'].length; i++) {
        if (eips[5]['Withdrawn'][i].type === type) {
          arr.push({
            id: inc++,
            Number: eips[5]['Withdrawn'][i].eip,
            Title: eips[5]['Withdrawn'][i].title,
            Type: eips[5]['Withdrawn'][i].type,
            status: eips[5]['Withdrawn'][i].status,
            Author: eips[5]['Withdrawn'][i].author,
          })
        }
      }
      for (let i = 0; i < eips[6]['Living'].length; i++) {
        if (eips[6]['Living'][i].type === type) {
          arr.push({
            id: inc++,
            Number: eips[6]['Living'][i].eip,
            Title: eips[6]['Living'][i].title,
            Type: eips[6]['Living'][i].type,
            status: eips[6]['Living'][i].status,
            Author: eips[6]['Living'][i].author,
          })
        }
      }
      arr.sort((a, b) => (a.Number > b.Number ? 1 : -1))
    }
    return arr
  }

  const fetchDate = () => {
    let date = new Date().toDateString()
    setDate(date)
  }

  useEffect(() => {
    fetchAllEIPs()
    setType(location.state.type)
    setCategory(location.state.category)
    setStatus(location.state.status)
    setMonth(location.state.month)
    setYear(location.state.year)
    fetchDate()
  }, [])

  return (
    <>
      <CCard>
        <CCardBody
          style={{
            overflowX: 'auto',
            overflowY: 'auto',

            fontFamily: 'Roboto',
            fontSize: '15px',
          }}
          className="scrollbarDesign"
        >
          <CSmartTable
            items={
              month === undefined && year === undefined
                ? category === '' && status === ''
                  ? eipDataMain(eips === undefined ? [] : eips, type === undefined ? '' : type)
                  : category === '' && type === ''
                  ? eipDataStatus(
                      eips === undefined ? [] : eips,
                      status === undefined ? '' : status,
                    )
                  : category === ''
                  ? eipData(
                      eips === undefined ? [] : eips,
                      status === undefined ? '' : status,
                      type === undefined ? '' : type,
                    )
                  : status === ''
                  ? eipDataCategoryType(
                      eips === undefined ? [] : eips,
                      type === undefined ? '' : type,
                      category === undefined ? '' : category,
                    )
                  : eipDataCategory(
                      eips === undefined ? [] : eips,
                      type === undefined ? '' : type,
                      status === undefined ? '' : status,
                      category === undefined ? '' : category,
                    )
                : category === '' && type === ''
                ? eipDataStatusExtra(
                    eips === undefined ? [] : eips,
                    status === undefined ? '' : status,
                    month === undefined ? '' : month,
                    year === undefined ? '' : year,
                  )
                : null
            }
            activePage={1}
            clickableRows
            columns={columns}
            columnFilter
            columnSorter
            itemsPerPage={15}
            pagination
            scopedColumns={{
              status: (item) => (
                <td>
                  <CBadge
                    style={{
                      color: `${getBadgeColor(item.status)}`,
                      backgroundColor: `${getBadge(item.status)}`,
                    }}
                  >
                    {item.status}
                  </CBadge>
                </td>
              ),
              Number: (item) => (
                <td>
                  <label className="relative cursor-pointer">
                    <div
                      className={`h-7
            shadow-2xl font-extrabold rounded-[8px] bg-[${getBadge(
              item.status,
            )}] text-[${getBadgeColor(
                        item.status,
                      )}] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer`}
                      style={{
                        color: `${getBadgeColor(item.status)}`,
                        backgroundColor: `${getBadge(item.status)}`,
                      }}
                    >
                      <Link
                        to={`/EIPs/${item.Number}`}
                        className={`githubIcon h-7
            shadow-2xl font-extrabold rounded-[8px]  text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer`}
                        style={{
                          color: `${getBadgeColor(item.status)}`,
                          backgroundColor: `${getBadge(item.status)}`,
                        }}
                      >
                        {item.Number}*
                      </Link>
                    </div>
                    <div
                      className={`absolute top-0 right-0 -mr-1 -mt-0 w-2 h-2 rounded-full bg-[${getBadgeColor(
                        item.status,
                      )}] animate-ping`}
                      style={{
                        backgroundColor: `${getBadgeColor(item.status)}`,
                      }}
                    ></div>
                    <div
                      className={`absolute top-0 right-0 -mr-1 -mt-0 w-2 h-2 rounded-full bg-[${getBadgeColor(
                        item.status,
                      )}]`}
                      style={{
                        backgroundColor: `${getBadgeColor(item.status)}`,
                      }}
                    ></div>
                  </label>
                </td>
              ),
            }}
            onRowClick={(item) => {}}
            sorterValue={{ column: 'name', state: 'asc' }}
            tableHeadProps={{}}
            tableProps={{
              striped: true,
              hover: true,
              responsive: true,
            }}
          />
        </CCardBody>
        <CCardFooter
          className="cardFooter bg-[#e7f5ff] text-[#1c7ed6]"
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <label style={{ color: '#1c7ed6', fontSize: '15px', fontWeight: 'bold' }}>
            *Click to see more
          </label>
          <label style={{ color: '#1c7ed6', fontSize: '10px' }}>{date}</label>
        </CCardFooter>
      </CCard>
    </>
  )
}
export default table
