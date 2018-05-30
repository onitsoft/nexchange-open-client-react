import { fetchUserEmail, setUserEmail } from '../actions';

export const bindCrispEmail = store => {
  store.dispatch(fetchUserEmail()).then(res => {
    const backendEmail = res.value;
    const crispEmail = window.$crisp.get('user:email');
    if (!backendEmail.length && crispEmail) {
      store.dispatch(setUserEmail(crispEmail));
    } else if (backendEmail.length && !crispEmail) {
      window.$crisp.push(['set', 'user:email', [backendEmail]]);
    }
  });
};

export default store => {
  window.CRISP_READY_TRIGGER = () => {
    bindCrispEmail(store);
    window.$crisp.push([
      'on',
      'user:email:changed',
      () => {
        bindCrispEmail(store);
      },
    ]);
  };
};
