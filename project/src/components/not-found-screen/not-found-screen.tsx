import Logo from '../logo/logo';
import {Link} from 'react-router-dom';

function NotFoundScreen(): JSX.Element {
  return(
    <section className="game">
      <header className="game__header">
        <Logo />
      </header>
      <section className="game__screen">
        <h1>Такой страницы не существует!</h1>
        <Link to='/'>Вернуться на главную страницы</Link>
      </section>
    </section>
  );
}

export default NotFoundScreen;
