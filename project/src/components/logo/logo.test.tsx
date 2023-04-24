import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import HistoryRouter from '../history-route/history-route';
import Logo from './logo';
import { Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();

describe('Component: Logo', () => {
  it('должен отрисовываться правильно', () => {
    render(
      <HistoryRouter history={history}>
        <Logo />
      </HistoryRouter>
    );
    expect(screen.getByAltText(/Угадай мелодию/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('должен перенаправлять на начальную страницу, когда пользователь нажимет на ссылку', () => {
    history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path="/"
            element={
              <h1>This is main page</h1>
            }
          />
          <Route
            path='*'
            element={
              <Logo />
            }
          />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();

    userEvent.click(screen.getByRole('link'));

    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
  });
});
