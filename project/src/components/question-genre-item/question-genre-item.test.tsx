import { render, screen} from '@testing-library/react';
import QuestionGenreItem from './question-genre-item';
import userEvent from '@testing-library/user-event';

const mockAnswer = {src: 'fakePath', genre: 'fakeGenre'};
const player = () => <h1>fakePlayer</h1>;

describe('Component: QuestionGenreItem', () => {
  it('should render correctly', () => {
    render (
      <QuestionGenreItem
        answer = {mockAnswer}
        id = {1}
        onChange={jest.fn()}
        renderPlayer={player}
        userAnswers={false}
      />
    );

    expect(screen.getByText(/Отметить/i)).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByText('checkbox')).not.toBeChecked();
    expect(screen.getByText('fakePlayer')).toBeInTheDocument();
  });

  it('должна вызываться функц onChange, когда пользователь выбирает ответ', () => {
    const onChange = jest.fn();
    const fakeId = 3;

    render(
      <QuestionGenreItem
        answer={mockAnswer}
        id={fakeId}
        onChange={onChange}
        renderPlayer={player}
        userAnswers={false}
      />
    );

    expect(screen.getByRole('checkbox')).not.toBeChecked();

    userEvent.click(screen.getByRole('checkbox'));
    expect(onChange).toBeCalled();
    expect(onChange).nthCalledWith(1, fakeId, true);
  });

  it('должен отмечаться, когда пользователь коикает', () => {
    const fakeId = 2;

    const {rerender} = render(
      <QuestionGenreItem
        answer={mockAnswer}
        id={fakeId}
        onChange={jest.fn()}
        renderPlayer={player}
        userAnswers={false}
      />
    );

    expect(screen.getByRole('checkbox')).not.toBeChecked();

    rerender(
      <QuestionGenreItem
        answer={mockAnswer}
        id={fakeId}
        onChange={jest.fn()}
        renderPlayer={player}
        userAnswers
      />
    );

    expect(screen.getByRole('checkbox')).toBeChecked();
  });
});
