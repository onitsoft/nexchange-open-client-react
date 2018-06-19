import React from 'react';
import renderer from 'react-test-renderer';

import Footer from 'Components/Footer/Footer';

describe('Footer basics', () => {
  it('renders correctly', () => {
    const footer = renderer.create(<Footer />);
    const tree = footer.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
