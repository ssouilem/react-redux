import createMiddleware from 'MIDDLEWARE/clientMiddleware'
import { sandbox } from 'sinon'

describe('(Redux) Redux client middleware', () => {
  let middleware, nextSpy

  beforeEach(() => {
    sandbox.create()
    nextSpy = sandbox.spy()
    middleware = createMiddleware()({ dispatch: 'aDispatchParam', getState: 'aGetStateParam' })(nextSpy)
  })
  afterEach(() => {
    sandbox.restore()
  })

  it('should return action call result with dispatch and getState if action is a function', () => {
    const action = (dispatch, getState) => ({ dispatch, getState })
    expect(middleware(action)).to.deep.equal({ dispatch: 'aDispatchParam', getState: 'aGetStateParam' })
  })

  it('should call next with action if it has no promise key', () => {
    const action = { aKey: 'someValue' }
    middleware(action)
    sinon.assert.calledWithExactly(nextSpy, { aKey: 'someValue' })
  })

  describe('Action with promise', () => {
    const types = ['REQUEST_SENDING_ACTION', 'REQUEST_SUCCESS_ACTION', 'REQUEST_FAILURE_ACTION']

    it('should call next with first action and return actionPromise', done => {
      const promise = Promise.resolve().then(() => 'promiseResult')
      const action = {
        types,
        promise,
        otherData: 'someData',
      }
      const result = middleware(action)
      sinon.assert.calledWithExactly(nextSpy, { otherData: 'someData', type: 'REQUEST_SENDING_ACTION' })
      result.then(result => {
        expect(result).to.deep.equal('promiseResult')
        done()
      })
    })

    it('should call promise with SUCCESS_ACTION if promise resolves', done => {
      const promise = Promise.resolve('aResult')
      const action = {
        types,
        promise,
        otherData: 'someData',
      }
      middleware(action)
      setTimeout(() => {
        sinon.assert.calledTwice(nextSpy)
        sinon.assert.calledWithExactly(nextSpy, {
          result: 'aResult',
          otherData: 'someData',
          type: 'REQUEST_SUCCESS_ACTION',
        })
        done()
      })
    })

    it('should call promise with FAILURE_ACTION if promise fails', done => {
      const promise = Promise.reject('anError')
      const action = {
        types,
        promise,
        otherData: 'someData',
      }
      middleware(action)
      setTimeout(() => {
        sinon.assert.calledTwice(nextSpy)
        sinon.assert.calledWithExactly(nextSpy, {
          error: 'anError',
          otherData: 'someData',
          type: 'REQUEST_FAILURE_ACTION',
        })
        done()
      })
    })

    it('should call promise with FAILURE_ACTION if next fails', done => {
      const nextStub = sandbox.stub()
      const promise = Promise.resolve('aResult')
      const action = {
        types,
        promise,
        otherData: 'someData',
      }
      middleware = createMiddleware()({ dispatch: 'aDispatchParam', getState: 'aGetStateParam' })(nextStub)
      nextStub.onCall(0).returns()
      nextStub.onCall(1).returns(Promise.reject('aNextError'))
      nextStub.onCall(2).returns()
      middleware(action)
      setTimeout(() => {
        sinon.assert.calledThrice(nextStub)
        sinon.assert.calledWithExactly(nextStub, {
          error: 'aNextError',
          otherData: 'someData',
          type: 'REQUEST_FAILURE_ACTION',
        })
        done()
      })
    })
  })
})
