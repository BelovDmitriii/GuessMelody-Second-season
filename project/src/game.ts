import { AuthorizationStatus, GameType } from './consts/consts';
import { Question, UserAnswer, UserArtistQuestionAnswer, UserGenreQuestionAnswer, QuestionArtist, QuestionGenre } from './types/questions';

export const isAnswerCorrect = (question: Question, answer: UserAnswer): boolean => {
  if(question.type === GameType.Artist && typeof answer === 'string') {
    return isArtistAnswerCorrect(question, answer);
  }
  if(question.type === GameType.Genre && Array.isArray(answer)) {
    return isGenreAnswerCorrect(question, answer);
  }

  return false;
};

export const isArtistAnswerCorrect = (question: QuestionArtist, userAnswer: UserArtistQuestionAnswer):boolean =>
  userAnswer === question.song.artist;

export const isGenreAnswerCorrect = (question: QuestionGenre, userAnswer: UserGenreQuestionAnswer): boolean =>
  userAnswer.every((answer, index) =>
    answer === (question.answers[index].genre === question.genre));

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;
