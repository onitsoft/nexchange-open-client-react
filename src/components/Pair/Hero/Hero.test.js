import React from 'react';
import { shallow } from 'enzyme';
import Hero from './Hero';


const setup = ({
  selectedCoin = {
    deposit: 'eth',
    receive: 'usd'
  }
}) => ({
  selectedCoin
})
describe('Hero', () => {
  it('renders correctly', () => {
    const props = setup({})
    const wrapShallow = shallow(<Hero {...props} />).dive();
    expect(wrapShallow).toMatchSnapshot();
  });
});
