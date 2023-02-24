import { createAction } from '@reduxjs/toolkit';
import { UserAnswer, Question } from '../types/questions';

export const incrementStep = createAction('game/incrementStep');
export const checkUserAnswer = createAction<{question: Question; userAnswer: UserAnswer}>('game/checkUserAnswer');
export const resetGame = createAction('game/reset');
