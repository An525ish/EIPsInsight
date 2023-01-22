import React from 'react'
import ReactLoading from 'react-loading'
import './loading.module.css'

const Loading = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ReactLoading type="bubbles" color="#1c7ed6" height={100} width={60} />
    </div>
  )
}

export default Loading
