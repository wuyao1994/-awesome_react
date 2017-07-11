import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'

function Dashboard ({ dashboard }) {
  return (
    <div>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </div>
  )
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
}

export default connect(({ dashboard }) => ({ dashboard }))(Dashboard)
