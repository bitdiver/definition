'use strict'

/**
 * This class is for defining a step
 */
export default class StepDefinition {
  constructor(opts = {}) {
    // The class is the name under which the implementation of this step is registered
    this.class = opts.class ? opts.class : undefined

    // a name for this step.
    this.name = opts.name ? opts.name : undefined

    // an array of tags fro this step
    this.tags = opts.tags ? opts.tags : []

    // a description for this step
    this.description = opts.description ? opts.description : undefined

    // Stores the data for each test case
    this.data = []
  }

  /**
   * Checks that all the needed properties are set and loads the step implementation
   */
  prepare() {
    const errors = []

    if (this.class === undefined) {
      errors.push({
        class: 'StepDefinition',
        error: `The 'class' property is not set. This is the name of the step implementation`,
        step: this.name ? this.name : this.class,
      })
    }

    if (this.name === undefined) {
      errors.push({
        class: 'StepDefinition',
        error: `The 'name' property is not set.`,
        step: this.name ? this.name : this.class,
      })
    }

    return errors
  }
}
