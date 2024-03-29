import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../store';
import { store } from '../store';
import { Questions } from '../types/questions';
import { redirectToRoute } from './action';
import { loadQuestions } from './game-data/game-data';
import { requireAuthorization } from './user-process/user-process';
import { APIRoute, AuthorizationStatus, AppRoute } from '../consts/consts';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';
import { errorHandle } from '../services/error-handle';

export const fetchQuestionAction = createAsyncThunk(
  'data/fetchQuestions',
  async () => {
    try{
      const {data} = await api.get<Questions>(APIRoute.Questions);
      store.dispatch(loadQuestions(data));
    } catch (error){
      errorHandle(error);
    }
  },
);

export const checkAuthAction = createAsyncThunk(
  'user/checkAuth',
  async () => {
    try{
      await api.get(APIRoute.Login);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch(error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk(
  'user/login',
  async ({login: email, password}: AuthData) => {
    try{
      const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(token);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
      store.dispatch(redirectToRoute(AppRoute.Result));
    } catch(error){
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk(
  'user/logout',
  async() => {
    try{
      await api.delete(APIRoute.Logout);
      dropToken();
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    } catch (error){
      errorHandle(error);
    }
  },
);
