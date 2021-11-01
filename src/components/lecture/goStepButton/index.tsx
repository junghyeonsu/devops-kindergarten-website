import React, { useMemo } from 'react';
import { chakra, IconButton } from '@chakra-ui/react';
import CheckIcon from '@mui/icons-material/Check';

import { goOneStep } from '#/redux/ducks/lecture';
import { useAppDispatch, useAppSelector } from '#/hooks/useRedux';

const ChakraButton = chakra(IconButton, {
  baseStyle: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    margin: '20px',
  },
});

const GoStepButton = () => {
  const dispatch = useAppDispatch();
  const { clearSlideNumber, currentSlideNumber } = useAppSelector((state) => state.lecture);

  const onClickButton = () => {
    if (clearSlideNumber !== currentSlideNumber) return;
    dispatch(goOneStep());
  };

  const isCheckedButton = useMemo(() => clearSlideNumber !== currentSlideNumber,
    [clearSlideNumber, currentSlideNumber]);

  return (
    isCheckedButton
      ? (
        <ChakraButton
          colorScheme="green"
          type="button"
          size="lg"
          icon={<CheckIcon fontSize="large" />}
        />
      ) : (
        <ChakraButton
          colorScheme="gray"
          variant="solid"
          onClick={onClickButton}
          type="button"
          size="lg"
          icon={<CheckIcon fontSize="large" />}
        />
      )
  );
};

export default GoStepButton;