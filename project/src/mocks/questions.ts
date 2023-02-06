import { QuestionGenre } from '../types/questions';

export const questions: QuestionGenre[] = [
  {
    type: 'genre',
    genre: 'rock',
    answers: [{
      src: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Sax%2C_Rock%2C_and_Roll_%28ISRC_USUAN1100086%29.mp3',
      genre: 'rock'
    }, {
      src: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg',
      genre: 'blues',
    }, {
      src: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg',
      genre: 'jazz',
    }, {
      src: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg',
      genre: 'rock',
    }]
  },
  {
    type: 'genre',
    genre: 'rock',
    answers: [{
      src: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Sax%2C_Rock%2C_and_Roll_%28ISRC_USUAN1100086%29.mp3',
      genre: 'rock'
    }, {
      src: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Punk_Rock_Opera_-_07_-_The_Deal.ogg',
      genre: 'blues',
    }, {
      src: 'https://upload.wikimedia.org/wikipedia/commons/5/54/Itty_Bitty_8_Bit_%28ISRC_USUAN1100764%29.mp3',
      genre: 'jazz',
    }, {
      src: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Dubstep_drop_example.ogg',
      genre: 'rock',
    }]
  },
];
