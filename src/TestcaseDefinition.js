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
  }

  /**
   * Checks that all the needed properties are set and loads the step implementation
   */
  prepare() {
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
