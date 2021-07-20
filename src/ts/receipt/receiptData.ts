interface Ifield {
  name: string; // Input label
  type?: string; // Input type
  placeholder?: string; // Input placeholder
  required?: boolean; // Input required
  value?: string | string[]; // Input value or select options
}

interface IDetails {
  fields: {
    ReceiptDetails: Ifield[];
  };
}

const details: IDetails = {
  fields: {
    ReceiptDetails: [
      {
        name: 'Received from Mr. / Ms.',
        placeholder: 'Enter customer name',
        required: true,
      },
      {
        name: "Customer's Contact",
        placeholder: 'Enter customer contact',
        required: true,
      },
      {
        name: 'Vehicle described as',
        placeholder: 'Enter vehicle full name',
        required: true,
      },
      {
        name: 'Sum of Rupees',
        type: 'number',
        placeholder: 'Enter token amount',
        required: true,
      },
      {
        name: 'R.T.O',
        placeholder: 'Enter R.T.O number',
      },
      {
        name: 'Vehicle No.',
        placeholder: 'Enter vehicle number',
      },
      {
        name: 'Model',
        placeholder: 'Enter vehicle modal',
      },
      {
        name: 'Final Price',
        type: 'number',
        placeholder: 'Enter final amount',
      },
      {
        name: 'Advance Amount',
        type: 'number',
        placeholder: 'Enter advance amount',
      },
      {
        name: 'Balance',
        type: 'number',
        placeholder: 'Enter balance amount',
      },
      {
        name: 'Bank Name',
        placeholder: 'Enter bank name (if any)',
      },
      {
        name: 'Cheque No.',
        placeholder: 'Enter cheque number (if any)',
      },
    ],
  },
};

export default details;
