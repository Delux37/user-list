export interface IUserList {
  users: User[],
  totalCount: number
}

export interface User {
  id?: number;
  name: string;
  lastName: string;
  sex: string;
  identificationNumber: number;
  mobileNumber: number;
  physicalAddress: Address;
  image: string;
}

interface Address {
  country: string;
  city: string;
  streetAdress: string;
}
