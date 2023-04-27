import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { makeFakeQuestionArtist, makeFakeQuestionGenre } from '../../utils/mocks';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import GameScreen from './game-screen';
import { AppRoute } from '../../consts/consts';
import { Route, Routes } from 'react-router-dom';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const mockGenreQuestion = makeFakeQuestionGenre();
const mockArtist = makeFakeQuestionArtist();

describe('Component: GameScreen', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = () => Promise.resolve();
    window.HTMLMediaElement.prototype.pause = () => jest.fn();
  });


  it('should render QuestionGenreScreen', () => {
    const store = mockStore({
      GAME: {step: 0, mistakes:2,},
      DATA: {question: [mockGenreQuestion]}
    });

    const expectedGenre = mockGenreQuestion.genre;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <GameScreen />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(new RegExp(`Выберите ${expectedGenre} треки`, 'i'))).toBeInTheDocument();
    expect(screen.queryByText(/Кто исполняет эту песню/i)).not.toBeInTheDocument();
  });

  it('should render QuestionArtistScreen', () => {
    const store = mockStore({
      GAME: {step: 0, mistakes: 2},
      DATA: {questions: [mockArtist]}
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <GameScreen />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Кто исполняет эту песню/i)).toBeInTheDocument();
    expect(screen.queryByText(/Выбери rock греки/i)).not.toBeInTheDocument();
  });

  it('должен перенаправлять на экран "/lose", если ошиок больше чем MAX_MISTAKES', () => {
    const store = mockStore({
      GAME: {step: 0, mistakes: 10},
      DATA: {questions: [mockArtist]}
    });
    history.push(AppRoute.Game);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Lose}
              element={<h1>Lose screen</h1>}
            />
            <Route
              path={AppRoute.Game}
              element={<GameScreen />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Lose screen/i)).toBeInTheDocument();

  });

  it('должен направить на экран "/result"б так как step > questions count', () => {
    const store = mockStore({
      GAME: {step: 10, mistakes: 0},
      DATA: {questions: [mockArtist]}
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Lose}
              element={<h1>Result screen</h1>}
            />
            <Route
              path={AppRoute.Game}
              element={<GameScreen />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Result screen/i)).toBeInTheDocument();
  });

  it('должен перекинуть на экран "/", так как неизвестный тип вопроса', () => {
    const store = mockStore({
      GAME: {step: 0, mistakes: 0},
      DATA: {questions: [{}]},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={<h1>Root element</h1>}
            />
            <Route
              path={AppRoute.Game}
              element={<GameScreen />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Root element/i)).toBeInTheDocument();
  });
});
