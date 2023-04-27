import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { makeFakeQuestionGenre } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import QuestionGenreScreen from './question-genre-screen';
import { UserGenreQuestionAnswer } from '../../types/questions';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();
const mockGenreQuestion = makeFakeQuestionGenre();

describe('Component: QuestionGenreScreen', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <QuestionGenreScreen
          onAnswer={jest.fn()}
          question={mockGenreQuestion}
          renderPlayer={jest.fn(() => <h1>Fake player</h1>)}
        >
          <span>Some component</span>
        </QuestionGenreScreen>
      </HistoryRouter>
    );

    expect(screen.getByText(new RegExp(`Выберите ${mockGenreQuestion.genre} треки`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/Some component/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Fake player/i).length).toBe(mockGenreQuestion.answers.length);
    expect(screen.getByRole('button')).toBe('Ответить');
    expect(screen.getAllByRole('checkbox').length).toBe(mockGenreQuestion.answers.length);
  });

  it('когда пользователь выбирает ответ, должна вызваться функция onAnswer', () => {
    const onAnswer = jest.fn();

    render(
      <HistoryRouter history={history}>
        <QuestionGenreScreen
          onAnswer={onAnswer}
          question={mockGenreQuestion}
          renderPlayer={jest.fn(() => <h1>Fake player</h1>)}
        >
          <span>Some component</span>
        </QuestionGenreScreen>
      </HistoryRouter>
    );

    const [firstAnswerElement,,thirdAnswerElement] = screen.getAllByRole('checkbox');

    const expectedAnswers: UserGenreQuestionAnswer = [true, false, true, false];

    userEvent.click(firstAnswerElement);
    userEvent.click(thirdAnswerElement);

    expect(onAnswer).toBeCalled();
    expect(onAnswer).nthCalledWith(1, mockGenreQuestion, expectedAnswers);
  });
});
