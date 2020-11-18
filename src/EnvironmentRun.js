import { v4 as uuidv4 } from 'uuid'
import { STATUS_OK } from './status'
/**
 * The run enviroment will be created when a new run starts

 */
export default class EnvironmentRun {
  constructor(opts = {}) {
    // The run id
    this.id = uuidv4()

    // The name of the suite
    this.name = opts.name

    // The status of the complete run
    this._status = STATUS_OK

    // The description of the suite
    this.description = opts.description

    this.startTime = Date.now()

    // The map is used to store the data
    this.map = new Map()
  }

  /**
   * The status could only be changed while the testcase is running. After finishing the
   * testcase the status could not be changed any more
   * @param newStatus {number} The new status for the testcase
   */
  set status(newStatus) {
    if (newStatus > this._status) {
      this._status = newStatus
    }
  }

  get status() {
    return this._status
  }
}
