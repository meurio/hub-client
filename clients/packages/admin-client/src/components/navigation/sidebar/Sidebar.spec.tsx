/* eslint-disable import/first */
/* eslint-disable no-unused-expressions */
import React from 'react';
import { shallow } from 'enzyme';
import { Context as SessionContext } from 'bonde-core-tools';
import { SidebarContext } from '../../../pages/admin/sidebar/Provider';
import { FormattedMessage } from 'react-intl';

import * as paths from '../../../paths';

const useContextMock = React.useContext = jest.fn();

import Sidebar from './Sidebar';

const args = {
  loading: false,
  mobilization: { id: 1, slug: 'foobar' },
  user: { email: 'foo@bar.com' },
  community: {},
};

const implementUseContext = ({
  session = {
    currentUser: args.user,
    community: args.community,
    logout: jest.fn()
  },
  sidebar = {
    mobilization: args.mobilization
  }
}: any) => {
  useContextMock.mockImplementation((Context) => {
    if (Context === SessionContext) return session;
    if (Context === SidebarContext) return sidebar;
  })
}


describe('client/components/navigation/sidebar/sidebar', () => {
  let wrapper;

  beforeEach(() => {
    implementUseContext({});

    wrapper = shallow(
      <Sidebar>
        <h1>Foo bar</h1>
      </Sidebar>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).toBeTruthy();
    });

    describe('when editing a mobilization', () => {

      describe('launch navbar item', () => {

        it('should render an item with "PUBLICAR BONDE" text by default', () => {
          expect(
            wrapper.find('SidenavListItem').at(0).props().text.props
          ).toEqual(
            (
              <FormattedMessage
                id="components.navigation--sidebar.mobilization-settings.item.launch"
                defaultMessage="PUBLICAR BONDE"
              />
            ).props
          );
        });

        it('should render an item with "BONDE público" text if it already have a custom domain', () => {
          const mobilization = {
            ...args.mobilization,
            custom_domain: 'foo.bar',
            facebook_share_image: 'http://foobar.png',
            facebook_share_title: 'Facebook Title',
            facebook_share_description: 'Facebook Description',
            twitter_share_text: 'Twitter Title',
          };
          implementUseContext({ sidebar: { mobilization } });

          wrapper.setProps();

          expect(
            wrapper.find('SidenavListItem').at(0).props().text.props
          ).toEqual(
            (
              <FormattedMessage
                id="components.navigation--sidebar.mobilization-settings.item.launched"
                defaultMessage="BONDE público"
              />
            ).props
          );
        });
      });
    });

    describe('default navbar items', () => {
      describe('- editar mobilização', () => {
        it('should render with its text properly', () => {
          expect(
            wrapper.find('SidenavListItem').at(1).props().text.props
          ).toEqual(
            (
              <FormattedMessage
                id="components.navigation--sidebar.mobilization-settings.item.edit"
                defaultMessage="Editar mobilização"
              />
            ).props
          );
        });
        
        it('should render with its icon properly', () => {
          const icon = 'pencil';
          expect(
            wrapper.find('SidenavListItem').at(1).props().icon
          ).toEqual(icon);
        });

        it('should render with its href properly', () => {
          const href = paths.editMobilization(args.mobilization.id);
          expect(
            wrapper.find('SidenavListItem').at(1).props().href
          ).toEqual(href);
        });
      });

      describe('- adicionar conteúdo', () => {
        it('should render with its text properly', () => {
          expect(
            wrapper.find('SidenavListItem').at(2).props().text.props
          ).toEqual(
            (
              <FormattedMessage
                id="components.navigation--sidebar.mobilization-settings.item.add-block"
                defaultMessage="Adicionar conteúdo"
              />
            ).props
          );
        });
  
        it('should render with its icon properly', () => {
          const icon = 'plus';
          expect(
            wrapper.find('SidenavListItem').at(2).props().icon
          ).toEqual(icon);
        });
        
        it('should render with its href properly', () => {
          const href = paths.createBlock({ id: args.mobilization.id });
          expect(
            wrapper.find('SidenavListItem').at(2).props().href
          ).toEqual(href);
        });
      });
  
      describe('- ver em uma nova aba', () => {
        it('should render with its text properly', () => {
          expect(
            wrapper.find('SidenavListItem').at(3).props().text.props
          ).toEqual(
            (
              <FormattedMessage
                id="components.navigation--sidebar.mobilization-settings.item.open-at-new-tab"
                defaultMessage="Ver em uma nova aba"
              />
            ).props
          );
        });
        
        it('should render with its icon properly', () => {
          const icon = 'external-link';
          expect(
            wrapper.find('SidenavListItem').at(3).props().icon
          ).toEqual(icon);
        });

        it('should render with its href properly', () => {
          const href = paths.mobilization(args.mobilization);
          expect(
            wrapper.find('SidenavListItem').at(3).props().href
          ).toEqual(href);
        });

        it('should render with linkType prop as "anchor"', () => {
          expect(
            wrapper.find('SidenavListItem').at(3).props().linkType
          ).toEqual('anchor');
        });

        it('should render with target prop as "_blank"', () => {
          expect(
            wrapper.find('SidenavListItem').at(3).props().target
          ).toEqual('_blank');
        });
      });

      describe('- configurações', () => {
        it('should render with its text properly', () => {
          expect(
            wrapper.find('SidenavListItem').at(4).props().text.props
          ).toEqual(
            (
              <FormattedMessage
                id="components.navigation--sidebar.mobilization-settings.item.config"
                defaultMessage="Configurações"
              />
            ).props
          );
        });
  
        it('should render with its icon properly', () => {
          const icon = 'cog';
          expect(
            wrapper.find('SidenavListItem').at(4).props().icon
          ).toEqual(icon);
        });
  
        it('should render with its href properly', () => {
          const href = paths.basicsMobilization(args.mobilization.id);
          expect(
            wrapper.find('SidenavListItem').at(4).props().href
          ).toEqual(href);
        });
  
      });
    });
    
    describe('when is not editing a mobilization', () => {
      beforeEach(() => {
        implementUseContext({
          sidebar: { mobilization: undefined }
        });
        // force update component to change context
        wrapper.setProps();
      });

      describe('community settings navbar items', () => {
        describe('- mobilizações', () => {
          it('should render with its text properly', () => {
            expect(
              wrapper.find('SidenavListItem').at(0).props().text.props
            ).toEqual(
              (
                <FormattedMessage
                  id="components.navigation--sidebar.community-settings.item.mobilizations"
                  defaultMessage="Mobilizações"
                />
              ).props
            );
          });
          
          it('should render with its icon properly', () => {
            const icon = 'list';
            expect(
              wrapper.find('SidenavListItem').at(0).props().icon
            ).toEqual(icon);
          });
        
          it('should render with its href properly', () => {
            const href = paths.mobilizations();
            expect(
              wrapper.find('SidenavListItem').at(0).props().href
            ).toEqual(href);
          });
        });
      
        describe('- comunidade', () => {
          it('should render with its text properly', () => {
            expect(
              wrapper.find('SidenavListItem').at(1).props().text.props
            ).toEqual(
              (
                <FormattedMessage
                  id="components.navigation--sidebar.community-settings.item.info"
                  defaultMessage="Comunidade"
                />
              ).props
            );
          });
    
          it('should render with its icon properly', () => {
            const icon = 'info-circle';
            expect(
              wrapper.find('SidenavListItem').at(1).props().icon
            ).toEqual(icon);
          });
    
          it('should render with its href properly', () => {
            const href = paths.communityInfo();
            expect(
              wrapper.find('SidenavListItem').at(1).props().href
            ).toEqual(href);
          });
        });

        describe('- métricas', () => {
          it('should render with its text properly', () => {
            expect(
              wrapper.find('SidenavListItem').at(2).props().text.props
            ).toEqual(
              (
                <FormattedMessage
                  id="components.navigation--sidebar.community-settings.item.metrics"
                  defaultMessage="Métricas"
                />
              ).props
            );
          });

          it('should render with its icon properly', () => {
            const icon = 'line-chart';
            expect(
              wrapper.find('SidenavListItem').at(2).props().icon
            ).toEqual(icon);
          });

          it('should render with its href properly', () => {
            const href = paths.communityReport();
            expect(
              wrapper.find('SidenavListItem').at(2).props().href
            ).toEqual(href);
          });
        });
        
        describe('- domínios', () => {

          it('should render with its text properly', () => {
            expect(
              wrapper.find('SidenavListItem').at(3).props().text.props
            ).toEqual(
              (
                <FormattedMessage
                  id="components.navigation--sidebar.community-settings.item.domains"
                  defaultMessage="Domínios"
                />
              ).props
            );
          });
          it('should render with its icon properly', () => {
            const icon = 'cogs';
            expect(
              wrapper.find('SidenavListItem').at(3).props().icon
            ).toEqual(icon);
          });
          it('should render with its href properly', () => {
            const href = paths.communityDomain();
            expect(
              wrapper.find('SidenavListItem').at(3).props().href
            ).toEqual(href);
          });
        });
      });
    });
  });
});
