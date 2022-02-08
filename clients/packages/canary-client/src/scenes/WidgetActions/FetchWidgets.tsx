import React from 'react';
import { gql, useQuery } from 'bonde-core-tools';
import { Hint, Loading } from 'bonde-components';
import styled from 'styled-components';

const widgetsByCommunityGQL = gql`
  query FetchWidgets ($communityId: Int!) {
    widgets (
      where: {
        _and: [
          { kind: { _neq: "draft" }},
          { kind: { _neq: "content" }},
          {
            block: {
              mobilization: {
                deleted_at: { _is_null: true },
                community_id: { _eq: $communityId }
              }
            }
          }
        ]
      }
    ) {
      id
      kind
      settings
      created_at
      block {
        mobilization {
          image: facebook_share_image
          name
          community_id
          id
        }
      }
      groups: pressure_targets {
        id
        targets
        identify
        label
        email_subject
        email_body
      }

      actions: activist_actions_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`

export type Widget = {
  id: number
  kind: 'pressure' | 'form' | 'donation' | 'plip'
  block: {
    mobilization: {
      image?: string
      name: string
      community_id: number
      id: number
    }
  }
  groups: {
    id: number
    targets: string[]
    identify: string
    label: string
    email_subject?: string
    email_body?: string
  }[]
  actions: {
    aggregate: {
      count: number
    }
  }
  created_at: string
  settings: Record<string, any>
}

export type RenderProps = {
  widgets: Widget[]
  loading: boolean
  refetch: any
}

const WidgetLoadingStyled = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const WidgetLoading: React.FC = () => (
  <WidgetLoadingStyled>
    <Loading message='Carregando ações...' />
  </WidgetLoadingStyled>
)


type Props = {
  communityId: number
  children: ({ widgets }: RenderProps) => any
}

const FetchWidgets: React.FC<Props> = ({ children, communityId }) => {
  const { data, loading, error, refetch } = useQuery(widgetsByCommunityGQL, { variables: { communityId } });

  if (error) return <Hint color="error">{JSON.stringify(error)}</Hint>;

  return children({ widgets: data?.widgets || [], refetch, loading });
}

export default FetchWidgets;