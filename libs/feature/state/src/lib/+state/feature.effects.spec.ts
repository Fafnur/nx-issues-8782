import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as FeatureActions from './feature.actions';
import { FeatureEffects } from './feature.effects';

describe('FeatureEffects', () => {
  let actions: Observable<Action>;
  let effects: FeatureEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        FeatureEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(FeatureEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: FeatureActions.init() });

      const expected = hot('-a-|', {
        a: FeatureActions.loadFeatureSuccess({ feature: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
