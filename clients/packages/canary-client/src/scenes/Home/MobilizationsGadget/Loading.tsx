import React from 'react';
import { Panel } from 'bonde-styleguide';
import { SimpleGrid } from "bonde-components";

type Props = {
  cells: number
}

const Loading: React.FC<Props> = ({ cells }): React.ReactElement => (
  <SimpleGrid columns={cells / 2} spacing={4}>
    {Array(cells).fill('').map(() => (
      <Panel key={Math.random()} loading image='' title='' author='' onClick={() => ({})} />
    ))}
  </SimpleGrid>
);

Loading.defaultProps = {
  cells: 4
};

export default Loading;
