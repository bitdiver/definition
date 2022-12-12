/**
 * Defines the structure of one single step
 */
export interface StepDefinitionInterface {
  /** The name the step is registered in the step registry */
  id: string

  /** A different name for the step used in the execution log. and used to register the step in the test case */
  name: string

  /** An additional description of the step */
  description: string
}
