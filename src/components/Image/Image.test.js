import React from 'react';
import { shallow } from 'enzyme';
import Image from './Image';

describe('<Image />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Image />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
