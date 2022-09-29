import React from 'react';
import { shallow } from 'enzyme';
import MainNav from './MainNav';

describe('<MainNav />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<MainNav />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
