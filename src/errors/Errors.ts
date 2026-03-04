import { BrokenCircuitError } from './BrokenCircuitError.js';
import { BulkheadRejectedError } from './BulkheadRejectedError.js';
import { HydratingCircuitError } from './HydratingCircuitError.js';
import { IsolatedCircuitError } from './IsolatedCircuitError.js';
import { TaskCancelledError } from './TaskCancelledError.js';

export * from './BrokenCircuitError.js';
export * from './BulkheadRejectedError.js';
export * from './HydratingCircuitError.js';
export * from './IsolatedCircuitError.js';
export * from './TaskCancelledError.js';

export const isBrokenCircuitError = (e: unknown): e is BrokenCircuitError =>
  !!e && e instanceof Error && 'isBrokenCircuitError' in e;

export const isBulkheadRejectedError = (e: unknown): e is BulkheadRejectedError =>
  !!e && e instanceof Error && 'isBulkheadRejectedError' in e;

export const isIsolatedCircuitError = (e: unknown): e is IsolatedCircuitError =>
  !!e && e instanceof Error && 'isIsolatedCircuitError' in e;

export const isTaskCancelledError = (e: unknown): e is TaskCancelledError =>
  !!e && e instanceof Error && 'isTaskCancelledError' in e;

export const isHydratingCircuitError = (e: unknown): e is HydratingCircuitError =>
  !!e && e instanceof Error && 'isHydratingCircuitError' in e;
