'use strict'

import uuid from 'uuid'
const uuidV4 = uuid.v4

/**
 * This class is for defining a step
 */
export default class StepDefinition {
  constructor(opts = {}) {
    // The class is the name under which the implementation of this step is registered
    this.class = opts.class ? opts.class : undefined

    // a name for this step.
    this.name = opts.name ? opts.name : undefined

    // a description for this step
    this.description = opts.description ? opts.description : undefined

    // Stores the data for each test case
    this.id = uuidV4()
  }

  /**
   * Checks that all the needed properties are set
   */
  validate() {
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
