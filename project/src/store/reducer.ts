import { createReducer } from '@reduxjs/toolkit';
import { incrementStep, resetGame, checkUserAnswer } from './action';
import { FIRST_GAME_STEP } from '../consts/consts';
import { isAnswerCorrect } from '../game';

const STEP_COUNT = 1;

const initialState = {
  mistakes: 0,
  step: FIRST_GAME_STEP,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(incrementStep, (state) => {
      state.step = state.step + STEP_COUNT;
    })
    .addCase(checkUserAnswer, (state, action) => {
      const {question, userAnswer} = action.payload;
      state.mistakes += Number(!isAnswerCorrect(question, userAnswer));
    })
    .addCase(resetGame, (state) => {
      state.step = FIRST_GAME_STEP;
      state.mistakes = 0;
    });
});

export {reducer};
