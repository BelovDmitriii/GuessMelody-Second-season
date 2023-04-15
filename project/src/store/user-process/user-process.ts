import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../consts/consts';
import UserProcess from '../../types/state';

const InitialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const UserProcess = createSlice({

});
