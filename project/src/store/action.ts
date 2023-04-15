import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../consts/consts';

export const redirectToRoute = createAction<AppRoute>('game/redirectToRoute');
