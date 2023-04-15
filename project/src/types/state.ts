import { store } from '../store/index';
import { AuthorizationStatus } from '../consts/consts';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
