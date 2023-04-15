import browserHistory from '../../browser-history' ;
import {Middleware} from 'redux';
import { rootReducer } from '../root-reducer';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (action.type === 'game/redirectToRoute') {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
          browserHistory.push(action.payload);
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return next(action);
      };
