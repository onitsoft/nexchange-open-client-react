window.addEventListener('load', () => {
  // In case GA is blocked by uBLock or similar, mock window.ga

  if (!window.ga) {
    window.ga = () => {};
  }
});
