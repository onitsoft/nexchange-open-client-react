import { fetchUserEmail, setUserEmail } from 'Actions';

export const bindCrispEmail = store => {
  store.dispatch(fetchUserEmail()).then(res => {
    const backendEmail = res ? res.value : null;
    const crispEmail = window.$crisp.get('user:email');
    if (!backendEmail && crispEmail) {
      store.dispatch(setUserEmail(crispEmail));
    } else if (backendEmail && !crispEmail) {
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
