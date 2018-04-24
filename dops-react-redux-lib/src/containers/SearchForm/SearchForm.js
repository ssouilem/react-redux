import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import TextFieldInput from 'SHARED_COMPONENTS/Form/Inputs/TextFieldInput'
import styles from './SearchForm.less'

export class SearchForm extends React.Component {
  _handleSubmit = (event) => {
    event.preventDefault()
    if (this.props.form && this.props.form.values && this.props.form.values.search) {
      this.props.handleSubmit(this.props.form.values.search)
    }
  }
  render () {
    return (
      <form className={ styles.form } onSubmit={ this._handleSubmit } >
        <Field
          component={ TextFieldInput }
          name='search'
          fieldName={ <FormattedMessage
            id='navbar.search.field'
            description='Query field'
            defaultMessage='recherche...' /> }
          />
      </form>
    )
  }
}

SearchForm.propTypes = {
  handleSubmit: PropTypes.func,
  form: PropTypes.object,
}

const mapStateToProps = ({
  form: { searchForm },
}) => ({
  form: searchForm,
})

export default reduxForm({
  form: 'searchForm',
  validate: () => {},
})(connect(mapStateToProps)(SearchForm))
