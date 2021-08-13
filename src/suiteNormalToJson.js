import assert from 'assert'
import { StepDefinition } from './StepDefinition'
import { TestcaseDefinition } from './TestcaseDefinition'
import { validateExecutionMode } from './validateExecutionMode'
import { SuiteDefinition } from './SuiteDefinition'

import { EXECUTION_MODE_BATCH, EXECUTION_MODE_NORMAL } from './SuiteDefinition'

/**
 * This function serializes a SuiteDefinition in to a JSON Object.
 * @param {object} suiteDefinition The SuiteDefinition to be serialized
 * @return {string} suiteDefinitionJson The Object serialized to a string
 */
export function suiteNormalToJson(suiteDefinition) {
  assert.ok(suiteDefinition, `The Parameter 'suiteDefinition' was not given`)

  const suiteJson = {
    executionMode : EXECUTION_MODE_NORMAL,
    name : suiteDefinition.name,
    tags : suiteDefinition.tags,
    steps:serializeSteps(suiteDefinition.steps),
    testcases:serializeTestcases(suiteDefinition.testcases),
  }
  return JSON.stringify(suiteJson, null, 2)
}


/**
 * Serializes the steps into the JSON format
 * @param {object} steps All the steps of the suite
 * @return {object} stepsJson The steps in JSON format
 */
function serializeSteps(steps){
  const stepsJson = {}
  for(const stepId of Object.keys(steps)){
    stepsJson[stepId] = {
      "class": steps[stepId].class,
      "name": steps[stepId].name,
      "description": steps[stepId].description,
    }
  }
  return stepsJson
}

/**
 * Serializes the test cases into the JSON format
 * @param {array} testcases All the test cases of this suite
 * @return {object} testcasesJson The test cases in JSON format
 */
function serializeTestcases(testcases){
  const testcasesJson = []
  for(const testcase of testcases){
    testcasesJson.push(
      {"name": testcase.name,
      "description": testcase.description,
      "steps": testcase.steps,
      "data": testcase.data,
    }
    )
  }
  return testcasesJson
}
