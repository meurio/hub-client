import React from 'react'
import ReactGA from 'react-ga'
// MOBILIZATION and external dependencies
import { Mobilization } from 'bonde-webpage'
import { PluggableWidget, FinishMessageCustom } from 'bonde-webpage/lib/ux'
import mobilizationConnect from './mobilization.connected'
// DRAFT PLUGIN and external dependencies
import { DraftPlugin } from 'bonde-webpage/lib/plugins/draft'
// FORM PLUGIN and external dependencies
import FormPlugin from './plugin-form.connected'
import { FormAnalytics, FormTellAFriend } from 'bonde-webpage/lib/plugins/form'
// CONTENT PLUGIN and external dependencies
import { ContentPlugin } from 'bonde-webpage/lib/plugins/content'
// PRESSURE PLUGIN and external dependencies
import PressurePlugin from './plugin-pressure.connected'
import { PressureAnalytics, PressureTellAFriend } from 'bonde-webpage/lib/plugins/pressure'
import { client as graphqlClient } from 'store'
// PRESSURE PLUGIN and external dependencies
import DonationPlugin from './plugin-donation.connected'
import { DonationAnalytics, DonationTellAFriend } from 'bonde-webpage/lib/plugins/donation'
// TODO: Icons should be inside plugin reference.
import { PressureEmailIcon, PressurePhoneIcon } from './icons'

const MyCustonPressurePlugin = (props) => (
  <PressurePlugin
    {...props}
    analyticsEvents={PressureAnalytics}
    graphqlClient={graphqlClient}
    overrides={{
      FinishCustomMessage: { component: FinishMessageCustom },
      FinishDefaultMessage: { component: PressureTellAFriend },
    }}
  />
)

const plugins = [
  { 
    kind: 'draft',
    component: DraftPlugin,
    options: { noOverlay: true }
  },
  {
    kind: 'form',
    component: (props) => (
      <FormPlugin
        {...props}
        analyticsEvents={FormAnalytics}
        overrides={{
          FinishCustomMessage: { component: FinishMessageCustom },
          FinishDefaultMessage: { component: FormTellAFriend },
        }}
      />
    ),
    options: DraftPlugin.setOptions({
      label: 'Formulário',
      icon: () => (<i className='fa fa-list block white' />),
      action: (widget) => {
        console.log(`update widget ${widget.id}`)
      }
    })
  },
  {
    kind: 'donation',
    component: (props) => (
      <DonationPlugin
        {...props}
        analyticsEvents={DonationAnalytics}
        overrides={{
          FinishCustomMessage: { component: FinishMessageCustom },
          FinishDefaultMessage: { component: DonationTellAFriend },
        }}
      />
    ),
    options: DraftPlugin.setOptions({
      label: 'Doação',
      icon: () => (<i className='fa fa-money block white' />),
      action: (widget) => {
        console.log(`update widget ${widget.id}`)
      }
    })
  },
  {
    kind: 'pressure',
    component: MyCustonPressurePlugin,
    options: DraftPlugin.setOptions({
      label: 'Pressão por e-mail',
      icon: PressureEmailIcon,
      action: (widget) => {
        console.log(`update widget ${widget.id}`)
      }
    })
  },
  {
    kind: 'pressure-phone',
    component: MyCustonPressurePlugin,
    options: DraftPlugin.setOptions({
      label: 'Pressão por telefone',
      icon: PressurePhoneIcon,
      action: (widget) => {
        console.log(`update widget ${widget.id}`)
      }
    })
  },
  {
    kind: 'content',
    component: ContentPlugin,
    options: Object.assign(
      {},
      DraftPlugin.setOptions({
        label: 'Texto',
        icon: () => (<i className='fa fa-font block white' />),
        action: (widget) => {
          console.log(`update widget ${widget.id}`)
        }
      }),
      { noOverlay: true }
    )
  }
]

class MobilizationPreview extends React.Component {

  componentDidMount () {
    const isTest = false
    if (!isTest && this.props.mobilization) {
      const { mobilization } = this.props

      ReactGA.initialize('UA-26278513-30')
      ReactGA.pageview('/' + mobilization.slug)

      if (mobilization.google_analytics_code) {
        ReactGA.initialize(
          mobilization.google_analytics_code,
          { gaOptions: { name: 'MobilizationTracker' } }
        )
        ReactGA.ga('MobilizationTracker.send', 'pageview', '/')
      }
    }
  }

  render () {
    // Properties received by HOC
    const { blocks, widgets } = this.props
    const {
      color_scheme: colorScheme,
      header_font: headerFont,
      body_font: bodyFont
    } = this.props.mobilization

    return (
      <Mobilization
        editable
        colorScheme={colorScheme}
        headerFont={headerFont}
        bodyFont={bodyFont}
        linkTo={b => `block-${b.id}`}
        blocks={blocks}
        widgets={widgets}
        widgetComponent={PluggableWidget}
        extraWidgetProps={{
          mobilization: this.props.mobilization,
          editable: this.props.editable,
          plugins: plugins
        }}
      />
    )
  }
}

export default mobilizationConnect(MobilizationPreview)
