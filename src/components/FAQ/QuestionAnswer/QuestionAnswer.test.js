import React from 'react';
import { shallow } from 'enzyme';
import QuestionAnswer from './QuestionAnswer';

describe('QuestionAnswer', () => {
  let wrapShallow;

  beforeEach(() => {
    window.ga = jest.fn();

    wrapShallow = shallow(
      <QuestionAnswer
      id="ques1"
      answer={
          <div>
            <p>
              We allow you to exchange one cryptocurrency for another. To view our currently supported coins, please click on the coin
              selection widget in the top of fold of the page.
            </p>
            <p>We will be adding more currencies very soon, stay tuned!</p>
            <p>
              Missing your favorite coin? Let us know here: <a href="mailto:support@n.exchange">support@n.exchange</a>.
            </p>
          </div>
        }
      />
    ).dive();
  });

  it('renders correctly', () => {
    expect(wrapShallow).toMatchSnapshot();
  });

  it('question opens on click', () => {
    wrapShallow.find('[data-test="question-opener"]').simulate('click');
    expect(wrapShallow.state().open).toBe(true);
  });
});
