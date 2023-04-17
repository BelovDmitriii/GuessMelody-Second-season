import { isArtistAnswerCorrect, isGenreAnswerCorrect } from './game';
import { makeFakeQuestionArtist, makeFakeQuestionGenre } from './utils/mocks';

const mockArtistQuestion = makeFakeQuestionArtist();
const mockGenreQuestion = makeFakeQuestionGenre();

describe('Business Logic: check user\'s answer', () => {
  describe('Function: isArtistAnswerCorrect', () => {
    it('should return "true" when answer is correct', () => {
      const {artist: correctAnswer} = mockArtistQuestion.song;
      expect(isArtistAnswerCorrect(mockArtistQuestion, correctAnswer))
        .toBe(true);
    });
    it('should return "false" when answer is incorrect', () => {
      const incorrectAnswer = 'unknown';
      expect(isArtistAnswerCorrect(mockArtistQuestion, incorrectAnswer))
        .toBe(false);
    });
  });

  describe('Function: isGenreAnswerCorrect', () => {
    it('should return "true" when answer is correct', () => {
      const {answers} = mockGenreQuestion;
      const correctAnswer = answers.map((answer) => answer.genre === mockGenreQuestion.genre);
      expect(isGenreAnswerCorrect(mockGenreQuestion, correctAnswer))
        .toBe(true);
    });
    it('should return "false" when answer is incorrect', () => {
      const {answers} = mockGenreQuestion;
      const incorrectAnswer = answers.map((answer) => answer.genre !== mockGenreQuestion.genre);
      expect(isGenreAnswerCorrect(mockGenreQuestion, incorrectAnswer))
        .toBe(false);
    });
  });
});
