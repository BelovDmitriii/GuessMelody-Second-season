import WelcomeScreen from '../welcome-screen/welcome-screen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, MAX_MISTAKE_COUNT } from '../../consts/consts';
import LoginScreen from '../login-screen/login-screen';
import GameOverScreen from '../game-over-screen/game-over-screen';
import SuccessScreen from '../success-screen/success-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import PrivateRoutes from '../private-routes/private-routes';
import GameScreen from '../game-screen/game-screen';
import SomeScreen from '../some-screen/some-screen';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<WelcomeScreen errorsCount={MAX_MISTAKE_COUNT} />}
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
            <GameScreen />
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
