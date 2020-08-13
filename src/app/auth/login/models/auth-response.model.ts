export interface AuthResponse {
  expiresIn: number;
  userInfo: UserDataInterface;
  token: string;
}

export interface UserDataInterface {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  roleNames: string[];
  position: string;
  department: string;
  location: string;
  phone: string;
  skype: string;
  hr: string;
  img: string;
}
