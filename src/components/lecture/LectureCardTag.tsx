import React from 'react';
import {
  Box,
  chakra,
  Text,
} from '@chakra-ui/react';

interface CardTagProps {
  tags: string[];
}

const TagContainer = chakra(Box, {
  baseStyle: {
    display: 'flex',
    position: 'absolute',
    bottom: '0',
    right: '0',
  },
});

const Tag = chakra(Box, {
  baseStyle: {
    display: 'flex',
    backgroundColor: '#eeeeee',
    fontSize: '12px',
    padding: '4px',
    margin: '4px',
  },
});

const LectureCardTag = ({ tags }: CardTagProps) => (
  <TagContainer>
    {tags.map((tag) => (
      <Tag key={tag}>
        <Text color="teal.600" fontWeight="bold">#</Text>
        <Text color="teal.400">{tag}</Text>
      </Tag>
    ))}
  </TagContainer>
);

export default LectureCardTag;
