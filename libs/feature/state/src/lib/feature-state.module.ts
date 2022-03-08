import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromFeature from './+state/feature.reducer';
import { FeatureEffects } from './+state/feature.effects';
import { FeatureFacade } from './+state/feature.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromFeature.FEATURE_FEATURE_KEY,
      fromFeature.reducer
    ),
    EffectsModule.forFeature([FeatureEffects]),
  ],
  providers: [FeatureFacade],
})
export class FeatureStateModule {}
