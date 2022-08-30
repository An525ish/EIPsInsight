/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
import {
  CButton,
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CForm,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import { async } from '@firebase/util'
import { React, useEffect, useState } from 'react'
import { ip } from 'src/constants'

const mForm = () => {
  const [visible, setVisible] = useState(false)
  const [user, setUser] = useState({
    name: '',
    year: '',
    summary: {
      Draft: '',
      Final: '',
      LastCall: '',
      Review: '',
      Stagnant: '',
      Withdrawn: '',
      Living: '',
      SummaryInfo: '',
      HighlightText: '',
    },
    Draft: {
      Core: '',
      ERC: '',
      Networking: '',
      Interface: '',
    },
    Final: {
      Core: '',
      ERC: '',
      Networking: '',
      Interface: '',
    },
    Review: {
      Core: '',
      ERC: '',
      Networking: '',
      Interface: '',
    },
    LastCall: {
      Core: '',
      ERC: '',
      Networking: '',
      Interface: '',
    },
    Stagnant: {
      Core: '',
      ERC: '',
      Networking: '',
      Interface: '',
    },
    Withdrawn: {
      Core: '',
      ERC: '',
      Networking: '',
      Interface: '',
    },
    Living: {
      Core: '',
      ERC: '',
      Networking: '',
      Interface: '',
    },
    GeneralStats: {
      OpenPR: '',
      MergedPR: '',
      ClosedIssues: '',
      NewIssues: '',
    },
    OtherStats: {
      Forks: '',
      Users: '',
      Authors: '',
      Files: '',
    },
  })
  let name, value, id
  const handleInputs = (e) => {
    console.log(e)
    name = e.target.name
    value = e.target.value
    id = e.target.id
    console.log(e.target.id)
    if (name === 'name') {
      setUser({ ...user, name: value })
    } else if (name === 'year') {
      setUser({ ...user, year: value })
    } else if (
      id === 'draftCore' ||
      id === 'draftERC' ||
      id === 'draftNetworking' ||
      id === 'draftInterface'
    ) {
      setUser({
        ...user,
        Draft: {
          ...user.Draft,
          [name]: value,
        },
      })
    } else if (
      id === 'finalCore' ||
      id === 'finalERC' ||
      id === 'finalNetworking' ||
      id === 'finalInterface'
    ) {
      setUser({
        ...user,
        Final: {
          ...user.Final,
          [name]: value,
        },
      })
    } else if (
      id === 'reviewCore' ||
      id === 'reviewERC' ||
      id === 'reviewNetworking' ||
      id === 'reviewInterface'
    ) {
      setUser({
        ...user,
        Review: {
          ...user.Review,
          [name]: value,
        },
      })
    } else if (
      id === 'lastCallCore' ||
      id === 'lastCallERC' ||
      id === 'lastCallNetworking' ||
      id === 'lastCallInterface'
    ) {
      setUser({
        ...user,
        LastCall: {
          ...user.LastCall,
          [name]: value,
        },
      })
    } else if (
      id === 'stagnantCore' ||
      id === 'stagnantERC' ||
      id === 'stagnantNetworking' ||
      id === 'stagnantInterface'
    ) {
      setUser({
        ...user,
        Stagnant: {
          ...user.Stagnant,
          [name]: value,
        },
      })
    } else if (
      id === 'withdrawnCore' ||
      id === 'withdrawnERC' ||
      id === 'withdrawnNetworking' ||
      id === 'withdrawnInterface'
    ) {
      setUser({
        ...user,
        Withdrawn: {
          ...user.Withdrawn,
          [name]: value,
        },
      })
    } else if (
      id === 'livingCore' ||
      id === 'livingERC' ||
      id === 'livingNetworking' ||
      id === 'livingInterface'
    ) {
      setUser({
        ...user,
        Living: {
          ...user.Living,
          [name]: value,
        },
      })
    } else if (
      id === 'gOpenPR' ||
      id === 'gMergedPR' ||
      id === 'gClosedIssues' ||
      id === 'gNewIssues'
    ) {
      setUser({
        ...user,
        GeneralStats: {
          ...user.GeneralStats,
          [name]: value,
        },
      })
    } else if (id === 'oForks' || id === 'oAuthors' || id === 'oFiles' || id === 'oUsers') {
      setUser({
        ...user,
        OtherStats: {
          ...user.OtherStats,
          [name]: value,
        },
      })
    } else {
      setUser({
        ...user,
        summary: {
          ...user.summary,
          [name]: value,
        },
      })
    }
  }
  const PostData = async () => {
    console.log(user)
    const {
      name,
      year,
      summary,
      Draft,
      Final,
      Review,
      LastCall,
      Stagnant,
      Withdrawn,
      Living,
      GeneralStats,
      OtherStats,
    } = user
    const res = await fetch(`${ip}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        year,
        summary,
        Draft,
        Final,
        Review,
        LastCall,
        Stagnant,
        Withdrawn,
        Living,
        GeneralStats,
        OtherStats,
      }),
    })

    const data = await res.json()
    if (data.status === 422 || !data) {
      window.alert('Invalid Registration')
    } else {
      window.alert('Registration Successful!!')
      setUser({
        name: '',
        year: '',
        summary: {
          Draft: '',
          Final: '',
          LastCall: '',
          Review: '',
          Stagnant: '',
          Withdrawn: '',
          Living: '',
          SummaryInfo: '',
          HighlightText: '',
        },
        Draft: {
          Core: '',
          ERC: '',
          Networking: '',
          Interface: '',
        },
        Final: {
          Core: '',
          ERC: '',
          Networking: '',
          Interface: '',
        },
        Review: {
          Core: '',
          ERC: '',
          Networking: '',
          Interface: '',
        },
        LastCall: {
          Core: '',
          ERC: '',
          Networking: '',
          Interface: '',
        },
        Stagnant: {
          Core: '',
          ERC: '',
          Networking: '',
          Interface: '',
        },
        Withdrawn: {
          Core: '',
          ERC: '',
          Networking: '',
          Interface: '',
        },
        Living: {
          Core: '',
          ERC: '',
          Networking: '',
          Interface: '',
        },
        GeneralStats: {
          OpenPR: '',
          MergedPR: '',
          ClosedIssues: '',
          NewIssues: '',
        },
        OtherStats: {
          Forks: '',
          Users: '',
          Authors: '',
          Files: '',
        },
      })
    }
  }
  const allData = async () => {
    try {
      const res = await fetch(`${ip}/register`, {
        // method: 'GET',
        // headers: {
        //   Accept: 'application/json',
        //   'Content-Type': 'application',
        // },
        // credentials: 'include',
      })
      const data = await res.json()
      console.log(data)

      if (!res.status === 200) {
        const error = new Error(res.error)
        throw error
      }
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    allData()
  }, [])
  return (
    <>
      <div
        style={{
          fontSize: '40px',
          fontWeight: '800',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textTransform: 'uppercase',
        }}
      >
        Months Form
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CDropdown>
          <CDropdownToggle color="secondary">Other Action</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem href="/#/UpdateForm">Update Form</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </div>
      <p className="h3" style={{ fontWeight: '700', fontFamily: 'Roboto' }}>
        Summary
      </p>
      <hr />
      <CForm method="POST" className="row g-3 align-items-center">
        <CCol md={6}>
          <CFormInput
            type="text"
            id="inputEmail4"
            label="Month Name"
            name="name"
            value={user.name}
            onChange={handleInputs}
          />
        </CCol>
        <CCol md={6}>
          <CFormInput
            type="text"
            id="inputEmail4"
            label="Year"
            name="year"
            value={user.year}
            onChange={handleInputs}
          />
        </CCol>
        <CCol md={3}>
          <CFormInput
            type="text"
            id="inputEmail4"
            label="Draft"
            name="Draft"
            value={user.summary.Draft}
            onChange={handleInputs}
          />
        </CCol>
        <CCol md={3}>
          <CFormInput
            type="text"
            id="inputPassword4"
            label="Final"
            name="Final"
            value={user.summary.Final}
            onChange={handleInputs}
          />
        </CCol>
        <CCol md={3}>
          <CFormInput
            type="text"
            id="inputEmail4"
            label="Last Call"
            name="LastCall"
            value={user.summary.LastCall}
            onChange={handleInputs}
          />
        </CCol>
        <CCol md={3}>
          <CFormInput
            type="text"
            id="inputPassword4"
            label="Review"
            name="Review"
            value={user.summary.Review}
            onChange={handleInputs}
          />
        </CCol>
        <CCol md={4}>
          <CFormInput
            type="text"
            id="inputEmail4"
            label="Stagnant"
            name="Stagnant"
            value={user.summary.Stagnant}
            onChange={handleInputs}
          />
        </CCol>
        <CCol md={4}>
          <CFormInput
            type="text"
            id="inputPassword4"
            label="Withdrawn"
            name="Withdrawn"
            value={user.summary.Withdrawn}
            onChange={handleInputs}
          />
        </CCol>
        <CCol md={4}>
          <CFormInput
            type="text"
            id="inputPassword4"
            label="Living"
            name="Living"
            value={user.summary.Living}
            onChange={handleInputs}
          />
        </CCol>

        <CFormTextarea
          id="summaryText"
          label="Summary Info"
          rows="3"
          text="Must be 8-20 words long."
          name="SummaryInfo"
          value={user.summary.SummaryInfo}
          onChange={handleInputs}
        ></CFormTextarea>

        <CFormTextarea
          id="highlightText"
          label="Highlight Text"
          rows="3"
          text="Must be 8-20 words long."
          name="HighlightText"
          value={user.summary.HighlightText}
          onChange={handleInputs}
        ></CFormTextarea>

        <p className="h3" style={{ fontWeight: '700', fontFamily: 'Roboto' }}>
          Charts Data
        </p>
        <hr />

        <p className="h5" style={{ fontWeight: '600', fontFamily: 'Roboto' }}>
          Draft
        </p>
        <CCol md={3}>
          <CFormInput
            type="text"
            id="draftCore"
            label="Core"
            name="Core"
            value={user.Draft.Core}
            onChange={handleInputs}
          />
        </CCol>
        <CCol md={3}>
          <CFormInput
            type="text"
            id="draftERC"
            label="ERC"
            name="ERC"
            value={user.Draft.ERC}
            onChange={handleInputs}
          />
        </CCol>
        <CCol md={3}>
          <CFormInput
            type="text"
            id="draftNetworking"
            label="Networking"
            name="Networking"
            value={user.Draft.Networking}
            onChange={handleInputs}
          />
        </CCol>
        <CCol md={3}>
          <CFormInput
            type="text"
            id="draftInterface"
            label="Interface"
            name="Interface"
            value={user.Draft.Interface}
            onChange={handleInputs}
          />
        </CCol>
        <p className="h5" style={{ fontWeight: '600', fontFamily: 'Roboto' }}>
          Final
        </p>
        <CCol md={3}>
          <CFormInput
            type="text"
            id="finalCore"
            label="Core"
            name="Core"
            value={user.Final.Core}
            onChange={handleInputs}
          />
        </CCol>
        <CCol md={3}>
          <CFormInput
            type="text"
            id="finalERC"
            label="ERC"
            name="ERC"
            value={user.Final.ERC}
            onChange={handleInputs}
          />
        </CCol>
        <CCol md={3}>
          <CFormInput
            type="text"
            id="finalNetworking"
            label="Networking"
            name="Networking"
            value={user.Final.Networking}
            onChange={handleInputs}
          />
        </CCol>
        <CCol md={3}>
          <CFormInput
            type="text"
            id="finalInterface"
            label="Interface"
            name="Interface"
            value={user.Final.Interface}
            onChange={handleInputs}
          />
        </CCol>
        <p className="h5" style={{ fontWeight: '600', fontFamily: 'Roboto' }}>
          Review
        </p>
        <CCol md={3}>
          <CFormInput
            type="text"
            id="reviewCore"
            label="Core"
            name="Core"
            value={user.Review.Core}
            onChange={handleInputs}
          />
        </CCol>
        <CCol md={3}>
          <CFormInput
            type="text"
            id="reviewERC"
            label="ERC"
            name="ERC"
            value={user.Review.ERC}
            onChange={handleInputs}
          />
        </CCol>
        <CCol md={3}>
          <CFormInput
            type="text"
            id="reviewNetworking"
            label="Networking"
            name="Networking"
            value={user.Review.Networking}
            onChange={handleInputs}
          />
        </CCol>
        <CCol md={3}>
          <CFormInput
            type="text"
            id="reviewInterface"
            label="Interface"
            name="Interface"
            value={user.Review.Interface}
            onChange={handleInputs}
          />
        </CCol>
        <p className="h5" style={{ fontWeight: '600', fontFamily: 'Roboto' }}>
          Last Call
        </p>
        <CCol md={3}>
          <CFormInput
            type="text"
            id="lastCallCore"
            label="Core"
            name="Core"
            value={user.LastCall.Core}
            onChange={handleInputs}
          />
        </CCol>
        <CCol md={3}>
          <CFormInput
            type="text"
            id="lastCallERC"
            label="ERC"
            name="ERC"
            value={user.LastCall.ERC}
            onChange={handleInputs}
          />
        </CCol>
        <CCol md={3}>
          <CFormInput
            type="text"
            id="lastCallNetworking"
            label="Networking"
            name="Networking"
            value={user.LastCall.Networking}
            onChange={handleInputs}
          />
        </CCol>
        <CCol md={3}>
          <CFormInput
            type="text"
            id="lastCallInterface"
            label="Interface"
            name="Interface"
            value={user.LastCall.Interface}
            onChange={handleInputs}
          />
        </CCol>
        <p className="h5" style={{ fontWeight: '600', fontFamily: 'Roboto' }}>
          Stagnant
        </p>
        <CCol md={3}>
          <CFormInput
            type="text"
            id="stagnantCore"
            label="Core"
            name="Core"
            value={user.Stagnant.Core}
            onChange={handleInputs}
          />
        </CCol>
        <CCol md={3}>
          <CFormInput
            type="text"
            id="stagnantERC"
            label="ERC"
            name="ERC"
            value={user.Stagnant.ERC}
            onChange={handleInputs}
          />
        </CCol>
        <CCol md={3}>
          <CFormInput
            type="text"
            id="stagnantNetworking"
            label="Networking"
            name="Networking"
            value={user.Stagnant.Networking}
            onChange={handleInputs}
          />
        </CCol>
        <CCol md={3}>
          <CFormInput
            type="text"
            id="stagnantInterface"
            label="Interface"
            name="Interface"
            value={user.Stagnant.Interface}
            onChange={handleInputs}
          />
        </CCol>
        <p className="h5" style={{ fontWeight: '600', fontFamily: 'Roboto' }}>
          Withdrawn
        </p>
        <CCol md={3}>
          <CFormInput
            type="text"
            id="withdrawnCore"
            label="Core"
            name="Core"
            value={user.Withdrawn.Core}
            onChange={handleInputs}
          />
        </CCol>
        <CCol md={3}>
          <CFormInput
            type="text"
            id="withdrawnERC"
            label="ERC"
            name="ERC"
            value={user.Withdrawn.ERC}
            onChange={handleInputs}
          />
        </CCol>
        <CCol md={3}>
          <CFormInput
            type="text"
            id="withdrawnNetworking"
            label="Networking"
            name="Networking"
            value={user.Withdrawn.Networking}
            onChange={handleInputs}
          />
        </CCol>
        <CCol md={3}>
          <CFormInput
            type="text"
            id="withdrawnInterface"
            label="Interface"
            name="Interface"
            value={user.Withdrawn.Interface}
            onChange={handleInputs}
          />
        </CCol>
        <p className="h5" style={{ fontWeight: '600', fontFamily: 'Roboto' }}>
          Living
        </p>
        <CCol md={3}>
          <CFormInput
            type="text"
            id="livingCore"
            label="Core"
            name="Core"
            value={user.Living.Core}
            onChange={handleInputs}
          />
        </CCol>
        <CCol md={3}>
          <CFormInput
            type="text"
            id="livingERC"
            label="ERC"
            name="ERC"
            value={user.Living.ERC}
            onChange={handleInputs}
          />
        </CCol>
        <CCol md={3}>
          <CFormInput
            type="text"
            id="livingNetworking"
            label="Networking"
            name="Networking"
            value={user.Living.Networking}
            onChange={handleInputs}
          />
        </CCol>
        <CCol md={3}>
          <CFormInput
            type="text"
            id="livingInterface"
            label="Interface"
            name="Interface"
            value={user.Living.Interface}
            onChange={handleInputs}
          />
        </CCol>
        <hr />
        <p className="h5" style={{ fontWeight: '600', fontFamily: 'Roboto' }}>
          General Stats
        </p>
        <CCol md={3}>
          <CFormInput
            type="text"
            id="gOpenPR"
            label="Open PR"
            name="OpenPR"
            value={user.GeneralStats.OpenPR}
            onChange={handleInputs}
          />
        </CCol>
        <CCol md={3}>
          <CFormInput
            type="text"
            id="gMergedPR"
            label="Merged PR"
            name="MergedPR"
            value={user.GeneralStats.MergedPR}
            onChange={handleInputs}
          />
        </CCol>
        <CCol md={3}>
          <CFormInput
            type="text"
            id="gClosedIssues"
            label="Closed Issues"
            name="ClosedIssues"
            value={user.GeneralStats.ClosedIssues}
            onChange={handleInputs}
          />
        </CCol>
        <CCol md={3}>
          <CFormInput
            type="text"
            id="gNewIssues"
            label="New Issues"
            name="NewIssues"
            value={user.GeneralStats.NewIssues}
            onChange={handleInputs}
          />
        </CCol>
        <p className="h5" style={{ fontWeight: '600', fontFamily: 'Roboto' }}>
          Other Stats
        </p>
        <CCol md={3}>
          <CFormInput
            type="text"
            id="oForks"
            label="Forks"
            name="Forks"
            value={user.OtherStats.Forks}
            onChange={handleInputs}
          />
        </CCol>
        <CCol md={3}>
          <CFormInput
            type="text"
            id="oUsers"
            label="Users"
            name="Users"
            value={user.OtherStats.Users}
            onChange={handleInputs}
          />
        </CCol>
        <CCol md={3}>
          <CFormInput
            type="text"
            id="oAuthors"
            label="Authors"
            name="Authors"
            value={user.OtherStats.Authors}
            onChange={handleInputs}
          />
        </CCol>
        <CCol md={3}>
          <CFormInput
            type="text"
            id="oFiles"
            label="Files"
            name="Files"
            value={user.OtherStats.Files}
            onChange={handleInputs}
          />
        </CCol>

        <CCol xs={12}>
          <CButton
            type="submit"
            onClick={(e) => {
              e.preventDefault()
              setVisible(!visible)
            }}
          >
            Submit
          </CButton>
          <CModal visible={visible} onClose={() => setVisible(false)}>
            <CModalHeader onClose={() => setVisible(false)}>
              <CModalTitle>Final Step...</CModalTitle>
            </CModalHeader>
            <CModalBody>Are You Sure?</CModalBody>
            <CModalFooter>
              <CButton
                color="secondary"
                onClick={() => {
                  setVisible(false)
                }}
              >
                No
              </CButton>
              <CButton
                color="primary"
                onClick={() => {
                  setVisible(false)
                  PostData()
                }}
              >
                Yes
              </CButton>
            </CModalFooter>
          </CModal>
        </CCol>
      </CForm>
    </>
  )
}

export default mForm
