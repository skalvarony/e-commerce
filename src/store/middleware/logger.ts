import { Middleware, Dispatch, AnyAction } from 'redux';
import { RootState } from '../store';

export const loggerMiddleware: Middleware<{}, RootState, Dispatch<AnyAction>> =
  (store) => (next) => (action) => {
    const typedAction = action as AnyAction;

    if (!typedAction.type) {
      return next(action);
    }

    console.log('type: ', typedAction.type);
    console.log('payload: ', typedAction.payload);
    console.log('currentState: ', store.getState());

    next(typedAction);

    console.log('next state: ', store.getState());
  };
