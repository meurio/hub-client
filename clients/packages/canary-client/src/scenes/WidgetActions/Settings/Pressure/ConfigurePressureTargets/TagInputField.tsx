import React from "react";
import {
  FormControl,
  FormLabel,
  Box,
  Flex,
  Input,
  IconButton,
  CloseIcon,
  useField
} from "bonde-components";

interface State {
  tags: string[]
  value?: string
}

interface Props {
  label?: string
  placeholder?: string
  defaultValue?: string | string[]
  onChange: (tags: string[]) => void
  errors?: string[]
}

class TagInput extends React.Component<Props, State> {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(props: any) {
    super(props)
    this.state = {
      tags: props.defaultValue || [],
      value: ""
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  onChange(evt: any): void {
    this.setState({ value: evt.target.value });
  }

  onRemove(index: number): void {
    const newTags = [...this.state.tags];
    newTags.splice(index, 1);
    this.setState({ tags: newTags });
    this.props.onChange(newTags);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  onKeyDown(evt: any): void {
    const value = evt.target.value;
    if (evt.key === 'Enter' && value) {
      evt.preventDefault();
      if (this.state.tags.find(tag => tag === value.trim())) {
        return;
      }
      const newTags = [...this.state.tags, value.trim()]
      this.setState({
        tags: newTags,
        value: ""
      });
      this.props.onChange(newTags);
    } else if (evt.key === 'Backspace' && !value) {
      this.onRemove(this.state.tags.length - 1);
    }
  }

  onPaste(evt: any): void {
    const value = evt.clipboardData.getData("Text");

    if (value && value.includes(";")) {
      // Special paste
      evt.preventDefault();

      const newTags = value.split(";")
        .map((value: string) => value.trim())
        .filter((value: string) => !!value && this.state.tags.findIndex((v) => v === value) === -1)

      this.setState({
        tags: [...this.state.tags, ...newTags],
        value: ""
      });
    }
  }

  render(): React.ReactElement {
    const { label, placeholder, errors } = this.props;

    return (
      <FormControl mb={2}>
        {label && <FormLabel>{label}</FormLabel>}
        <Flex
          direction="row"
          flexWrap="wrap"
          borderBottomColor="gray.200"
          borderBottomWidth="1px"
          borderBottomStyle="solid"
          py={1}
        >
          <Flex direction="row" flexWrap="wrap" flex={1}>
            {this.state.tags.map((tag: string, index: number) => (
              <Box
                borderRadius={100}
                border="1px"
                borderColor={(errors || []).includes(tag) ? "red.100" : "gray.100"}
                key={tag}
                bg={(errors || []).includes(tag) ? "red.50" : "gray.50"}
                display="flex"
                alignItems="center"
                mr={2}
                mb={1}
                px={2}
                py={1}
              >
                {tag}
                <IconButton
                  aria-label="Remover"
                  variant="ghost"
                  onClick={() => this.onRemove(index)}
                  colorScheme="gray"
                  icon={<CloseIcon boxSize={2} color="gray.400" />}
                  size={1}
                  ml={2}
                />
              </Box>
            ))}
            <Box flexGrow={1}>
              <Input
                type="text"
                placeholder={placeholder}
                value={this.state.value}
                onKeyDown={this.onKeyDown.bind(this)}
                onChange={this.onChange.bind(this)}
                onPaste={this.onPaste.bind(this)}
                border="none"
                w="100%"
              />
            </Box>
          </Flex>
        </Flex>
      </FormControl>
    );
  }
}

export interface TagInputFieldProps {
  name: string
  label?: string
  placeholder?: string
  validate: (value?: any, allValues?: any, meta?: any) => any
}

const TagInputField: React.FC<TagInputFieldProps> = ({ name, validate, ...props }) => {
  const { input, meta } = useField(name, { validate });

  return (
    <TagInput
      defaultValue={input.value}
      onChange={(tags) => input.onChange(tags)}
      errors={meta.error}
      {...props}
    />
  );
}

export default TagInputField;
