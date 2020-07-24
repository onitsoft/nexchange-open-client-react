import React from 'react';
import { mount } from 'enzyme';
import useCountdown from './useCountdown';
import { act } from 'react-dom/test-utils';

const Test = ({ deadline }) => {
  const { minutes, seconds } = useCountdown(() => Date.now() + deadline);

  return <p id="timer">{`${minutes}:${seconds}`}</p>;
};

describe('useCountdown', () => {
  let wrapper;

  it('timer is 03:05', () => {
    wrapper = mount(<Test deadline={185000} />);
    let timer = wrapper.find('#timer').text();

    expect(timer).toBe('03:05');
  });

  it('timer is 00:10', () => {
    wrapper = mount(<Test deadline={10000} />);
    let timer = wrapper.find('#timer').text();

    expect(timer).toBe('00:10');
  });

  it('timer passed', () => {
    wrapper = mount(<Test deadline={-1000} />);
    let timer = wrapper.find('#timer').text();

    expect(timer).toBe('00:00');
  });

  it('timer changes', () => {
    jest.useFakeTimers();
    let timer;
    wrapper = mount(<Test deadline={5000} />);

    timer = wrapper.find('#timer').text();
    expect(timer).toBe('00:05');

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    timer = wrapper
      .update()
      .find('#timer')
      .text();
    expect(timer).toBe('00:03');
  });
});
