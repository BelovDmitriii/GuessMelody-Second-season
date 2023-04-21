import { makeFakeQuestionArtist, makeFakeQuestionGenre } from '../../utils/mocks';
import { gameData, loadQuestions } from './game-data';

const questions = [makeFakeQuestionArtist(), makeFakeQuestionGenre()];

describe('Reducer: gameData', () => {
  it ('без добавления параметров должен вернуть наальное состояние', () => {
    expect(gameData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({questions: [], isDataLoaded: false});
  });

  it ('должен обновить вопросы при добавлении вопроса', () => {
    const state = {questions: [], isDataLoaded: false};
    expect(gameData.reducer(state, loadQuestions(questions)))
      .toEqual({questions: [], isDataLoaded: true});
  });
});
