import assert from 'assert'
import { v4 as uuidv4 } from 'uuid'
import {
  getLogAdapterConsole,
  LEVEL_DEBUG,
  LEVEL_INFO,
  LEVEL_WARNING,
  LEVEL_ERROR,
  LEVEL_FATAL,
} from '@bitdiver/logadapter'

import { generateLogs } from './logHelper'

export const STEP_TYPE_NORMAL = 'normal'
export const STEP_TYPE_SINGLE = 'single'
export const STEP_TYPE_SERVER_ONLY = 'serverSingle'

// The variable name for the base data dir. All file pathes for
// step data is relative to this directory
export const DIR_BASE_DATA = 'DIR_BASE_DATA'

/**
 * The base class for a step. Later on there will be one instace of this class per step and per testcase.
 * If the step is of the type 'STEP_TYPE_SINGLE' or 'STEP_TYPE_SERVER_ONLY' Then there would be only one instance
 * for the step.
 */
export default class StepBase {
  constructor(opts = {}) {
    this.logAdapter = opts.logAdapter ? opts.logAdapter : getLogAdapterConsole()

    if (opts.type !== undefined) {
      if (
        opts.type === STEP_TYPE_NORMAL ||
        opts.type === STEP_TYPE_SINGLE ||
        opts.type === STEP_TYPE_SERVER_ONLY
      ) {
        this.type = opts.type
      } else {
        throw new Error(`The stepType '${opts.type}' is not a valid type`)
      }
    } else {
      this.type = STEP_TYPE_NORMAL
    }

    // creates a unique step instance id
    this.stepInstanceId = uuidv4()

    // A step can store information in the testcase environment. So a step could provide data
    // to other steps in the same testcase. For a single step or a server only step this is an
    // array of testcase environments
    this.environmentTestcase = undefined

    this.environmentRun = undefined

    // The name of this step
    this.name = opts.name

    // The idea of the testmode is to test the run of a step without executing it completly.
    // So the suite could be tested. This is important for long running tests
    // The mode is set by the runner
    this.testMode = false

    // Normaly a step will only be executed if there is data defined for the testcase.
    // but some steps do not need any data. Then this must be set to false.
    this.needData = true
    if (opts.needData !== undefined) {
      this.needData = opts.needData
    }

    // Stores the data for the current testcase. If it is a single step then this is an array
    // of data.
    this.data = undefined

    // This is set by the runner. The number of this stepin the list of all the steps
    // Start with '1'
    this.countCurrent = 0

    // This is set by the runner. How many steps to be excuted in this run
    this.countAll = 0

    // If this is set to true, the step will executed even if the testcase is already failed
    // This is important for cleanup steps, for Example.
    this.runOnError = opts.runOnError !== undefined ? opts.runOnError : false

    // Allows to define how many parallel exection are possible on a per step basis.
    // This value is normaly defined in the runner, but when given here it will overwrite
    // the runner if this value is less
    this.maxParallelSteps = opts.maxParallelSteps
  }

  /**
   * First the start method will be called for all the step instances of the step
   * @return promise {promise} A promise to signal that the method is finished
   */
  start() {
    return Promise.resolve()
  }

  /**
   * This method will be called just before the run method
   * @return promise {promise} A promise to signal that the method is finished
   */
  beforeRun() {
    return Promise.resolve()
  }

  /**
   * This method is doing the work
   * @return promise {promise} A promise to signal that the method is finished
   */
  run() {
    return Promise.resolve()
  }

  /**
   * This method will be called just after the run is finished
   * This method will be called even if the run method has failed
   * @return promise {promise} A promise to signal that the method is finished
   */
  afterRun() {
    return Promise.resolve()
  }

  /**
   * This method will be called when all the step instances of this step are finished
   * @return promise {promise} A promise to signal that the method is finished
   */
  end() {
    return Promise.resolve()
  }

  /**
   * Logs a debug message.
   * @param options {string/object} The message to log or the properties
   * @param environmentTestcase {object} The testcase environment. If given the log
   * will only be written for this testcase. If not the log will be written for all the
   * testcases
   * @return promise {promise} Indicating that the message was written
   */
  logDebug(options, environmentTestcase) {
    assert.ok(options, 'No log message given')
    return this._log(options, LEVEL_DEBUG, environmentTestcase)
  }

  /**
   * Logs a info message.
   * @param options {string/object} The message to log or the properties
   * @param environmentTestcase {object} The testcase environment. If given the log
   * will only be written for this testcase. If not the log will be written for all the
   * @return promise {promise} Indicating that the message was written
   */
  logInfo(options, environmentTestcase) {
    assert.ok(options, 'No log message given')
    return this._log(options, LEVEL_INFO, environmentTestcase)
  }

  /**
   * Logs a warning message.
   * @param options {string/object} The message to log or the properties
   * @param environmentTestcase {object} The testcase environment. If given the log
   * will only be written for this testcase. If not the log will be written for all the
   * @return promise {promise} Indicating that the message was written
   */
  logWarning(options, environmentTestcase) {
    assert.ok(options, 'No log message given')
    return this._log(options, LEVEL_WARNING, environmentTestcase)
  }

  /**
   * Logs a error message.
   * Error normaly means that the testcase gots an error
   * @param options {string/object} The message to log or the properties
   * @param environmentTestcase {object} The testcase environment. If given the log
   * will only be written for this testcase. If not the log will be written for all the
   * @return promise {promise} Indicating that the message was written
   */
  logError(options, environmentTestcase) {
    assert.ok(options, 'No log message given')
    return this._log(options, LEVEL_ERROR, environmentTestcase)
  }

  /**
   * Logs a fatal message.
   * Fatal normaly means that the complete test run needs to be stopped
   * @param options {string/object} The message to log or the properties
   * @param environmentTestcase {object} The testcase environment. If given the log
   * will only be written for this testcase. If not the log will be written for all the
   * @return promise {promise} Indicating that the message was written
   */
  logFatal(options, environmentTestcase) {
    assert.ok(options, 'No log message given')
    return this._log(options, LEVEL_FATAL, environmentTestcase)
  }

  /**
   * Calls the logger with the given messageObj.
   * If this is a single step the log will be written for each testcase environment
   * @param messageObj {object|string} Either a message or a json object to be logged
   * @param logLevel {string} The loglevel to be used
   * @param environmentTestcase {object} The testcase environment. If given the log
   * will only be written for this testcase. If not the log will be written for all the
   * @return promise {promise} Indicating that the message was written
   */
  _log(
    messageObj,
    logLevel = LEVEL_INFO,
    environmentTestcase = this.environmentTestcase
  ) {
    assert.ok(messageObj, 'No log message given')

    return generateLogs(
      this.environmentRun,
      environmentTestcase,
      this.logAdapter,
      messageObj,
      logLevel,
      this
    )
  }
}
