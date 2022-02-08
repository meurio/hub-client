import React, { useContext } from "react";
import { Context as SessionContext, useQuery, gql } from "bonde-core-tools";
import {
  CommunityExtraData,
  CommunityExtraVars,
  CommunityExtraState,
} from "../types";

const initialValue = {
  groups: [
    {
      isVolunteer: true,
      name: "Voluntária",
      communityId: 0,
      id: 0,
      widgetId: 0,
      settings: {},
    },
    {
      isVolunteer: false,
      name: "PSR",
      communityId: 0,
      id: 0,
      widgetId: 0,
      settings: {},
    },
  ],
};

const CommunityExtraContext = React.createContext<CommunityExtraState>(
  initialValue
);

const COMMUNITY_EXTRA = gql`
  query FetchCommunityExtra($context: Int_comparison_exp!) {
    community: communities(where: { id: $context }) {
      users: community_users {
        user {
          firstName: first_name
          lastName: last_name
          id
        }
      }
    }
    groups: rede_groups(where: { community_id: $context }) {
      isVolunteer: is_volunteer
      name
      communityId: community_id
      id
      widgetId: widget_id
      settings
    }
  }
`;

const CommunityExtraProvider = ({
  children,
}: {
  children: any;
}): React.ReactElement => {
  const { community }: any = useContext(SessionContext);

  const variables = {
    context: { _eq: (community && community.id) || 0 },
  };

  const { error, data } = useQuery<CommunityExtraData, CommunityExtraVars>(
    COMMUNITY_EXTRA,
    { variables }
  );

  if (error) {
    console.log("error", error);
  }

  const settings =
    (data && data.communitySettings && data.communitySettings[0]) ||
    initialValue;

  const groups = (data && data.groups) || initialValue.groups;

  const users = data && data.community && data.community[0];

  const value =
    users && settings && groups
      ? { ...settings, ...users, groups }
      : initialValue;

  return (
    <CommunityExtraContext.Provider value={value}>
      {children}
    </CommunityExtraContext.Provider>
  );
};

const useCommunityExtra = (): CommunityExtraState => {
  const context = React.useContext(CommunityExtraContext);
  if (context === undefined) {
    throw new Error(
      "useCommunityExtra must be used within a CommunityExtraProvider"
    );
  }
  return context;
};

export { CommunityExtraProvider, useCommunityExtra };
