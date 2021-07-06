import { jsPDF } from 'jspdf';

import { X_Y_MARGIN, DOC_WIDTH } from './constants';
import {
  addCompanyLogo,
  addCompanyTagline,
  addCompanyAddress,
  addHeading,
  addField,
  addCompanyContact,
} from './utils';

/*  
  Default Page Values
  Orientation: Portrait
  Unit: mm
  PageFormat: A4 (210 x 297 mm)
*/

const generateInvoice = (target: string) => {
  return new Promise((resolve, reject) => {
    try {
      const invoiceNumber = localStorage.getItem('invoiceNumber') || '0';
      const doc = new jsPDF();

      /* Head */
      addCompanyLogo(doc, process.env.COMPANY_NAME as string);
      addCompanyTagline(doc, process.env.COMPANY_TAGLINE as string);
      addCompanyAddress(doc, process.env.COMPANY_ADDRESS as string);
      addCompanyContact(
        doc,
        process.env.COMPANY_CONTACT_NAME as string,
        process.env.COMPANY_CONTACTS as string,
      );

      doc.line(X_Y_MARGIN, X_Y_MARGIN + 12, DOC_WIDTH - X_Y_MARGIN, X_Y_MARGIN + 12);
      /* Body */

      // Print
      if (target === 'print') {
        // doc.autoPrint();
        doc.output('dataurlnewwindow');
        resolve('success');
        return;
      }

      // Download
      doc.save(`Invoice_${invoiceNumber}_(${new Date().toLocaleDateString()}).pdf`);
      resolve('success');
    } catch (err) {
      reject(err);
    }
  });
};

export default generateInvoice;
