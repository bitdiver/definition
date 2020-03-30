export const EXECUTION_MODE_BATCH = 'batch'
export const EXECUTION_MODE_NORMAL = 'normal'

/**
 * This class is for defining a Suite
 */
export default class SuiteDefinition {
  constructor(opts = {}) {
    // a name for this suite
    this.name = opts.name

    // an array of tags for this suite
    this.tags = opts.tags ? opts.tags : []

    // a description for this test case
    this.description = opts.description ? opts.description : undefined

    // stores all the testcase definitions for this testcase
    this.testcases = opts.testcases ? opts.testcases : []

    // Stores all the steps of this suite by there ID
    this.steps = {}

    // if the steps are given as an array of steps
    if (opts.steps !== undefined && Array.isArray(opts.steps)) {
      for (const s of opts.steps) {
        this.steps[s.id] = s
      }
    } else if (opts.steps !== undefined) {
      this.steps = opts.steps
    }

    // In this mode all the testcases will be executed at the same time
    this.executionMode = opts.executionMode
      ? opts.executionMode
      : EXECUTION_MODE_BATCH
  }

  /**
   * Checks that all the needed properties are set
   * @return errors {array} The errors found
   */
  validate() {
    const errors = []
    // validate the suite attributes
    if (this.name === undefined) {
      errors.push({
        class: 'SuiteDefinition',
        error: `The 'name' property is not set.`,
      })
    }
    if (this.testcases.length === 0) {
      errors.push({
        class: 'SuiteDefinition',
        error: `The suite does not contain any testcases`,
      })
    }
    if (Object.keys(this.steps).length === 0) {
      errors.push({
        class: 'SuiteDefinition',
        error: `The suite does not contain any steps`,
      })
    }

    // validate the steps
    Object.keys(this.steps).forEach((id) => {
      const step = this.steps[id]
      step.validate().forEach((err) => {
        errors.push(err)
      })
    })

    // validate the testcases
    this.testcases.forEach((tc) => {
      tc.validate().forEach((err) => {
        errors.push(err)
      })
    })

    if (this.executionMode === EXECUTION_MODE_BATCH) {
      this.validateBatch().forEach((err) => {
        errors.push(err)
      })
    }

    return errors
  }

  /**
   * Validates the suite for running in batch mode. In this case the steps on each position
   * must be the same
   */
  validateBatch() {
    const errors = []

    // Take the first test case as master and iterate the steps from the first test case
    for (let i = 0; i < this.testcases[0].steps.length; i++) {
      const stepId = this.testcases[0].steps[i]
      for (let j = 1; j < this.testcases.length; j++) {
        const tc = this.testcases[j]
        if (stepId !== tc.steps[i]) {
          // validate against the master
          errors.push({
            class: 'TestcaseDefinition',
            error: `The step id must be the same as for the other testcases (The first test case is the master)`,
            steps: `${stepId} <--> ${tc.steps[i]}`,
            stepPos: `Step number ${i + 1}`,
            testcase: tc.name,
          })
        }
      }
    }
    return errors
  }
}
