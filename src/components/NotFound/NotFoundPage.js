import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'
import styles from './NotFound.less'

export default () => (
  <div className={ styles.page }>
    <div className={ styles.pageTitle }>
      <Link to='/' className={ styles.notFoundBackToDashboard }>
        〈&nbsp;&nbsp;<FormattedMessage
          id='notfound.button.back'
          description='Not Found back to home link'
          defaultMessage='Page non trouvée' />
      </Link>
    </div>
  </div>
)
