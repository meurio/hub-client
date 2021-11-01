
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Loading } from "../../../../../components/await"
import { PageTabLayout } from "../../../../../mobilizations/components"
import { TemplateSelectableList } from "../../../../../mobilizations/templates/components"
import * as paths from "../../../../../paths"

class TemplatesChooseCustomPage extends React.Component {
  componentDidMount() {
    if (this.props.templates) {
      this.props.setFilterableSearchBarList(this.props.templates)
    }
  }

  render() {
    const {
      mobilization,
      createMobilizationFromTemplate,
      location,
      loading,
      ...listableProperties
    } = this.props

    return loading ? <Loading /> : (
      <PageTabLayout {...{ location }}>
        <div className='choose-custom-page col-12'>
          <h3 className='h1 mt0 mb3 center'>
            <FormattedMessage
              id='page--mobilizations.templates-choose-custom.title'
              defaultMessage='Meus Templates'
            />
          </h3>
          <TemplateSelectableList
            {...listableProperties}
            handleGoBack={() => this.props.history.goBack()}
            handleSelectItem={({ id: template_mobilization_id }) => {
              createMobilizationFromTemplate({ id: mobilization.id, template_mobilization_id })
                .then(async () => {
                  this.props.history.push(paths.editMobilization(mobilization.id))
                  return Promise.resolve()
                })
                .catch(error => console.error('CreateMobilizationFromTemplateAsyncError', error))
            }}
          />
        </div>
      </PageTabLayout>
    )
  }
}

export default TemplatesChooseCustomPage
