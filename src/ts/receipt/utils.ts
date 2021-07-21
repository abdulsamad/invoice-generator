import { jsPDF } from 'jspdf';

import {
  DOC_HEIGHT,
  DOC_WIDTH,
  X_Y_MARGIN,
  FONT_FAMILY,
  FONT_SIZE,
  LINE_MAX_WIDTH,
} from './constants';

export const resetDocFonts = (doc: jsPDF) => {
  doc.setFont(FONT_FAMILY, 'normal', 400);
  doc.setFontSize(FONT_SIZE);
};

export const addCompanyLogo = (doc: jsPDF, text: string) => {
  doc.setFontSize(FONT_SIZE * 2);
  doc.setFont('times', 'normal', 700);
  doc.text(text, DOC_WIDTH / 2, 20, { align: 'center' });

  // Reset Fonts
  resetDocFonts(doc);
};

export const addCompanyTagline = (doc: jsPDF, text: string) => {
  doc.setFontSize(FONT_SIZE * 1.2);
  doc.setFont(FONT_FAMILY, 'normal', 700);
  doc.text(text, DOC_WIDTH / 2.2, 18, { align: 'center' });

  // Reset Fonts
  resetDocFonts(doc);
};

export const addCompanyAddress = (doc: jsPDF, text: string) => {
  doc.setFontSize(FONT_SIZE);
  doc.setFont(FONT_FAMILY, 'normal', 400);
  doc.text(text, DOC_WIDTH / 2, 29, { align: 'center' });

  // Reset Fonts
  resetDocFonts(doc);
};

export const addCompanyContact = (doc: jsPDF, contactName: string, contacts: string) => {
  const contactsObj = JSON.parse(contacts);
  let topMargin = 14;

  doc.setFontSize(FONT_SIZE * 0.7);
  doc.setFont(FONT_FAMILY, 'normal', 400);
  doc.text(contactName, DOC_WIDTH / 1.39, topMargin);

  for (let key in contactsObj) {
    doc.setFont(FONT_FAMILY, 'italic', 400);
    doc.text(`${key}: ${contactsObj[key]}`, DOC_WIDTH / 1.39, (topMargin += 4));
  }

  // Reset Fonts
  resetDocFonts(doc);
};

export const addDate = (doc: jsPDF, text: string, yPos: number) => {
  doc.text(`Date: ${text}`, X_Y_MARGIN, yPos);
};

export const addInvoiceNumber = (doc: jsPDF, text: number, yPos: number) => {
  doc.text(`Invoice Number: ${text}`, X_Y_MARGIN, yPos);
};

export const addTime = (doc: jsPDF, text: string, yPos: number) => {
  doc.text(`Time: ${text}`, DOC_WIDTH / 1.22, yPos);
};

export const addField = (
  doc: jsPDF,
  { name, value }: { name: string; value: string },
  yPos: number,
  options?: object,
) => {
  doc.text(`${name}: ${value}`, X_Y_MARGIN, yPos, options ? options : { maxWidth: LINE_MAX_WIDTH });
};

export const convertTime24To12 = (timeStr: string) => {
  const hourEnd = timeStr.indexOf(':');
  const H = +timeStr.substr(0, hourEnd);
  const h = H % 12 || 12;
  const ampm = H < 12 || H === 24 ? ' AM' : ' PM';
  timeStr = h + timeStr.substr(hourEnd, 3) + ampm;

  return timeStr;
};

export const convertNumberToCurrency = (locale: string, currency: string, number: number) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(number);
};

export const convertDateFromYYMMDDtoDDMMYY = (date: string) => {
  let dArr = date.split('-');
  return dArr[2] + '/' + dArr[1] + '/' + dArr[0];
};
