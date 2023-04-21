import { AuthorizationStatus } from '../../consts/consts';
import { requireAuthorization, userProcess } from './user-process';

describe('Reducer: user', () => {
  it ('без каких-либо параметров должен возвращать начальное стостояние', () => {
    expect(userProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({authorizationStatus: AuthorizationStatus.Unknown});
  });

  it('должен обновить статус авторизации на "AUTH"', () => {
    const state = {authorizationStatus: AuthorizationStatus.NoAuth};
    expect(userProcess.reducer(state, requireAuthorization(AuthorizationStatus.Auth)))
      .toEqual({authorizationStatus: AuthorizationStatus.Auth});
  });

  it('должен обновить статус авторизации на "NO_AUTH"', () => {
    const state = {authorizationStatus: AuthorizationStatus.NoAuth};
    expect(userProcess.reducer(state, requireAuthorization(AuthorizationStatus.NoAuth)))
      .toEqual({authorizationStatus: AuthorizationStatus.NoAuth});
  });
});
