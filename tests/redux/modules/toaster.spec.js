import createStore from 'redux/createStore'
import { default as sinon, sandbox } from 'sinon'
import { actions } from 'ACTIONS/toaster'

describe('(Redux Module) toaster', () => {
  let clock, store
  beforeEach(() => {
    sandbox.create()
    clock = sinon.useFakeTimers()
    store = createStore({})
  })

  afterEach(() => {
    clock.restore()
    sandbox.restore()
  })

  describe('toasterRequest', () => {
    it('should export actions as an object and define toasterRequest', () => {
      expect(actions).to.be.a('object')
      expect(actions.toasterRequest).to.be.a('function')
    })

    it('should have state initialized', () => {
      expect(store.getState().toaster).to.deep.equal({
        data: undefined,
      })
    })

    describe('toasterRequest.open', () => {
      it('should call update store with toast message and then clean it route with query with parameter', () => {
        actions.toasterRequest(store.dispatch).open('someMessage', 10)
        expect(store.getState().toaster).to.deep.equal({ data: 'someMessage' })
        clock.tick(5)
        expect(store.getState().toaster).to.deep.equal({ data: 'someMessage' })
        clock.tick(6)
        expect(store.getState().toaster).to.deep.equal({ data: undefined })
      })

      it('should call update store with toast message and then clean it route with query without parameter', () => {
        actions.toasterRequest(store.dispatch).open('someMessage')
        expect(store.getState().toaster).to.deep.equal({ data: 'someMessage' })
        clock.tick(9999)
        expect(store.getState().toaster).to.deep.equal({ data: 'someMessage' })
        clock.tick(2)
        expect(store.getState().toaster).to.deep.equal({ data: undefined })
      })
    })
  })

  describe('toasterRequest.close', () => {
    it('should close toast', () => {
      actions.toasterRequest(store.dispatch).open('someMessage', 10)
      expect(store.getState().toaster).to.deep.equal({ data: 'someMessage' })
      actions.toasterRequest(store.dispatch).close()
      expect(store.getState().toaster).to.deep.equal({ data: undefined })
    })
  })
})
