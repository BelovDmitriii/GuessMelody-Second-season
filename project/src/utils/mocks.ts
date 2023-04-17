import { system, name, internet, music } from 'faker';
import { GameType } from '../consts/consts';
import { QuestionArtist, QuestionGenre } from '../types/questions';

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

export const makeFakeQuestionGenre = (): QuestionGenre => ({
  type: GameType.Genre,
  genre: music.genre(),
  answers: new Array(4).fill(null).map(() => (
    { src: system.filePath(), genre: music.genre() }),
  ),
} as QuestionGenre);
