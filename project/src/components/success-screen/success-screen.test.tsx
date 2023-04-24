import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { AppRoute } from '../../consts/consts';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import { Route, Routes } from 'react-router-dom';
import SuccessScreen from './success-screen';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.Result);

const store = mockStore({
  GAME: {step: 10, mistakes: 2},
});

describe('Component: SuccessScreen', () => {

  it('должен отрисовываться правильно', () => {
    const correctlyQuestionsCount = 8;
    const mistakes = 2;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SuccessScreen />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Вы настоящий меломан!/i)).toBeInTheDocument();
    expect(screen.getByText(/Вы ответили правильно/i)).toHaveTextContent(correctlyQuestionsCount.toString());
    expect(screen.getByText(/Вы ответили неправильно/i)).toHaveTextContent(mistakes.toString());
  });

  it('должен перенаправить, когда пользователь нажмет кнопку "Replay Button"',() => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Result}
              element={
                <SuccessScreen />
              }
            />
            <Route
              path={AppRoute.Game}
              element={
                <h1>Game Screen</h1>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    userEvent.click(screen.getByText(/Сыграть ещё раз/i));

    expect(screen.getByText(/Game Screen/i)).toBeInTheDocument();
  });

});
