import React from 'react';
import { shallow } from 'enzyme';
import StreetcarLines from './StreetcarLines';

describe('<StreetcarLines />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<StreetcarLines />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
