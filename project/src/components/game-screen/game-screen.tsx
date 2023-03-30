import { Question, UserAnswer } from '../../types/questions';
import { Navigate } from 'react-router-dom';
import QuestionArtistScreen from '../question-artist-screen/question-artist-screen';
import QuestionGenreScreen from '../question-genre-screen/question-genre-screen';
import withAudioPlayer from '../../hocks/with-audio-player/with-audio-player';
import { useAppDispatch, useAppSelector } from '../..';
import { AppRoute, GameType, MAX_MISTAKE_COUNT } from '../../consts/consts';
import { incrementStep, checkUserAnswer } from '../../store/action';
import Mistakes from '../mistakes/mistakes';

const ArtistQuestionScreenWrapped = withAudioPlayer(QuestionArtistScreen);
const GenreQuestionScreenWrapped = withAudioPlayer(QuestionGenreScreen);

function GameScreen(): JSX.Element {
  const {step, mistakes, questions} = useAppSelector((state) => state);
  const question = questions[step];
  const dispatch = useAppDispatch();

  if(mistakes === MAX_MISTAKE_COUNT){
    return <Navigate to={AppRoute.Lose} />;
  }

  if(step >= questions.length || !question){
    return <Navigate to={AppRoute.Result} />;
  }

  const onUserAnswer = (questionItem: Question, userAnswer: UserAnswer) => {
    dispatch(incrementStep());
    dispatch(checkUserAnswer({question: questionItem, userAnswer}));
  };

  switch(question.type) {
    case GameType.Artist:
      return (
        <ArtistQuestionScreenWrapped
          key={step}
          question={question}
          onAnswer={onUserAnswer}
        >
          <Mistakes count={mistakes} />
        </ArtistQuestionScreenWrapped>
      );
    case GameType.Genre:
      return (
        <GenreQuestionScreenWrapped
          key={step}
          question={question}
          onAnswer={onUserAnswer}
        >
          <Mistakes count = {mistakes} />
        </GenreQuestionScreenWrapped>
      );
    default:
      return <Navigate to={AppRoute.Root} />;
  }

}

export default GameScreen;
