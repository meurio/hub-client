import React from "react";
import {
  Box,
  Button,
  Flex,
  Form,
  SimpleGrid,
  FormRenderProps
} from "@bonde/components";

const submit = async (values: any) => {
  console.log("submit", { values });
}

interface CommunityFormProps {
  columns?: number
}

const CommunityForm: React.FC<CommunityFormProps> = ({
  children,
  columns = 2
}) => {
  return (
    <Form onSubmit={submit}>
      {({ handleSubmit, dirty, submitting, invalid }: FormRenderProps) => (
        <SimpleGrid columns={columns}>
          <Box as="form" bg="white" p={6} onSubmit={handleSubmit}>
            {children}
            <Flex justify="flex-end">
              <Button disabled={!dirty || submitting || invalid} type="submit">Salvar</Button>
            </Flex>
          </Box>
        </SimpleGrid>
      )}
    </Form>
  );
}

export default CommunityForm;