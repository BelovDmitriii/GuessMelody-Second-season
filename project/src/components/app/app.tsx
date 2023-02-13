import WelcomeScreen from '../welcome-screen/welcome-screen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts/consts';
import LoginScreen from '../login-screen/login-screen';
import GameOverScreen from '../game-over-screen/game-over-screen';
import SuccessScreen from '../success-screen/success-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import PrivateRoutes from '../private-routes/private-routes';
import { Questions } from '../../types/questions';
import GameScreen from '../game-screen/game-screen';
import SomeScreen from '../some-screen/some-screen';

type AppProps = {
  errorsCount: number;
  questions: Questions;
}

function App({errorsCount, questions}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<WelcomeScreen errorsCount={errorsCount} />}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginScreen />}
        />
        <Route
          path={AppRoute.Lose}
          element={<GameOverScreen />}
        />
        <Route
          path={AppRoute.Result}
          element={
            <PrivateRoutes
              authorizationStatus={AuthorizationStatus.Auth}
            >
              <SuccessScreen />
            </PrivateRoutes>
          }
        />
        <Route
          path={AppRoute.Game}
          element={
            <GameScreen
              questions={questions}
            />
          }
        />
        <Route
          path='*'
          element={<NotFoundScreen />}
        />
        <Route
          path='111'
          element={<SomeScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
