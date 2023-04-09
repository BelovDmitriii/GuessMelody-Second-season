import Logo from '../logo/logo';
import { QuestionGenre, UserGenreQuestionAnswer } from '../../types/questions';
import { FormEvent, PropsWithChildren } from 'react';
import { useUserAnswers } from '../../hooks/use-user-answer';
import QuestionGenreItem from '../question-genre-item/question-genre-item';

type QuestionGenreScreenProps = PropsWithChildren<{
  question: QuestionGenre;
  onAnswer: (question: QuestionGenre, answers: UserGenreQuestionAnswer) => void;
  renderPlayer: (src: string, playerIndex: number) => JSX.Element;
}>

function QuestionGenreScreen(props: QuestionGenreScreenProps):JSX.Element {
  const {question, onAnswer, renderPlayer, children} = props;
  const {answers, genre} = question;
  const [userAnswers, handleAnswerChange] = useUserAnswers(question);

  return(
    <section className="game game--genre">
      <header className="game__header">
        <Logo />

        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370"
            style={{filter: 'url(#blur)', transform: 'rotate(-90deg) scaleY(-1)', transformOrigin: 'center'}}
          />
        </svg>

        {children}
      </header>

      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
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
      </section>
    </section>
  );
}

export default QuestionGenreScreen;
