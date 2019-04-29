import React from 'react';
import { shallow } from 'enzyme';
import OrderDepth from './OrderDepth.js';

describe('OrderDepth', () => {

  let wrapShallow;
  beforeEach(() => {
    const selectedCoins = {receive: 'DOGE', deposit: 'ETH'};
    const sellDepth = [
      { size: 100.000000000, rate: 0.000019500 },
      { size: 100.000000000, rate: 0.000019400 },
      { size: 573.000000000, rate: 0.000017510 }    
      ];
    const buyDepth = [
      { size: 2400.000000000, rate: 0.000015000 },
      { size: 1175.002932550, rate: 0.000017050 },
      { size: 0.000000400, rate: 55666.000000000 }    
      ];

    wrapShallow = shallow(<OrderDepth 
                            selectedCoins={selectedCoins} 
                            sellDepth={sellDepth}
                            buyDepth={buyDepth} />);
                    });

  it('renders correctly', () => {
    expect(wrapShallow).toMatchSnapshot();
  });

  it('contains', () => {

  });

  it('', () => {
  });
});
