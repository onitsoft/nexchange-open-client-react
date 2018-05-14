import React from 'react';
import { shallow } from 'enzyme';
import { Home } from '../../containers/Home';

describe('Home', () => {
  const mockfetchCoinDetails = jest.fn();
  const props = {
    fetchCoinDetails: mockfetchCoinDetails,
    coinsInfo: [],
  };
  const home = shallow(<Home {...props} />);

  it('renders correctly', () => {
    expect(home).toMatchSnapshot();
  });

  it('contains a Hero component', () => {
    expect(home.find('Hero').exists()).toBe(true);
  });

  it('contains a connected RecentOrders component', () => {
    expect(home.find('Connect(RecentOrders)').exists()).toBe(true);
  });

  it('contains a Trustpilot component', () => {
    expect(home.find('Trustpilot').exists()).toBe(true);
  });

  it('contains a Testimonials component', () => {
    expect(home.find('Testimonials').exists()).toBe(true);
  });

  it('contains a PriceComparison component', () => {
    expect(home.find('PriceComparison').exists()).toBe(true);
  });

  it('contains a About component', () => {
    expect(home.find('About').exists()).toBe(true);
  });

  it('contains a SubscriptionForm component', () => {
    expect(home.find('SubscriptionForm').exists()).toBe(true);
  });
});
