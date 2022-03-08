import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FEATURE_FEATURE_KEY, State, featureAdapter } from './feature.reducer';

// Lookup the 'Feature' feature state managed by NgRx
export const getFeatureState =
  createFeatureSelector<State>(FEATURE_FEATURE_KEY);

export const { selectAll, selectEntities } = featureAdapter.getSelectors();

export const getFeatureLoaded = createSelector(
  getFeatureState,
  (state: State) => state.loaded
);

export const getFeatureError = createSelector(
  getFeatureState,
  (state: State) => state.error
);

export const getAllFeature = createSelector(getFeatureState, (state: State) =>
  selectAll(state)
);

export const getFeatureEntities = createSelector(
  getFeatureState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getFeatureState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getFeatureEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
