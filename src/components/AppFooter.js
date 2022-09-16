import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div className="ms-auto">
        <span className="me-1"> Made with ❤️ by </span>
        <a href="https://Avarch.org" target="_blank" rel="noopener noreferrer">
          Avarch.org
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
