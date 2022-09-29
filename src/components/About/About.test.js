import React from 'react';
import { shallow } from 'enzyme';
import About from './About';

describe('<About />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<About />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
