import { expectDurations } from './Backoff.test.js';
import { ConstantBackoff } from './ConstantBackoff.js';

describe('ConstantBackoff', () => {
  it('returns its duration', () => {
    expectDurations(new ConstantBackoff(42), [42, 42, 42]);
  });
});
