export interface User {
  id: number;
  name: string;
  lastName: string;
  sex: { name: string; value: string };
  identificationNumber: number;
  mobileNumber: number;
  physicalAddress: Address;
  image: string;
  bonuses: Bonus[];
}

interface Address {
  country: string;
  city: string;
  streetAdress: string;
}

export interface Bonus {
  bonusId: number;
  userNumber: number;
  bonusType: { name: string; value: string };
  bonusAmount: number;
  currency?: { name: string; value: string };
}
