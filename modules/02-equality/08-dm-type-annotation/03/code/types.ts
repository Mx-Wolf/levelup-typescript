export interface Geo {
  lat: string,
  lng: string
}
export interface Address {
  street: string,
  suite?: string | undefined,
  city: string,
  zipcode: string,
  geo?: Geo | undefined
}
export interface Company {
  name: string,
  catchPhrase: string,
  bs: string
}
export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  address?: Address | undefined,
  phone: string,
  website: string,
  company?: Company | undefined;
  roles: string[];
  verified?: boolean | undefined;
}