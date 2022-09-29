import React from 'react';
import { shallow } from 'enzyme';
import Buildings from './Layers/Buildings';

describe('<Layers/Buildings />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Buildings />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
