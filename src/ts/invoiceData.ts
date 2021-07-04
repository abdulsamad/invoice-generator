interface Ifield {
  name: string; // Input label
  type?: string; // Input type
  placeholder?: string; // Input placeholder
  required?: boolean; // Input required
  value?: string; // Input value
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
      { name: 'Name', placeholder: 'Enter vehicle name' },
      { name: 'Reg No', placeholder: 'Enter vehicle reg number' },
      { name: 'Chasis No', placeholder: 'Enter vehicle chasis number' },
      { name: 'Engine No', placeholder: 'Enter vehicle engine number' },
      { name: 'Color', placeholder: 'Enter vehicle color' },
    ],
    CustomerDetails: [
      { name: 'Name', placeholder: 'Enter customer name' },
      { name: 'Address', placeholder: 'Enter customer address' },
      { name: 'LIC No', placeholder: 'Enter customer LIC number' },
      { name: 'Contact No', type: 'number', placeholder: 'Enter customer contact number' },
    ],
    PaymentDetails: [
      { name: 'Mode', placeholder: 'Enter mode of payment', required: true },
      { name: 'Vehicle Amount', placeholder: 'Enter vehicle amount', required: true },
      { name: 'Down Payment', placeholder: 'Enter downpayment amount', required: true },
      { name: 'Transfer Amount', placeholder: 'Enter transfer amount', required: true },
      { name: 'Total Amount', placeholder: 'Enter total amount', required: true },
    ],
  },
};

export default details;
