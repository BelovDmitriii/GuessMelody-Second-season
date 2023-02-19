import { QuestionArtist, Questions, QuestionGenre } from '../../types/questions';
import { Navigate } from 'react-router-dom';
import QuestionArtistScreen from '../question-artist-screen/question-artist-screen';
import QuestionGenreScreen from '../question-genre-screen/question-genre-screen';
import withAudioPlayer from '../../hocks/with-audio-player/with-audio-player';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, GameType } from '../../consts/consts';
import { incrementStep } from '../../store/action';

const ArtistQuestionScreenWrapped = withAudioPlayer(QuestionArtistScreen);
const GenreQuestionScreenWrapped = withAudioPlayer(QuestionGenreScreen);

type GameScreenProps = {
  questions: Questions;
}

function GameScreen(props:GameScreenProps): JSX.Element {
  const {questions} = props;
  const step = useAppSelector((state) => state.step);
  const question = questions[step];
  const dispatch = useAppDispatch();

  if(step >= questions.length || !question){
    return <Navigate to={AppRoute.Root} />;
  }

  switch(question.type) {
    case GameType.Artist:
      return (
        <ArtistQuestionScreenWrapped
          key={step}
          question={question as QuestionArtist}
          onAnswer={() => dispatch(incrementStep())}
        />
      );
    case GameType.Genre:
      return (
        <GenreQuestionScreenWrapped
          key={step}
          question={question as QuestionGenre}
          onAnswer={() => dispatch(incrementStep())}
        />
      );
    default:
      return <Navigate to={AppRoute.Root} />;
  }

}

export default GameScreen;
