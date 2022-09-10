import { jsPDF } from "jspdf";

import {
  DOC_HEIGHT,
  DOC_WIDTH,
  X_Y_MARGIN,
  FONT_FAMILY,
  FONT_SIZE,
  LINE_MAX_WIDTH,
} from "./constants";

export const resetDocFonts = (doc: jsPDF) => {
  doc.setFont(FONT_FAMILY, "normal", 400);
  doc.setFontSize(FONT_SIZE);
};

export const addCompanyLogo = (doc: jsPDF, text: string) => {
  doc.setFontSize(FONT_SIZE * 2);
  doc.setFont("times", "normal", 700);
  doc.text(text, DOC_WIDTH / 2, 18, { align: "center" });

  // Reset Fonts
  resetDocFonts(doc);
};

export const addCompanyAddress = (doc: jsPDF, text: string) => {
  doc.setFontSize(FONT_SIZE);
  doc.setFont(FONT_FAMILY, "normal", 400);
  doc.text(text, DOC_WIDTH / 2, 27, { align: "center" });

  // Reset Fonts
  resetDocFonts(doc);
};

export const addCompanyMobile = (
  doc: jsPDF,
  contactName: string,
  contactMobile: string
) => {
  let topMargin = 14;

  doc.setFontSize(FONT_SIZE * 0.7);
  doc.setFont(FONT_FAMILY, "normal", 400);
  doc.text(contactName, DOC_WIDTH / 1.39, topMargin);

  doc.setFont(FONT_FAMILY, "italic", 400);
  doc.text(`Tel: ${contactMobile}`, DOC_WIDTH / 1.39, (topMargin += 7));

  // Reset Fonts
  resetDocFonts(doc);
};

export const addDate = (doc: jsPDF, text: string, yPos: number) => {
  doc.text(`Date: ${text}`, DOC_WIDTH / 1.45, yPos);
};

export const addHeading = (doc: jsPDF, text: string, yPos: number) => {
  doc.setFontSize(FONT_SIZE * 1.2);
  doc.setFont(FONT_FAMILY, "normal", 700);
  doc.text(text, DOC_WIDTH / 2.1, yPos);

  // Reset Fonts
  resetDocFonts(doc);
};

export const addReceiptNumber = (doc: jsPDF, text: number, yPos: number) => {
  doc.text(`Sr No: ${text}`, 31, yPos);
};

export const addField = (
  doc: jsPDF,
  { name, value }: { name: string; value: string },
  yPos: number,
  options?: object,
  xPos: number = 31
) => {
  doc.text(
    `${name}: ${value}`,
    xPos,
    yPos,
    options ? options : { maxWidth: LINE_MAX_WIDTH }
  );
};

export const convertNumberToCurrency = (
  locale: string,
  currency: string,
  number: number
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(number);
};

export const convertDateFromYYMMDDtoDDMMYY = (date: string) => {
  let dArr = date.split("-");
  return dArr[2] + "/" + dArr[1] + "/" + dArr[0];
};
