import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute, AuthorizationStatus, MAX_MISTAKE_COUNT } from '../../consts/consts';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import { Provider } from 'react-redux';
import App from './app';
import { render, screen } from '@testing-library/react';

const mockStore = configureMockStore();

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth },
  DATA: {isDataLoaded: true},
  GAME: {step: 10, mistakes: 2},
});

const history = createMemoryHistory();
const fakeApp = (
  <Provider store={store} >
    <HistoryRouter history={history} >
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('должен переходить на "WelcomeScreen", когда пользователь выбирает "/"', () => {
    history.push(AppRoute.Root);

    render(fakeApp);

    expect(screen.getByText(/Начать игру/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`Можно допустить ${MAX_MISTAKE_COUNT}`, 'i'))).toBeInTheDocument();
  });

  it('должен переходить на "LoginScreen", когда пользователь выбирает "/login"', () => {
    history.push(AppRoute.Login);

    render(fakeApp);

    expect(screen.getByText(/Сыграть ещё раз/i)).toBeInTheDocument();
    expect(screen.getByText(/Хотите узнать свой результат\? Представьтесь!/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Логин/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Пароль/i)).toBeInTheDocument();
  });

  it('должен переходить на "Winscreen", когда пользователь выбирает "/result"', () => {
    history.push(AppRoute.Result);

    render(fakeApp);

    expect(screen.getByText(/Какая Жалость!/i)).toBeInTheDocument();
    expect(screen.getByText(/Попробовать ещё раз!/i)).toBeInTheDocument();
    expect(screen.getByText(/У вас закончились попытки. Ничего, повезёт в следующий раз!/i)).toBeInTheDocument();
  });

  it('должен отрисовывать "NotFoundScreen", когда пользователь переходит по несуществующей ссылке', () => {
    history.push('/non=existen-route');

    render(fakeApp);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на глгавную')).toBeInTheDocument();
  });
});
