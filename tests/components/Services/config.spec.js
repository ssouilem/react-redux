import config from 'COMPONENTS/Services/config'

describe('(config) Services config', () => {
  it('should have certain values', () => {
    expect(config).to.deep.equal({
      services: [
        {
          title: 'Jenkins',
          url: 'https://samwise.dops.open.global',
          logo: 'jenkins.svg',
        },
        {
          title: 'Redmine',
          to: '/redmine',
          logo: 'redmine.png',
        },
        {
          title: 'Graylog',
          url: 'https://graylog.dops.open.global/',
          logo: 'graylog.svg',
        },
        {
          title: 'Gitlab',
          url: 'https://middleearth.dops.open.global/',
          logo: 'gitlab.png',
        },
      ],
    })
  })
})
