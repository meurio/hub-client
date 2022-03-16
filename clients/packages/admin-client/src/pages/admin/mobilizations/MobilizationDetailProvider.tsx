import React, { createContext, useContext } from 'react';
import { gql, useQuery } from 'bonde-core-tools';
import { SidebarContext } from '../sidebar/Provider';
import type { MobilizationDetailContextValues } from './types';
import { Loading } from '../../../components/await';

const FETCH_MOBILIZATION_DETAIL_QUERY = gql`
  query ($mobilization_id: Int!) {
    widgets(where: { block: { mobilization_id: { _eq: $mobilization_id } }, deleted_at: { _is_null: true } }) {
      id
      block_id
      settings
      kind
      created_at
      updated_at
      sm_size
      md_size
    }

    blocks(where: { mobilization_id: { _eq: $mobilization_id }, deleted_at: { _is_null: true } }) {
      id
      mobilization_id
      created_at
      updated_at
      bg_class
      position
      hidden
      bg_image
      name
      menu_hidden
    }
  }
`;

export const MobilizationDetailContext = createContext<MobilizationDetailContextValues>({
  widgets: [],
  blocks: [],
  fetching: true
});

const MobilizationDetailProvider: React.FC = ({ children }) => {
  const { mobilization } = useContext(SidebarContext);
  const { loading, data } = useQuery(FETCH_MOBILIZATION_DETAIL_QUERY, {
    variables: { mobilization_id: mobilization?.id }
  });

  const mobilizationDetailValues = {
    fetching: loading,
    widgets: data?.widgets || [],
    blocks: data?.blocks || []
  }

  return loading ? <Loading /> : (
    <MobilizationDetailContext.Provider value={mobilizationDetailValues}>
      {children}
    </MobilizationDetailContext.Provider>
  );
}

export default MobilizationDetailProvider;