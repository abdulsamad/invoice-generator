import { jsPDF } from 'jspdf';

import {
  X_Y_MARGIN,
  DOC_WIDTH,
  LINE_MAX_WIDTH,
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
  addHeading,
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
  const invoiceNumber = Number(localStorage.getItem('invoiceNumber')) || 0;

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

      /* Body */
      addDate(doc, convertDateFromYYMMDDtoDDMMYY(formDataObj['Date']), 48);
      addTime(doc, convertTime24To12(formDataObj['Time']), 48);
      addInvoiceNumber(doc, invoiceNumber, 55);

      // Variables
      let sectionsStartNumber = 69;
      const step = 7.5;
      const BigStep = 10;

      // Vehicle Details
      addHeading(doc, 'Vehicle Details', sectionsStartNumber);
      addField(
        doc,
        { name: 'Brand', value: formDataObj['Brand'] },
        (sectionsStartNumber += BigStep),
      );
      addField(
        doc,
        { name: 'Registration Number', value: formDataObj['Registration Number'] },
        (sectionsStartNumber += step),
      );
      addField(doc, { name: 'Model', value: formDataObj['Model'] }, (sectionsStartNumber += step));
      addField(
        doc,
        { name: 'Chassis Number', value: formDataObj['Chassis Number'] },
        (sectionsStartNumber += step),
      );
      addField(
        doc,
        { name: 'Engine Number', value: formDataObj['Engine Number'] },
        (sectionsStartNumber += step),
      );
      addField(doc, { name: 'Color', value: formDataObj['Color'] }, (sectionsStartNumber += step));

      // Customer details
      addHeading(doc, 'Customer Details', (sectionsStartNumber += 14));
      addField(doc, { name: 'Name', value: formDataObj['Name'] }, (sectionsStartNumber += BigStep));
      addField(
        doc,
        { name: 'Address', value: formDataObj['Address'] },
        (sectionsStartNumber += step),
        { maxWidth: DOC_WIDTH - X_Y_MARGIN * 2 },
      );
      addField(
        doc,
        { name: 'Insurance Number', value: formDataObj['Insurance Number'] },
        (sectionsStartNumber += step),
      );
      addField(
        doc,
        { name: 'Contact Number', value: formDataObj['Contact Number'] },
        (sectionsStartNumber += step),
      );

      // Payment details
      // Col 1
      addHeading(doc, 'Payment Details', (sectionsStartNumber += 14));
      addField(
        doc,
        { name: 'Mode of Payment', value: formDataObj['Mode of Payment'] },
        (sectionsStartNumber += BigStep),
      );
      addField(
        doc,
        {
          name: 'Vehicle Amount',
          value: convertNumberToCurrency(
            COMPANY_LOCALE,
            COMPANY_CURRENCY,
            formDataObj['Vehicle Amount'],
          ),
        },
        (sectionsStartNumber += step),
      );
      addField(
        doc,
        {
          name: 'Down Payment',
          value: convertNumberToCurrency(
            COMPANY_LOCALE,
            COMPANY_CURRENCY,
            formDataObj['Down Payment'],
          ),
        },
        (sectionsStartNumber += step),
      );
      addField(
        doc,
        {
          name: 'Tax Amount',
          value: convertNumberToCurrency(
            COMPANY_LOCALE,
            COMPANY_CURRENCY,
            formDataObj['Tax Amount'],
          ),
        },
        (sectionsStartNumber += step),
      );
      addField(
        doc,
        {
          name: 'Total Amount',
          value: convertNumberToCurrency(
            COMPANY_LOCALE,
            COMPANY_CURRENCY,
            formDataObj['Total Amount'],
          ),
        },
        (sectionsStartNumber += step),
      );

      // Col 2
      let col2start = 187;
      const col2Left = 100;

      addField(
        doc,
        {
          name: 'Transfer Amount',
          value: convertNumberToCurrency(
            COMPANY_LOCALE,
            COMPANY_CURRENCY,
            formDataObj['Transfer Amount'],
          ),
        },
        col2start,
        { maxWidth: LINE_MAX_WIDTH },
        col2Left,
      );
      addField(
        doc,
        {
          name: 'Loan Charges',
          value: convertNumberToCurrency(
            COMPANY_LOCALE,
            COMPANY_CURRENCY,
            formDataObj['Loan Charges'],
          ),
        },
        (col2start += step),
        { maxWidth: LINE_MAX_WIDTH },
        col2Left,
      );
      addField(
        doc,
        {
          name: 'Insurance Charges',
          value: convertNumberToCurrency(
            COMPANY_LOCALE,
            COMPANY_CURRENCY,
            formDataObj['Insurance Charges'],
          ),
        },
        (col2start += step),
        { maxWidth: LINE_MAX_WIDTH },
        col2Left,
      );
      addField(
        doc,
        {
          name: 'Other Charges',
          value: convertNumberToCurrency(
            COMPANY_LOCALE,
            COMPANY_CURRENCY,
            formDataObj['Other Charges'],
          ),
        },
        (col2start += step),
        { maxWidth: LINE_MAX_WIDTH },
        col2Left,
      );

      doc.text(COMPANY_INVOICE_DISCLAIMER, X_Y_MARGIN, 238, {
        maxWidth: DOC_WIDTH - X_Y_MARGIN * 2,
      });

      doc.text('Purchaser Signature', X_Y_MARGIN, 270);
      doc.line(X_Y_MARGIN, 280, 50, 280);
      doc.text(`${COMPANY_NAME} Signature`, DOC_WIDTH / 1.29, 270);
      doc.line(DOC_WIDTH / 1.3, 280, DOC_WIDTH - X_Y_MARGIN, 280);

      // Print
      if (target === 'print') {
        doc.autoPrint();
        doc.output('dataurlnewwindow');
        resolve('success');
        return;
      }

      // Download
      doc.save(`Invoice_${invoiceNumber}_(${new Date().toLocaleDateString()}).pdf`);
      resolve('success');
    } catch (err) {
      reject(err);
    } finally {
      localStorage.setItem('invoiceNumber', (invoiceNumber + 1).toString());
    }
  });
};

export default generateInvoice;
