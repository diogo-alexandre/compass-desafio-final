import TokenType from '../../constants/auth.constant';

export interface IAuthResponse {
  access_token: string
  type: TokenType
  expires_in: number
}
