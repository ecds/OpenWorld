import React from 'react';
import { shallow } from 'enzyme';
import TileLayers from './Layers/TileLayers';

describe('<TileLayers />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<TileLayers />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
