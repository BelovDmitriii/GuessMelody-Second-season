export enum AppRoute{
  Login = '/login',
  Lose = '/lose',
  Result = '/result',
  Root = '/',
  Game = 'game',
  Secret = '111',
}

export enum AuthorizationStatus{
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const FIRST_GAME_STEP = 0;
export const MAX_MISTAKE_COUNT = 3;

export enum GameType {
  Genre = 'genre',
  Artist = 'artist',
}

export enum APIRoute {
  Questions = '/questions',
  Login = '/login',
  Logout = '/logout',
}

export enum HTTP_CODE {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

export enum NameSpace {
  data = 'DATA',
  user = 'USER',
  game = 'GAME',
}
