import { createReducer } from '@reduxjs/toolkit';
import { incrementStep, resetGame, checkUserAnswer, loadQuestions, requireAuthorization, setError } from './action';
import { AuthorizationStatus, FIRST_GAME_STEP } from '../consts/consts';
import { isAnswerCorrect } from '../game';
import { Questions } from '../types/questions';

const STEP_COUNT = 1;

type InitialState = {
  mistakes: number;
  step: number;
  questions: Questions;
  authorizationStatus: AuthorizationStatus;
  error: string;
  isDataLoaded: boolean;
};

const initialState:InitialState = {
  mistakes: 0,
  step: FIRST_GAME_STEP,
  questions: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  error: '',
  isDataLoaded: false,
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
    })
    .addCase(loadQuestions, (state, action) => {
      state.questions = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export {reducer};
