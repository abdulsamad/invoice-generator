interface IDetails {
  fields: {
    VehicleDetails: string[];
    CustomerDetails: string[];
    PaymentDetails: string[];
  };
}

const details: IDetails = {
  fields: {
    VehicleDetails: ['Name', 'Reg No', 'Model No', 'Chasis No', 'Engine No', 'Color'],
    CustomerDetails: ['Name', 'Address', 'LIC No', 'Contact No'],
    PaymentDetails: ['Mode', 'Vehicle Amount', 'Down Payment', 'Transfer Amount', 'Total Amount'],
  },
};

export default details;
