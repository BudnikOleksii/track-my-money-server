import type { Request } from 'express';

export interface ITokenPayload {
  sub: number;
  email: string;
  roles: string[];
  iat?: number;
  exp?: number;
}

export interface ITokenWithId extends ITokenPayload {
  token: string;
  tokenId: string;
}

export interface IRequestWithToken extends Request {
  user: ITokenWithId;
}
