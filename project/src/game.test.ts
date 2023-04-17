import { isArtistAnswerCorrect } from './game';
import { makeFakeQuestionArtist } from './utils/mocks';

const mockArtistQuestion = makeFakeQuestionArtist();

describe('Function': 'isArtistAnswerCorrect', () => {
  it('should return "true" when answer is correct', () => {
    const {artist: correctAnswer} = mockArtistQuestion.song;
    expect(isArtistAnswerCorrect(mockArtistQuestion, correctAnswer))
      .toBe(true);
  });
});
