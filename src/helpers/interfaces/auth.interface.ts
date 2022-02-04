import { TokenType } from '../../constants/auth.constant'

export interface IAuthResponse {
  acess_token: string
  type: TokenType
}
