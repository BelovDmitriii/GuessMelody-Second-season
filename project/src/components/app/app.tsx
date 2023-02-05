import WelcomeScreen from '../welcome-screen/welcome-screen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from './consts';
import LoginScreen from '../login-screen/login-screen';

type AppProps = {
  errorsCount: number;
}

function App({errorsCount}: AppProps): JSX.Element {
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
