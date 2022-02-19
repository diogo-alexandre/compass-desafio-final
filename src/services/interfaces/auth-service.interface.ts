import { IAuthResponse } from '../../helpers/interfaces/auth.interface';

export interface IAuthService {
  login: (email: string, password: string) => Promise<IAuthResponse>
}
