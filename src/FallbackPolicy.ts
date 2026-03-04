import { neverAbortedSignal } from './common/abort.js';
import { ExecuteWrapper } from './common/Executor.js';
import { IDefaultPolicyContext, IPolicy } from './Policy.js';

export class FallbackPolicy<AltReturn> implements IPolicy<IDefaultPolicyContext, AltReturn> {
  declare readonly _altReturn: AltReturn;

  /**
   * @inheritdoc
   */
  public get onSuccess() {
    return this.executor.onSuccess;
  }

  /**
   * @inheritdoc
   */
  public get onFailure() {
    return this.executor.onFailure;
  }

  constructor(
    private readonly executor: ExecuteWrapper,
    private readonly value: () => AltReturn,
  ) {}

  /**
   * Executes the given function.
   * @param fn Function to execute.
   * @returns The function result or fallback value.
   */
  public async execute<T>(
    fn: (context: IDefaultPolicyContext) => PromiseLike<T> | T,
    signal = neverAbortedSignal,
  ): Promise<T | AltReturn> {
    const result = await this.executor.invoke(fn, { signal });
    if ('success' in result) {
      return result.success;
    }

    return this.value();
  }
}
