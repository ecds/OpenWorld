import React from 'react';
import { shallow } from 'enzyme';
import OpenTour from './OpenTour';

describe('<OpenTour />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<OpenTour />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
