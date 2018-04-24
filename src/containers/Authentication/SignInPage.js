import React from 'react'
import { connect } from 'react-redux'

class SignInPage extends React.Component {
  render = () =>
    <div>Connecting ...</div>
}

SignInPage.propTypes = {
}

const mapStateToProps = ({ user: { signIn } }) => ({
})

const mapDispatchToProps = (dispatch) => ({
  dispatch,
})

export { SignInPage }
export default connect(mapStateToProps, mapDispatchToProps)(SignInPage)
