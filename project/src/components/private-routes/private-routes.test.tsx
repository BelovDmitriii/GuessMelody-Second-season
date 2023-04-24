import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import { Route, Routes } from 'react-router-dom';
import PrivateRoutes from './private-routes';
import { AppRoute, AuthorizationStatus } from '../../consts/consts';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: PrivateRoutes', () => {
  beforeEach(() => {
    history.push('/private');
  });

  it('если пользователь не авторизован, должен отрисовывать только публичные поля', () => {
    const store = mockStore();

    render (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Login}
              element={<h1>Public Route</h1>}
            />
            <Route
              path='/private'
              element={
                <PrivateRoutes
                  authorizationStatus={AuthorizationStatus.Auth}
                >
                  <h1>Private Route</h1>
                </PrivateRoutes>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Public Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
  });

  it('должен отображать приветный компонент, если пользователь авторизован', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
    });

    render (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Login}
              element={<h1>Public Route</h1>}
            />
            <Route
              path='/private'
              element={
                <PrivateRoutes
                  authorizationStatus={AuthorizationStatus.Auth}
                >
                  <h1>Private Route</h1>
                </PrivateRoutes>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Private Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Public Route/i)).not.toBeInTheDocument();
  });
});
