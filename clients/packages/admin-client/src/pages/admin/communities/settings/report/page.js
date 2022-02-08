import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { ForceDownloadViaAjax } from 'community/components'
import { MetricsCommunity } from 'components/metrics'
import { Title } from 'components/title'

class SectionButton extends React.Component {
  constructor (...args) {
    super(...args)
    this.state = { loading: false }
  }

  toggleLoading () { this.setState({ loading: !this.state.loading }) }

  render () {
    const { sectionTitle, helperText, buttonTitle, onClick } = this.props

    return (
      <div className='col md-col-12 lg-col-4 px2 mb2'>
        <div className='table caps bold mb2 darkengray h6'>
          <i className='fa fa-file-excel-o darkengray table-cell align-middle h2' />
          <span className='table-cell align-middle pl1'>
            {sectionTitle}
          </span>
        </div>

        <p className='h5 mb2 darkengray' style={{ minHeight: 42 }}>
          {helperText}
        </p>
        <ForceDownloadViaAjax
          title={this.state.loading ? '' : buttonTitle}
          onClick={e => {
            e.preventDefault()
            this.toggleLoading()
            onClick(this.toggleLoading.bind(this))
          }}
          className='btn bg-blacker white rounded border-box col-12 center'
          icon={this.state.loading ? 'circle-o-notch fa-spin' : 'download'}
        />
      </div>
    )
  }
}

const CommunitySettingsReportPage = ({
  location,
  community,
  // Actions
  asyncDownloadActivistActions,
  asyncDownloadActivists,
  asyncDownloadDonations,
  asyncDownloadRecurringDonors
}) => (
  <div className='mxn2'>
    <div className='col col-12 px2 mb3'>
      <Title className='mt0'>
        <FormattedMessage
          id='page--community-report.title.metrics'
          defaultMessage='Métricas'
        />
      </Title>
      <MetricsCommunity communityId={community.id} />
    </div>

    <div className='px2'>
      <Title>
        <FormattedMessage
          id='page--community-report.title.reports'
          defaultMessage='Relatórios'
        />
      </Title>
    </div>
    <SectionButton
      sectionTitle={
        <FormattedMessage
          id='page--community-report.section-button.donation.title'
          defaultMessage='RELATÓRIO DE DOAÇÕES'
        />
      }
      helperText={
        <FormattedMessage
          id='page--community-report.section-button.donation.helper-text'
          defaultMessage={
            'Clique no botão abaixo para baixar ' +
            'o relatório de doações da comunidade.'
          }
        />
      }
      buttonTitle={
        <FormattedMessage
          id='page--community-report.section-button.donation.text'
          defaultMessage='Baixar'
        />
      }
      onClick={toggle => {
        asyncDownloadDonations(community)
          .then(() => toggle())
          .catch(() => toggle())
      }}
    />
    <SectionButton
      sectionTitle={
        <FormattedMessage
          id='page--community-report.section-button.actions.title'
          defaultMessage='RELATÓRIO DE AÇÕES'
        />
      }
      helperText={
        <FormattedMessage
          id='page--community-report.section-button.actions.helper-text'
          defaultMessage={
            'Clique no botão abaixo para baixar o relatório ' +
            'de ações feitas na comunidade.'
          }
        />
      }
      buttonTitle={
        <FormattedMessage
          id='page--community-report.section-button.actions.text'
          defaultMessage='Baixar'
        />
      }
      onClick={toggle => {
        asyncDownloadActivistActions(community)
          .then(() => toggle())
          .catch(() => toggle())
      }}
    />
    <SectionButton
      sectionTitle={
        <FormattedMessage
          id='page--community-report.section-button.activists.title'
          defaultMessage='RELATÓRIO DE ATIVISTAS'
        />
      }
      helperText={
        <FormattedMessage
          id='page--community-report.section-button.activists.helper-text'
          defaultMessage={
            'Clique no botão abaixo para baixar ' +
            'o relatório dos ativistas da comunidade.'
          }
        />
      }
      buttonTitle={
        <FormattedMessage
          id='page--community-report.section-button.activists.text'
          defaultMessage='Baixar'
        />
      }
      onClick={toggle => {
        asyncDownloadActivists(community)
          .then(() => toggle())
          .catch(() => toggle())
      }}
    />
    <SectionButton
      sectionTitle={
        <FormattedMessage
          id='page--community-report.section-button.recurring-donors.title'
          defaultMessage='RELATÓRIO DE DOADORES RECORRENTES'
        />
      }
      helperText={
        <FormattedMessage
          id='page--community-report.section-button.recurring-donors.helper-text'
          defaultMessage={
            'Clique no botão abaixo para baixar ' +
            'o relatório dos doadores recorrentes da comunidade.'
          }
        />
      }
      buttonTitle={
        <FormattedMessage
          id='page--community-report.section-button.recurring-donors.text'
          defaultMessage='Baixar'
        />
      }
      onClick={toggle => {
        asyncDownloadRecurringDonors(community)
          .then(() => toggle())
          .catch(() => toggle())
      }}
    />
  </div>
)

CommunitySettingsReportPage.propTypes = {
  community: PropTypes.object.isRequired,
  // Actions
  asyncDownloadActivistActions: PropTypes.func.isRequired,
  asyncDownloadActivists: PropTypes.func.isRequired,
  asyncDownloadDonations: PropTypes.func.isRequired,
  asyncDownloadRecurringDonors: PropTypes.func.isRequired
}

export default CommunitySettingsReportPage
