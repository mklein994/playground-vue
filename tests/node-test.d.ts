// Experimental types for 'node:test' until '@types/node' gets updated.
// https://nodejs.org/dist/latest-v18.x/docs/api/test.html#test-runner
// TODO: delete this once @types/node gets updated.

/**
 * The node:test module facilitates the creation of JavaScript tests that report results in TAP format.
 * @experimental
 */
declare module "node:test" {
  type Awaitable<T> = T | Promise<T>;

  const defaultOptions = {
    concurrency: 1,
    only: false,
    skip: false,
    todo: false,
  };

  const defaultFn = function defaultFn<T>(): T {
    return;
  };

  type Fn = (
    context: TestContext
  ) => Promise<undefined | void> | undefined | void;
  type Fn = (
    context: TestContext,
    callback: CallableFunction
  ) => Promise<undefined | void>;

  /**
   * An instance of TestContext is passed to each test function in order to interact with the test runner. However, the TestContext constructor is not exposed as part of the API.
   */
  class TestContext {
    /**
     * This function is used to write TAP diagnostics to the output. Any diagnostic information is included at the end of the test's results. This function does not return a value.
     * @param message - Message to be displayed as a TAP diagnostic.
     */
    diagnostic(message: string): void;
    /**
     * If shouldRunOnlyTests is truthy, the test context will only run tests that have the only option set. Otherwise, all tests are run. If Node.js was not started with the --test-only command-line option, this function is a no-op.
     * @param shouldRunOnlyTests - Whether or not to run only tests.
     */
    runOnly(shouldRunOnlyTests: boolean): void;
    /**
     * This function causes the test's output to indicate the test as skipped. If message is provided, it is included in the TAP output. Calling skip() does not terminate execution of the test function. This function does not return a value.
     * @param message - Optional skip message to be displayed in TAP output.
     */
    skip(message?: string): void;
    /**
     * This function adds a TODO directive to the test's output. If message is provided, it is included in the TAP output. Calling todo() does not terminate execution of the test function. This function does not return a value.
     * @param message - Optional TODO message to be displayed in TAP output.
     */
    todo(message?: string): void;
    /**
     * This function is used to create subtests under the current test. This function behaves in the same fashion as the top level test() function.
     * @param name - This function is used to create subtests under the current test. This function behaves in the same fashion as the top level test() function.
     * @param fn - The function under test. This first argument to this function is a TestContext object. If the test uses callbacks, the callback function is passed as the second argument. Default: A no-op function.
     */
    test(name: string, fn: Fn = defaultFn): Promise<undefined>;
    test(
      name: string,
      options: TestOptions = defaultOptions,
      fn: Fn = defaultFn
    ): Promise<undefined>;
  }

  /**
   * Configuration options for the test. The following properties are supported:
   */
  interface TestOptions {
    /**
     * The number of tests that can be run at the same time. If unspecified, subtests inherit this value from their parent. Default: 1.
     */
    concurrency: number;
    /**
     * If truthy, and the test context is configured to run only tests, then this test will be run. Otherwise, the test is skipped. Default: false.
     */
    only: boolean;
    /**
     * If truthy, the test is skipped. If a string is provided, that string is displayed in the test results as the reason for skipping the test. Default: false.
     */
    skip: boolean | number;
    /**
     * If truthy, the test marked as TODO. If a string is provided, that string is displayed in the test results as the reason why the test is TODO. Default: false.
     */
    todo: boolean | string;
  }

  /**
   * The test() function is the value imported from the test module. Each invocation of this function results in the creation of a test point in the TAP output.
   *
   * The TestContext object passed to the fn argument can be used to perform actions related to the current test. Examples include skipping the test, adding additional TAP diagnostic information, or creating subtests.
   *
   * test() returns a Promise that resolves once the test completes. The return value can usually be discarded for top level tests. However, the return value from subtests should be used to prevent the parent test from finishing first and cancelling the subtest as shown in the following example.
   *
   * ```javascript
   * test('top level test', async (t) => {
   *   // The setTimeout() in the following subtest would cause it to outlive its
   *   // parent test if 'await' is removed on the next line. Once the parent test
   *   // completes, it will cancel any outstanding subtests.
   *   await t.test('longer running subtest', async (t) => {
   *     return new Promise((resolve, reject) => {
   *       setTimeout(resolve, 1000);
   *     });
   *   });
   * });
   * ```
   *
   * @param name - The name of the test, which is displayed when reporting test results. Default: The name property of fn, or '<anonymous>' if fn does not have a name.
   * @param fn - The function under test. This first argument to this function is a TestContext object. If the test uses callbacks, the callback function is passed as the second argument. Default: A no-op function.
   */
  declare function test(name: string, fn: Fn = defaultFn): Promise<undefined>;
  declare function test(
    name: string,
    options: TestOptions = defaultOptions,
    fn: Fn = defaultFn
  ): Promise<undefined>;

  export default test;
}
