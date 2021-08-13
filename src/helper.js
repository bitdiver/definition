import fs from 'fs'
import util from 'util'

import { StepDefinition } from './StepDefinition'
import { TestcaseDefinition } from './TestcaseDefinition'
import { SuiteDefinition, EXECUTION_MODE_NORMAL } from './SuiteDefinition'

const readFile = util.promisify(fs.readFile)

/**
 * Loads a suite from a file
 * @param fileName {string} The name of the suite file to load
 * @return suite {object} A suite definition
 */
export async function loadSuite(fileName) {
  const data = JSON.parse(await readFile(fileName))

  // create the steps
  const steps = []
  for (const stepId of Object.keys(data.steps)) {
    const s = data.steps[stepId]
    steps.push(new StepDefinition(s))
  }

  // create the test cases
  const testcases = []
  for (const t of data.testcases) {
    testcases.push(new TestcaseDefinition(t))
  }

  const suite = new SuiteDefinition({
    name: data.name,
    executionMode: data.executionMode,
    testcases,
    steps,
  })

  return suite
}

/**
 * Creates a random suite with execution mode = normal
 * @param tcCount {number} The count of test cases to be created
 * @param stepCount {number} The count of steps to be created
 * @param name {string} The name of the suite
 */
export function createRandomSuiteNormal(params = {}) {
  const { tcCount = 3, stepCount = 10, name = 'suite name' } = params

  const steps = createSteps({ count: stepCount })
  const testcases = createTestCases({ count: tcCount, stepCount: steps.length })

  const suite = new SuiteDefinition({
    name,
    executionMode: EXECUTION_MODE_NORMAL,
    testcases,
    steps,
  })

  return suite
}

/**
 * Creates random test cases. The data is an increasing number
 * @param count {number} The amount of test cases to create
 * @param minSteps {number} The minimum of steps in one test case
 * @param maxSteps {number} The maximum of steps in one test case
 * @param stepCount {number} The number of available steps
 * @return testCases {array} An array of test cases
 */
function createTestCases({
  count = 3,
  minSteps = 2,
  maxSteps = 10,
  stepCount,
}) {
  const testCases = []
  let dataCount = 0

  for (let i = 1; i <= count; i++) {
    // get the amount of steps for this test case
    const sc = Math.floor(Math.random() * (maxSteps - minSteps + 1)) + minSteps

    const tc = new TestcaseDefinition({
      name: `TC ${i}`,
      description: `TC Desc ${i}`,
    })
    testCases.push(tc)

    for (let j = 0; j < sc; j++) {
      dataCount++

      const stepNumber = Math.floor(Math.random() * stepCount)
      const stepId = createStepId(stepNumber + 1)

      tc.steps.push(stepId)
      tc.data.push(`data TC ${i} Step ${dataCount}`)
    }
  }

  return testCases
}

/**
 * Creates steps in the given count
 * @param count {number} The count of steps to be created
 * @param stepClassName {string} The name the step is registered in the stepRegistry
 * @return steps {array} An array of steps
 */
function createSteps({ count = 10, stepClassName = 'normal' }) {
  const steps = []
  for (let i = 1; i <= count; i++) {
    steps.push(
      new StepDefinition({
        name: `Step ${i}`,
        description: `Desc ${i}`,
        class: stepClassName,
        id: createStepId(i),
      })
    )
  }

  return steps
}

/**
 * Creates the id for a step
 * @param num {number} The step number
 * @return id {string} The step ID
 */
function createStepId(num) {
  return `StepId_${num}`
}
