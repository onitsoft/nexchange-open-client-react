import preparePairs from 'Utils/preparePairs';
import pair from 'Mocks/pair';
import processedPairs from 'Mocks/processedPairs';

describe('Prepare pairs', () => {
  it('pairs are prepared correctly', () => {
    expect(preparePairs(pair)).toEqual(processedPairs);
  });
});
