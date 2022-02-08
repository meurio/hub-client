import React, { useContext } from 'react'
import { Context as SessionContext } from 'bonde-core-tools';

import Sidebar from './sidebar'

const UserContainer = () => {
  const { currentUser: user, community } = useContext(SessionContext);

  console.log("UserContainer: ", { user, community });

  return (
    <Sidebar
      loading={false}
      user={user}
      mobilization={undefined}
      community={community}
    />
  );
}

export default UserContainer;
