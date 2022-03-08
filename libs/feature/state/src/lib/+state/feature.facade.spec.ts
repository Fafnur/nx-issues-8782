import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as FeatureActions from './feature.actions';
import { FeatureEffects } from './feature.effects';
import { FeatureFacade } from './feature.facade';
import { FeatureEntity } from './feature.models';
import {
  FEATURE_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './feature.reducer';
import * as FeatureSelectors from './feature.selectors';

interface TestSchema {
  feature: State;
}

describe('FeatureFacade', () => {
  let facade: FeatureFacade;
  let store: Store<TestSchema>;
  const createFeatureEntity = (id: string, name = ''): FeatureEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(FEATURE_FEATURE_KEY, reducer),
          EffectsModule.forFeature([FeatureEffects]),
        ],
        providers: [FeatureFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(FeatureFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allFeature$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allFeature$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadFeatureSuccess` to manually update list
     */
    it('allFeature$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allFeature$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        FeatureActions.loadFeatureSuccess({
          feature: [createFeatureEntity('AAA'), createFeatureEntity('BBB')],
        })
      );

      list = await readFirst(facade.allFeature$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
