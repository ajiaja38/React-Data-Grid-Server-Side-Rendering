export interface UserProps {
  guid: string;
  guidInstitution: string;
  guidUnit: string;
  identity: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  role: string;
  avatar: string | null;
  isDeleted: boolean;
  birthDate: string;
  createdAt: string;
  updatedAt: string;
}
