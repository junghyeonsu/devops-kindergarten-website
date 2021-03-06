import React from 'react';
import { chakra, Box, Divider, useMediaQuery } from '@chakra-ui/react';

import BackButton from './BackButton';
import Title from './Title';
import type { Checkpoint } from '#/components/lecture/contents/types';
import CheckpointList from '#/components/lecture/checkpoint';
import { MIN_WIDTH_1100 } from '#/constants';

const Container = chakra(Box, {
  baseStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: '300px',
    shadow: 'lg',
    zIndex: 10,
    backgroundColor: '#fafafa',
    padding: '20px',
    overflowY: 'auto',
  },
});

const SmallLayoutContainer = chakra(Container, {
  baseStyle: {
    width: '70px',
  },
});

const Sidebar = ({
  checkpoints,
  title,
}: {
  checkpoints: Checkpoint[];
  title: string;
}) => {
  const [islargerthan1100] = useMediaQuery(MIN_WIDTH_1100);

  return (
    islargerthan1100 ? (
      <Container>
        <BackButton />
        <Title title={title} />
        <Divider margin="15px 0" />
        <CheckpointList checkpoints={checkpoints} />
      </Container>
    ) : (
      <SmallLayoutContainer>
        <BackButton />
        <Divider margin="15px 0" />
        <CheckpointList checkpoints={checkpoints} />
      </SmallLayoutContainer>
    )
  );
};

export default Sidebar;
