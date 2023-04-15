import { NameSpace } from '../../consts/consts';
import { Questions } from '../../types/questions';
import { State } from '../../types/state';

export const getQuestions = (state: State): Questions => state[NameSpace.data].questions;
export const getLoadedStatus = (state: State): boolean => state[NameSpace.data].isDataLoaded;
