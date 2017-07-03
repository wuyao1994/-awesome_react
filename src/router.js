/**
 * Created by elvis on 2017/7/3.
 */
import React from 'react'
import PropTypes from 'react-types'
import { Router } from 'dva/router'
import App from './routes/app'

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
};
const Routers = function ({ history, app }) {

};

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.app
};

export default Routers
