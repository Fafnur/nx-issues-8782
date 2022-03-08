import { FeatureEntity } from './feature.models';
import {
  featureAdapter,
  FeaturePartialState,
  initialState,
} from './feature.reducer';
import * as FeatureSelectors from './feature.selectors';

describe('Feature Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getFeatureId = (it: FeatureEntity) => it.id;
  const createFeatureEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as FeatureEntity);

  let state: FeaturePartialState;

  beforeEach(() => {
    state = {
      feature: featureAdapter.setAll(
        [
          createFeatureEntity('PRODUCT-AAA'),
          createFeatureEntity('PRODUCT-BBB'),
          createFeatureEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Feature Selectors', () => {
    it('getAllFeature() should return the list of Feature', () => {
      const results = FeatureSelectors.getAllFeature(state);
      const selId = getFeatureId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = FeatureSelectors.getSelected(state) as FeatureEntity;
      const selId = getFeatureId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getFeatureLoaded() should return the current "loaded" status', () => {
      const result = FeatureSelectors.getFeatureLoaded(state);

      expect(result).toBe(true);
    });

    it('getFeatureError() should return the current "error" state', () => {
      const result = FeatureSelectors.getFeatureError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
