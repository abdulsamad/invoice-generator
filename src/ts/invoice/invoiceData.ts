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
        name: 'Name',
        placeholder: 'Enter vehicle name',
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
        value: ['Cash', 'Cheque', 'Bank Transfer', 'E-Wallet', 'Credit Card', 'Debit Card'],
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
        name: 'Total Amount',
        type: 'number',
        placeholder: 'Enter total amount',
      },
    ],
  },
};

export default details;
