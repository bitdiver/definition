import assert from 'assert'

/**
 * This registry stores all the available steps by there name.
 */
export default class StepRegistry {
  constructor() {
    this.stepMap = new Map()
  }

  /**
   * Register a class for a step by a given name
   * @param stepName {string} The name under the class will be rigistered
   * @param step {class} The class of the step
   */
  registerStep(stepName, step) {
    assert.ok(stepName, 'A step name must be provided')
    assert.ok(step, 'A step class must be provided')

    if (this.stepMap.has(stepName)) {
      // A step with the same name was already registred
      // eslint-disable-next-line no-console
      console.warn(
        `There was already a step registered with the name '${stepName}'`
      )
    }

    this.stepMap.set(stepName, step)
  }

  /**
   * Returns an instance of a step class
   * @param stepName {string} The name under the class is be rigistered
   * @return step {object} The instance of the step class
   */
  getStep(stepName) {
    assert.ok(stepName, 'A step name must be provided')

    if (!this.stepMap.has(stepName)) {
      throw new Error(
        `There was no step registered with the name '${stepName}'`
      )
    }
    const stepClass = this.stepMap.get(stepName)

    return new stepClass({ name: stepName })
  }
}
