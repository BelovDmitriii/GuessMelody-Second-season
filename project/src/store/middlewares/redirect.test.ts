import { AnyAction } from 'redux';
import { State } from '../../types/state';
import { redirect } from './redirect';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { redirectToRoute } from '../action';
import { AppRoute } from '../../consts/consts';

const fakeHistory = {
  location: {pathname: ''},
  push(path: string) {
    this.location.pathname = path;
  },
};

jest.mock('../../browser-history', () => fakeHistory);

const middlewares = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });

  it('должен быть перенаправлен на /login', () => {
    store.dispatch(redirectToRoute(AppRoute.Login));
    expect(fakeHistory.location.pathname).toBe(AppRoute.Login);
    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.Login),
    ]);
  });

  it('не должен быть перенаправлен на /lose из-за неправильного действия', () => {
    store.dispatch({type: 'UNKNOWN_ACTION', payload: AppRoute.Lose});
    expect(fakeHistory.location.pathname).not.toBe(AppRoute.Lose);
});
});
