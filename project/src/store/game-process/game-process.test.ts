import { makeFakeQuestionArtist, makeFakeQuestionGenre } from '../../utils/mocks';
import { checkUserAnswer, gameProcess, incrementStep, resetGame } from './game-process';

const mockArtistQuestion = makeFakeQuestionArtist();
const mockGenreQuestion = makeFakeQuestionGenre();

describe('Reducer: gameProcess', () => {
  it('должен вернуть начальное состояние', () => {
    expect(gameProcess.reducer(void 0,{type: 'UNKNOWN ACTION'}))
      .toEqual({ step: 0, mistakes: 0});
  });

  it('Должен добавить шаг +1 заданному значению', () => {
    const state = {step: 0, mistakes: 0};
    expect(gameProcess.reducer(state, incrementStep()))
      .toEqual({step: 1, mistakes: 0});
  });

  it('при неправильном ответе должен добавить +1 ошибку', () => {
    const state = {step: 0, mistakes: 0};
    const wrongArtistQuestionQnswer = 'unknown';
    const wrongGenreQuestionArtist = mockGenreQuestion
      .answers
      .map((answer) => answer.genre !== mockGenreQuestion.genre);

    expect(gameProcess.reducer(state, checkUserAnswer({question: mockArtistQuestion, userAnswer: wrongArtistQuestionQnswer})))
      .toEqual({step: 0, mistakes: 1});

    expect(gameProcess.reducer(state, checkUserAnswer({question: mockGenreQuestion, userAnswer: wrongGenreQuestionArtist})))
      .toEqual({step: 0, mistakes: 1});
  });

  it ('при правильных ответах, не должны добавиться ошибки', () => {
    const state = {step: 0, mistakes: 0};
    const {artist: correctlyArtistQuestionAnswer} = mockArtistQuestion.song;
    const correctlyGenreQuestionAnswer = mockGenreQuestion
      .answers.map((answer) => answer.genre === mockGenreQuestion.genre);

    expect(gameProcess.reducer(state, checkUserAnswer({question: mockArtistQuestion, userAnswer: correctlyArtistQuestionAnswer})))
      .toEqual({step: 0, mistakes: 0});

    expect(gameProcess.reducer(state, checkUserAnswer({question: mockGenreQuestion, userAnswer: correctlyGenreQuestionAnswer})))
      .toEqual({step: 0, mistakes: 0});
  });

  it ('должен перезагрузить игру',() => {
    expect(gameProcess.reducer({step: 5, mistakes: 1}, resetGame()))
      .toEqual({step: 0, mistakes: 0});

    expect(gameProcess.reducer({step: 0, mistakes: 0}, resetGame()))
      .toEqual({step: 0, mistakes: 0});

    expect(gameProcess.reducer({step: 2, mistakes: 0}, resetGame()))
      .toEqual({step: 0, mistakes: 0});
  });
});
