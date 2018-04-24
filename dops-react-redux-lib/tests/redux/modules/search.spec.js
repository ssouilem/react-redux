import { sandbox } from 'sinon'
import { actions, default as searchReducer } from 'SHARED_REDUX/modules/search'

describe('(Redux Module) search', () => {
  let dispatchSpy
  beforeEach(() => {
    sandbox.create()
    dispatchSpy = sandbox.spy()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('search', () => {
    it('should have state initialized', () => {
      expect(searchReducer(undefined, { type: 'SEARCH_SENDING' }))
    })

    it('should have no handler', () => {
      expect(searchReducer(undefined, { type: 'FAKE_TYPE' }))
    })

    it('should mount the right action', () => {
      actions.searchRequest(dispatchSpy)('someData', 10, 0)
      sinon.assert.calledWithExactly(dispatchSpy, {
        types: ['SEARCH_SENDING', 'SEARCH_SUCCESS', 'SEARCH_FAILURE'],
        payload: {
          client: 'searchEngine',
          request: {
            url: '/search?q=someData&from=0&size=10',
            method: 'get',
          },
        },
      })
    })

    it('should update state after SEARCH_SENDING', () => {
      expect(searchReducer({}, { type: 'SEARCH_SENDING' }))
    })

    it('should update state after SEARCH_SUCCESS', () => {
      expect(searchReducer({}, { type: 'SEARCH_SUCCESS', payload: { data: 'someData' } }))
      .to.deep.equal({ sending: false, error: undefined, data: 'someData' })
    })

    it('should update state after SEARCH_FAILURE', () => {
      expect(searchReducer({}, { type: 'SEARCH_FAILURE', error: 'someError' }))
      .to.deep.equal({ sending: false, error: 'someError', data: undefined })
    })
  })
})
