import axios from 'axios'
import reduxCreateStore from 'redux/createStore'
import { assert, sandbox } from 'sinon'
import { default as cookies } from 'utils/cookieHelper'
import { actions } from 'ACTIONS/user'

describe('(Redux Module) user', () => {
  let store, axiosGet, axiosPost
  beforeEach(() => {
    sandbox.create()
    store = reduxCreateStore({})
    axiosGet = sandbox.stub(axios, 'get')
    axiosPost = sandbox.stub(axios, 'post')
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('signOut', () => {
    it('should have state initialized', () => {
      expect(store.getState().user.signIn).deep.equal({ data: undefined, error: undefined, sending: false })
    })

    it('should call cookies.logout route with query', () => {
      const logoutStub = sandbox.stub(cookies, 'logout')
      actions.signOut(store.dispatch)()
      assert.calledWithExactly(logoutStub)
      expect(store.getState().user.signIn).deep.equal({ data: undefined, error: undefined, sending: false })
    })
  })

  describe('signIn', () => {
    it('should have state initialized', () => {
      expect(store.getState().user.signIn).deep.equal({ data: undefined, error: undefined, sending: false })
    })

    it('should call /login route', () => {
      axiosPost.returns(Promise.resolve({ data: { _id: 'foo' } }))
      actions.signIn(store.dispatch)({ email: 'foo@bar.com', password: 'baz', unused: 'qux' })
      sinon.assert.calledWithExactly(axiosPost, '/login', { email: 'foo@bar.com', password: 'baz' })
    })

    it('should update state after SIGN_IN_SENDING (while promise is still executing)', () => {
      axiosPost.returns(Promise.resolve())
      actions.signIn(store.dispatch)('someData')
      expect(store.getState().user.signIn).deep.equal({ data: undefined, error: undefined, sending: true })
    })

    it('should update state after SIGN_IN_FAILURE (promise fail)', (done) => {
      axiosPost.returns(Promise.reject('someError'))
      actions.signIn(store.dispatch)('someData')
      setTimeout(() => {
        expect(store.getState().user.signIn).deep.equal({ data: undefined, error: 'someError', sending: false })
        done()
      }, 0)
    })

    it('should update state after SIGN_IN_SUCCESS (promise success)', (done) => {
      axiosPost.returns(Promise.resolve({ data: { _id: 'someId' } }))
      const saveUserIdStub = sandbox.stub(cookies, 'saveUserId')
      actions.signIn(store.dispatch)('someData')
      setTimeout(() => {
        assert.calledWithExactly(saveUserIdStub, 'someId')
        expect(store.getState().user.signIn).deep.equal({ data: { _id: 'someId' }, error: undefined, sending: false })
        done()
      })
    })
  })

  describe('tryToReconnect', () => {
    let replaceSpy
    beforeEach(() => {
      replaceSpy = sandbox.spy()
    })

    it('should have state initialized', () => {
      expect(store.getState().user.signIn).deep.equal({ data: undefined, error: undefined, sending: false })
    })

    it('should update state to SIGN_IN_SUCCESS if cookies and redirect to nextState', (done) => {
      const getTokenStub = sandbox.stub(cookies, 'getToken').returns('aToken')
      const getUserId = sandbox.stub(cookies, 'getUserId').returns('aUserId')
      axiosGet.returns(Promise.resolve({ data: 'someUserData' }))
      actions.tryToReconnect(store)({ location: { pathname: '/somewhere_else', search: '?a=123' } }, replaceSpy)
      assert.calledWithExactly(getTokenStub)
      assert.callCount(getTokenStub, 1)
      assert.calledWithExactly(getUserId)
      assert.calledWithExactly(axiosGet, '/users/aUserId')
      setTimeout(() => {
        expect(store.getState().user.signIn).deep.equal({ data: 'someUserData', error: undefined, sending: false })
        assert.calledWithExactly(replaceSpy, { pathname: '/somewhere_else', search: '?a=123' })
        actions.tryToReconnect(store)({ location: { pathname: '/somewhere_else', search: '?a=123' } }, replaceSpy)
        assert.callCount(getTokenStub, 1)
        done()
      }, 0)
    })

    it('should not login if no token and redirect to connexion with no cookies', () => {
      const getTokenStub = sandbox.stub(cookies, 'getToken').returns(undefined)
      const getUserId = sandbox.stub(cookies, 'getUserId').returns('aUserId')
      const logout = sandbox.stub(cookies, 'logout')
      axiosGet.returns(Promise.resolve({ data: 'someUserData' }))
      actions.tryToReconnect(store)({ location: { pathname: '/path' } }, replaceSpy)
      assert.calledWithExactly(getTokenStub)
      assert.notCalled(getUserId)
      assert.notCalled(axiosGet)
      assert.calledWithExactly(logout)
      assert.calledWithExactly(replaceSpy, { pathname: 'connexion', search: '?redirect=/path' })
      expect(store.getState().user.signIn).deep.equal({ data: undefined, error: undefined, sending: false })
    })

    it('should not login if no userId and redirect to connexion with no cookies', () => {
      const getTokenStub = sandbox.stub(cookies, 'getToken').returns('aToken')
      const getUserId = sandbox.stub(cookies, 'getUserId').returns(undefined)
      const logout = sandbox.stub(cookies, 'logout')
      axiosGet.returns(Promise.resolve({ data: 'someUserData' }))
      actions.tryToReconnect(store)({ location: { pathname: '/path' } }, replaceSpy)
      assert.calledWithExactly(getTokenStub)
      assert.calledWithExactly(getUserId)
      assert.notCalled(axiosGet)
      assert.calledWithExactly(logout)
      assert.calledWithExactly(replaceSpy, { pathname: 'connexion', search: '?redirect=/path' })
      expect(store.getState().user.signIn).deep.equal({ data: undefined, error: undefined, sending: false })
    })

    it('should redirect to connexion with location search', () => {
      const getTokenStub = sandbox.stub(cookies, 'getToken').returns(undefined)
      const getUserId = sandbox.stub(cookies, 'getUserId').returns('aUserId')
      const logout = sandbox.stub(cookies, 'logout')
      axiosGet.returns(Promise.resolve({ data: 'someUserData' }))
      actions.tryToReconnect(store)({ location: { pathname: '/path', search: '?a=foo' } }, replaceSpy)
      assert.calledWithExactly(getTokenStub)
      assert.notCalled(getUserId)
      assert.notCalled(axiosGet)
      assert.calledWithExactly(logout)
      assert.calledWithExactly(replaceSpy, { pathname: 'connexion', search: '?redirect=/path?a=foo' })
      expect(store.getState().user.signIn).deep.equal({ data: undefined, error: undefined, sending: false })
    })

    it('should update state to SIGN_IN_FAILURE when trying to reconnect fails', (done) => {
      const getTokenStub = sandbox.stub(cookies, 'getToken').returns('aToken')
      const getUserId = sandbox.stub(cookies, 'getUserId').returns('aUserId')
      const logout = sandbox.stub(cookies, 'logout')
      axiosGet.returns(Promise.reject('someError'))
      actions.tryToReconnect(store)({ location: { pathname: '/somewhere_else', search: '?a=123' } }, replaceSpy)
      assert.calledWithExactly(getTokenStub)
      assert.calledWithExactly(getUserId)
      assert.calledWithExactly(axiosGet, '/users/aUserId')
      setTimeout(() => {
        assert.notCalled(logout)
        expect(store.getState().user.signIn).deep.equal({ data: undefined, error: 'someError', sending: false })
        assert.notCalled(replaceSpy)
        done()
      }, 0)
    })
  })
})
