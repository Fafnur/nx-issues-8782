import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as FeatureActions from './feature.actions';
import { Store } from '@ngrx/store';
import { getFeatureEntities } from '@sample/feature/state';

@Injectable()
export class FeatureEffects {
  // Working example
  initWithHack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeatureActions.init),
      concatLatestFrom(() => this.store.select(getFeatureEntities)),
      fetch({
        id: (action, features) => 'my-id',
        run: (action, features) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return FeatureActions.loadFeatureSuccess({ feature: [] });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return FeatureActions.loadFeatureFailure({ error });
        },
      })
    )
  );

  // Non-working example
  initWithError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeatureActions.init),
      concatLatestFrom(() => this.store.select(getFeatureEntities)),
      fetch({
        id: () => 'my-id',
        run: (action, features) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return FeatureActions.loadFeatureSuccess({ feature: [] });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return FeatureActions.loadFeatureFailure({ error });
        },
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store
  ) {}
}
