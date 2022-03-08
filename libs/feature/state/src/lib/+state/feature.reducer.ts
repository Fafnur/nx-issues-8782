import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as FeatureActions from './feature.actions';
import { FeatureEntity } from './feature.models';

export const FEATURE_FEATURE_KEY = 'feature';

export interface State extends EntityState<FeatureEntity> {
  selectedId?: string | number; // which Feature record has been selected
  loaded: boolean; // has the Feature list been loaded
  error?: string | null; // last known error (if any)
}

export interface FeaturePartialState {
  readonly [FEATURE_FEATURE_KEY]: State;
}

export const featureAdapter: EntityAdapter<FeatureEntity> =
  createEntityAdapter<FeatureEntity>();

export const initialState: State = featureAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const featureReducer = createReducer(
  initialState,
  on(FeatureActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(FeatureActions.loadFeatureSuccess, (state, { feature }) =>
    featureAdapter.setAll(feature, { ...state, loaded: true })
  ),
  on(FeatureActions.loadFeatureFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return featureReducer(state, action);
}
