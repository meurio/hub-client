import React from 'react'
import { Button, Box, FinalForm } from 'bonde-components';
import styled from "@emotion/styled";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export interface Properties {
  initialValues?: any;
  onSubmit: any
}

export interface State {
  page: number;
  values: any
}

export default class Wizard extends React.Component<Properties, State> {

  static Page = ({ children }: any) => children

  constructor(props: Properties) {
    super(props)
    this.state = {
      page: 0,
      values: props.initialValues || {}
    }
  }
  
  next = (values: any) =>
    this.setState(state => ({
      page: Math.min(state.page + 1, (this.props.children as any[]).length - 1),
      values
    }))

  previous = () =>
    this.setState(state => ({
      page: Math.max(state.page - 1, 0)
    }))

  /**
   * NOTE: Both validate and handleSubmit switching are implemented
   * here because 🏁 Redux Final Form does not accept changes to those
   * functions once the form has been defined.
   */

  validate = (values: any) => {
    const activePage: any = React.Children.toArray(this.props.children)[
      this.state.page
    ]
    return activePage.props.validate ? activePage.props.validate(values) : {}
  }

  handleSubmit = (values: any) => {
    const { children, onSubmit } = this.props
    const { page } = this.state
    const isLastPage = page === React.Children.count(children) - 1
    if (isLastPage) {
      return onSubmit(values)
    } else {
      this.next(values)
    }
  }

  render() {
    const { children } = this.props
    const { page, values } = this.state
    const activePage = React.Children.toArray(children)[page]
    const isLastPage = page === React.Children.count(children) - 1
    return (
      <FinalForm
        initialValues={values}
        validate={this.validate}
        onSubmit={this.handleSubmit}
      >
        {({ handleSubmit, submitting }: any) => (
          <Form onSubmit={handleSubmit}>
            {activePage}
            <Box py={4} borderTop="1px solid" borderColor="gray.100">
              {!isLastPage && <Button type="submit" w="100%">Confirma</Button>}
              {isLastPage && (
                <Button type="submit" disabled={submitting} w="100%">
                  Concluir
                </Button>
              )}
            </Box>
          </Form>
        )}
      </FinalForm>
    )
  }
}
