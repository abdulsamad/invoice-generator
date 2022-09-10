/*  
  Default Page Values
  Orientation: Portrait
  Unit: mm
  PageFormat: A4 (210 x 297 mm)
*/

// Default Variables
export const DOC_WIDTH = 210;
export const DOC_HEIGHT = 297;
export const X_Y_MARGIN = 10;
export const LINE_MAX_WIDTH = DOC_WIDTH - X_Y_MARGIN * 2;
export const FONT_SIZE = 12; // 12pt
export const FONT_FAMILY = "Roboto";
export const COMPANY_NAME = process.env.COMPANY_NAME as string;
export const COMPANY_TAGLINE = process.env.COMPANY_TAGLINE as string;
export const COMPANY_ADDRESS = process.env.COMPANY_ADDRESS as string;
export const COMPANY_CONTACT_NAME = process.env.COMPANY_CONTACT_NAME as string;
export const COMPANY_CONTACT_MOBILE = process.env
  .COMPANY_CONTACT_MOBILE as string;
export const COMPANY_INVOICE_DISCLAIMER = process.env
  .COMPANY_INVOICE_DISCLAIMER as string;
export const COMPANY_LOCALE = process.env.COMPANY_LOCALE as string;
export const COMPANY_CURRENCY = process.env.COMPANY_CURRENCY as string;
