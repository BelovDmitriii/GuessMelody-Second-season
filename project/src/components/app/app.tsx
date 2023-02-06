import WelcomeScreen from '../welcome-screen/welcome-screen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts/consts';
import LoginScreen from '../login-screen/login-screen';
import GameOverScreen from '../game-over-screen/game-over-screen';
import SuccessScreen from '../success-screen/success-screen';
import QuestionGenreScreen from '../question-genre-screen/question-genre-screen';
import QuestionArtistScreen from '../question-artist-screen/question-artist-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import PrivateRoutes from '../private-routes/private-routes';
import { QuestionGenre, Questions, QuestionArtist } from '../../types/questions';
import GameScreen from '../game-screen/game-screen';

type AppProps = {
  errorsCount: number;
  questions: Questions;
}

function App({errorsCount, questions}: AppProps): JSX.Element {
  const [firstQuestion, secondQuestion] = questions;
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
          path={AppRoute.DevArtist}
          element={
            <QuestionArtistScreen
              question={secondQuestion as QuestionArtist}
              onAnswer={() => {
                throw new Error('Function \'onAnswer\' isn\'t implemented.');
              }}
            />
          }
        />
        <Route
          path={AppRoute.DevGenre}
          element={
            <QuestionGenreScreen
              question={firstQuestion as QuestionGenre}
              onAnswer={() => {
                throw new Error('Function \'onAnswer\' isn\'t implemented.');
              }}
            />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
