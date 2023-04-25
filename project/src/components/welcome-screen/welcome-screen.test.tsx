import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, NameSpace } from '../../consts/consts';
import WelcomeScreen from './welcome-screen';
import * as Redux from 'react-redux';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({});
const errorsCount = 3;

describe('Component: WelcomeScreen', () => {
  it('shiuld render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={
                <WelcomeScreen errorsCount={errorsCount} />
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Правила игры/i)).toBeInTheDocument();
    expect(screen.getByText(/Нужно ответить на все вопросы/i)).toBeInTheDocument();
    expect(screen.getByText(`Можно допустить ${errorsCount} ошибки.`)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button').textContent).toBe('Начать игру');
  });

  it('должен перенаправить на /game, когда пользователь нажмет кнопку Начать', () => {
    const dispatch = jest.fn();

    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={
                <WelcomeScreen errorsCount={errorsCount} />
              }
            />
            <Route
              path={AppRoute.Game}
              element={
                <h1>This is Game</h1>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/This is Game/i)).not.toBeInTheDocument();
    expect(useDispatch).toBeCalledTimes(1);
    expect(dispatch).nthCalledWith(1, {
      type: `${NameSpace.game}/resetGame`,
    });
  });
});
