import React from 'react';
import { shallow } from 'enzyme';
import ErrorPage from './ErrorPage';

describe('<ErrorPage />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<ErrorPage />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
