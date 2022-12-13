import { StepDefinitionInterface } from './interfaceStepDefinition'
import { TestcaseDefinitionInterface } from './interfaceTestcaseDefinition'

export const EXECUTION_MODE_BATCH = 'batch'
export const EXECUTION_MODE_NORMAL = 'normal'

export type ExecutionModeType = 'batch' | 'normal'

export interface SuiteDefinitionInterface {
  /** The name of this suite */
  name: string

  /** An optional description for the suite */
  description?: string

  /** String tags for filtering results */
  tags?: string[]

  /**
   * The name used to store the step here step.name.
   * It is used to reference the step from the testcase
   */
  steps: { [key: string]: StepDefinitionInterface }

  /**
   * The list of testcases to be executed in the right order
   */
  testcases: TestcaseDefinitionInterface[]

  executionMode: ExecutionModeType
}
