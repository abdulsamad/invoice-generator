import { jsPDF } from 'jspdf';

import { X_Y_MARGIN, DOC_WIDTH } from './constants';
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
      addCompanyLogo(doc, process.env.COMPANY_NAME?.toUpperCase() as string);
      addCompanyTagline(doc, process.env.COMPANY_TAGLINE as string);
      addCompanyAddress(doc, process.env.COMPANY_ADDRESS as string);
      addCompanyContact(
        doc,
        process.env.COMPANY_CONTACT_NAME as string,
        process.env.COMPANY_CONTACTS as string,
      );
      addLine(doc, 29, 29);
      doc.text('INVOICE', DOC_WIDTH / 2, 33.7, { align: 'center' });
      addLine(doc, 35.5, 35.5);

      /* Body */
      addDate(doc, convertDateFromYYMMDDtoDDMMYY(formDataObj['Date']), 48);
      addTime(doc, convertTime24To12(formDataObj['Time']), 48);
      addInvoiceNumber(doc, invoiceNumber, 55);

      // Variables
      const step = 7.5;
      const headingStep = 10;
      const locale = process.env.COMPANY_LOCALE as string;
      const currency = process.env.COMPANY_CURRENCY as string;
      let sectionsStartNumber = 69;

      addHeading(doc, 'Vehicle Details', sectionsStartNumber);
      addField(
        doc,
        { name: 'Brand', value: formDataObj['Brand'] },
        (sectionsStartNumber += headingStep),
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

      addHeading(doc, 'Customer Details', (sectionsStartNumber += 14));
      addField(
        doc,
        { name: 'Name', value: formDataObj['Name'] },
        (sectionsStartNumber += headingStep),
      );
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

      addHeading(doc, 'Payment Details', (sectionsStartNumber += 14));
      addField(
        doc,
        { name: 'Mode of Payment', value: formDataObj['Mode of Payment'] },
        (sectionsStartNumber += headingStep),
      );
      addField(
        doc,
        {
          name: 'Vehicle Amount',
          value: convertNumberToCurrency(locale, currency, formDataObj['Vehicle Amount']),
        },
        (sectionsStartNumber += step),
      );
      addField(
        doc,
        {
          name: 'Down Payment',
          value: convertNumberToCurrency(locale, currency, formDataObj['Down Payment']),
        },
        (sectionsStartNumber += step),
      );
      addField(
        doc,
        {
          name: 'Transfer Amount',
          value: convertNumberToCurrency(locale, currency, formDataObj['Transfer Amount']),
        },
        (sectionsStartNumber += step),
      );
      addField(
        doc,
        {
          name: 'Tax Amount',
          value: convertNumberToCurrency(locale, currency, formDataObj['Total Amount']),
        },
        (sectionsStartNumber += step),
      );
      addField(
        doc,
        {
          name: 'Total Amount',
          value: convertNumberToCurrency(locale, currency, formDataObj['Total Amount']),
        },
        (sectionsStartNumber += step),
      );

      doc.text(process.env.COMPANY_INVOICE_DISCLAIMER as string, X_Y_MARGIN, 238, {
        maxWidth: DOC_WIDTH - X_Y_MARGIN * 2,
      });

      doc.text('Purchaser Signature', X_Y_MARGIN, 270);
      doc.line(X_Y_MARGIN, 280, 50, 280);
      doc.text(`${process.env.COMPANY_NAME} Signature`, DOC_WIDTH / 1.29, 270);
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
