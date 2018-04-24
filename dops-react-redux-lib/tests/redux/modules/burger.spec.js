import createStore from 'redux/createStore'
import { actions } from 'SHARED_REDUX/modules/burger'

describe('(Redux Module) burger', () => {
  let store
  beforeEach(() => {
    store = createStore({})
  })

  it('should have state initialized', () => {
    expect(store.getState().burger).to.deep.equal({
      isOpen: false,
    })
  })

  describe('onBurgerStateChange', () => {
    it('should change isOpen state', () => {
      actions.onBurgerStateChange(store.dispatch)({ isOpen: true })
      expect(store.getState().burger).to.deep.equal({
        isOpen: true,
      })

      actions.onBurgerStateChange(store.dispatch)({ isOpen: false })
      expect(store.getState().burger).to.deep.equal({
        isOpen: false,
      })
    })
  })

  describe('closeBuger', () => {
    it('should close burger', () => {
      actions.onBurgerStateChange(store.dispatch)({ isOpen: true })
      expect(store.getState().burger).to.deep.equal({
        isOpen: true,
      })

      actions.closeBuger(store.dispatch)()
      expect(store.getState().burger).to.deep.equal({
        isOpen: false,
      })
    })
  })
})
