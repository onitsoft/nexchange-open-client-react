import fetchUserEmail from './fetchUserEmail';
import setUserEmail from './setUserEmail.js';

export const bindCrispEmail = () => {
  fetchUserEmail(backendEmail => {
    const crispEmail = window.$crisp.get('user:email');

    if (!backendEmail.length && crispEmail) {
      setUserEmail(crispEmail);
    } else if (backendEmail.length && !crispEmail) {
      window.$crisp.push(['set', 'user:email', [backendEmail]]);
    }
  });
};

export default () => {
  window.CRISP_READY_TRIGGER = () => {
    bindCrispEmail();

    window.$crisp.push([
      'on',
      'user:email:changed',
      () => {
        bindCrispEmail();
      },
    ]);
  };
};
