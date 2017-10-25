import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { config } from '../utils'
import { withRouter } from 'dva/router'
const { prefix } = config


const App = ({ children, location, dispatch, app, loading }) => {
  if (config.openPages && config.openPages.indexOf(location.pathname) > -1) {
    return <div>{children}</div>
  }

  return (<div>
    {children}
  </div>)
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
}

export default withRouter(connect(({ app, loading }) => ({ app, loading }))(App))
