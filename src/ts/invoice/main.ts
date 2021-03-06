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
      this.visible = true;
    },
  });

  // Custom methods store
  let formDataObj: any = {};

  Alpine.store('customMethods', {
    onSubmit(ev: Event) {
      const target = ev.target as HTMLFormElement;
      const formData = new FormData(target);
      const actions = document.querySelector('#actions') as HTMLElement;

      setTimeout(() => actions.scrollIntoView(), 100);

      for (const key of formData.keys()) {
        formDataObj[key] = formData.get(key);
      }
    },
    generatePDF(ev: Event) {
      const elem = ev.currentTarget as HTMLButtonElement;
      const invoiceNumber = Number(localStorage.getItem('invoiceNumber')) || 0;
      elem.classList.add('is-loading');

      setTimeout(() => {
        elem.id === 'print'
          ? generateInvoice(elem.id, formDataObj).then(() => {
              elem.classList.remove('is-loading');
            })
          : generateInvoice(elem.id, formDataObj).then(() => {
              elem.classList.remove('is-loading');
            });
      }, 500);
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
