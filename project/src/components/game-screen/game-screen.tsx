import { QuestionArtist, Questions, QuestionGenre } from '../../types/questions';
import { Navigate } from 'react-router-dom';
import QuestionArtistScreen from '../question-artist-screen/question-artist-screen';
import QuestionGenreScreen from '../question-genre-screen/question-genre-screen';
import withAudioPlayer from '../../hocks/with-audio-player/with-audio-player';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, GameType } from '../../consts/consts';
import { incrementStep } from '../../store/action';
import Mistakes from '../mistakes/mistakes';

const ArtistQuestionScreenWrapped = withAudioPlayer(QuestionArtistScreen);
const GenreQuestionScreenWrapped = withAudioPlayer(QuestionGenreScreen);

type GameScreenProps = {
  questions: Questions;
}

function GameScreen(props:GameScreenProps): JSX.Element {
  const {questions} = props;
  const {step, mistakes} = useAppSelector((state) => state);
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
        >
          <Mistakes count={mistakes} />
        </ArtistQuestionScreenWrapped>
      );
    case GameType.Genre:
      return (
        <GenreQuestionScreenWrapped
          key={step}
          question={question as QuestionGenre}
          onAnswer={() => dispatch(incrementStep())}
        >
          <Mistakes count = {mistakes} />
        </GenreQuestionScreenWrapped>
      );
    default:
      return <Navigate to={AppRoute.Root} />;
  }

}

export default GameScreen;
