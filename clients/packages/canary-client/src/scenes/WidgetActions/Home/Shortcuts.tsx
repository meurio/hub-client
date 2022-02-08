import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Shortcut, Icon } from "bonde-components";
import { Context as SessionContext } from 'bonde-core-tools';
import styled from "styled-components";
import { useTranslation } from 'react-i18next';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 205px));
  grid-gap: 20px;
  justify-content: start;
  overflow-x: auto;
  padding: 15px 0;
  & > a {
    text-decoration: none;
    & > button {
      width: 100%;
    }
  }
`;

type Props = {
  community: any
}

const Shortcuts = ({ community }: Props): React.ReactElement => {
  const { updateSession } = useContext(SessionContext);
  const { t } = useTranslation('widgetActions');

  return (
    <Grid>
      <button
        type="button"
        onClick={() => {
          if (process.env.REACT_APP_DOMAIN_ADMIN) {
            updateSession("community", community).then(() => {
              window.location.href = new URL(
                `/mobilizations/new`,
                process.env.REACT_APP_DOMAIN_ADMIN
              ).href;
            });
          }
        }}
      >
        <Shortcut
          text={t('home.shortcuts.buttons.newMobilization')}
          icon={<Icon name="New" size="large" />}
        />
      </button>
      <button
        type="button"
        onClick={() => {
          if (process.env.REACT_APP_DOMAIN_ADMIN) {
            updateSession("community", community).then(() => {
              window.location.href = new URL(
                `/mobilizations`,
                process.env.REACT_APP_DOMAIN_ADMIN
              ).href;
            });
          }
        }}
      >
        <Shortcut
          text={t('home.shortcuts.buttons.mobilizations')}
          icon={<Icon name="Window" size="default" />}
        />
      </button>
      <Link to="/community/analytics">
        <Shortcut
          text={t('home.shortcuts.buttons.reports')}
          icon={<Icon name="Open" size="large" />}
        />
      </Link>
      <Link to="/community/domains">
        <Shortcut
          text={t('home.shortcuts.buttons.domains')}
          icon={<Icon name="Cloud" size="large" />}
        />
      </Link>
    </Grid>
  );
};

export default Shortcuts;
