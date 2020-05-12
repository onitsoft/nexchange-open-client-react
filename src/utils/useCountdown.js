import { useEffect, useState } from 'react';

function useCountdown(date, options = {}) {
  const { intervalTime = 1000, now = () => Date.now() } = options;
  const [timeLeft, setTimeLeft] = useState(() => new Date(date()) - new Date(now()));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(current => {
        if (current <= 0) {
          clearInterval(interval);

          return 0;
        }

        return current - intervalTime;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [intervalTime]);

  const addLeadingZero = time => (time > 0 ? String(time).padStart(2, '0') : '00');

  return {
    days: addLeadingZero(Math.floor(timeLeft / 86400000)),
    hours: addLeadingZero(Math.floor(timeLeft / 3600000) % 24),
    minutes: addLeadingZero(Math.floor(timeLeft / 60000) % 60),
    seconds: addLeadingZero(Math.floor(timeLeft / 1000) % 60),
    milliseconds: addLeadingZero(Math.floor(timeLeft) % 1000),
  };
}

export default useCountdown;
