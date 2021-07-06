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
  doc.setFont(FONT_FAMILY, 'normal', 700);
  doc.text(text as string, DOC_WIDTH / 2.2, 8, { align: 'center' });

  // Reset Fonts
  resetDocFonts(doc);
};

export const addCompanyTagline = (doc: jsPDF, text: string) => {
  doc.setFontSize(FONT_SIZE * 1.2);
  doc.setFont(FONT_FAMILY, 'normal', 700);
  doc.text(text, DOC_WIDTH / 2.2, 13, { align: 'center' });

  // Reset Fonts
  resetDocFonts(doc);
};

export const addCompanyAddress = (doc: jsPDF, text: string) => {
  doc.setFontSize(FONT_SIZE);
  doc.setFont(FONT_FAMILY, 'normal', 400);
  doc.text(text, DOC_WIDTH / 2.2, 18, { align: 'center' });

  // Reset Fonts
  resetDocFonts(doc);
};

export const addCompanyContact = (doc: jsPDF, contactName: string, contacts: string) => {
  const contactsObj = JSON.parse(contacts);
  let topMargin = 7;

  doc.setFontSize(FONT_SIZE);
  doc.setFont(FONT_FAMILY, 'normal', 400);
  doc.text(contactName, DOC_WIDTH / 1.3, 7);

  for (let key in contactsObj) {
    console.log(key);
    doc.setFont(FONT_FAMILY, 'italic', 400);
    doc.text(`${key}: ${contactsObj[key]}`, DOC_WIDTH / 1.3, (topMargin += 4));
  }

  // Reset Fonts
  resetDocFonts(doc);
};

export const addHeading = (doc: jsPDF, text: string, yPos: number) => {
  doc.text(text, X_Y_MARGIN, yPos, { align: 'center', maxWidth: LINE_MAX_WIDTH });
};

export const addField = (doc: jsPDF, text: string, yPos: number) => {
  doc.text(text, X_Y_MARGIN, yPos, { align: 'center', maxWidth: LINE_MAX_WIDTH });
};
