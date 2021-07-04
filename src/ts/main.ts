import Alpine from 'alpinejs';

// Alpine Store (Global State)
document.addEventListener('alpine:init', () => {
  Alpine.store('invoiceData', {
    fields: ['Name', 'Reg No', 'Model No', 'Chasis No', 'Engine No', 'Color'],
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
