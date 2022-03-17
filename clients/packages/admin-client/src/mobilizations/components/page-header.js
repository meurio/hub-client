import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Tabs, Tab } from '../../components/navigation/tabs';
import { DivFloat, Button } from '../../ux/components';

const PageHeader = ({ location }) => {
  const mobilizationsPath = '/';
  const archivedPath = '/archived';
  const templatesPath = '/templates';

  return (
    <div>
      <DivFloat>
        <Button to='/new'>
          <i className="fa fa-plus mr2" style={{ fontSize: '.75rem' }} />
          <FormattedMessage
            id="mobilizations.components--page-header.button.text"
            defaultMessage="Nova mobilização"
          />
        </Button>
      </DivFloat>
      <Tabs>
        <Tab
          text={
            <FormattedMessage
              id="mobilizations.components--page-header.tabs.actives"
              defaultMessage="Ativas"
            />
          }
          path={mobilizationsPath}
          isActive={mobilizationsPath === location.pathname}
        />
        <Tab
          text={
            <FormattedMessage
              id="mobilizations.components--page-header.tabs.archived"
              defaultMessage="Arquivadas"
            />
          }
          path={archivedPath}
          isActive={archivedPath === location.pathname}
        />
        <Tab
          text={
            <FormattedMessage
              id="mobilizations.components--page-header.tabs.templates"
              defaultMessage="Templates"
            />
          }
          path={templatesPath}
          isActive={templatesPath === location.pathname}
        />
      </Tabs>
    </div>
  );
};

PageHeader.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired })
    .isRequired,
};

export default PageHeader;
