import { retrieveSending, isSending } from 'UTILS/loaderHelper'

describe('computeAmount', () => {
  it('should retrieve a property from a string', () => {
    let object = { param1: { param2: { param3: 'hello' } } }
    expect(retrieveSending(object, ['param1', 'param2', 'param3'])).to.equal('hello')
  })
  it('should test if a sending state is present', () => {
    let state = {
      user: { data: { sending: true } },
      burger: { data: { sending: false } },
    }
    let SHOULDDISLAYLOADERFOR = [
      'user.data.sending',
      'burger.data.sending',
    ]
    expect(isSending(state, SHOULDDISLAYLOADERFOR)).to.equal(true)

    state = {
      user: { data: { sending: false } },
      burger: { data: { sending: false } },
    }
    expect(isSending(state, SHOULDDISLAYLOADERFOR)).to.equal(false)
  })
})
