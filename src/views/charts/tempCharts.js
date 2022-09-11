/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Line } from '@ant-design/plots'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'
import { Column, Pie, G2 } from '@ant-design/plots'
import { each, groupBy } from '@antv/util'

const tempCharts = () => {
  const data = [
    {
      type: 'Standard Track',
      sales: 448,
    },
    {
      type: 'Meta',
      sales: 16,
    },
    {
      type: 'Informational',
      sales: 6,
    },
  ]
  const annotations = []
  each(groupBy(data, 'type'), (values, k) => {
    const value = values.reduce((a, b) => a + b.sales, 0)
    annotations.push({
      type: 'text',
      position: [k, value],
      content: `${value}`,
      style: {
        textAlign: 'center',
        fontSize: 14,
        fill: 'rgba(0,0,0,0.85)',
      },
      offsetY: -10,
    })
  })
  const config = {
    data: data,
    xField: 'type',
    yField: 'sales',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.8,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: '类别',
      },
      sales: {
        alias: '销售额',
      },
    },
    annotations,
  }

  return (
    <>
      <CCard>
        <CCardHeader className="cardHeader" style={{ fontFamily: 'Roboto', fontWeight: '800' }}>
          Final vs Draft
        </CCardHeader>
        <CCardBody
          style={{
            // backgroundColor: '#fff9db',
            //   backgroundImage: `url(${github})`,
            backgroundSize: '33% 30%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right -12px bottom -40px',
          }}
        >
          <Column {...config} />
        </CCardBody>
      </CCard>
    </>
  )
}

export default tempCharts
