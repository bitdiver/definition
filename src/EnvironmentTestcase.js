import { v4 as uuidv4 } from 'uuid'
import { STATUS_OK } from './status'

/**
 * The testcase enviroment will be created when the test starts. There is one testcase
 * environment per testcase. It could be used if steps need to provide data to other steps
 * in the same testcase
 */
export default class EnvironmentTestcase {
  constructor(opts = {}) {
    // The testcase instance id
    this.id = uuidv4()

    // The name of this testcasde
    this.name = opts.name

    // a description for this test case
    this.description = opts.description

    this._status = STATUS_OK

    // if the running is false, the status could not be changed any more
    this.running = true

    // The map is used to store the data
    this.map = new Map()

    // This is set by the runner. The number of this test case in the list of all the test cases
    // Start with '1'
    this.countCurrent = 0

    // This is set by the runner. How many test cases to be excuted in this run
    this.countAll = 0
  }

  /**
   * The status could only be changed while the testcase is running. After finishing the
   * testcase the status could not be changed any more
   * @param newStatus {number} The new status for the testcase
   */
  set status(newStatus) {
    if (this.running && newStatus > this._status) {
      this._status = newStatus
    }
  }
  get status() {
    return this._status
  }

  /**
   * Finishes this testcase
   */
  finished() {
    this.running = false
  }
}
