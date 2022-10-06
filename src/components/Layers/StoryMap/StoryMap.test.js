import React from 'react';
import { shallow } from 'enzyme';
import StoryMap from './StoryMap';

describe('<StoryMap />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<StoryMap />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
