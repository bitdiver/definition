/**
 * This function generates the log message as needed by the logadapter
 * and calls it. This method is extracted from the step because of reuse
 * in the runner
 * @param environmentRun {object} The run environment
 * @param environmentTestcase {object/array} The testcase environment. For single steps this is an array
 * @param logAdapter {object} The real logAdapter
 * @param messageObj {string/object} The message to log
 * @param logLevel {string} The log level
 * @param step {string} If this is a step log, the step instance
 * @return promise {promise} The return of the logger
 */
export function generateLogs(
  environmentRun,
  environmentTestcase,
  logAdapter,
  messageObj,
  logLevel,
  step
) {
  // The base data object
  let data = {}

  if (messageObj instanceof Error) {
    data = {
      message: messageObj.message,
      stack: messageObj.stack,
    }
  } else if (typeof messageObj === 'string') {
    data = { message: messageObj }
  } else {
    data = messageObj
  }

  const meta = {
    run: {
      start: environmentRun.startTime,
      id: environmentRun.id,
      name: environmentRun.name,
    },
    time: Date.now(),
  }

  if (step !== undefined) {
    meta.step = {
      countCurrent: step.countCurrent,
      countAll: step.countAll,
      id: step.stepInstanceId,
      name: step.name,
      type: step.type,
    }
  }
  const promises = []
  if (environmentTestcase !== undefined) {
    // ----------------------------------------------
    // For a normal step the log will be written just once
    // ----------------------------------------------
    if (!Array.isArray(environmentTestcase)) {
      meta.tc = {
        countAll: environmentTestcase.countAll,
        countCurrent: environmentTestcase.countCurrent,
        id: environmentTestcase.id,
        name: environmentTestcase.name,
      }
      promises.push(
        logAdapter.log({
          data,
          meta,
          logLevel,
        })
      )
    } else {
      // ----------------------------------------------
      // For Single step the log will be written for each testcase environment
      // ----------------------------------------------

      for (const tcEnv of environmentTestcase) {
        meta.tc = {
          countAll: tcEnv.countAll,
          countCurrent: tcEnv.countCurrent,
          id: tcEnv.id,
          name: tcEnv.name,
        }
        promises.push(
          logAdapter.log({
            data,
            meta,
            logLevel,
          })
        )
      }
    }
  } else {
    promises.push(
      logAdapter.log({
        data,
        meta,
        logLevel,
      })
    )
  }

  return Promise.all(promises)
}
