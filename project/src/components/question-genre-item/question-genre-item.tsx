import { GenreAnswer } from '../../types/questions';
import { ChangeEvent } from 'react';

type QuestionGenreItemProps = {
  answer: GenreAnswer;
  id: number;
  onChange: (id: number, value: boolean) => void;
  renderPlayer: (path: string, playerIndex: number) => JSX.Element;
  userAnswers: boolean;
}

function QuestionGenreItem (props: QuestionGenreItemProps): JSX.Element {
  const {answer, id, onChange, renderPlayer, userAnswers} = props;

  return(
    <div className="track">
      {renderPlayer(answer.src, id)}
      <div className="game__answer">
        <input
          className="game__input visually-hidden"
          type="checkbox"
          name="answer"
          value={`answer-${id}`}
          id={`answer-${id}`}
          checked={userAnswers}
          onChange={({target}: ChangeEvent<HTMLInputElement>) => {
            const value = target.checked;
            onChange(id, value);
          }}
        />
        <label
          className="game__check"
          htmlFor={`answer-${id}`}
        >
          Отметить
        </label>
      </div>
    </div>
  );
}

export default QuestionGenreItem;
