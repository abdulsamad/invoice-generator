import Alpine from 'alpinejs';

import invoiceData from './invoiceData';

// Alpine Store (Global State)
document.addEventListener('alpine:init', () => {
  Alpine.store('invoiceData', invoiceData);
  Alpine.store('customMethods', {
    updateInvoiceNumber: (ev: Event) => {
      const elem = ev.target as HTMLInputElement;
      localStorage.setItem('invoiceData', elem.value);
    },
  });
});

// Start Alpine
declare global {
  interface Window {
    Alpine: any;
  }
}

window.Alpine = Alpine;

Alpine.start();
