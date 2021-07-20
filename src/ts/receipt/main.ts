import Alpine from 'alpinejs';

import receiptData from './receiptData';
import generateReceipt from './generateReceipt';

// Alpine Store (Global State)
document.addEventListener('alpine:init', () => {
  // Form fields store
  Alpine.store('invoiceData', receiptData);

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
      elem.classList.add('is-loading');

      setTimeout(() => {
        elem.id === 'print'
          ? generateReceipt(elem.id, formDataObj).then(() => {
              elem.classList.remove('is-loading');
            })
          : generateReceipt(elem.id, formDataObj).then(() => {
              elem.classList.remove('is-loading');
            });
      }, 800);
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
