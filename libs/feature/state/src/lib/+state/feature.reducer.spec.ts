import { Action } from '@ngrx/store';

import * as FeatureActions from './feature.actions';
import { FeatureEntity } from './feature.models';
import { State, initialState, reducer } from './feature.reducer';

describe('Feature Reducer', () => {
  const createFeatureEntity = (id: string, name = ''): FeatureEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Feature actions', () => {
    it('loadFeatureSuccess should return the list of known Feature', () => {
      const feature = [
        createFeatureEntity('PRODUCT-AAA'),
        createFeatureEntity('PRODUCT-zzz'),
      ];
      const action = FeatureActions.loadFeatureSuccess({ feature });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
