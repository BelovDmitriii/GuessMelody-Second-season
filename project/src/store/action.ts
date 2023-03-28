import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus } from '../consts/consts';
import { UserAnswer, Question, Questions } from '../types/questions';

export const incrementStep = createAction('game/incrementStep');
export const checkUserAnswer = createAction<{question: Question; userAnswer: UserAnswer}>('game/checkUserAnswer');
export const resetGame = createAction('game/reset');
export const loadQuestions = createAction<Questions>('data/loadQuestions');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const redirectToRoute = createAction<AppRoute>('game/redirectToRoute');
