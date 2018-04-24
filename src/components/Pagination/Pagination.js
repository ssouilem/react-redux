import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import _ from 'lodash'
import styles from './Pagination.less'

const MAX_PAGES = 10

const renderPageIndex = (index, currentPage, handleClick) => (
  <div key={ `page-${ index }` }
    className={ currentPage === index ? styles.paginationCurrentPage : styles.paginationOtherPage }
    onClick={ currentPage === index ? null : handleClick.bind(null, index) }>
    { index }
  </div>
)

const computeStartEnd = (current, pageCount) => ({
  start: (pageCount > MAX_PAGES ? Math.min(pageCount - MAX_PAGES, Math.max(0, current - MAX_PAGES/2 - 1)) : 0) + 1,
  end: (pageCount > MAX_PAGES ? Math.min(pageCount, Math.max(MAX_PAGES, current + MAX_PAGES/2 - 1)) : pageCount) + 1,
})

class Pagination extends React.Component {
  render () {
    const { start, end } = computeStartEnd(this.props.currentPage, this.props.pageCount)
    return (this.props.pageCount > 1 &&
    <div className={ styles.paginationContainer }>
      <button
        className={ styles.paginationButton }
        disabled={ this.props.currentPage === 1 }
        onClick={ this.props.handleClick.bind(null, this.props.currentPage - 1) }>
        〈&nbsp;&nbsp;<FormattedMessage
          id='pagination.button.previous'
          description='Previous button in pagination component'
          defaultMessage='PRÉCÉDENT' />
      </button>
      <div className={ styles.paginationPageContainer }>
        { _.range(start, end)
          .map((pageIndex) => renderPageIndex(pageIndex, this.props.currentPage, this.props.handleClick)) }
      </div>
      <div>
        <button
          className={ styles.paginationButton }
          disabled={ this.props.currentPage === this.props.pageCount }
          onClick={ this.props.handleClick.bind(null, this.props.currentPage + 1) }>
          <FormattedMessage
            id='pagination.button.next'
            description='Next button in pagination component'
            defaultMessage='SUIVANT' />
          &nbsp;&nbsp;〉
        </button>
      </div>
    </div>
    )
  }
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  handleClick: PropTypes.func,
  pageCount: PropTypes.number,
}

export default Pagination
