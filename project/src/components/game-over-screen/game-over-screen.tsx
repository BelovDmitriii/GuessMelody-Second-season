import { AppRoute } from '../../consts/consts';
import { useNavigate } from 'react-router-dom';

function GameOverScreen(): JSX.Element {
  const navigate = useNavigate();

  return(
    <section className="result">
      <div className="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" /></div>
      <h2 className="result__title">Какая жалость!</h2>
      <p className="result__total result__total--fail">У вас закончились все попытки. Ничего, повезёт в следующий раз!</p>
      <button
        className="replay"
        type="button"
        onClick = {() => navigate(AppRoute.Root)}
      >
        Попробовать ещё раз
      </button>
    </section>
  );
}

export default GameOverScreen;
