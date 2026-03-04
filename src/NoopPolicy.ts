import { neverAbortedSignal } from './common/abort.js';
import { ExecuteWrapper, returnOrThrow } from './common/Executor.js';
import { IDefaultPolicyContext, IPolicy } from './Policy.js';

/**
 * A no-op policy, useful for unit tests and stubs.
 */
export class NoopPolicy implements IPolicy {
  declare readonly _altReturn: never;
  private readonly executor = new ExecuteWrapper();
  public readonly onSuccess = this.executor.onSuccess;
  public readonly onFailure = this.executor.onFailure;

  public async execute<T>(
    fn: (context: IDefaultPolicyContext) => PromiseLike<T> | T,
    signal: AbortSignal = neverAbortedSignal,
  ): Promise<T> {
    return returnOrThrow(await this.executor.invoke(fn, { signal }));
  }
}
