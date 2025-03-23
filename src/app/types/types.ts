export type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  otp: string;
  address: Address[];
};
export type Division = {
  id: number;
  name: string;
};
export type District = {
  id: number;
  name: string;
};
export type Address = {
  country: string;
  division: string;
  district: string;
  isDefault: boolean;
  fullAddress: string;
};
