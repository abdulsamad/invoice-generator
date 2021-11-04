if ('serviceWorker' in navigator) {
  try {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js');
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log('ERR', err.message);
      throw err;
    }
  }
}
