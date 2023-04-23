import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import LoadingScreen from '../loading-screen/loading-screen';
import HistoryRouter from '../history-route/history-route';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();

describe('Component: LoginScreen', () => {
  it('должен отобразиться "LoginScreen", когда пользователь переходить по url "login"', () => {
    const history = createMemoryHistory();
    history.push('/login');

    render (
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <LoadingScreen />
        </HistoryRouter>
      </Provider>
    );
  });

  expect(screen.getByText(/Сыграть еще раз/i)).toBeInTheDocument();
  expect(screen.getByText(/Хотите узнать свой результат\? Представьтесь!/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Логин/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Пароль/i)).toBeInTheDocument();

  userEvent.type(screen.getByTestId('login'), 'Dmitrii');
  userEvent.type(screen.getByTestId('password'), '123456789');

  expect(screen.getByDisplayValue(/Dmitrii/i)).toBeInTheDocument();
  expect(screen.getByDisplayValue(/123456789/i)).toBeInTheDocument();

});
