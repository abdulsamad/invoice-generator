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
  LINE_MAX_WIDTH,
} from './constants';
import {
  addCompanyLogo,
  addCompanyAddress,
  addCompanyContact,
  addHeading,
  addField,
  addDate,
  addReceiptNumber,
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
      doc.rect(25, 10, 160, 100);
      addCompanyLogo(doc, COMPANY_NAME);
      doc.line(30, 22, DOC_WIDTH - 30, 22);
      addCompanyAddress(doc, COMPANY_ADDRESS);
      doc.line(30, 29, DOC_WIDTH - 30, 29);
      addCompanyContact(doc, COMPANY_CONTACT_NAME, COMPANY_CONTACTS);

      /* Body */

      addDate(doc, convertDateFromYYMMDDtoDDMMYY(formDataObj['Date']), 36);
      addHeading(doc, 'Receipt', 36);
      addReceiptNumber(doc, 0, 36);

      addField(
        doc,
        { name: 'Received from Mr. / Ms.', value: formDataObj['Received from Mr. / Ms.'] },
        46,
      );
      addField(doc, { name: "Customer's Contact", value: formDataObj["Customer's Contact"] }, 53);
      addField(doc, { name: 'Vehicle Name', value: formDataObj['Vehicle Name'] }, 60);
      addField(
        doc,
        {
          name: 'Sum of Rupees',
          value: convertNumberToCurrency(
            COMPANY_LOCALE,
            COMPANY_CURRENCY,
            formDataObj['Sum of Rupees'],
          ),
        },
        67,
      );
      addField(doc, { name: 'R.T.O', value: formDataObj['R.T.O'] }, 74);
      addField(
        doc,
        { name: 'Vehicle No', value: formDataObj['Vehicle No'] },
        74,
        { maxWidth: LINE_MAX_WIDTH },
        80,
      );
      addField(
        doc,
        { name: 'Model', value: formDataObj['Model'] },
        74,
        { maxWidth: LINE_MAX_WIDTH },
        140,
      );
      addField(
        doc,
        {
          name: 'Final Price',
          value: convertNumberToCurrency(
            COMPANY_LOCALE,
            COMPANY_CURRENCY,
            formDataObj['Final Price'],
          ),
        },
        81,
        {
          maxWidth: LINE_MAX_WIDTH,
        },
      );
      addField(
        doc,
        {
          name: 'Advance',
          value: convertNumberToCurrency(
            COMPANY_LOCALE,
            COMPANY_CURRENCY,
            formDataObj['Advance Amount'],
          ),
        },
        81,
        {
          maxWidth: LINE_MAX_WIDTH,
        },
        80,
      );
      addField(
        doc,
        {
          name: 'Balance',
          value: convertNumberToCurrency(
            COMPANY_LOCALE,
            COMPANY_CURRENCY,
            formDataObj['Balance Amount'],
          ),
        },
        81,
        {
          maxWidth: LINE_MAX_WIDTH,
        },
        140,
      );
      addField(doc, { name: 'Bank Name', value: formDataObj['Bank Name'] }, 88);
      addField(
        doc,
        { name: 'Cheque No', value: formDataObj['Cheque No.'] },
        88,
        {
          maxWidth: LINE_MAX_WIDTH,
        },
        120,
      );

      addField(doc, { name: 'Purchaser', value: '' }, 98, { maxWidth: LINE_MAX_WIDTH }, 145);
      addField(doc, { name: 'Seller', value: '' }, 98, { maxWidth: LINE_MAX_WIDTH }, 31);
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
