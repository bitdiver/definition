'use strict'

/**
 * This class is for defining a step
 */
export default class TestcaseDefinition {
  constructor(opts = {}) {
    // a name for this test case.
    this.name = opts.name ? opts.name : undefined

    // an array of tags fro this step
    this.tags = opts.tags ? opts.tags : []

    // a description for this test case
    this.description = opts.description ? opts.description : undefined

    // The ids of the step definitions
    this.steps = []

    // all the data for this testcase. One entry for each step
    this.data = []
  }

  /**
   * Checks that all the needed properties are set
   */
  validate() {
    const errors = []

    if (this.name === undefined) {
      errors.push({
        class: 'TestcaseDefinition',
        error: `The 'name' property is not set.`,
        testcase: this.name ? this.name : this.class,
      })
    }

    return errors
  }
}
