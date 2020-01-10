import React from 'react';
import { shallow } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';

// The component AND the query need to be exported
import FAQ from './FAQ';
import GET_FAQS_QUERY from './get-faqs.query';

const mocks = [
  {
    request: {
      query: GET_FAQS_QUERY,
      variables: {
        pagename: 'faqs',
      },
    },
    result: {
      data: {
        pages: [
          {
            faq: [
              { title: 'Test FAQ', content: 'Testing FAQs' }
            ]
          }
        ],
      },
    },
  },
];

describe('FAQ', () => {
  let wrapped = null

  beforeEach(() => {
    wrapped = (
      <MockedProvider mocks={mocks} addTypename={false}>
        <FAQ />
      </MockedProvider>
    )
  })

  it('renders correctly', () => {
    const wrapShallow = shallow(wrapped);
    expect(wrapShallow).toMatchSnapshot();

    wrapShallow.setState({ show: true });
    expect(wrapShallow.dive()).toMatchSnapshot();

    wrapShallow.setProps({ show: false }).setState({ show: false });
    expect(wrapShallow.dive()).toMatchSnapshot();
  });
});
