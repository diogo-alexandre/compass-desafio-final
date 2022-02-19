import { Response as Res } from 'express';

export type Response = { end: () => void } & Res
