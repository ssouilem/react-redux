import React from 'react'
import { Header, Grid, Image } from 'semantic-ui-react'

class Introduction extends React.Component {
  render () {
    return (
      <Grid columns={ 3 } container>
        <Grid.Row width={ 13 }>
          <Header as='h3'>INTRODUCTION</Header>
        </Grid.Row>
        <Grid.Row width={ 13 }>
          <span>
            This wizard will allow you to automatically generate a project using the chain of integration /&nbsp;
            Continuous deployment of Gitlab
          </span>
        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column width={ 12 }>
            <Image src={ require('FRONT_THEME/assets/images/cicd_pipeline_infograph.png') } fluid />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={ 8 }>
            For more information on the detailed operation, you can consult:&nbsp;
          </Grid.Column>
          <Grid.Column width={ 8 }>
            <a href='https://about.gitlab.com/features/gitlab-ci-cd/'>
              https://about.gitlab.com/features/gitlab-ci-cd/
            </a>
            <br />
            <a href='https://docs.gitlab.com/ci/'>https://docs.gitlab.com/ci/</a>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}
export { Introduction }
