/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable react/no-children-prop */
import { CCardBody } from '@coreui/react'
import {
  CCard,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ip } from 'src/constants'
import Loading from '../theme/loading/loading'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

import './EIPs.css'

const EIPs = () => {
  const params = useParams()
  const [data, setData] = useState()
  const [allData, setAllData] = useState()
  const [loading, setLoading] = useState(false)

  const fetchAllData = async () => {
    try {
      const res = await fetch(`${ip}/rawData`, {
        // method: 'GET',
        // headers: {
        //   Accept: 'application/json',
        //   'Content-Type': 'application',
        // },
        // credentials: 'include',
      })
      let datas = []
      datas = await res.json()

      setData(datas)

      const filterData = datas.filter(function (e) {
        return e.data.eip === parseInt(params.id)
      })

      setAllData(filterData)
      setLoading(true)
    } catch (err) {}
  }

  const factorAuthor = (data) => {
    let ans
    //
    let list = data.split(',')
    //
    for (let i = 0; i < list.length; i++) {
      list[i] = list[i].split(' ')
    }
    //
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

  useEffect(() => {
    fetchAllData()
  }, [])

  return (
    <div>
      {loading ? (
        <div>
          <div className='eips-heading'
            style={{
              fontSize: '30px',
              fontWeight: '400',
              marginBottom: '10px',
              backgroundColor: 'white',
              border: 'none',

              padding: '15px',
              borderRadius: '5px',
              borderLeft: `4px solid #339af0`,
              borderBottom: `2px solid #339af0`,
              marginTop: '2rem',
              display: 'inline-block',
              color: `#339af0`,
            }}
          >
            <label className="font-[900]">
              EIP-{allData === undefined ? 0 : allData[0]?.data?.eip}:
            </label>{' '}
            {allData === undefined ? 0 : allData[0]?.data?.title}
          </div>
          <CCard className='eips-card-container'>
            <CCardBody>
              <CTable align="middle" responsive bordered stripedColumns>
                <CTableBody>
                  <CTableRow>
                    <CTableDataCell className="bg-[#e9ecef] font-[900]">Author</CTableDataCell>
                    <CTableDataCell>
                      <div className="flex">
                        {factorAuthor(allData[0]?.data?.author).map((item, index) => {
                          let t = item[item.length - 1].substring(
                            1,
                            item[item.length - 1].length - 1,
                          )

                          return (
                            <div key={index} className="mr-1">
                              <a
                                key={index}
                                href={`${
                                  item[item.length - 1].substring(
                                    item[item.length - 1].length - 1,
                                  ) === '>'
                                    ? 'mailto:' + t
                                    : 'https://github.com/' + t.substring(1)
                                }`}
                                className="hover:border-b-[#339af0] hover:border-b-[2px] text-[#339af0]"
                              >
                                {getString(item)}
                                {index === factorAuthor(allData[0]?.data?.author).length - 1
                                  ? ''
                                  : ', '}
                              </a>
                            </div>
                          )
                        })}
                      </div>
                      {/* {allData === undefined ? 0 : allData[0]?.data?.author} */}
                      {/* {factorAuthor(allData[0]?.data?.author)} */}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell className="bg-[#e9ecef] font-[900]">Status</CTableDataCell>
                    <CTableDataCell className="bg-[#f1f3f5]">
                      {allData === undefined ? 0 : allData[0]?.data?.status}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell className="bg-[#e9ecef] font-[900]">Type</CTableDataCell>
                    <CTableDataCell>
                      {allData === undefined ? 0 : allData[0]?.data?.type}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell className="bg-[#e9ecef] font-[900]">Created</CTableDataCell>
                    <CTableDataCell className="bg-[#f1f3f5]">
                      {allData === undefined ? 0 : allData[0]?.data?.created.substring(0, 10)}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>

              <ReactMarkdown
                children={allData === undefined ? '' : allData[0]?.content}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  h2: ({ node, ...props }) => (
                    <h2
                      style={{
                        fontSize: '17px',
                        fontWeight: 'bold',
                        color: `#339af0`,
                        // borderBottom: `2px solid #339af0`,
                        borderLeft: `4px solid #339af0`,
                        display: 'inline-block',
                      }}
                      className="my-3 px-2 rounded-sm"
                      {...props}
                    />
                  ),
                  h1: ({ node, ...props }) => (
                    <h2
                      style={{
                        fontSize: '22px',
                        fontWeight: 'bold',
                        color: `#339af0`,
                        borderBottom: `2px solid #339af0`,
                        borderLeft: `4px solid #339af0`,
                        display: 'inline-block',
                      }}
                      className="my-3 px-2 rounded-sm"
                      {...props}
                    />
                  ),
                  h3: ({ node, ...props }) => (
                    <h2
                      style={{
                        fontSize: '17px',
                        fontWeight: 'bold',
                        color: `#339af0`,
                        // borderBottom: `2px solid #339af0`,
                        borderLeft: `4px solid #339af0`,
                        display: 'inline-block',
                      }}
                      className="my-3 px-2 rounded-sm"
                      {...props}
                    />
                  ),
                }}
              />
            </CCardBody>
          </CCard>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default EIPs
