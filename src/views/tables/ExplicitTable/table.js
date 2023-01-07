/* eslint-disable react-hooks/rules-of-hooks */
import { CBadge, CCard, CCardBody, CCardFooter, CCardHeader, CSmartTable } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { CSVLink } from 'react-csv'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import downloadIcon from 'src/assets/download.png'

const statusArr = ['Final', 'Draft', 'Review', 'Last_Call', 'Stagnant', 'Withdrawn', 'Living']

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
      status === 'Last_Call' || status === 'Last Call'
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
                width: '10%',
                color: `${getBadgeColor(status)}`,
              },
            },
            {
              key: 'Draft Date',
              _style: {
                width: '10%',
                color: `${getBadgeColor(status)}`,
              },
            },

            { key: 'Type', _style: { width: '10%', color: `${getBadgeColor(status)}` } },
            {
              key: 'Category',
              _style: {
                width: '10%',
                color: `${getBadgeColor(status)}`,
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
              },
              _props: { className: 'fw-semibold' },
              sorter: true,
            },
            {
              key: 'Title',
              _style: {
                width: '35%',
                color: `${getBadgeColor(status)}`,
              },
            },
            {
              key: 'Author',
              _style: {
                width: '15%',
                color: `${getBadgeColor(status)}`,
              },
            },
            {
              key: status === 'Final' ? 'Final Date' : 'Draft Date',
              _style: {
                width: '15%',
                color: `${getBadgeColor(status)}`,
              },
            },

            { key: 'Type', _style: { width: '10%', color: `${getBadgeColor(status)}` } },
            {
              key: 'Category',
              _style: {
                width: '5%',
                color: `${getBadgeColor(status)}`,
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
      for (let j = 0; j < statusArr.length; j++) {
        for (let i = 0; i < eips[j][statusArr[j]].length; i++) {
          if (
            eips[j][statusArr[j]][i].status === status &&
            eips[j][statusArr[j]][i].type === type
          ) {
            if (statusArr[j] === 'Final') {
              arr.push({
                id: inc++,
                Number: eips[j][statusArr[j]][i].eip,
                Title: eips[j][statusArr[j]][i].title,
                Type: eips[j][statusArr[j]][i].type,
                Category:
                  eips[j][statusArr[j]][i].type === 'Standards Track'
                    ? eips[j][statusArr[j]][i].category
                    : `Type - ${eips[j][statusArr[j]][i].type}`,
                'Final Date': eips[j][statusArr[j]][i].created.substring(0, 10),
                status: eips[j][statusArr[j]][i].status,
                Author: eips[j][statusArr[j]][i].author,
                'PR No.': 0,
              })
            } else if (statusArr[j] === 'Last_Call') {
              arr.push({
                id: inc++,
                Number: eips[j][statusArr[j]][i].eip,
                Title: eips[j][statusArr[j]][i].title,
                Type: eips[j][statusArr[j]][i].type,
                Category:
                  eips[j][statusArr[j]][i].type === 'Standards Track'
                    ? eips[j][statusArr[j]][i].category
                    : `Type - ${eips[j][statusArr[j]][i].type}`,
                'Draft Date': eips[j][statusArr[j]][i].created.substring(0, 10),
                'Last-Call Deadline': eips[j][statusArr[j]][i]['last-call-deadline'].substring(
                  0,
                  10,
                ),
                status: eips[j][statusArr[j]][i].status,
                Author: eips[j][statusArr[j]][i].author,
                'PR No.': 0,
              })
            } else {
              arr.push({
                id: inc++,
                Number: eips[j][statusArr[j]][i].eip,
                Title: eips[j][statusArr[j]][i].title,
                Type: eips[j][statusArr[j]][i].type,
                Category:
                  eips[j][statusArr[j]][i].type === 'Standards Track'
                    ? eips[j][statusArr[j]][i].category
                    : `Type - ${eips[j][statusArr[j]][i].type}`,
                'Draft Date': eips[j][statusArr[j]][i].created.substring(0, 10),

                status: eips[j][statusArr[j]][i].status,
                Author: eips[j][statusArr[j]][i].author,
                'PR No.': 0,
              })
            }
          }
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
      for (let j = 0; j < statusArr.length; j++) {
        for (let i = 0; i < eips[j][statusArr[j]].length; i++) {
          if (
            eips[j][statusArr[j]][i].status === status &&
            eips[j][statusArr[j]][i].type === type &&
            eips[j][statusArr[j]][i].category === category
          ) {
            if (statusArr[j] === 'Final') {
              arr.push({
                id: inc++,
                Number: eips[j][statusArr[j]][i].eip,
                Title: eips[j][statusArr[j]][i].title,
                Type: eips[j][statusArr[j]][i].type,
                Category:
                  eips[j][statusArr[j]][i].type === 'Standards Track'
                    ? eips[j][statusArr[j]][i].category
                    : `Type - ${eips[j][statusArr[j]][i].type}`,
                'Final Date': eips[j][statusArr[j]][i].created.substring(0, 10),
                status: eips[j][statusArr[j]][i].status,
                Author: eips[j][statusArr[j]][i].author,
                'PR No.': 0,
              })
            } else if (statusArr[j] === 'Last_Call') {
              arr.push({
                id: inc++,
                Number: eips[j][statusArr[j]][i].eip,
                Title: eips[j][statusArr[j]][i].title,
                Type: eips[j][statusArr[j]][i].type,
                Category:
                  eips[j][statusArr[j]][i].type === 'Standards Track'
                    ? eips[j][statusArr[j]][i].category
                    : `Type - ${eips[j][statusArr[j]][i].type}`,
                'Draft Date': eips[j][statusArr[j]][i].created.substring(0, 10),
                'Last-Call Deadline': eips[j][statusArr[j]][i]['last-call-deadline'].substring(
                  0,
                  10,
                ),
                status: eips[j][statusArr[j]][i].status,
                Author: eips[j][statusArr[j]][i].author,
                'PR No.': 0,
              })
            } else {
              arr.push({
                id: inc++,
                Number: eips[j][statusArr[j]][i].eip,
                Title: eips[j][statusArr[j]][i].title,
                Type: eips[j][statusArr[j]][i].type,
                Category:
                  eips[j][statusArr[j]][i].type === 'Standards Track'
                    ? eips[j][statusArr[j]][i].category
                    : `Type - ${eips[j][statusArr[j]][i].type}`,
                'Draft Date': eips[j][statusArr[j]][i].created.substring(0, 10),

                status: eips[j][statusArr[j]][i].status,
                Author: eips[j][statusArr[j]][i].author,
                'PR No.': 0,
              })
            }
          }
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
      for (let j = 0; j < statusArr.length; j++) {
        for (let i = 0; i < eips[j][statusArr[j]].length; i++) {
          if (eips[j][statusArr[j]][i].status === status) {
            if (statusArr[j] === 'Final') {
              arr.push({
                id: inc++,
                Number: eips[j][statusArr[j]][i].eip,
                Title: eips[j][statusArr[j]][i].title,
                Type: eips[j][statusArr[j]][i].type,
                Category:
                  eips[j][statusArr[j]][i].type === 'Standards Track'
                    ? eips[j][statusArr[j]][i].category
                    : `Type - ${eips[j][statusArr[j]][i].type}`,
                'Final Date': eips[j][statusArr[j]][i].created.substring(0, 10),
                status: eips[j][statusArr[j]][i].status,
                Author: eips[j][statusArr[j]][i].author,
                'PR No.': 0,
              })
            } else if (statusArr[j] === 'Last_Call') {
              arr.push({
                id: inc++,
                Number: eips[j][statusArr[j]][i].eip,
                Title: eips[j][statusArr[j]][i].title,
                Type: eips[j][statusArr[j]][i].type,
                Category:
                  eips[j][statusArr[j]][i].type === 'Standards Track'
                    ? eips[j][statusArr[j]][i].category
                    : `Type - ${eips[j][statusArr[j]][i].type}`,
                'Draft Date': eips[j][statusArr[j]][i].created.substring(0, 10),
                'Last-Call Deadline': eips[j][statusArr[j]][i]['last-call-deadline'].substring(
                  0,
                  10,
                ),
                status: eips[j][statusArr[j]][i].status,
                Author: eips[j][statusArr[j]][i].author,
                'PR No.': 0,
              })
            } else {
              arr.push({
                id: inc++,
                Number: eips[j][statusArr[j]][i].eip,
                Title: eips[j][statusArr[j]][i].title,
                Type: eips[j][statusArr[j]][i].type,
                Category:
                  eips[j][statusArr[j]][i].type === 'Standards Track'
                    ? eips[j][statusArr[j]][i].category
                    : `Type - ${eips[j][statusArr[j]][i].type}`,
                'Draft Date': eips[j][statusArr[j]][i].created.substring(0, 10),

                status: eips[j][statusArr[j]][i].status,
                Author: eips[j][statusArr[j]][i].author,
                'PR No.': 0,
              })
            }
          }
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
      for (let j = 0; j < statusArr.length; j++) {
        for (let i = 0; i < eips[j][statusArr[j]].length; i++) {
          if (
            eips[j][statusArr[j]][i].status === status &&
            eips[j][statusArr[j]][i].created.substring(0, 4) === year &&
            parseInt(eips[j][statusArr[j]][i].created.substring(5, 7)) === parseInt(month)
          ) {
            if (statusArr[j] === 'Final') {
              arr.push({
                id: inc++,
                Number: eips[j][statusArr[j]][i].eip,
                Title: eips[j][statusArr[j]][i].title,
                Type: eips[j][statusArr[j]][i].type,
                Category:
                  eips[j][statusArr[j]][i].type === 'Standards Track'
                    ? eips[j][statusArr[j]][i].category
                    : `Type - ${eips[j][statusArr[j]][i].type}`,
                'Final Date': eips[j][statusArr[j]][i].created.substring(0, 10),
                status: eips[j][statusArr[j]][i].status,
                Author: eips[j][statusArr[j]][i].author,
                'PR No.': 0,
              })
            } else if (statusArr[j] === 'Last_Call') {
              arr.push({
                id: inc++,
                Number: eips[j][statusArr[j]][i].eip,
                Title: eips[j][statusArr[j]][i].title,
                Type: eips[j][statusArr[j]][i].type,
                Category:
                  eips[j][statusArr[j]][i].type === 'Standards Track'
                    ? eips[j][statusArr[j]][i].category
                    : `Type - ${eips[j][statusArr[j]][i].type}`,
                'Draft Date': eips[j][statusArr[j]][i].created.substring(0, 10),
                'Last-Call Deadline': eips[j][statusArr[j]][i]['last-call-deadline'].substring(
                  0,
                  10,
                ),
                status: eips[j][statusArr[j]][i].status,
                Author: eips[j][statusArr[j]][i].author,
                'PR No.': 0,
              })
            } else {
              arr.push({
                id: inc++,
                Number: eips[j][statusArr[j]][i].eip,
                Title: eips[j][statusArr[j]][i].title,
                Type: eips[j][statusArr[j]][i].type,
                Category:
                  eips[j][statusArr[j]][i].type === 'Standards Track'
                    ? eips[j][statusArr[j]][i].category
                    : `Type - ${eips[j][statusArr[j]][i].type}`,
                'Draft Date': eips[j][statusArr[j]][i].created.substring(0, 10),

                status: eips[j][statusArr[j]][i].status,
                Author: eips[j][statusArr[j]][i].author,
                'PR No.': 0,
              })
            }
          }
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

      for (let j = 0; j < statusArr.length; j++) {
        for (let i = 0; i < eips[j][statusArr[j]].length; i++) {
          if (
            eips[j][statusArr[j]][i].type === type &&
            eips[j][statusArr[j]][i].category === category
          ) {
            if (statusArr[j] === 'Final') {
              arr.push({
                id: inc++,
                Number: eips[j][statusArr[j]][i].eip,
                Title: eips[j][statusArr[j]][i].title,
                Type: eips[j][statusArr[j]][i].type,
                Category:
                  eips[j][statusArr[j]][i].type === 'Standards Track'
                    ? eips[j][statusArr[j]][i].category
                    : `Type - ${eips[j][statusArr[j]][i].type}`,
                'Final Date': eips[j][statusArr[j]][i].created.substring(0, 10),
                status: eips[j][statusArr[j]][i].status,
                Author: eips[j][statusArr[j]][i].author,
                'PR No.': 0,
              })
            } else if (statusArr[j] === 'Last_Call') {
              arr.push({
                id: inc++,
                Number: eips[j][statusArr[j]][i].eip,
                Title: eips[j][statusArr[j]][i].title,
                Type: eips[j][statusArr[j]][i].type,
                Category:
                  eips[j][statusArr[j]][i].type === 'Standards Track'
                    ? eips[j][statusArr[j]][i].category
                    : `Type - ${eips[j][statusArr[j]][i].type}`,
                'Draft Date': eips[j][statusArr[j]][i].created.substring(0, 10),
                'Last-Call Deadline': eips[j][statusArr[j]][i]['last-call-deadline'].substring(
                  0,
                  10,
                ),
                status: eips[j][statusArr[j]][i].status,
                Author: eips[j][statusArr[j]][i].author,
                'PR No.': 0,
              })
            } else {
              arr.push({
                id: inc++,
                Number: eips[j][statusArr[j]][i].eip,
                Title: eips[j][statusArr[j]][i].title,
                Type: eips[j][statusArr[j]][i].type,
                Category:
                  eips[j][statusArr[j]][i].type === 'Standards Track'
                    ? eips[j][statusArr[j]][i].category
                    : `Type - ${eips[j][statusArr[j]][i].type}`,
                'Draft Date': eips[j][statusArr[j]][i].created.substring(0, 10),

                status: eips[j][statusArr[j]][i].status,
                Author: eips[j][statusArr[j]][i].author,
                'PR No.': 0,
              })
            }
          }
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

      for (let j = 0; j < statusArr.length; j++) {
        for (let i = 0; i < eips[j][statusArr[j]].length; i++) {
          if (eips[j][statusArr[j]][i].type === type) {
            if (statusArr[j] === 'Final') {
              arr.push({
                id: inc++,
                Number: eips[j][statusArr[j]][i].eip,
                Title: eips[j][statusArr[j]][i].title,
                Type: eips[j][statusArr[j]][i].type,
                Category:
                  eips[j][statusArr[j]][i].type === 'Standards Track'
                    ? eips[j][statusArr[j]][i].category
                    : `Type - ${eips[j][statusArr[j]][i].type}`,
                'Final Date': eips[j][statusArr[j]][i].created.substring(0, 10),
                status: eips[j][statusArr[j]][i].status,
                Author: eips[j][statusArr[j]][i].author,
                'PR No.': 0,
              })
            } else if (statusArr[j] === 'Last_Call') {
              // console.log(eips[j][statusArr[j]][i].created.substring(0, 10))
              arr.push({
                id: inc++,
                Number: eips[j][statusArr[j]][i].eip,
                Title: eips[j][statusArr[j]][i].title,
                Type: eips[j][statusArr[j]][i].type,
                Category:
                  eips[j][statusArr[j]][i].type === 'Standards Track'
                    ? eips[j][statusArr[j]][i].category
                    : `Type - ${eips[j][statusArr[j]][i].type}`,
                'Draft Date': eips[j][statusArr[j]][i].created.substring(0, 10),
                'Last-Call Deadline': eips[j][statusArr[j]][i]['last-call-deadline'].substring(
                  0,
                  10,
                ),
                status: eips[j][statusArr[j]][i].status,
                Author: eips[j][statusArr[j]][i].author,
                'PR No.': 0,
              })
            } else {
              arr.push({
                id: inc++,
                Number: eips[j][statusArr[j]][i].eip,
                Title: eips[j][statusArr[j]][i].title,
                Type: eips[j][statusArr[j]][i].type,
                Category:
                  eips[j][statusArr[j]][i].type === 'Standards Track'
                    ? eips[j][statusArr[j]][i].category
                    : `Type - ${eips[j][statusArr[j]][i].type}`,
                'Draft Date': eips[j][statusArr[j]][i].created.substring(0, 10),

                status: eips[j][statusArr[j]][i].status,
                Author: eips[j][statusArr[j]][i].author,
                'PR No.': 0,
              })
            }
          }
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
      label: 'id',
      key: 'id',
    },
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
      label: 'Start Date',
      key: 'Start Date',
    },
    {
      label: 'Final Date',
      key: 'Final Date',
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
      key: 'Number',
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
              'Draft Date': (item) => (
                <td
                  style={{
                    color: `${getBadgeColor(item.status)}`,
                    fontWeight: 'bold',
                  }}
                  className="text-[12px]"
                >
                  <div>{item['Draft Date']}</div>
                </td>
              ),

              'Final Date': (item) => (
                <td
                  style={{
                    color: `${getBadgeColor(item.status)}`,
                    fontWeight: 'bold',
                  }}
                  className="text-[12px]"
                >
                  <div>{item['Final Date']}</div>
                </td>
              ),
              'Last-Call Deadline': (item) => (
                <td
                  style={{
                    color: `${getBadgeColor(item.status)}`,
                    fontWeight: 'bold',
                  }}
                  className="text-[12px]"
                >
                  <div>{item['Last-Call Deadline']}</div>
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
                      <div>{item['PR No.'] === 0 ? `#` + item.Number : item['PR No.']}</div>
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
