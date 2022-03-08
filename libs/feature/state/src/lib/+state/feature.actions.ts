import { createAction, props } from '@ngrx/store';
import { FeatureEntity } from './feature.models';

export const init = createAction('[Feature Page] Init');

export const loadFeatureSuccess = createAction(
  '[Feature/API] Load Feature Success',
  props<{ feature: FeatureEntity[] }>()
);

export const loadFeatureFailure = createAction(
  '[Feature/API] Load Feature Failure',
  props<{ error: any }>()
);
