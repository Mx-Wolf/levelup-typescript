export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: unknown;
  phone: string;
  website: string;
  company: unknown;
  roles: string[];
  verified: boolean;
}