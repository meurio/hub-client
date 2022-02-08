import Form from './__form__'

export default (properties): React.ReactElement => (
  <Form
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...properties}
    intl={{ formatMessage: ({ defaultMessage }): string => defaultMessage }}
  />
)
