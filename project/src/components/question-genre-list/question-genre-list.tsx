import { FormEvent } from 'react';
import { useUserAnswers } from '../../hooks/use-user-answer';
import { QuestionGenre, UserGenreQuestionAnswer } from '../../types/questions';
import QuestionGenreItem from '../question-genre-item/question-genre-item';

type QuestionGenreListProps = {
  question: QuestionGenre;
  onAnswer: (question: QuestionGenre, answers: UserGenreQuestionAnswer) => void;
  renderPlayer: (src: string, playerIndex: number) => JSX.Element;
};

function QuestionGenreList (props: QuestionGenreListProps): JSX.Element {
  const {question, onAnswer, renderPlayer} = props;
  const {answers} = question;
  const [userAnswers, handleAnswerChange] = useUserAnswers(question);
  return(
    <form
      className="game__tracks"
      onSubmit={(evt:FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        onAnswer(question, userAnswers);
      }}
    >
      {answers.map((answer, id) => {
        const keyValue = `${id}-${answer.src}`;
        return(
          <QuestionGenreItem
            answer={answer}
            id={id}
            key={keyValue}
            onChange={handleAnswerChange}
            renderPlayer={renderPlayer}
            userAnswers={userAnswers[id]}
          />
        );
      })}

      <button className="game__submit button" type="submit">Ответить</button>
    </form>
  );
}

export default QuestionGenreList;
