import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

// import * as paths from '../../../../../paths';
import {
  BrowsableList,
  BrowsableListItem,
} from '../../../../../components/navigation/browsable-list';
import { Loading } from '../../../../../components/await';
import { PageTabLayout } from '../../../../../mobilizations/components';

class TemplatesChoosePage extends Component {
  render() {
    const {
      mobilization,
      loading,
      // customTemplatesLength,
      globalTemplates,
      // createMobilizationFromTemplate,
      createEmptyMobilization,
      location,
    } = this.props;

    if (loading) return <Loading />;

    // const renderEmptyChoice =
    //   customTemplatesLength === 0 && globalTemplates.length === 0;

    console.log("globalTemplates", { globalTemplates });

    return (
      <PageTabLayout {...{ location }}>
        <div className="choose-menu-page col-12">
          <h3 className="h1 mt0 mb3 center">
            <FormattedMessage
              id="page--mobilizations.templates-choose.title"
              defaultMessage="Como você deseja começar?"
            />
          </h3>
          <BrowsableList>
            <BrowsableListItem
              title={
                <FormattedMessage
                  id="page--mobilizations.templates-choose.browsable-list-item.blank"
                  defaultMessage="Criar mobilização do zero"
                />
              }
              leftIcon="plus-square-o"
              onClick={() => {
                createEmptyMobilization({ mobilization });
              }}
            />
            {/* {globalTemplates &&
              globalTemplates.map((template) => (
                <BrowsableListItem
                  title={template.name}
                  key={`index-${template.id}`}
                  leftIcon={template.goal}
                  onClick={() => {
                    createMobilizationFromTemplate({ mobilization, template });
                  }}
                />
              ))}
            <BrowsableListItem
              title={
                <FormattedMessage
                  id="page--mobilizations.templates-choose.browsable-list-item.templates-custom"
                  defaultMessage="Meus templates"
                />
              }
              leftIcon="columns"
              subtitle={customTemplatesLength}
              path={paths.mobilizationTemplatesChooseCustomList(mobilization)}
            /> */}
          </BrowsableList>
        </div>
      </PageTabLayout>
    );
  }
}

export default TemplatesChoosePage;
