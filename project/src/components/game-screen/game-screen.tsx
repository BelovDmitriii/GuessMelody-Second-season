import { QuestionArtist, Questions, QuestionGenre } from '../../types/questions';
import {useState} from 'react';
import { FIRST_GAME_STEP, AppRoute, GameType } from '../../consts/consts';
import { Navigate } from 'react-router-dom';
import QuestionArtistScreen from '../question-artist-screen/question-artist-screen';
import QuestionGenreScreen from '../question-genre-screen/question-genre-screen';

type GameScreenProps = {
  questions: Questions;
}

function GameScreen(props:GameScreenProps): JSX.Element {
  const {questions} = props;
  const [step, setStep] = useState(FIRST_GAME_STEP);
  const question = questions[step];

  if(step >= questions.length || !question){
    return <Navigate to={AppRoute.Root} />;
  }

  switch(question.type) {
    case GameType.Artist:
      return (
        <QuestionArtistScreen
          key={step}
          question={question as QuestionArtist}
          onAnswer={() => setStep((prevStep) => prevStep + 1)}
        />
      );
    case GameType.Genre:
      return (
        <QuestionGenreScreen
          key={step}
          question={question as QuestionGenre}
          onAnswer={() => setStep((prevStep) => prevStep + 1)}
        />
      );
    default:
      return <Navigate to={AppRoute.Root} />;
  }

}

export default GameScreen;
