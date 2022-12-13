/**
 * Defines one single testcase in the suite
 */
export interface TestcaseDefinitionInterface {
  /** The name of the testcase */
  name: string

  /** String tags for filtering results */
  tags?: string[]

  /** A description of this testcase */
  description?: string

  /** The step names to be executed for this test case in the right order */
  steps: string[]

  /**
   * The data for each step of this test case.
   * The order of the stepIds and data corresponds to each other
   * For each entry in the 'steps' property must be one entry in the
   * 'data' array. If a step do not need any data then a null must be there
   **/
  data: any[]
}
