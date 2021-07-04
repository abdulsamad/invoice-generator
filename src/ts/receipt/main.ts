import Alpine from 'alpinejs';

// Start Alpine
declare global {
  interface Window {
    Alpine: any;
  }
}

window.Alpine = Alpine;

Alpine.start();
