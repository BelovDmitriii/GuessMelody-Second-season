import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch} from 'redux-thunk';
import { State } from '../types/state';
import { configureMockStore } from '@jedmao/redux-mock-store';
import {Action} from 'redux';
import { APIRoute } from '../consts/consts';
import { checkAuthAction, loginAction, fetchQuestionAction, logoutAction } from './api-actions';
import { requireAuthorization } from './user-process/user-process';
import { AuthData } from '../types/auth-data';
import { makeFakeQuestionArtist, makeFakeQuestionGenre } from '../utils/mocks';
import { loadQuestions } from './game-data/game-data';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('должен вернуться статус авторизации "auth", когда сервер вернет 200', async ()=> {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(requireAuthorization.toString());
  });

  it('должен вызвать RequiredAuthorization и RedirectToRoute, когда POST /login', async () => {
    const fakeUser: AuthData = {login: 'testMail@test.ru', password: '1234566789'};

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, {token: 'secret'});

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(requireAuthorization.toString());

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('guess-melody-token', 'secret');
  });

  it ('должен вызвать Load_Questions, когда GET /questions', async () => {
    const mockQuestions = [makeFakeQuestionArtist(), makeFakeQuestionGenre()];
    mockAPI
      .onGet(APIRoute.Questions)
      .reply(200, mockQuestions);

    const store = mockStore();
    await store.dispatch(fetchQuestionAction());
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadQuestions.toString());
  });

  it ('должен вызвать Logout, когда Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(requireAuthorization.toString());

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('guess-melody-token');
  });
});
