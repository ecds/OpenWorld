import React from 'react';
import { shallow } from 'enzyme';
import Wards from './Wards';

describe('<Wards />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Wards />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
