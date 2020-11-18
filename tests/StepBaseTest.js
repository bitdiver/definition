import {
  StepBase,
  EnvironmentRun,
  EnvironmentTestcase,
  STEP_TYPE_NORMAL,
  STEP_TYPE_SINGLE,
  STEP_TYPE_SERVER_ONLY,
} from '../src/index'

import { getLogAdapterMemory } from '@bitdiver/logadapter'

const logAdapterMemory = getLogAdapterMemory({ logLevel: 'debug' })

test('Logging: debug', () => {
  const step = getStep()
  step.logDebug('myDebug')
  expect(logAdapterMemory.logs).toEqual({
    myRunId: {
      logs: [],
      testcases: {
        myTcName: {
          countAll: 12,
          countCurrent: 2,
          logs: [],
          steps: {
            myStep: {
              logs: [
                {
                  countCurrent: 3,
                  countAll: 15,
                  data: { message: 'myDebug' },
                  logLevel: 'debug',
                },
              ],
            },
          },
        },
      },
    },
  })
})

test('Logging: info', () => {
  const step = getStep()
  step.logInfo('myInfo')
  expect(logAdapterMemory.logs).toEqual({
    myRunId: {
      logs: [],
      testcases: {
        myTcName: {
          countAll: 12,
          countCurrent: 2,
          logs: [],
          steps: {
            myStep: {
              logs: [
                {
                  countCurrent: 3,
                  countAll: 15,
                  data: { message: 'myInfo' },
                  logLevel: 'info',
                },
              ],
            },
          },
        },
      },
    },
  })
})

test('Logging: warning', () => {
  const step = getStep()
  step.logWarning('myError')
  expect(logAdapterMemory.logs).toEqual({
    myRunId: {
      logs: [],
      testcases: {
        myTcName: {
          countAll: 12,
          countCurrent: 2,
          logs: [],
          steps: {
            myStep: {
              logs: [
                {
                  countCurrent: 3,
                  countAll: 15,
                  data: { message: 'myError' },
                  logLevel: 'warning',
                },
              ],
            },
          },
        },
      },
    },
  })
})

test('Logging: error', () => {
  const step = getStep()
  step.logError('myError')
  expect(logAdapterMemory.logs).toEqual({
    myRunId: {
      logs: [],
      testcases: {
        myTcName: {
          countAll: 12,
          countCurrent: 2,
          logs: [],
          steps: {
            myStep: {
              logs: [
                {
                  countCurrent: 3,
                  countAll: 15,
                  data: { message: 'myError' },
                  logLevel: 'error',
                },
              ],
            },
          },
        },
      },
    },
  })
})

test('Logging: fatal', () => {
  const step = getStep()
  step.logFatal('myError')
  expect(logAdapterMemory.logs).toEqual({
    myRunId: {
      logs: [],
      testcases: {
        myTcName: {
          countAll: 12,
          countCurrent: 2,
          logs: [],
          steps: {
            myStep: {
              logs: [
                {
                  countCurrent: 3,
                  countAll: 15,
                  data: { message: 'myError' },
                  logLevel: 'fatal',
                },
              ],
            },
          },
        },
      },
    },
  })
})

test('Create step needData = false', () => {
  const step = new StepBase({ needData: false })
  expect(step.needData).toEqual(false)
})
test('Create step needData = undefined', () => {
  const step = new StepBase()
  expect(step.needData).toEqual(true)
})

test('Create step runOnError = true', () => {
  const step = new StepBase({ runOnError: true })
  expect(step.runOnError).toEqual(true)
})
test('Create step runOnError = undefined', () => {
  const step = new StepBase()
  expect(step.runOnError).toEqual(false)
})

test('Create step type = undefined', () => {
  const step = new StepBase()
  expect(step.type).toEqual('normal')
})

test('Create step type = STEP_TYPE_SINGLE', () => {
  const step = new StepBase({ type: STEP_TYPE_SINGLE })
  expect(step.type).toEqual('single')
})

test('Create step type = STEP_TYPE_SERVER_ONLY', () => {
  const step = new StepBase({ type: STEP_TYPE_SERVER_ONLY })
  expect(step.type).toEqual('serverSingle')
})

test('Create step type = STEP_TYPE_NORMAL', () => {
  const step = new StepBase({ type: STEP_TYPE_NORMAL })
  expect(step.type).toEqual('normal')
})

test('Create step invalid type', () => {
  expect(() => {
    // eslint-disable-next-line no-new
    new StepBase({ type: 'gum' })
  }).toThrow("The stepType 'gum' is not a valid type")
})

test('make coverage report lucky', async () => {
  const step = new StepBase({ type: STEP_TYPE_NORMAL })
  await step.start()
  await step.beforeRun()
  await step.run()
  await step.afterRun()
  await step.end()
})

function getStep() {
  logAdapterMemory.reset()
  const step = new StepBase({ logAdapter: logAdapterMemory })
  const envRun = new EnvironmentRun()
  envRun.id = 'myRunId'
  const envTc = new EnvironmentTestcase()
  envTc.countCurrent = 2
  envTc.countAll = 12
  envTc.name = 'myTcName'
  step.environmentRun = envRun
  step.environmentTestcase = envTc
  step.name = 'myStep'
  step.countCurrent = 3
  step.countAll = 15
  return step
}
