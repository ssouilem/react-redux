import React from 'react'
import PropTypes from 'prop-types'
import styles from './SearchResult.less'

export class SearchItem extends React.Component {
  render = () =>
    <div>
      <div className={ styles.searchTitle }>
        { this.props.item.title }
      </div>
      <a href={ this.props.item.url } target='_blank' className={ styles.searchLink }>
        { this.props.item.url }
      </a>
      <div className={ styles.searchPreview }>
        { this.props.item.preview }
      </div>
    </div>
}

SearchItem.propTypes = {
  item: PropTypes.object.isRequired,
}

class SearchResult extends React.Component {
  render = () =>
    <div className={ styles.searchResult }>
      { this.props.data === undefined || this.props.data.length === 0
        ? <div className={ styles.searchNoResult }>Pas de résultats</div>
        : this.props.data.map((item, index) => <SearchItem item={ item } key={ `search-key-${ index }` } />)
      }
    </div>
}

SearchResult.propTypes = {
  data: PropTypes.array,
}

export default SearchResult
