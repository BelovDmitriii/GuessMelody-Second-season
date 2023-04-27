import { render, screen } from '@testing-library/react';
import { makeFakeQuestionArtist } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import QuestionArtistScreen from './question-artist-screen';
import HistoryRouter from '../history-route/history-route';
import userEvent from '@testing-library/user-event';

const mockArtist = makeFakeQuestionArtist();
const history = createMemoryHistory();

describe('Component: QuestionArtistScreen', () => {
  it('should render correctly', () => {
    const [firstArtist, secondArtist, thirdArtist] = mockArtist.answers;

    render(
      <HistoryRouter history={history}>
        <QuestionArtistScreen
          question={mockArtist}
          onAnswer={jest.fn()}
          renderPlayer={jest.fn(() => <h1>Fake player</h1>)}
        >
          <span>Some component</span>
        </QuestionArtistScreen>
      </HistoryRouter>
    );

    expect(screen.getByText(/Кто исполняет эту песню/i)).toBeInTheDocument();
    expect(screen.getByText(/Fake player/i)).toBeInTheDocument();
    expect(screen.getByText(/Some component/i)).toBeInTheDocument();
    expect(screen.getByText(firstArtist.artist)).toBeInTheDocument();
    expect(screen.getByText(secondArtist.artist)).toBeInTheDocument();
    expect(screen.getByText(thirdArtist.artist)).toBeInTheDocument();
  });

  it('когда пользователь выбирает ответ, должна вызываться функция onAnswer', () => {
    const onAnswer = jest.fn();

    render(
      <HistoryRouter history={history}>
        <QuestionArtistScreen
          question={mockArtist}
          onAnswer={onAnswer}
          renderPlayer={jest.fn(() => <h1>Fake player</h1>)}
        >
          <span>Some component</span>
        </QuestionArtistScreen>
      </HistoryRouter>
    );

    const [firstAnswerData, secondAnswerData, thirdAnswerData] = mockArtist.answers;
    const [firstAnswer, secondAnswer, thirdAnswer] = screen.queryAllByRole('radio');

    userEvent.click(firstAnswer);
    userEvent.click(secondAnswer);
    userEvent.click(thirdAnswer);

    expect(onAnswer).toBeCalledTimes(3);
    expect(onAnswer).nthCalledWith(1, mockArtist, firstAnswerData.artist);
    expect(onAnswer).nthCalledWith(2, mockArtist, secondAnswerData.artist);
    expect(onAnswer).nthCalledWith(3, mockArtist, thirdAnswerData.artist);
  });
});
