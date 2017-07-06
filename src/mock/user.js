const qs = require('qs');
const Mock = require('mockjs');
const config = require('../utils/config');
const { apiPrefix } = config;

const userPermission = {
  DEFAULT: [
    'dashboard', 'chart',
  ],
  ADMIN: [
    'dashboard', 'users', 'UIElement', 'UIElementIconfont', 'chart',
  ],
  DEVELOPER: ['dashboard', 'users', 'UIElement', 'UIElementIconfont', 'chart'],
};

const adminUsers = [
  {
    id: 0,
    username: 'admin',
    password: 'admin',
    permissions: userPermission.ADMIN,
  }, {
    id: 1,
    username: 'guest',
    password: 'guest',
    permissions: userPermission.DEFAULT,
  }, {
    id: 2,
    username: '吴彦祖',
    password: '123456',
    permissions: userPermission.DEVELOPER,
  },
];

const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  let data;

  for (let item of array) {
    if (item[keyAlias] === key) {
      data = item;
      break
    }
  }

  if (data) {
    return data
  }
  return null
};

const NOTFOUND = {
  message: 'Not Found',
  documentation_url: 'http://localhost:8000/request',
};

module.exports = {
  [`POST ${apiPrefix}/user/login`] (req, res) {
    const {username, password} = req.body;
    const user = adminUsers.filter((item) => item.username === username);
    if (user.length > 0 && user[0].password === password) {
      const now = new Date();
      now.setDate(now.getDate() + 1);
      res.cookie('token', JSON.stringify({id: user[0].id, deadline: now.getTime()}), {
        maxAge: 90000,
        httpOnly: true,
      })
    } else {
      res.status(400).end()
    }
  },

  [`GET ${apiPrefix}/user`] (req, res) {
    const cookie = req.headers.cookie || ''
    const cookies = qs.parse(cookie.replace(/\s/g, ''), { delimiter: ';' })
    const response = {}
    const user = {}
    if (!cookies.token) {
      res.status(200).send({ message: 'Not Login' })
      return
    }
    const token = JSON.parse(cookies.token)
    if (token) {
      response.success = token.deadline > new Date().getTime()
    }
    if (response.success) {
      const userItem = adminUsers.filter(_ => _.id === token.id)
      if (userItem.length > 0) {
        user.permissions = userItem[0].permissions
        user.username = userItem[0].username
        user.id = userItem[0].id
      }
    }
    response.user = user
    res.json(response)
  }
}
