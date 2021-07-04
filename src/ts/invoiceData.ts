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
      },
      {
        name: 'Registration Number',
        placeholder: 'Enter vehicle registration number',
      },
      {
        name: 'Chassis Number',
        placeholder: 'Enter vehicle chassis number',
      },
      {
        name: 'Engine Number',
        placeholder: 'Enter vehicle engine number',
      },
      {
        name: 'Color',
        placeholder: 'Enter vehicle color',
      },
    ],
    CustomerDetails: [
      {
        name: 'Name',
        placeholder: 'Enter customer name',
      },
      {
        name: 'Address',
        placeholder: 'Enter customer address',
      },
      {
        name: 'LIC No',
        placeholder: 'Enter customer LIC number',
      },
      {
        name: 'Contact Number',
        type: 'number',
        placeholder: 'Enter customer contact number',
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
        required: true,
      },
      {
        name: 'Down Payment',
        type: 'number',
        placeholder: 'Enter downpayment amount',
        required: true,
      },
      {
        name: 'Transfer Amount',
        type: 'number',
        placeholder: 'Enter transfer amount',
        required: true,
      },
      {
        name: 'Total Amount',
        type: 'number',
        placeholder: 'Enter total amount',
        required: true,
      },
    ],
  },
};

export default details;
