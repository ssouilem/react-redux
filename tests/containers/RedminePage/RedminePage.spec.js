/* eslint no-unused-expressions: 0 */
import React from 'react'
import { Provider } from 'react-redux'
import ConnectedRedminePage from 'containers/RedminePage/RedminePage'
import { actions as redmineActions } from 'ACTIONS/redmine'
import ProjectGrid from 'COMPONENTS/Projects/ProjectGrid'
import { assert, sandbox } from 'sinon'
import { createMockStore, renderIntoDocument } from 'TESTS/testHelpers'
import TestUtils from 'react-addons-test-utils'

const PROJECTS = [ { name: 'hello', identifier: 'identifer' }, { name: 'hello', identifier: 'identifer' } ]

describe('(containers) RedminePage', () => {
  let _state, _store, _fetchRedmineProjects
  beforeEach(() => {
    sandbox.create()
    _fetchRedmineProjects = sandbox.stub()
    sandbox.stub(redmineActions, 'redmineRequests').returns({ fetchRedmineProjects: _fetchRedmineProjects })
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should display Redmine page content with ProjectGrid', () => {
    let container = getContainer(PROJECTS)
    let divs = TestUtils.scryRenderedDOMComponentsWithTag(container, 'div')
    expect(divs[1].innerHTML).to.equal('Redmine Projects')
    expect(TestUtils.scryRenderedComponentsWithType(container, ProjectGrid)).to.have.length(1)
  })

  it('should not fetch search when already fetching', () => {
    getContainer(undefined, true)
    assert.notCalled(_fetchRedmineProjects)
  })

  it('should not fetch projects if already fetched', () => {
    getContainer(PROJECTS, false)
    assert.notCalled(_fetchRedmineProjects)
  })

  it('should fetch projects when not data and not sending', () => {
    getContainer()
    assert.calledWithExactly(_fetchRedmineProjects)
  })

  const getContainer = (data, sending) => {
    _state = {
      redmine: { projects: { data, sending } },
    }
    _store = createMockStore(_state)
    let props = {
    }
    return renderIntoDocument(<Provider store={ _store }><ConnectedRedminePage { ...props } /></Provider>)
  }
})
