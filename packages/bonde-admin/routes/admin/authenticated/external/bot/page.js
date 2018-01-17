//
// @route /bot
//
import React, { Component } from 'react'

import { Background } from '~client/components/layout'
import { Tabs, Tab } from '~client/components/navigation/tabs'
import { Loading } from '~client/components/await'
import { Button } from '~client/ux/components'
import { StepsContainerStack, StepContent } from '~client/components/steps'
import { ActivistSegmentationForm, FacebookBotMassMessageForm, Preview } from './components'

var styles = require('exenv').canUseDOM ? require('./page.scss') : {}

class BotPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      listActivists: [],
      totalImpactedActivists: 0,
      searchFinished: false,
      hasEnqueued: false,
      segmentation: {},
      backgroundAlignmentX: 'center',
      backgroundAlignmentY: 'center',
      forceResetSearch: false
    }
  }

  resetSteps () {
    this.changeState({
      listActivists: [],
      totalImpactedActivists: 0,
      searchFinished: false,
      hasEnqueued: false,
      segmentation: {},
      forceResetSearch: true
    })
  }

  changeState (state) {
    this.setState({ ...this.state, ...state })
  }

  getCurrentStep () {
    const { searchFinished, hasEnqueued } = this.state
    if (searchFinished && hasEnqueued) return 2
    else if (searchFinished && !hasEnqueued) return 1
    return 0
  }

  render () {
    const { image } = this.props
    const {
      loading,
      listActivists,
      totalImpactedActivists,
      searchFinished,
      hasEnqueued,
      segmentation
    } = this.state

    return (
      <Background
        image={image}
        alignment={{
          x: this.state.backgroundAlignmentX,
          y: this.state.backgroundAlignmentY
        }}
        contentSize={12}
      >
        <div style={{ display: 'flex' }}>
          {[searchFinished, hasEnqueued].some(f => !f) && listActivists.length && (
            <Preview
              list={listActivists}
              total={totalImpactedActivists}
              listStyle={{ height: [577, 461][this.getCurrentStep()] }}
            />
          )}

          <div className={styles.stepsContainer}>
            <h1 className={styles.stepsTitle}>
              Envio de mensagem em massa
            </h1>
            <StepsContainerStack
              ComponentPointerContainer={Tabs}
              ComponentPointerChildren={Tab}
              pointerChildrenProps={({ index, step }) => ({ isActive: index === step, index })}
              progressValidations={[() => searchFinished, () => hasEnqueued, () => false]}
            >
              <StepContent>
                <ActivistSegmentationForm
                  totalImpactedActivists={totalImpactedActivists}
                  changeParentState={::this.changeState}
                  segmentation={segmentation}
                  forceReset={this.state.forceResetSearch}
                />
              </StepContent>

              <StepContent>
                <FacebookBotMassMessageForm
                  totalImpactedActivists={totalImpactedActivists}
                  changeParentState={::this.changeState}
                  segmentation={segmentation}
                />
              </StepContent>

              <StepContent>
                <div className={styles.successMessageContainer}>
                  <h1 className={styles.h1}>Oba!</h1>
                  <i className={styles.successIcon} />
                  <br />
                  Sua mensagem foi enfileirada. Em instantes todos os usuários
                  segmentados receberão sua mensagem.
                  <br />
                  <div className='mt3'>
                    <Button onClick={() => this.resetSteps()}>
                      Enviar outra mensagem
                    </Button>
                  </div>
                </div>
              </StepContent>
            </StepsContainerStack>
          </div>

          {loading && <Loading />}
        </div>
      </Background>
    )
  }
}

export default BotPage
