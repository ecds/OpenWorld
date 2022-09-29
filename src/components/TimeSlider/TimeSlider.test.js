import React from 'react';
import { shallow } from 'enzyme';
import TimeSlider from './TimeSlider';

describe('<TimeSlider />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<TimeSlider />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
