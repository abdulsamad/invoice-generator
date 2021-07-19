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
} from './utils';
import PTSans from '../fonts/PTSans';
import PTSansBold from '../fonts/PTSans-Bold';

/*  
  Default Page Values
  Orientation: Portrait
  Unit: mm
  PageFormat: A4 (210 x 297 mm)
*/

const generateInvoice = (target: string, formDataObj: any) => {
  return new Promise((resolve, reject) => {
    try {
      const invoiceNumber = localStorage.getItem('invoiceNumber') || '0';
      const doc = new jsPDF();

      doc.addFileToVFS('PTSans.ttf', PTSans);
      doc.addFont('PTSans.ttf', 'PTSans', 'normal');
      doc.addFileToVFS('PTSans.ttf', PTSansBold);
      doc.addFont('PTSans.ttf', 'PTSans', 'bold');

      /* Head */
      addCompanyLogo(doc, process.env.COMPANY_NAME as string);
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
      addDate(doc, formDataObj['Date'], 48);
      addTime(doc, convertTime24To12(formDataObj['Time']), 48);
      addInvoiceNumber(doc, formDataObj['Invoice Number'], 54);

      let sectionsStartNumber = 67;

      addHeading(doc, 'Vehicle Details', sectionsStartNumber);
      addField(
        doc,
        { name: 'Registration Number', value: formDataObj['Registration Number'] },
        (sectionsStartNumber += 10),
      );
      addField(doc, { name: 'Model', value: formDataObj['Model'] }, (sectionsStartNumber += 7.5));
      addField(
        doc,
        { name: 'Chassis Number', value: formDataObj['Chassis Number'] },
        (sectionsStartNumber += 7.5),
      );
      addField(
        doc,
        { name: 'Engine Number', value: formDataObj['Engine Number'] },
        (sectionsStartNumber += 7.5),
      );
      addField(doc, { name: 'Color', value: formDataObj['Color'] }, (sectionsStartNumber += 7.5));

      addHeading(doc, 'Customer Details', (sectionsStartNumber += 14));
      addField(doc, { name: 'Name', value: formDataObj['Name'] }, (sectionsStartNumber += 10));
      addField(
        doc,
        { name: 'Address', value: formDataObj['Address'] },
        (sectionsStartNumber += 7.5),
      );
      addField(
        doc,
        { name: 'Insurance Number', value: formDataObj['Insurance Number'] },
        (sectionsStartNumber += 7.5),
      );
      addField(
        doc,
        { name: 'Contact Number', value: formDataObj['Contact Number'] },
        (sectionsStartNumber += 7.5),
      );

      addHeading(doc, 'Payment Details', (sectionsStartNumber += 14));
      addField(
        doc,
        { name: 'Mode of Payment', value: formDataObj['Mode of Payment'] },
        (sectionsStartNumber += 10),
      );
      addField(
        doc,
        { name: 'Vehicle Amount', value: formDataObj['Vehicle Amount'] },
        (sectionsStartNumber += 7.5),
      );
      addField(
        doc,
        { name: 'Down Payment', value: formDataObj['Down Payment'] },
        (sectionsStartNumber += 7.5),
      );
      addField(
        doc,
        { name: 'Transfer Amount', value: formDataObj['Transfer Amount'] },
        (sectionsStartNumber += 7.5),
      );
      addField(
        doc,
        { name: 'Total Amount', value: formDataObj['Total Amount'] },
        (sectionsStartNumber += 7.5),
      );

      doc.text(
        'I have this day taken delivery of scooter, Motorcycle, Car bearing for my personal Conveyance only. The Said vehicle has been duly approved by me and found to my entire satisfaction. I am from today onwards, responsible to pay al types of traffic offences, police Legal iting accident and R.T.O. Municipal (Including Octrol) Wheel taxes and premium of Insurance including the pillion rider of the said vehicle',
        X_Y_MARGIN,
        230,
        { maxWidth: DOC_WIDTH - X_Y_MARGIN * 2 },
      );

      doc.text('Purchaser Signature', X_Y_MARGIN, 260);
      doc.line(X_Y_MARGIN, 275, 50, 275);
      doc.text('Zip Drive Signature', DOC_WIDTH / 1.29, 260);
      doc.line(DOC_WIDTH / 1.3, 275, DOC_WIDTH - X_Y_MARGIN, 275);

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
