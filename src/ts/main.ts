import Alpine from 'alpinejs';

import invoiceData from './invoiceData';

// Alpine Store (Global State)
document.addEventListener('alpine:init', () => {
  Alpine.store('invoiceData', invoiceData);
});

// Start Alpine
declare global {
  interface Window {
    Alpine: any;
  }
}

window.Alpine = Alpine;

Alpine.start();
