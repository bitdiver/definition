import { StepDefinitionInterface } from './interfaceStepDefinition'
import { TestcaseDefinitionInterface } from './interfaceTestcaseDefinition'

export interface SuiteDefinitionInterface {
  /** The name of this suite */
  name: string

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

  executionMode: 'normal' | 'batch'
}
