import Alpine from 'alpinejs';

import invoiceData from './invoiceData';
import generateInvoice from './generateInvoice';

// Alpine Store (Global State)
document.addEventListener('alpine:init', () => {
  // Form fields store
  Alpine.store('invoiceData', invoiceData);

  // Toggle action buttons store
  Alpine.store('actions', {
    visible: false,

    toggleActions() {
      this.visible = false;
    },
  });

  // Custom methods store
  Alpine.store('customMethods', {
    formDataObj: {},
    onSubmit(ev: Event) {
      const target = ev.target as HTMLFormElement;
      const formData = new FormData(target);

      let formDataObj: any = {};

      for (const key of formData.keys()) {
        formDataObj[key] = formData.get(key);
      }

      generateInvoice('print', formDataObj);
    },
    generatePDF(ev: Event) {
      const elem = ev.currentTarget as HTMLButtonElement;
      elem.classList.add('is-loading');

      elem.id === 'print'
        ? generateInvoice(elem.id, this.formDataObj).then(() => {
            elem.classList.remove('is-loading');
          })
        : generateInvoice(elem.id, this.formDataObj).then(() => {
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
