/* eslint-disable no-unused-expressions */
import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { FormattedMessage } from 'react-intl'

import * as paths from 'paths'
import Sidebar from 'components/navigation/sidebar/sidebar'

describe('client/components/navigation/sidebar/sidebar', () => {
  let wrapper
  const props = {
    loading: false,
    mobilization: { id: 1, slug: 'foobar' },
    user: { email: 'foo@bar.com' },
    community: {}
  }

  beforeAll(() => {
    wrapper = shallow(
      <Sidebar {...props}>
        <h1>Foo bar</h1>
      </Sidebar>
    )
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })

    describe('when editing a mobilization', () => {
      describe('launch navbar item', () => {
        it('should render an item with "PUBLICAR BONDE" text by default', () => {
          expect(wrapper.find('SidenavListItem').at(0).props().text.props).to.be.deep.equal(
            <FormattedMessage
              id='components.navigation--sidebar.mobilization-settings.item.launch'
              defaultMessage='PUBLICAR BONDE'
            />.props
          )
        })
        it('should render an item with "BONDE público" text if it already have a custom domain', () => {
          const mobilization = {
            ...props.mobilization,
            custom_domain: 'foo.bar',
            facebook_share_image: 'http://foobar.png',
            facebook_share_title: 'Facebook Title',
            facebook_share_description: 'Facebook Description',
            twitter_share_text: 'Twitter Title'
          }
          wrapper.setProps({ ...props, mobilization })
          expect(wrapper.find('SidenavListItem').at(0).props().text.props).to.be.deep.equal(
            <FormattedMessage
              id='components.navigation--sidebar.mobilization-settings.item.launched'
              defaultMessage='BONDE público'
            />.props
          )
          wrapper.setProps(props)
        })
      })

      describe('default navbar items', () => {
        describe('- editar mobilização', () => {
          it('should render with its text properly', () => {
            expect(wrapper.find('SidenavListItem').at(1).props().text.props).to.be.deep.equal(
              <FormattedMessage
                id='components.navigation--sidebar.mobilization-settings.item.edit'
                defaultMessage='Editar mobilização'
              />.props
            )
          })
          it('should render with its icon properly', () => {
            const icon = 'pencil'
            expect(wrapper.find('SidenavListItem').at(1).props().icon).to.be.equal(icon)
          })
          it('should render with its href properly', () => {
            const href = paths.editMobilization(props.mobilization.id)
            expect(wrapper.find('SidenavListItem').at(1).props().href).to.be.equal(href)
          })
        })

        describe('- adicionar conteúdo', () => {
          it('should render with its text properly', () => {
            expect(wrapper.find('SidenavListItem').at(2).props().text.props).to.be.deep.equal(
              <FormattedMessage
                id='components.navigation--sidebar.mobilization-settings.item.add-block'
                defaultMessage='Adicionar conteúdo'
              />.props
            )
          })
          it('should render with its icon properly', () => {
            const icon = 'plus'
            expect(wrapper.find('SidenavListItem').at(2).props().icon).to.be.equal(icon)
          })
          it('should render with its href properly', () => {
            const href = paths.createBlock({ id: props.mobilization.id })
            expect(wrapper.find('SidenavListItem').at(2).props().href).to.be.equal(href)
          })
        })

        describe('- ver em uma nova aba', () => {
          it('should render with its text properly', () => {
            expect(wrapper.find('SidenavListItem').at(3).props().text.props).to.be.deep.equal(
              <FormattedMessage
                id='components.navigation--sidebar.mobilization-settings.item.open-at-new-tab'
                defaultMessage='Ver em uma nova aba'
              />.props
            )
          })
          it('should render with its icon properly', () => {
            const icon = 'external-link'
            expect(wrapper.find('SidenavListItem').at(3).props().icon).to.be.equal(icon)
          })
          it('should render with its href properly', () => {
            const href = paths.mobilization(props.mobilization)
            expect(wrapper.find('SidenavListItem').at(3).props().href).to.be.equal(href)
          })
          it('should render with linkType prop as "anchor"', () => {
            expect(wrapper.find('SidenavListItem').at(3).props().linkType).to.be.equal('anchor')
          })
          it('should render with target prop as "_blank"', () => {
            expect(wrapper.find('SidenavListItem').at(3).props().target).to.be.equal('_blank')
          })
        })

        describe('- configurações', () => {
          it('should render with its text properly', () => {
            expect(wrapper.find('SidenavListItem').at(4).props().text.props).to.be.deep.equal(
              <FormattedMessage
                id='components.navigation--sidebar.mobilization-settings.item.config'
                defaultMessage='Configurações'
              />.props
            )
          })
          it('should render with its icon properly', () => {
            const icon = 'cog'
            expect(wrapper.find('SidenavListItem').at(4).props().icon).to.be.equal(icon)
          })
          it('should render with its href properly', () => {
            const href = paths.basicsMobilization(props.mobilization.id)
            expect(wrapper.find('SidenavListItem').at(4).props().href).to.be.equal(href)
          })
        })
      })
    })

    describe('when is not editing a mobilization', () => {
      let itemIndex = -1
      const incrementIndex = () => { itemIndex++ }
      beforeAll(() => {
        wrapper.setProps({ ...props, mobilization: undefined })
      })
      afterAll(() => {
        wrapper.setProps(props)
      })

      describe('community settings navbar items', () => {
        describe('- mobilizações', () => {
          beforeAll(incrementIndex)

          it('should render with its text properly', () => {
            expect(wrapper.find('SidenavListItem').at(itemIndex).props().text.props).to.be.deep.equal(
              <FormattedMessage
                id='components.navigation--sidebar.community-settings.item.mobilizations'
                defaultMessage='Mobilizações'
              />.props
            )
          })
          it('should render with its icon properly', () => {
            const icon = 'list'
            expect(wrapper.find('SidenavListItem').at(itemIndex).props().icon).to.be.equal(icon)
          })
          it('should render with its href properly', () => {
            const href = paths.mobilizations()
            expect(wrapper.find('SidenavListItem').at(itemIndex).props().href).to.be.equal(href)
          })
        })

        describe('- comunidade', () => {
          beforeAll(incrementIndex)

          it('should render with its text properly', () => {
            expect(wrapper.find('SidenavListItem').at(itemIndex).props().text.props).to.be.deep.equal(
              <FormattedMessage
                id='components.navigation--sidebar.community-settings.item.info'
                defaultMessage='Comunidade'
              />.props
            )
          })
          it('should render with its icon properly', () => {
            const icon = 'info-circle'
            expect(wrapper.find('SidenavListItem').at(itemIndex).props().icon).to.be.equal(icon)
          })
          it('should render with its href properly', () => {
            const href = paths.communityInfo()
            expect(wrapper.find('SidenavListItem').at(itemIndex).props().href).to.be.equal(href)
          })
        })

        describe('- métricas', () => {
          beforeAll(incrementIndex)

          it('should render with its text properly', () => {
            expect(wrapper.find('SidenavListItem').at(itemIndex).props().text.props).to.be.deep.equal(
              <FormattedMessage
                id='components.navigation--sidebar.community-settings.item.metrics'
                defaultMessage='Métricas'
              />.props
            )
          })
          it('should render with its icon properly', () => {
            const icon = 'line-chart'
            expect(wrapper.find('SidenavListItem').at(itemIndex).props().icon).to.be.equal(icon)
          })
          it('should render with its href properly', () => {
            const href = paths.communityReport()
            expect(wrapper.find('SidenavListItem').at(itemIndex).props().href).to.be.equal(href)
          })
        })

        describe('- domínios', () => {
          beforeAll(incrementIndex)

          it('should render with its text properly', () => {
            expect(wrapper.find('SidenavListItem').at(itemIndex).props().text.props).to.be.deep.equal(
              <FormattedMessage
                id='components.navigation--sidebar.community-settings.item.domains'
                defaultMessage='Domínios'
              />.props
            )
          })
          it('should render with its icon properly', () => {
            const icon = 'cogs'
            expect(wrapper.find('SidenavListItem').at(itemIndex).props().icon).to.be.equal(icon)
          })
          it('should render with its href properly', () => {
            const href = paths.communityDomain()
            expect(wrapper.find('SidenavListItem').at(itemIndex).props().href).to.be.equal(href)
          })
        })
      })
    })
  })
})
