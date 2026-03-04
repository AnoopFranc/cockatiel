import { expect } from 'chai';
import { expectDurations } from './Backoff.test.js';
import { DelegateBackoff } from './DelegateBackoff.js';

describe('DelegateBackoff', () => {
  it('passes through the context and sets next delay', () => {
    const b = new DelegateBackoff<number>((v: any) => v * 2);
    expect(b.next(4)!.duration).to.equal(8);
  });

  it('captures and sets delegate state', () => {
    const b = new DelegateBackoff((_: any, state: number = 3) => {
      const n = state * state;
      return { delay: n, state: n };
    });

    expectDurations(b, [9, 81, 6561, 43046721]);
  });
});
