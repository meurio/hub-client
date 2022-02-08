# Steps

The **steps** components stack controls the state to display each step of a specific flow.

- [Components](#components)
  - [StepsContainer](#stepscontainer)
  - [StepsContainerStack](#stepscontainerstack)
  - [StepContent](#stepcontent)
  - [StepButton](#stepbutton)
  - [StepForm](#stepform)
- [Full Example](#fullexample)

## Components

### StepsContainer

Control the state to render the `<StepContent />` component propagating down the required props.

---

### StepsContainerStack

Control the state to render the `<StepContent />` component propagating down the required props.
Rendering the steps content sequentially.

##### Props:
| prop                              | description                                                   |
|-----------------------------------|---------------------------------------------------------------|
| `ComponentPointerContainer: Node` | Component that holds the steps pointers                       |
| `ComponentPointerChildren: Node`  | Component that renders the step pointer                       |
| `pointerChildrenProps: Function`  | Object that injects the props required by pointer component   |

##### Example:

```jsx
import React from 'react'

import { Tabs, Tab } from '@/components/navigation/tabs'
import { FlatForm } from '@/ux/components'
import { StepsContainerStack, StepContent } from '@/components/steps'
import { FormDomain, FormShare } from '@/mobilizations/components'

export default ({ mobilization, ...formProps }) => {
  const stepDomainValidation = () => true
  const stepShareValidation = () => true

  return (
    <StepsContainerStack
      ComponentPointerContainer={Tabs}
      ComponentPointerChildren={Tab}
      pointerChildrenProps={({ index, step }) => ({ isActive: index === step, index })}
      progressValidations={[stepDomainValidation, stepShareValidation]}
    >
      <StepContent>
        <FormDomain {...formProps} FormComponent={FlatForm} />
      </StepContent>

      <StepContent>
        <FormShare {...formProps} FormComponent={FlatForm} />
      </StepContent>
    </StepsContainerStack>
  )
}
```

---

### StepContent

Render the stop content and propagate the props to its childrens.

##### Props:
| prop                               | description                                                                |
|------------------------------------|----------------------------------------------------------------------------|
| `title: String`                    | Title for render header                                                    |
| `step: Number`                     | Current step position                                                      |
| `position: Number`                 | Position of step in render, received by `<StepsContainer />`               |
| `onNextStep: Function`             | Function to call the next step, received by `<StepContent />`              |
| `propsPropagationWhitelist: Array` | Array that tells what components are allow to receive the propagated props |

##### Default propagated props to childrens:
- `onNextStep: Function`
- `onFinishSubmit: Function` (same as `onNextStep` only an interface to FormRedux props)

---

### StepButton

Render button when clicked render should render next step.

##### Props:
| prop                   | description                                                   |
|------------------------|---------------------------------------------------------------|
| `onClick: Function`    | Called when clicked button                                    |
| `onNextStep: Function` | Function to call the next step, received by `<StepContent />` |

---

### StepForm

Render `<ReduxForm />` for render next step when submit is done.

##### Props:
| prop                   | description                                                   |
|------------------------|---------------------------------------------------------------|
| `onNextStep: Function` | Function to call the next step, received by `<StepContent />` |


# Full Example

```jsx
...
import { StepsContainer, StepContent, StepForm, StepButton } from '@/components/steps'

class Page extends Component {
  constructor (props) {
    super(props)
    this.state = { isConnected: false }
  }

  handleConnectionTest () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.setState({ isConnected: true })
        resolve()
      }, 1000)
    })
  }

  render() {
    const { fields: { domain }, ...formProps } = this.props

    return (
      <div className='page'>
        <StepsContainer title='Domínio da comunidade'>
          <StepContent title='Insira o domínio desejado'>
            <StepForm
              {...formProps}
              onSubmit={values => new Promise((resolve, reject) => {
                console.log(values)
                return resolve()
              })}
            >
              <FormGroup {...domain}>
                <ControlLabel>Domínio da sua comunidade</ControlLabel>
                <FormControl type='text' placeholder='Ex. minhacomunidade.org' />
              </FormGroup>
              <Button type='submit'>Adicionar</Button>
            </StepForm>
          </StepContent>
          <StepContent title='Altere os servidores no seu provedor DNS'>
            <div>
              <p>1. Faça login no seu provedor de DNS (onde seu domínio está registrado, por exemplo GoDaddy, Locaweb, RegistroBR)</p>
              <p>2. Encontre a página de <b>gerenciador de DNS</b>, e altere os <b>nomes de servidor</b> para os servidores do Bonde:</p>
              <br />
              <p>ns1.1098.19872.0871.98</p>
              <p>ns2.1098.19872.0871.98</p>
              <p>ns3.1098.19872.0871.98</p>
            </div>
            <StepButton>Continuar</StepButton>
          </StepContent>
          <StepContent title='Teste a conexão'>
            <div>
              <p>Clique no botão abaixo para verificar se tudo está certo.</p>
              <p>Atenção: a mudança de DNS pode demorar até 48 horas para ser propagada pela internet.</p>
            </div>
            <StepButton onClick={() => this.handleConnectionTest()}>
              {!this.state.isConnected ? 'Testar' : 'Pronto'}
            </StepButton>
          </StepContent>
        </StepsContainer>
      </div>
    )
  }
}
```
