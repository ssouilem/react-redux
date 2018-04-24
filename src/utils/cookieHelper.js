import Cookies from 'universal-cookie'

const cookies = new Cookies()

const getToken = () => cookies.get('connect.sid')

const getUserId = () => cookies.get('userId')

const logout = () => {
  cookies.remove('tokenFront')
  cookies.remove('userId')
}

const saveToken = (token) => {
  cookies.set('tokenFront', token, {
    secure: __PROD__,
    httpOnly: false,
  })
}

const saveUserId = (userId) => {
  cookies.set('userId', userId, {
    secure: __PROD__,
    httpOnly: false,
  })
}

export default {
  cookies,
  getToken,
  logout,
  saveToken,
  saveUserId,
  getUserId,
}
