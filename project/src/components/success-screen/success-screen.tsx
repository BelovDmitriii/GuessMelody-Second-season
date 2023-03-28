import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../consts/consts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { resetGame } from '../../store/action';
import { logoutAction } from '../../store/api-actions';

function SuccessScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {step, mistakes} = useAppSelector((state) => state);
  const correctAnswers = step - mistakes;

  return(
    <section className="result">
      <div className="result-logout__wrapper">
        <Link
          className="result-logout__link"
          onClick={(evt) => {
            evt.preventDefault();
            dispatch(logoutAction());
          }}
          to="/"
        >
          Выход
        </Link>
      </div>
      <div className="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" /></div>
      <h2 className="result__title">Вы настоящий меломан!</h2>
      <p className="result__total">Вы ответили правильно на {correctAnswers} вопросов и совершили {mistakes} ошибки</p>
      <button
        onClick={()=> {
          dispatch(resetGame());
          navigate(AppRoute.Game);
        }}
        className="replay"
        type="button"
      >
        Сыграть ещё раз
      </button>
    </section>
  );
}

export default SuccessScreen;
