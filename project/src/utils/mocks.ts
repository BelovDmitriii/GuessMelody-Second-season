import { system, name, internet } from 'faker';
import { GameType } from '../consts/consts';
import { QuestionArtist } from '../types/questions';

export const makeFakeQuestionArtist = (): QuestionArtist => ({
  type: GameType.Artist,
  song: {
    artist: name.title(),
    src: system.filePath(),
  },
  answers: new Array(3).fill(null).map(() => (
    { picture: internet.avatar(), artist: name.title() }
  )),
} as QuestionArtist);
