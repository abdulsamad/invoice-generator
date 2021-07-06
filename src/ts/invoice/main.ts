import Alpine from 'alpinejs';

import invoiceData from './invoiceData';
import generateInvoice from './generateInvoice';

// Alpine Store (Global State)
document.addEventListener('alpine:init', () => {
  // Form fields store
  Alpine.store('invoiceData', invoiceData);

  // Toggle action buttons store
  Alpine.store('actions', {
    visible: true,

    toggleActions() {
      this.visible = true;
    },
  });

  // Custom methods store
  Alpine.store('customMethods', {
    generatePDF(ev: Event) {
      const elem = ev.currentTarget as HTMLButtonElement;
      elem.classList.add('is-loading');

      elem.id === 'print'
        ? generateInvoice(elem.id).then(() => {
            elem.classList.remove('is-loading');
          })
        : generateInvoice(elem.id).then(() => {
            elem.classList.remove('is-loading');
          });
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
