import React from 'react';
import SliderItem from '../slider/SliderItem';

export const lectureNumber = 2;
export const Title = 'CI / CD 배우기';

export const Checkpoints = [
  {
    name: '체크포인트1',
    commands: [],
  },
  {
    name: '체크포인트2',
    commands: [],
  },
];

const Slide1 = () => (
  <SliderItem>
    <h1>id is two 1/2</h1>
  </SliderItem>
);

const Slide2 = () => (
  <SliderItem>
    <h1>id is two 2/2</h1>
  </SliderItem>
);

export default [
  {
    slideId: 1,
    content: <Slide1 />,
  },
  {
    slideId: 2,
    content: <Slide2 />,
  },
];
