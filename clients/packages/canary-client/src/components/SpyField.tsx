import { form } from 'bonde-components';
const { useField } = form;

type ChildrenArgs = {
  value: any
  meta: any
}

type SpyFieldProps = {
  // Field name used to spy
  field: string
  children: (args: ChildrenArgs) => any
}

const SpyField = ({ children, field }: SpyFieldProps) => {
  const { input, meta } = useField(field)

  return children({ value: input.value, meta });
}

export default SpyField;