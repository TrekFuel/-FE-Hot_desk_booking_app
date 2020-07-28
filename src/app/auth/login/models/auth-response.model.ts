export interface AuthResponse {
  userInfo: {
    id: string,
    email: string,
    username: string,
    firstName: string,
    lastName: string,
    isActive: boolean,
    roleNames: string[]
  };
  token: string;
}
