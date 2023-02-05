import Logo from '../logo/logo';

function NotFoundScreen(): JSX.Element {
  return(
    <section className="game__screen">
      <Logo />
      <h1>Такой страницы не существует!</h1>
    </section>
  );
}

export default NotFoundScreen;
