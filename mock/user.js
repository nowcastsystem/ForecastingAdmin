
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default [
  // user login
  {
    url: '/user/loogin',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  // plot prediction graph
  {
    url: '/testpredict',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        token: 'success',
        past: {
          yAxisData: [100, 120, 161, 134, 105, 160, 165, 190, 200, 250],
          xAxisData: ['2019-7-13', '2019-7-14', '2019-7-15', '2019-7-16', '2019-7-17', '2019-7-18', '2019-7-19', '2019-7-20', '2019-7-21', '2019-7-22'],
          label: 'Past',
          colorPicked: '#999997',
          twoLines: true,
          yAxisData2: [30, 140, 150, 200, 150, 170, 165, 170, 150, 230],
          label2: 'Prediction',
          colorPicked2: '#999997'
        },
        future: {
          yAxisData: [260, 230, 270, 285, 295, 300, 310, 330],
          xAxisData: ['2019-8-13', '2019-8-14', '2019-8-15', '2019-8-16', '2019-8-17', '2019-8-18', '2019-8-19', '2019-8-20'],
          label: 'Future',
          colorPicked: '#519e19'
        }
      }
    }
  }
]
