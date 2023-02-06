import { Questions } from '../types/questions';

const AVATAR_URL = 'https://i.pravatar.cc/456';

export const questions: Questions = [
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
  }, {
    type: 'artist',
    song: {
      artist: 'Jim Beam',
      src: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Beethoven_Moonlight_3rd_movement.ogg',
    },
    answers: [{
      picture: `${AVATAR_URL}?rnd=${Math.random()}`,
      artist: 'John Snow',
    }, {
      picture: `${AVATAR_URL}?rnd=${Math.random()}`,
      artist: 'Jack Daniels',
    }, {
      picture: `${AVATAR_URL}?rnd=${Math.random()}`,
      artist: 'Jim Beam',
    },]
  }, {
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
  },{
    type: 'artist',
    song: {
      artist: 'Super Puper',
      src: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Take_the_Lead_%28ISRC_USUAN1100695%29.mp3',
    },
    answers: [{
      picture: `${AVATAR_URL}?rnd=${Math.random()}`,
      artist: 'John Snow',
    }, {
      picture: `${AVATAR_URL}?rnd=${Math.random()}`,
      artist: 'Jack Daniels',
    }, {
      picture: `${AVATAR_URL}?rnd=${Math.random()}`,
      artist: 'Jim Beam',
    },]
  }, {
    type: 'artist',
    song: {
      artist: 'Dimka Belov',
      src: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Pick_and_finger_dynamics_with_a_tube_overdrive_%28electric_guitar%2C_single_coil%29.ogg',
    },
    answers: [{
      picture: `${AVATAR_URL}?rnd=${Math.random()}`,
      artist: 'John Snow',
    }, {
      picture: `${AVATAR_URL}?rnd=${Math.random()}`,
      artist: 'Jack Daniels',
    }, {
      picture: `${AVATAR_URL}?rnd=${Math.random()}`,
      artist: 'Jim Beam',
    },]
  },
];
