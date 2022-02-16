import React, { useEffect } from 'react';
import { Button } from 'bonde-components';
import { gql, useLazyQuery } from 'bonde-core-tools';
import { createVariables, useQueryFiltersFields } from './QueryFiltersProvider';

export const QUERY = gql`
  query ($where: plips_bool_exp) {
    plips(
      where: $where
    ) {
      name: form_data(path: "name")
      email: form_data(path: "email")
      whatsapp: form_data(path: "whatsapp")
      state
      expected_signatures
      confirmed_signatures
      created_at
      status
    }
  }
`;

interface Props {
  widgetId: number;
  fileName: string;
}

const jsonToCSV = (data: any[]): string => {
  const rows: any[][] = [];
  
  data.forEach((obj, index) => {
    if (index === 0) {
      rows.push(Object.keys(obj));
    }
    rows.push(Object.values(obj));
  })

  return "data:text/csv;charset=utf-8," +
    rows.map((e) => e.join(',')).join('\n');
}

const ExportCSV: React.FC<Props> = ({ widgetId, fileName }) => {
  const { status, states, signatures } = useQueryFiltersFields();
  const [fetchPlipForms, { called, loading, data }] = useLazyQuery(QUERY, {
    variables: createVariables({ widgetId, status, states, signatures })
  });
  
  useEffect(() => {
    if (called && !loading && !!data) {
      const encodedUri = encodeURI(jsonToCSV(data.plips));
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `${fileName}.csv`);
      document.body.appendChild(link); // Required for FF

      link.click();
    }
  }, [called, loading, data, fileName]);
  
  return (
    <Button variant="outline" colorScheme="gray" onClick={fetchPlipForms} disabled={called && loading}>
      {called && loading ? 'Exportando CSV ...' : 'Exportar'}
    </Button>
  );
}

export default ExportCSV;