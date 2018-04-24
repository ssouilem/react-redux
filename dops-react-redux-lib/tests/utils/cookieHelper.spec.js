/* eslint no-unused-expressions: 0 */
import { sandbox } from 'sinon'
import { default as cookies } from 'utils/cookieHelper'

describe('(Helpers) cookie helper test', () => {
  beforeEach(() => {
    sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('getToken', () => {
    it('should return cookie.load called with tokenFront', () => {
      const cookieLoadStub = sandbox.stub(cookies.cookies, 'get')
      cookieLoadStub.withArgs('tokenFront').returns('calledWithTokenFront')
      expect(cookies.getToken()).to.equal('calledWithTokenFront')
    })
  })

  describe('getUserId', () => {
    it('should return cookie.load called with userId', () => {
      const cookieLoadStub = sandbox.stub(cookies.cookies, 'get')
      cookieLoadStub.withArgs('userId').returns('calledWithUserId')
      expect(cookies.getUserId()).to.equal('calledWithUserId')
    })
  })

  describe('saveToken', () => {
    it('should call cookie.save with token parameter', () => {
      const cookieSaveStub = sandbox.stub(cookies.cookies, 'set')
      cookies.saveToken('someToken')
      sandbox.assert.calledWithExactly(cookieSaveStub, 'tokenFront', 'someToken', { httpOnly: false, secure: false })
    })
  })
  describe('saveUserId', () => {
    it('should call cookie.save with userId parameter', () => {
      const cookieSaveStub = sandbox.stub(cookies.cookies, 'set')
      cookies.saveUserId('someUserId')
      sandbox.assert.calledWithExactly(cookieSaveStub, 'userId', 'someUserId', { httpOnly: false, secure: false })
    })
  })
  describe('logout', () => {
    it('should call cookie.remove with tokenFront', () => {
      const cookieRemoveStub = sandbox.stub(cookies.cookies, 'remove')
      cookies.logout()
      sandbox.assert.calledWithExactly(cookieRemoveStub, 'tokenFront')
    })
  })
})
