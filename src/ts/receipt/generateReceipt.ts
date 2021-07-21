import { jsPDF } from 'jspdf';

import {
  X_Y_MARGIN,
  DOC_WIDTH,
  COMPANY_NAME,
  COMPANY_ADDRESS,
  COMPANY_CONTACTS,
  COMPANY_CONTACT_NAME,
  COMPANY_CURRENCY,
  COMPANY_INVOICE_DISCLAIMER,
  COMPANY_LOCALE,
  COMPANY_TAGLINE,
} from './constants';
import {
  addCompanyLogo,
  addCompanyTagline,
  addCompanyAddress,
  addCompanyContact,
  addLine,
  addField,
  addDate,
  addTime,
  addInvoiceNumber,
  convertTime24To12,
  convertNumberToCurrency,
  convertDateFromYYMMDDtoDDMMYY,
} from './utils';
import Roboto from '../fonts/Roboto';
import RobotoBold from '../fonts/Roboto-Bold';
import RobotoItalic from '../fonts/Roboto-Italic';

/*  
  Default Page Values
  Orientation: Portrait
  Unit: mm
  PageFormat: A4 (210 x 297 mm)
*/

const generateInvoice = (target: string, formDataObj: any) => {
  const receiptNumber = Number(localStorage.getItem('receiptNumber')) || 0;

  return new Promise((resolve, reject) => {
    try {
      const doc = new jsPDF();

      doc.addFileToVFS('Roboto.ttf', Roboto);
      doc.addFont('Roboto.ttf', 'Roboto', 'normal');
      doc.addFileToVFS('Roboto.ttf', RobotoBold);
      doc.addFont('Roboto.ttf', 'Roboto', 'bold');
      doc.addFileToVFS('Roboto.ttf', RobotoItalic);
      doc.addFont('Roboto.ttf', 'Roboto', 'italic');

      /* Head */
      addCompanyLogo(doc, COMPANY_NAME?.toUpperCase());
      addCompanyTagline(doc, COMPANY_TAGLINE);
      addCompanyAddress(doc, COMPANY_ADDRESS);
      addCompanyContact(doc, COMPANY_CONTACT_NAME, COMPANY_CONTACTS);
      addLine(doc, 29, 29);
      doc.text('INVOICE', DOC_WIDTH / 2, 33.7, { align: 'center' });
      addLine(doc, 35.5, 35.5);

      // Print
      if (target === 'print') {
        // doc.autoPrint();
        doc.output('dataurlnewwindow');
        resolve('success');
        return;
      }

      // Download
      doc.save(`Invoice_${receiptNumber}_(${new Date().toLocaleDateString()}).pdf`);
      resolve('success');
    } catch (err) {
      reject(err);
    } finally {
      localStorage.setItem('receiptNumber', (receiptNumber + 1).toString());
    }
  });
};

export default generateInvoice;
