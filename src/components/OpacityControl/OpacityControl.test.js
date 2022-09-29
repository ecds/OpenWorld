import React from 'react';
import { shallow } from 'enzyme';
import OpacityControl from './OpacityControl';

describe('<OpacityControl />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<OpacityControl />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
