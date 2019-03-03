/**
 * This class is for defining a step
 */
export default class TestcaseDefinition {
  constructor(opts = {}) {
    // a name for this test case.
    this.name = opts.name ? opts.name : undefined

    // a description for this test case
    this.description = opts.description ? opts.description : undefined

    // The ids of the step definitions
    this.steps = opts.steps ? opts.steps : []

    // all the data for this testcase. One entry for each step
    // This could be an array or an object
    this.data = opts.data ? opts.data : []
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
      })
    }

    if (this.steps === undefined || this.steps.length === 0) {
      errors.push({
        class: 'TestcaseDefinition',
        error: `The 'steps' property does not contain any step ids`,
        testcase: this.name,
      })
    }

    if (this.data === undefined || this.data.length === 0) {
      errors.push({
        class: 'TestcaseDefinition',
        error: `The 'data' property does not contain any step data`,
        testcase: this.name,
      })
    }

    if (
      this.steps.length > 0 &&
      this.data.length > 0 &&
      this.steps.length !== this.data.length
    ) {
      errors.push({
        class: 'TestcaseDefinition',
        error: `The 'data' property must have the same amount of entries as the 'steps' property.`,
        testcase: this.name,
      })
    }

    return errors
  }
}
