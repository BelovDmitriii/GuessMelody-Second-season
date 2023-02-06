import Logo from '../logo/logo';
import { QuestionGenre } from '../../types/questions';
import { useState, ChangeEvent } from 'react';

type QuestionGenreScreenProps = {
  question: QuestionGenre;
}

function QuestionGenreScreen(props: QuestionGenreScreenProps):JSX.Element {
  const {question} = props;
  const {answers, genre} = question;
  const [userAnswers, setUserAnswers] = useState([false, false, false, false]);
  return(
    <section className="game game--genre">
      <header className="game__header">
        <Logo />

        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370"
            style={{filter: 'url(#blur)', transform: 'rotate(-90deg) scaleY(-1)', transformOrigin: 'center'}}
          />
        </svg>

        <div className="game__mistakes">
          <div className="wrong"></div>
          <div className="wrong"></div>
          <div className="wrong"></div>
        </div>
      </header>

      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form className="game__tracks">
          {answers.map((answer, id) => {
            const keyValue = `${id}-${answer.src}`;
            return(
              <div key={keyValue} className="track">
                <button className="track__button track__button--play" type="button"></button>
                <div className="track__status">
                  <audio
                    src={answer.src}
                  />
                </div>
                <div className="game__answer">
                  <input className="game__input visually-hidden" type="checkbox" name="answer" value={`answer-${id}`}
                    id={`answer-${id}`}
                    checked={userAnswers[id]}
                    onChange={({target}: ChangeEvent<HTMLInputElement>) => {
                      const value = target.checked;
                      setUserAnswers([...userAnswers.slice(0, id), value, ...userAnswers.slice(id + 1)]);
                    }}
                  />
                  <label className="game__check" htmlFor={`answer-${id}`}>Отметить</label>
                </div>
              </div>
            );
          })}

          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    </section>
  );
}

export default QuestionGenreScreen;
