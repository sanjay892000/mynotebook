import React from 'react'

function Alert(props) {
  return (
    <>
      <div style={{ height: '60px'}}>
        {props.alerts && <div className={`alert alert-${props.alerts.type} alert-dismissible position-sticky`} role="alert">
          <strong>{props.alerts.status}!</strong> {props.alerts.massage}
        </div>}
      </div>
    </>
  )
}

export default Alert
