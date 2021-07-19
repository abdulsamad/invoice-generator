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
      doc.addFileToVFS('PTSans-bold.ttf', PTSans);
      doc.addFont('PTSans-bold.ttf', 'PTSans', 'bold');

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
      addDate(doc, formDataObj['Date'], 44);
      addTime(doc, formDataObj['Time'], 44);
      addInvoiceNumber(doc, formDataObj['Invoice Number'], 50);

      addHeading(doc, 'Vehicle Details', 60);
      addField(doc, { name: 'Registration Number', value: formDataObj['Registration Number'] }, 67);
      addField(doc, { name: 'Model', value: formDataObj['Model'] }, 73);
      addField(doc, { name: 'Chassis Number', value: formDataObj['Chassis Number'] }, 79);
      addField(doc, { name: 'Engine Number', value: formDataObj['Engine Number'] }, 86);
      addField(doc, { name: 'Color', value: formDataObj['Color'] }, 92);

      addHeading(doc, 'Customer Details', 100);
      addField(doc, { name: 'Name', value: formDataObj['Name'] }, 106);
      addField(doc, { name: 'Address', value: formDataObj['Address'] }, 112);
      addField(doc, { name: 'Insurance Number', value: formDataObj['Insurance Number'] }, 118);
      addField(doc, { name: 'Contact Number', value: formDataObj['Contact Number'] }, 124);

      addHeading(doc, 'Payment Details', 132);
      addField(doc, { name: 'Mode of Payment', value: formDataObj['Mode of Payment'] }, 138);
      addField(doc, { name: 'Vehicle Amount', value: formDataObj['Vehicle Amount'] }, 144);
      addField(doc, { name: 'Down Payment', value: formDataObj['Down Payment'] }, 150);
      addField(doc, { name: 'Transfer Amount', value: formDataObj['Transfer Amount'] }, 156);
      addField(doc, { name: 'Total Amount', value: formDataObj['Total Amount'] }, 162);

      doc.text(
        'I have this day taken delivery of scooter, Motorcycle, Car bearing for my personal Conveyance only. The Said vehicle has been duly approved by me and found to my entire satisfaction. I am from today onwards, responsible to pay al types of traffic offences, police Legal iting accident and R.T.O. Municipal (Including Octrol) Wheel taxes and premium of Insurance including the pillion rider of the said vehicle',
        X_Y_MARGIN,
        200,
        { maxWidth: DOC_WIDTH - X_Y_MARGIN * 2 },
      );

      doc.text('Purchaser', X_Y_MARGIN, 240);
      doc.line(X_Y_MARGIN, 250, 50, 250);
      doc.text('Zip Drive', DOC_WIDTH / 1.2, 240);
      doc.line(DOC_WIDTH / 1.3, 250, DOC_WIDTH - X_Y_MARGIN, 250);

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
