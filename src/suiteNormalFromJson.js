import assert from 'assert'
import { StepDefinition } from './StepDefinition'
import { TestcaseDefinition } from './TestcaseDefinition'
import { validateExecutionMode } from './validateExecutionMode'
import { SuiteDefinition } from './SuiteDefinition'

/**
 * This function creates a suite for normal execution
 * @param {object} suiteData The data to create the suite from
 * @return {object} suiteDefinition An executable suite object
 */
export function suiteNormalFromJson(suiteData) {
  assert.ok(suiteData, `The Parameter 'suiteData' was not given`)

  // create the steps
  const stepDefinitions = suiteData.steps
  const { steps, errorSteps } = createSteps(stepDefinitions)

  // create a set with all the stepIds
  const stepIdsSet = new Set()
  for (const step of steps) {
    stepIdsSet.add(step.id)
  }

  // create the test cases
  const testcaseDefinitions = suiteData.testcases
  const { testcases, errorTestcases } = createTestcases({
    testcaseDefinitions,
    stepIdsSet,
  })

  if (errorSteps.length > 0 || errorTestcases.length > 0) {
    // There where erros found, so the suite could not be created
    throw new Error([...errorSteps, ...errorTestcases].join('\n'))
  }

  validateExecutionMode(suiteData.executionMode)

  return new SuiteDefinition({
    name: suiteData.name || 'unnamed suite',
    executionMode: suiteData.executionMode,
    testcases,
    steps,
  })
}

/**
 * Create all the testcases from the testcase definition
 * @param {object} testcaseDefinitions An Object with all the test case definitions
 * @param {Set} stepIdsSet A Set with all the existing stepIds
 *
 * @return {object} result The Result of this function
 * @return {array} result.testcases Alle the steps created
 * @return {array} result.errortestcases Alle the errors encountered while creating the test cases
 */
function createTestcases({ testcaseDefinitions, stepIdsSet }) {
  assert.ok(testcaseDefinitions, `The Property 'testcases' was not defined`)
  assert.ok(stepIdsSet, `The Parameter 'stepIdsSet' was not given`)

  const errorTestcases = []
  const testcases = []
  debugger
  if (testcaseDefinitions === undefined) {
    errorTestcases.push(`The 'testcases' property does not exists`)
  } else if (!Array.isArray(testcaseDefinitions)) {
    errorTestcases.push(
      `The 'testcase' property must be an Array instead of '${typeof testcaseDefinitions}'`
    )
  } else if (testcaseDefinitions.length === 0) {
    errorTestcases.push(`The 'testcase' property has a length of '0'`)
  } else {
    // ok, start cereating the testcases
    for (let i = 0; i < testcaseDefinitions.length; i++) {
      const testcaseDefinition = testcaseDefinitions[i]
      if (testcaseDefinition.name === undefined) {
        errorTestcases.push(
          `No 'name' property in the testcase with test case number '${i}'`
        )
      } else if (testcaseDefinition.steps === undefined) {
        errorTestcases.push(
          `No 'steps' property in the testcase with test case number '${i}'`
        )
      } else if (!Array.isArray(testcaseDefinition.steps)) {
        errorTestcases.push(
          `The 'steps' property ist not an Array in the testcase with test case number '${i}'`
        )
      } else if (testcaseDefinition.steps.length === 0) {
        errorTestcases.push(
          `The 'steps' property in the testcase has a length of '0' with test case number '${i}'`
        )
      } else {
        // it seams that all is ok now. Create the Testcases
        if (testcaseDefinition.description === undefined) {
          testcaseDefinition.description = testcaseDefinition.name
        }

        // validate that all the given steps exists
        for (const stepId of testcaseDefinition.steps) {
          if (!stepIdsSet.has(stepId)) {
            errorTestcases.push(
              `The stepId '${stepId}' in the test case number '${i}' does not exist as a Step`
            )
          }
        }
        testcases.push(new TestcaseDefinition(testcaseDefinition))
      }
    }
  }
  return { testcases, errorTestcases }
}

/**
 * Creates the steps from the step definitions. The function will also check if all the
 * required properties are set. All Errors found are reporten in the 'errorSteps' object.
 * @param {object} stepDefinitions An Object with all the steps stored by there id
 * @return {object} result The Result of this function
 * @return {array} result.steps Alle the steps created
 * @return {array} result.errorSteps Alle the errors encountered while creating the steps
 */
function createSteps(stepDefinitions) {
  assert.ok(stepDefinitions, `The Property 'steps' was not defined`)

  const errorSteps = []
  const steps = []

  if (stepDefinitions === undefined) {
    errorSteps.push(`The 'steps' property does not exists`)
  } else if (typeof stepDefinitions !== 'object') {
    errorSteps.push(
      `The 'steps' property must be an object instead of '${typeof stepDefinitions}'`
    )
  } else if (!Object.keys(stepDefinitions).length > 0) {
    errorSteps.push(`The 'steps' property is an empty object`)
  } else {
    for (const stepId of Object.keys(stepDefinitions)) {
      const stepDefinition = stepDefinitions[stepId]
      if (stepDefinition.class === undefined) {
        errorSteps.push(`For the step 'stepId' is no 'class' property defined`)
      } else {
        if (stepDefinition.name === undefined) {
          stepDefinition.name = stepDefinition.class
        }
        if (stepDefinition.description === undefined) {
          stepDefinition.description = stepDefinition.name
        }
        stepDefinition.id = stepId
        steps.push(new StepDefinition(stepDefinition))
      }
    }
  }
  return { steps, errorSteps }
}
