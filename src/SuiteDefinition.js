'use strict'

export const EXECUTION_MODE_BATCH = 'batch'
export const EXECUTION_MODE_NORMAL = 'normal'

/**
 * This class is for defining a Suite
 */
export default class SuiteDefinition {
  constructor(opts = {}) {
    // a name for this suite
    this.name = opts.name ? opts.name : undefined

    // an array of tags for this suite
    this.tags = opts.tags ? opts.tags : []

    // a description for this test case
    this.description = opts.description ? opts.description : undefined

    // stores all the testcase definitions for this testcase
    this.testcases = []

    // Stores all the steps of this suite by there ID
    this.steps = {}

    // In this mode all the testcases will be executed at the same time
    this.executionMode = EXECUTION_MODE_BATCH
  }

  /**
   * Checks that all the needed properties are set
   * @return errors {array} The errors found
   */
  validate() {
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
    const errors = []
    Object.keys(this.steps).forEach(id => {
      const step = this.steps[id]
      step.validate().forEach(err => {
        errors.push(err)
      })
    })

    // validate the testcases
    this.testcases.forEach(tc => {
      tc.validate().forEach(err => {
        errors.push(err)
      })
    })

    if (this.executionMode === EXECUTION_MODE_BATCH) {
      this.validateBatch().forEach(err => {
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
    for (let i = 0; i < Object.keys(this.steps); i++) {
      let stepId
      for (let j = 0; j < this.testcases.length; j++) {
        const tc = this.testcases[j]
        if (j === 0) {
          // the first testcase defines the master step
          stepId = tc.steps[i]
        } else if (stepId !== tc.steps[i]) {
          // validate against the master
          errors.push({
            class: 'TestcaseDefinition',
            error: `The step id msut be the same as for the other testcases (The first test case is the master)`,
            testcase: tc.name ? tc.name : tc.class,
          })
        }
      }
    }
    return errors
  }
}
