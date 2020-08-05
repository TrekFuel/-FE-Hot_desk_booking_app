import { UserInterface } from '../../shared/models/user.interface';

export interface UsersListInterface {
  users: UserInterface[];
  totalPages: number | null;
  numberPages: number | null;
}
