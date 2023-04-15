import { createSlice } from '@reduxjs/toolkit';
import { FIRST_GAME_STEP, NameSpace } from '../../consts/consts';
import { GameProcess } from '../../types/state';
import { isAnswerCorrect } from '../../game';

const initialState: GameProcess = {
  mistakes: 0,
  step: FIRST_GAME_STEP,
};

const STEP_COUNT = 1;

export const gameProcess = createSlice ({
  name: NameSpace.game,
  initialState,
  reducers: {
    incrementStep: (state) => {
      state.step = state.step + STEP_COUNT;
    },
    checkUserAnswer: (state, action) => {
      const {question, userAnswer} = action.payload;

      state.mistakes += Number(!isAnswerCorrect(question, userAnswer));
    },
    resetGame: (state) => {
      state.mistakes = 0;
      state.step = FIRST_GAME_STEP;
    },
  },
});

export const {incrementStep, checkUserAnswer, resetGame} = gameProcess.actions;
