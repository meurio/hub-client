import React, { useContext } from "react";
import styled from "styled-components";
import { Context as SessionContext } from "bonde-core-tools";
import { Empty } from "bonde-components";
import { useCommunityExtra } from "../services/CommunityExtraProvider";
import { Groups } from "../types";

const WrapEmpty = styled.div`
  height: 100%;
  & > div {
    height: 100%;
  }
`;

type ComponentProps = {
  community: {
    id: number;
  };
  groups: Groups;
  weeklyTimestamp: string;
  monthlyTimestamp: string;
};

export default function CheckCommunity({
  Component,
  ...props
}: {
  Component: (props: ComponentProps) => React.ReactElement;
}): React.ReactElement {
  const { community }: any = useContext(SessionContext);
  const { groups } = useCommunityExtra();
  const today = new Date();
  // get last week and format
  const lastWeek = new Date().setDate(today.getDate() - 7);
  // get last month and format
  const lastMonth = new Date().setDate(today.getDate() - 30);

  return community ? (
    <Component
      community={community}
      groups={groups}
      weeklyTimestamp={new Date(lastWeek).toISOString()}
      monthlyTimestamp={new Date(lastMonth).toISOString()}
      {...props}
    />
  ) : (
    <WrapEmpty>
      <Empty message="Selecione uma comunidade" />
    </WrapEmpty>
  );
}

CheckCommunity.displayName = "CheckCommunity";
