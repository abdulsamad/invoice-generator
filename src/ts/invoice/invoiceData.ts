interface Ifield {
  name: string; // Input label
  type?: string; // Input type
  placeholder?: string; // Input placeholder
  required?: boolean; // Input required
  value?: string | string[]; // Input value or select options
}

interface IDetails {
  fields: {
    VehicleDetails: Ifield[];
    CustomerDetails: Ifield[];
    PaymentDetails: Ifield[];
  };
}

const details: IDetails = {
  fields: {
    VehicleDetails: [
      {
        name: 'Brand',
        placeholder: 'Enter vehicle brand name',
        required: true,
      },
      {
        name: 'Registration Number',
        placeholder: 'Enter vehicle registration number',
        required: true,
      },
      {
        name: 'Model',
        placeholder: 'Enter vehicle model',
        required: true,
      },
      {
        name: 'Chassis Number',
        placeholder: 'Enter vehicle chassis number',
        required: true,
      },
      {
        name: 'Engine Number',
        placeholder: 'Enter vehicle engine number',
        required: true,
      },
      {
        name: 'Color',
        placeholder: 'Enter vehicle color',
        required: true,
      },
    ],
    CustomerDetails: [
      {
        name: 'Name',
        placeholder: 'Enter customer name',
        required: true,
      },
      {
        name: 'Address',
        placeholder: 'Enter customer address',
        required: true,
      },
      {
        name: 'Insurance Number',
        placeholder: 'Enter customer insurance number',
      },
      {
        name: 'Contact Number',
        type: 'number',
        placeholder: 'Enter customer contact number',
        required: true,
      },
    ],
    PaymentDetails: [
      {
        name: 'Mode of Payment',
        type: 'select',
        placeholder: 'Enter mode of payment',
        required: true,
        value: [
          'Cash',
          'Cheque',
          'Bank Transfer',
          'Loan',
          'E-Wallet',
          'Credit Card',
          'Debit Card',
          'Demand Draft',
        ],
      },
      {
        name: 'Vehicle Amount',
        type: 'number',
        placeholder: 'Enter vehicle amount',
      },
      {
        name: 'Down Payment',
        type: 'number',
        placeholder: 'Enter downpayment amount',
      },
      {
        name: 'Transfer Amount',
        type: 'number',
        placeholder: 'Enter transfer amount',
      },
      {
        name: 'Tax Amount',
        type: 'number',
        placeholder: 'Enter tax amount',
      },
      {
        name: 'Total Amount',
        type: 'number',
        placeholder: 'Enter total amount',
      },
      {
        name: 'Loan Charges',
        type: 'number',
        placeholder: 'Enter loan charges (if any)',
      },
      {
        name: 'Insurance Charges',
        type: 'number',
        placeholder: 'Enter insurance charges (if any)',
      },
      {
        name: 'Other Charges',
        type: 'number',
        placeholder: 'Enter other charges (if any)',
      },
    ],
  },
};

export default details;
