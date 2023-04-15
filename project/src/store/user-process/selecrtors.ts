import { AuthorizationStatus, NameSpace } from '../../consts/consts';
import { State } from '../../types/state';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.user].authorizationStatus;
