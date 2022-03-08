import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as FeatureActions from './feature.actions';
import * as FeatureFeature from './feature.reducer';
import * as FeatureSelectors from './feature.selectors';

@Injectable()
export class FeatureFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(FeatureSelectors.getFeatureLoaded));
  allFeature$ = this.store.pipe(select(FeatureSelectors.getAllFeature));
  selectedFeature$ = this.store.pipe(select(FeatureSelectors.getSelected));

  constructor(private readonly store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(FeatureActions.init());
  }
}
