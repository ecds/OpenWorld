import React from 'react';
import { shallow } from 'enzyme';
import Annexations from './Annexations';

describe('<Annexations />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Annexations />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
