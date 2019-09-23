import preparePairs from '#utils/preparePairs';
import pair from '#mocks/pair';
import processedPairs from '#mocks/processedPairs';

describe('Prepare pairs', () => {
  it('pairs are prepared correctly', () => {
    expect(preparePairs(pair)).toEqual(processedPairs);
  });
});
