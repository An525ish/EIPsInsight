/* eslint-disable react-hooks/rules-of-hooks */
import { CBadge, CCard, CCardBody, CCardFooter, CCardHeader, CSmartTable } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { CSVLink } from 'react-csv'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import downloadIcon from 'src/assets/download.png'

function table() {
  const location = useLocation()
  const [type, setType] = useState()
  const [status, setStatus] = useState()
  const [category, setCategory] = useState()
  const [eips, setEips] = useState()
  const [month, setMonth] = useState()
  const [year, setYear] = useState()
  const [date, setDate] = useState()
  const [name, setName] = useState()
  const [data, setData] = useState()
  const navigate = useNavigate()
  const API2 = 'https://eipsinsight.com/api/allinfo'

  const fetchAllEIPs = () => {
    fetch(API2)
      .then((res) => res.json())
      .then((res) => {
        setEips(res)
      })
  }
  const fetchColumn = (status) => {
    console.log(status)
    const columns =
      status === 'Last Call'
        ? [
            {
              key: 'id',
              _style: { width: '5%', color: `${getBadgeColor(status)}` },
              _props: { className: 'fw-semibold' },
              sorter: true,
            },
            {
              key: 'Number',
              _style: {
                width: '5%',
                color: `${getBadgeColor(status)}`,
                backgroundColor: `${getBadge(status)}`,
              },
              _props: { className: 'fw-semibold' },
              sorter: true,
            },

            {
              key: 'Title',
              _style: {
                width: '20%',
                color: `${getBadgeColor(status)}`,
              },
            },
            {
              key: 'Author',
              _style: {
                width: '10%',
                color: `${getBadgeColor(status)}`,
                backgroundColor: `${getBadge(status)}`,
              },
            },
            {
              key: 'Start Date',
              _style: {
                width: '10%',
                color: `${getBadgeColor(status)}`,
              },
            },
            {
              key: 'Final Date',
              _style: {
                width: '10%',
                color: `${getBadgeColor(status)}`,
                backgroundColor: `${getBadge(status)}`,
              },
            },
            { key: 'Type', _style: { width: '10%', color: `${getBadgeColor(status)}` } },
            {
              key: 'Category',
              _style: {
                width: '10%',
                color: `${getBadgeColor(status)}`,
                backgroundColor: `${getBadge(status)}`,
              },
            },
            {
              key: 'Last-Call Deadline',
              _style: { width: '10%', color: `${getBadgeColor(status)}` },
            },
            {
              key: 'status',
              _style: {
                width: '5%',
                color: `${getBadgeColor(status)}`,
                backgroundColor: `${getBadge(status)}`,
              },
            },
            {
              key: 'PR No.',

              _style: { width: '5%', color: `${getBadgeColor(status)}` },
            },
          ]
        : [
            {
              key: 'id',
              _style: { width: '5%', color: `${getBadgeColor(status)}` },
              _props: { className: 'fw-semibold' },
              sorter: true,
            },
            {
              key: 'Number',
              _style: {
                width: '5%',
                color: `${getBadgeColor(status)}`,
                backgroundColor: `${getBadge(status)}`,
              },
              _props: { className: 'fw-semibold' },
              sorter: true,
            },
            {
              key: 'Title',
              _style: {
                width: '30%',
                color: `${getBadgeColor(status)}`,
              },
            },
            {
              key: 'Author',
              _style: {
                width: '15%',
                color: `${getBadgeColor(status)}`,
                backgroundColor: `${getBadge(status)}`,
              },
            },
            {
              key: 'Start Date',
              _style: {
                width: '10%',
                color: `${getBadgeColor(status)}`,
              },
            },
            {
              key: 'Final Date',
              _style: {
                width: '10%',
                color: `${getBadgeColor(status)}`,
                backgroundColor: `${getBadge(status)}`,
              },
            },
            { key: 'Type', _style: { width: '10%', color: `${getBadgeColor(status)}` } },
            {
              key: 'Category',
              _style: {
                width: '5%',
                color: `${getBadgeColor(status)}`,
                backgroundColor: `${getBadge(status)}`,
              },
            },
            {
              key: 'status',
              _style: { width: '5%', color: `${getBadgeColor(status)}` },
            },
            {
              key: 'PR No.',

              _style: {
                width: '5%',
                color: `${getBadgeColor(status)}`,
                backgroundColor: `${getBadge(status)}`,
              },
            },
          ]

    return columns
  }
  // colouring

  const getBadge = (status) => {
    switch (status) {
      case 'Final':
        return '#c3fae8'
      case 'Last_Call':
        return '#d3f9d8'
      case 'Last Call':
        return '#d3f9d8'
      case 'Draft':
        return '#fff3bf'
      case 'Stagnant':
        return '#ffe8cc'
      case 'Withdrawn':
        return '#ffe3e3'
      case 'Review':
        return '#d0ebff'
      case 'Living':
        return '#c5f6fa'
      default:
        return '#e7f5ff'
    }
  }
  const getBadgeColor = (status) => {
    switch (status) {
      case 'Final':
        return '#0ca678'
      case 'Last_Call':
        return '#37b24d'
      case 'Last Call':
        return '#37b24d'
      case 'Draft':
        return '#f08c00'
      case 'Stagnant':
        return '#e8590c'
      case 'Withdrawn':
        return '#e03131'
      case 'Review':
        return '#1971c2'
      case 'Living':
        return '#0c8599'
      default:
        return '#1c7ed6'
    }
  }
  const getBadgeShadowColor = (status) => {
    switch (status) {
      case 'Final':
        return 'shadow-[#0ca678]'
      case 'Last_Call':
        return 'shadow-[#37b24d]'
      case 'Last Call':
        return 'shadow-[#37b24d]'
      case 'Draft':
        return 'shadow-[#f08c00]'
      case 'Stagnant':
        return 'shadow-[#e8590c]'
      case 'Withdrawn':
        return 'shadow-[#e03131]'
      case 'Review':
        return 'shadow-[#1971c2]'
      case 'Living':
        return 'shadow-[#0c8599]'
      default:
        return 'shadow-[#1c7ed6]'
    }
  }
  const eipData = (eips, status, type) => {
    let arr = []
    console.log('eipData')
    if (eips[0] !== undefined) {
      let inc = 1
      for (let i = 0; i < eips[0]['Final'].length; i++) {
        if (eips[0]['Final'][i].status === status && eips[0]['Final'][i].type === type) {
          arr.push({
            id: inc++,
            Number: eips[0]['Final'][i].eip,
            Title: eips[0]['Final'][i].title,
            Type: eips[0]['Final'][i].type,
            Category:
              eips[0]['Final'][i].type === 'Standards Track'
                ? eips[0]['Final'][i].category
                : `Type - ${eips[0]['Final'][i].type}`,
            status: eips[0]['Final'][i].status,
            Author: eips[0]['Final'][i].author,
            'PR No.': 0,
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
            Category:
              eips[1]['Draft'][i].type === 'Standards Track'
                ? eips[1]['Draft'][i].category
                : `Type - ${eips[1]['Draft'][i].type}`,
            status: eips[1]['Draft'][i].status,
            Author: eips[1]['Draft'][i].author,
            'PR No.': 0,
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
            Category:
              eips[2]['Review'][i].type === 'Standards Track'
                ? eips[2]['Review'][i].category
                : `Type - ${eips[2]['Review'][i].type}`,
            status: eips[2]['Review'][i].status,
            Author: eips[2]['Review'][i].author,
            'PR No.': 0,
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
            Category:
              eips[3]['Last_Call'][i].type === 'Standards Track'
                ? eips[3]['Last_Call'][i].category
                : `Type - ${eips[3]['Last_Call'][i].type}`,
            status: eips[3]['Last_Call'][i].status,
            'Last-Call Deadline': eips[3]['Last_Call'][i]['last-call-deadline'].substring(0, 10),
            Author: eips[3]['Last_Call'][i].author,
            'PR No.': 0,
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
            Category:
              eips[4]['Stagnant'][i].type === 'Standards Track'
                ? eips[4]['Stagnant'][i].category
                : `Type - ${eips[4]['Stagnant'][i].type}`,
            status: eips[4]['Stagnant'][i].status,
            Author: eips[4]['Stagnant'][i].author,
            'PR No.': 0,
          })
        }
      }
      for (let i = 0; i < eips[5]['Withdrawn'].length; i++) {
        if (eips[5]['Withdrawn'][i].status === status && eips[5]['Withdrawn'][i].type === type) {
          arr.push({
            id: inc++,
            Number: eips[5]['Withdrawn'][i].eip,
            Title: eips[5]['Withdrawn'][i].title,

            Category:
              eips[5]['Withdrawn'][i].type === 'Standards Track'
                ? eips[5]['Withdrawn'][i].category
                : `Type - ${eips[5]['Withdrawn'][i].type}`,
            status: eips[5]['Withdrawn'][i].status,
            Author: eips[5]['Withdrawn'][i].author,
            'PR No.': 0,
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
            Category:
              eips[6]['Living'][i].type === 'Standards Track'
                ? eips[6]['Living'][i].category
                : `Type - ${eips[6]['Living'][i].type}`,
            status: eips[6]['Living'][i].status,
            Author: eips[6]['Living'][i].author,
            'PR No.': 0,
          })
        }
      }
      arr.sort((a, b) => (a.Number > b.Number ? 1 : -1))
    }
    return arr
  }
  const eipDataCategory = (eips, type, status, category) => {
    console.log('eipDataCategory')
    let arr = []
    if (eips[0] !== undefined) {
      let inc = 1
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
            Category:
              eips[0]['Final'][i].type === 'Standards Track'
                ? eips[0]['Final'][i].category
                : `Type - ${eips[0]['Final'][i].type}`,
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
            Category:
              eips[1]['Draft'][i].type === 'Standards Track'
                ? eips[1]['Draft'][i].category
                : `Type - ${eips[1]['Draft'][i].type}`,
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
            Category:
              eips[2]['Review'][i].type === 'Standards Track'
                ? eips[2]['Review'][i].category
                : `Type - ${eips[2]['Review'][i].type}`,
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
            Category:
              eips[3]['Last_Call'][i].type === 'Standards Track'
                ? eips[3]['Last_Call'][i].category
                : `Type - ${eips[3]['Last_Call'][i].type}`,
            status: eips[3]['Last_Call'][i].status,
            'Last-Call Deadline': eips[3]['Last_Call'][i]['last-call-deadline'].substring(0, 10),
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
            Category:
              eips[4]['Stagnant'][i].type === 'Standards Track'
                ? eips[4]['Stagnant'][i].category
                : `Type - ${eips[4]['Stagnant'][i].type}`,
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

            Category:
              eips[5]['Withdrawn'][i].type === 'Standards Track'
                ? eips[5]['Withdrawn'][i].category
                : `Type - ${eips[5]['Withdrawn'][i].type}`,
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
            Category:
              eips[6]['Living'][i].type === 'Standards Track'
                ? eips[6]['Living'][i].category
                : `Type - ${eips[6]['Living'][i].type}`,
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
    console.log('eipDataStatus')
    let arr = []
    status = status === 'Last_Call' ? 'Last Call' : status
    console.log({ status })
    if (eips[0] !== undefined) {
      let inc = 1
      for (let i = 0; i < eips[0]['Final'].length; i++) {
        if (eips[0]['Final'][i].status === status) {
          arr.push({
            id: inc++,
            Number: eips[0]['Final'][i].eip,
            Title: eips[0]['Final'][i].title,
            Type: eips[0]['Final'][i].type,
            Category:
              eips[0]['Final'][i].type === 'Standards Track'
                ? eips[0]['Final'][i].category
                : `Type - ${eips[0]['Final'][i].type}`,
            status: eips[0]['Final'][i].status,
            Author: eips[0]['Final'][i].author,
            'PR No.': 0,
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
            Category:
              eips[1]['Draft'][i].type === 'Standards Track'
                ? eips[1]['Draft'][i].category
                : `Type - ${eips[1]['Draft'][i].type}`,
            status: eips[1]['Draft'][i].status,
            Author: eips[1]['Draft'][i].author,
            'PR No.': 0,
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
            Category:
              eips[2]['Review'][i].type === 'Standards Track'
                ? eips[2]['Review'][i].category
                : `Type - ${eips[2]['Review'][i].type}`,
            status: eips[2]['Review'][i].status,
            Author: eips[2]['Review'][i].author,
            'PR No.': 0,
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
            Category:
              eips[3]['Last_Call'][i].type === 'Standards Track'
                ? eips[3]['Last_Call'][i].category
                : `Type - ${eips[3]['Last_Call'][i].type}`,
            status: eips[3]['Last_Call'][i].status,
            'Last-Call Deadline': eips[3]['Last_Call'][i]['last-call-deadline'].substring(0, 10),
            Author: eips[3]['Last_Call'][i].author,
            'PR No.': 0,
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
            Category:
              eips[4]['Stagnant'][i].type === 'Standards Track'
                ? eips[4]['Stagnant'][i].category
                : `Type - ${eips[4]['Stagnant'][i].type}`,
            status: eips[4]['Stagnant'][i].status,
            Author: eips[4]['Stagnant'][i].author,
            'PR No.': 0,
          })
        }
      }
      for (let i = 0; i < eips[5]['Withdrawn'].length; i++) {
        if (eips[5]['Withdrawn'][i].status === status) {
          arr.push({
            id: inc++,
            Number: eips[5]['Withdrawn'][i].eip,
            Title: eips[5]['Withdrawn'][i].title,

            Category:
              eips[5]['Withdrawn'][i].type === 'Standards Track'
                ? eips[5]['Withdrawn'][i].category
                : `Type - ${eips[5]['Withdrawn'][i].type}`,
            status: eips[5]['Withdrawn'][i].status,
            Author: eips[5]['Withdrawn'][i].author,
            'PR No.': 0,
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
            Category:
              eips[6]['Living'][i].type === 'Standards Track'
                ? eips[6]['Living'][i].category
                : `Type - ${eips[6]['Living'][i].type}`,
            status: eips[6]['Living'][i].status,
            Author: eips[6]['Living'][i].author,
            'PR No.': 0,
          })
        }
      }
      arr.sort((a, b) => (a.Number > b.Number ? 1 : -1))
    }
    return arr
  }
  const eipDataStatusExtra = (eips, status, month, year) => {
    console.log('eipDataStatusExtra')
    status = status === 'Last_Call' ? 'Last Call' : status
    let arr = []

    if (eips[0] !== undefined) {
      let inc = 1
      if (month === '10') {
        arr.push({
          id: inc++,
          Number: 2535,
          Title: 'Diamonds, Multi-Facet Proxy',
          Type: 'Standards Track',
          Category: 'ERC',
          status: 'Final',
          Author: 'Nick Mudge (@mudgen)',
          'PR No.': 5802,
        })
      }
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
            Category:
              eips[0]['Final'][i].type === 'Standards Track'
                ? eips[0]['Final'][i].category
                : `Type - ${eips[0]['Final'][i].type}`,
            status: eips[0]['Final'][i].status,
            Author: eips[0]['Final'][i].author,
            'PR No.': 0,
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
            Category:
              eips[1]['Draft'][i].type === 'Standards Track'
                ? eips[1]['Draft'][i].category
                : `Type - ${eips[1]['Draft'][i].type}`,
            status: eips[1]['Draft'][i].status,
            Author: eips[1]['Draft'][i].author,
            'PR No.': 0,
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
            Category:
              eips[2]['Review'][i].type === 'Standards Track'
                ? eips[2]['Review'][i].category
                : `Type - ${eips[2]['Review'][i].type}`,
            status: eips[2]['Review'][i].status,
            Author: eips[2]['Review'][i].author,
            'PR No.': 0,
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
            Category:
              eips[3]['Last_Call'][i].type === 'Standards Track'
                ? eips[3]['Last_Call'][i].category
                : `Type - ${eips[3]['Last_Call'][i].type}`,
            status: eips[3]['Last_Call'][i].status,
            'Last-Call Deadline': eips[3]['Last_Call'][i]['last-call-deadline'].substring(0, 10),
            Author: eips[3]['Last_Call'][i].author,
            'PR No.': 0,
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
            Category:
              eips[4]['Stagnant'][i].type === 'Standards Track'
                ? eips[4]['Stagnant'][i].category
                : `Type - ${eips[4]['Stagnant'][i].type}`,
            status: eips[4]['Stagnant'][i].status,
            Author: eips[4]['Stagnant'][i].author,
            'PR No.': 0,
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

            Category:
              eips[5]['Withdrawn'][i].type === 'Standards Track'
                ? eips[5]['Withdrawn'][i].category
                : `Type - ${eips[5]['Withdrawn'][i].type}`,
            status: eips[5]['Withdrawn'][i].status,
            Author: eips[5]['Withdrawn'][i].author,
            'PR No.': 0,
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
            Category:
              eips[6]['Living'][i].type === 'Standards Track'
                ? eips[6]['Living'][i].category
                : `Type - ${eips[6]['Living'][i].type}`,
            status: eips[6]['Living'][i].status,
            Author: eips[6]['Living'][i].author,
            'PR No.': 0,
          })
        }
      }
      arr.sort((a, b) => (a.Number > b.Number ? 1 : -1))
    }
    return arr
  }
  const eipDataCategoryType = (eips, type, category) => {
    console.log('eipDataCategoryType')
    let arr = []
    if (eips[0] !== undefined) {
      let inc = 1
      for (let i = 0; i < eips[0]['Final'].length; i++) {
        if (eips[0]['Final'][i].type === type && eips[0]['Final'][i].category === category) {
          arr.push({
            id: inc++,
            Number: eips[0]['Final'][i].eip,
            Title: eips[0]['Final'][i].title,
            Type: eips[0]['Final'][i].type,
            Category:
              eips[0]['Final'][i].type === 'Standards Track'
                ? eips[0]['Final'][i].category
                : `Type - ${eips[0]['Final'][i].type}`,
            status: eips[0]['Final'][i].status,
            Author: eips[0]['Final'][i].author,
            'PR No.': 0,
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
            Category:
              eips[1]['Draft'][i].type === 'Standards Track'
                ? eips[1]['Draft'][i].category
                : `Type - ${eips[1]['Draft'][i].type}`,
            status: eips[1]['Draft'][i].status,
            Author: eips[1]['Draft'][i].author,
            'PR No.': 0,
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
            Category:
              eips[2]['Review'][i].type === 'Standards Track'
                ? eips[2]['Review'][i].category
                : `Type - ${eips[2]['Review'][i].type}`,
            status: eips[2]['Review'][i].status,
            Author: eips[2]['Review'][i].author,
            'PR No.': 0,
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
            Category:
              eips[3]['Last_Call'][i].type === 'Standards Track'
                ? eips[3]['Last_Call'][i].category
                : `Type - ${eips[3]['Last_Call'][i].type}`,
            status: eips[3]['Last_Call'][i].status,
            'Last-Call Deadline': eips[3]['Last_Call'][i]['last-call-deadline'].substring(0, 10),
            Author: eips[3]['Last_Call'][i].author,
            'PR No.': 0,
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
            Category:
              eips[4]['Stagnant'][i].type === 'Standards Track'
                ? eips[4]['Stagnant'][i].category
                : `Type - ${eips[4]['Stagnant'][i].type}`,
            status: eips[4]['Stagnant'][i].status,
            Author: eips[4]['Stagnant'][i].author,
            'PR No.': 0,
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

            Category:
              eips[5]['Withdrawn'][i].type === 'Standards Track'
                ? eips[5]['Withdrawn'][i].category
                : `Type - ${eips[5]['Withdrawn'][i].type}`,

            status: eips[5]['Withdrawn'][i].status,
            Author: eips[5]['Withdrawn'][i].author,
            'PR No.': 0,
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
            Category:
              eips[6]['Living'][i].type === 'Standards Track'
                ? eips[6]['Living'][i].category
                : `Type - ${eips[6]['Living'][i].type}`,
            status: eips[6]['Living'][i].status,
            Author: eips[6]['Living'][i].author,
            'PR No.': 0,
          })
        }
      }
      arr.sort((a, b) => (a.Number > b.Number ? 1 : -1))
    }
    return arr
  }
  const eipDataMain = (eips, type) => {
    console.log('main')
    let arr = []
    if (eips[0] !== undefined) {
      let inc = 1
      for (let i = 0; i < eips[0]['Final'].length; i++) {
        if (eips[0]['Final'][i].type === type) {
          arr.push({
            id: inc++,
            Number: eips[0]['Final'][i].eip,
            Title: eips[0]['Final'][i].title,
            Type: eips[0]['Final'][i].type,
            Category:
              eips[0]['Final'][i].type === 'Standards Track'
                ? eips[0]['Final'][i].category
                : `Type - ${eips[0]['Final'][i].type}`,
            status: eips[0]['Final'][i].status,
            Author: eips[0]['Final'][i].author,
            'PR No.': 0,
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
            Category:
              eips[1]['Draft'][i].type === 'Standards Track'
                ? eips[1]['Draft'][i].category
                : `Type - ${eips[1]['Draft'][i].type}`,
            status: eips[1]['Draft'][i].status,
            Author: eips[1]['Draft'][i].author,
            'PR No.': 0,
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
            Category:
              eips[2]['Review'][i].type === 'Standards Track'
                ? eips[2]['Review'][i].category
                : `Type - ${eips[2]['Review'][i].type}`,
            status: eips[2]['Review'][i].status,
            Author: eips[2]['Review'][i].author,
            'PR No.': 0,
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
            Category:
              eips[3]['Last_Call'][i].type === 'Standards Track'
                ? eips[3]['Last_Call'][i].category
                : `Type - ${eips[3]['Last_Call'][i].type}`,
            status: eips[3]['Last_Call'][i].status,
            'Last-Call Deadline': eips[3]['Last_Call'][i]['last-call-deadline'].substring(0, 10),
            Author: eips[3]['Last_Call'][i].author,
            'PR No.': 0,
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
            Category:
              eips[4]['Stagnant'][i].type === 'Standards Track'
                ? eips[4]['Stagnant'][i].category
                : `Type - ${eips[4]['Stagnant'][i].type}`,
            status: eips[4]['Stagnant'][i].status,
            Author: eips[4]['Stagnant'][i].author,
            'PR No.': 0,
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
            Category:
              eips[5]['Withdrawn'][i].type === 'Standards Track'
                ? eips[5]['Withdrawn'][i].category
                : `Type - ${eips[5]['Withdrawn'][i].type}`,
            status: eips[5]['Withdrawn'][i].status,
            Author: eips[5]['Withdrawn'][i].author,
            'PR No.': 0,
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
            Category:
              eips[6]['Living'][i].type === 'Standards Track'
                ? eips[6]['Living'][i].category
                : `Type - ${eips[6]['Living'][i].type}`,
            status: eips[6]['Living'][i].status,
            Author: eips[6]['Living'][i].author,
            'PR No.': 0,
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

  // csv Download
  const headers = [
    {
      label: 'EIP No.',
      key: 'Number',
    },
    {
      label: 'Title',
      key: 'Title',
    },
    {
      label: 'Author',
      key: 'Author',
    },
    {
      label: 'Type',
      key: 'Type',
    },
    {
      label: 'Category',
      key: 'Category',
    },
    { label: 'Last Call Deadline', key: 'Last-Call Deadline' },
    {
      label: 'Status',
      key: 'status',
    },
    {
      label: 'PR No.',
      key: 'PR No.',
    },
  ]

  const getDataFromLocationData = (data) => {
    let id = 1
    let arr = []
    for (let i = 0; i < data.length; i++) {
      arr.push({
        id: id++,
        Number: data[i].eip.split('-')[1].split('.')[0],
        Title: data[i].title,
        Type: data[i].type,
        Category: data[i].category,
        status: data[i].status,
        Author: data[i].author,
        'PR No.': data[i].pull,
      })
    }

    return arr
  }

  const whatData = (data) => {
    let datafromData = getDataFromLocationData(data === undefined ? [] : data)
    let getData =
      datafromData.length !== 0
        ? datafromData
        : month === undefined && year === undefined
        ? category === '' && status === ''
          ? eipDataMain(eips === undefined ? [] : eips, type === undefined ? '' : type)
          : category === '' && type === ''
          ? eipDataStatus(eips === undefined ? [] : eips, status === undefined ? '' : status)
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

    for (let i = 0; i < getData.length; i++) {
      getData[i].id = i + 1
    }
    return getData
  }
  const csvLink = {
    filename: name,
    headers: headers,
    data: whatData(data === undefined ? [] : data),
  }

  const factorAuthor = (data) => {
    let ans
    // console.log({ data })
    let list = data.split(',')
    // console.log({ list })
    for (let i = 0; i < list.length; i++) {
      list[i] = list[i].split(' ')
    }
    // console.log({ list })
    if (list[list.length - 1][list[list.length - 1].length - 1] === 'al.') {
      list.pop()
    }
    return list
  }

  const getString = (data) => {
    let ans = ''
    for (let i = 0; i < data.length - 1; i++) {
      ans += data[i] + ' '
    }
    return ans
  }

  // headers
  const header = (text, status) => {
    return (
      <CCardHeader
        className="cardHeader flex justify-between items-center"
        style={{
          fontFamily: 'Roboto',
          fontWeight: '800',
          fontSize: '14px',
          color: `${getBadgeColor(status)}`,
          background: `${getBadge(status)}`,
          borderBottom: `2px solid ${getBadgeColor(status)}`,
        }}
      >
        <div>{text}</div>

        <CSVLink {...csvLink}>
          <motion.img
            src={downloadIcon}
            alt="Download Icon"
            whileTap={{ scale: 0.8 }}
            style={{ fill: `${getBadgeColor(status)}` }}
          />
        </CSVLink>
      </CCardHeader>
    )
  }

  useEffect(() => {
    fetchAllEIPs()
    setType(location.state.type)
    setCategory(location.state.category)
    setStatus(location.state.status)
    setMonth(location.state.month)
    setYear(location.state.year)
    setName(location.state.name)
    setData(location.state.data)
    fetchDate()
  }, [])

  console.log({ year })
  console.log({ month })
  console.log({ status })
  console.log({ data })

  return (
    <>
      <CCard>
        {header(
          `${name
            ?.split('_')
            .toString()
            .replace(',', ' ')
            .replace(',', ' - ')
            .replace(',', ' - ')
            .replace(/^./, name[0].toUpperCase())}`, // regex for making upper case
          status,
        )}
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
            items={whatData(data === undefined ? [] : data)}
            activePage={1}
            clickableRows
            columns={fetchColumn(status)}
            columnFilter
            columnSorter
            itemsPerPage={15}
            pagination
            scopedColumns={{
              id: (item) => (
                <td>
                  <div
                    style={{
                      color: `${getBadgeColor(item.status)}`,
                      fontWeight: 'bold',
                    }}
                  >
                    {item.id}.
                  </div>
                </td>
              ),
              Number: (item) => (
                <td>
                  <Link to={`/EIP-${item.Number}`}>
                    <div>
                      <label className="relative cursor-pointer">
                        <div
                          className={`h-7
            font-extrabold rounded-[8px] bg-[${getBadge(item.status)}] text-[${getBadgeColor(
                            item.status,
                          )}] text-[12px] inline-block p-[4px] drop-shadow-sm ${getBadgeShadowColor(
                            item.status,
                          )} shadow-md cursor-pointer px-[8px]`}
                          style={{
                            color: `${getBadgeColor(item.status)}`,
                            backgroundColor: `${getBadge(item.status)}`,
                          }}
                        >
                          {item.Number}
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
                    </div>
                  </Link>
                </td>
              ),
              Title: (item) => (
                <td
                  style={{
                    // borderBottomWidth: item.id % 2 !== 0 ? '1px' : '',
                    // borderColor: item.id % 2 !== 0 ? `${getBadgeColor(item.status)}` : '',
                    color: `${getBadgeColor(item.status)}`,

                    fontWeight: 'bold',
                    height: '100%',
                  }}
                  className="hover:text-[#1c7ed6]"
                >
                  <Link to={`/EIP-${item.Number}`} className="hover:text-[#1c7ed6] text-[13px]">
                    {item.Title}
                  </Link>
                </td>
              ),

              Author: (it) => (
                <td>
                  <div>
                    {factorAuthor(it.Author).map((item, index) => {
                      let t = item[item.length - 1].substring(1, item[item.length - 1].length - 1)

                      return (
                        <CBadge
                          key={index}
                          className={`mr-1 drop-shadow-sm ${getBadgeShadowColor(
                            it.status,
                          )} shadow-sm`}
                          style={{
                            color: `${getBadgeColor(it.status)}`,
                            backgroundColor: `${getBadge(it.status)}`,
                          }}
                        >
                          <a
                            key={index}
                            href={`${
                              item[item.length - 1].substring(item[item.length - 1].length - 1) ===
                              '>'
                                ? 'mailto:' + t
                                : 'https://github.com/' + t.substring(1)
                            }`}
                            target="_blank"
                            rel="noreferrer"
                            className="hoverAuthor text-[10px]"
                            style={{ '--author-color': `${getBadgeColor(it.status)}` }}
                          >
                            {getString(item)}
                          </a>
                        </CBadge>
                      )
                    })}
                  </div>
                </td>
              ),
              'Start Date': (item) => (
                <td>
                  <div>{item['Start Date']}</div>
                </td>
              ),

              'Final Date': (item) => (
                <td>
                  <div>{item['Final Date']}</div>
                </td>
              ),
              Type: (item) => (
                <td
                  style={{
                    color: `${getBadgeColor(item.status)}`,
                    fontWeight: 'bold',
                  }}
                  className="text-[12px]"
                >
                  {item.Type}
                </td>
              ),
              Category: (item) => (
                <td
                  style={{
                    color: `${getBadgeColor(item.status)}`,
                    fontWeight: 'bold',
                  }}
                >
                  <div className=" text-[12px]">{item.Category}</div>
                </td>
              ),
              status: (item) => (
                <td style={{}}>
                  <CBadge
                    style={{
                      color: `${getBadgeColor(item.status)}`,
                      backgroundColor: `${getBadge(item.status)}`,
                    }}
                    className={`drop-shadow-sm ${getBadgeShadowColor(item.status)} shadow-md`}
                  >
                    {item.status}
                  </CBadge>
                </td>
              ),
              'PR No.': (item) => (
                <td>
                  <a
                    href={`https://github.com/ethereum/EIPs/pull/${
                      item['PR No.'] === 0 ? item.Number : item['PR No.']
                    }`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <CBadge
                      style={{
                        color: `${getBadgeColor('Random')}`,
                        backgroundColor: `${getBadge('Random')}`,
                      }}
                      className={`drop-shadow-sm ${getBadgeShadowColor(
                        'Random',
                      )} shadow-md  z-auto`}
                    >
                      <div>{item['PR No.'] === 0 ? item.Number : item['PR No.']}</div>
                    </CBadge>
                  </a>
                </td>
              ),
            }}
            // onRowClick={(item) => {
            //   console.log(item)
            //   navigate('/EIP-' + item.Number)
            // }}
            sorterValue={{ column: 'name', state: 'asc' }}
            tableHeadProps={{}}
            tableProps={{
              // borderless: true,
              striped: true,
              hover: true,
              responsive: true,
            }}
          />
        </CCardBody>
        <CCardFooter
          className="cardFooter"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            color: `${getBadgeColor(status)}`,
            backgroundColor: `${getBadge(status)}`,
          }}
        >
          <label style={{ color: '#1c7ed6', fontSize: '15px', fontWeight: 'bold' }}></label>
          <label
            style={{ fontSize: '10px', fontWeight: 'bold', color: `${getBadgeColor(status)}` }}
          >
            {date}
          </label>
        </CCardFooter>
      </CCard>
    </>
  )
}
export default table
