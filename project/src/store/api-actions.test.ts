import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch} from 'redux-thunk';
import { State } from '../types/state';
import { configureMockStore } from '@jedmao/redux-mock-store';
import {Action} from 'redux';
import { APIRoute } from '../consts/consts';
import { checkAuthAction } from './api-actions';
import { requireAuthorization } from './user-process/user-process';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPT = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('должен вернуться статус авторизации "auth", когда сервер вернет 200', async ()=> {
    const store = mockStore();
    mockAPT
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(requireAuthorization.toString());
  });
});
