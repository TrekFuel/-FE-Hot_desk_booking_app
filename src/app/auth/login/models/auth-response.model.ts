export interface AuthResponse {
  userInfo: {
    id: string,
    email: string,
    username: string,
    firstName: string,
    lastName: string,
    isActive: boolean,
    roleNames: string[],
    position: string,
    department: string,
    location: string,
    phone: string,
    skype: string,
    hr: string,
  };
  token: string;
}
