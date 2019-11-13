import React from 'react';
import { shallow } from 'enzyme';
import { Articles, GET_ARTILCES_QUERY } from './Articles';
import { MockedProvider } from '@apollo/react-testing';

const mocks = [
  {
    request: {
      query: GET_ARTILCES_QUERY,
      variables: {
        pagename: 'ethusd',
      },
    },
    result: () => ({
      data: {
        pages: [{
          id: '1',
          articles: [{
            title: 'Test Title',
            content: '# Hello World\n\n## Secondary TItle',
            date: Date('01-01-2020 20:28 IST'),
            createdAt: Date('01-01-2020 20:28 IST'),
          }]
        }],
      },
    }),
  },
]


describe('Articles', () => {
  it('renders correctly', () => {
    const wrapShallow = shallow(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Articles />
      </MockedProvider>
    );
    expect(wrapShallow).toMatchSnapshot();
  });
});
