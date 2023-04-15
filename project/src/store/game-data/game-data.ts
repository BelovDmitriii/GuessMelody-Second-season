import { createSlice } from '@reduxjs/toolkit';
import { GameData } from '../../types/state';
import { NameSpace } from '../../consts/consts';

const initialState: GameData = {
  questions: [],
  isDataLoaded: false,
};

export const gameData = createSlice ({
  name: NameSpace.data,
  initialState,
  reducers: {
    loadQuestions: (state, action) => {
      state.questions = action.payload;
      state.isDataLoaded = true;
    },
  },
});

export const {loadQuestions} = gameData.actions;
