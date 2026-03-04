import { expectDurations } from './Backoff.test.js';
import { IterableBackoff } from './IterableBackoff.js';

describe('IterableBackoff', () => {
  it('works', () => {
    const b = new IterableBackoff([3, 6, 9]);
    expectDurations(b, [3, 6, 9, 9]);
  });
});
