import SuiteDefinition from '../src/SuiteDefinition'
import { EXECUTION_MODE_NORMAL } from '../src/SuiteDefinition'
import StepDefinition from '../src/StepDefinition'
import TestcaseDefinition from '../src/TestcaseDefinition'

test('validate: No errors', async (done) => {
  const suiteDef = new SuiteDefinition({
    name: 'my step name',
    description: 'my description',
  })
  const ids = ['id1', 'id2']
  suiteDef.testcases = [getTestcase(ids)]
  addSteps(ids, suiteDef)

  const errors = suiteDef.validate()
  expect(errors.length).toBe(0)

  done()
})

test('validate: Missing name', async (done) => {
  const suiteDef = new SuiteDefinition({
    // name: 'my step name',
    description: 'my description',
  })
  const ids = ['id1', 'id2']
  suiteDef.testcases = [getTestcase(ids)]
  addSteps(ids, suiteDef)

  const errors = suiteDef.validate()
  expect(errors).toEqual([
    { class: 'SuiteDefinition', error: "The 'name' property is not set." },
  ])

  done()
})

test('validate: Missing testcases', async (done) => {
  const suiteDef = new SuiteDefinition({
    name: 'my step name',
    description: 'my description',
  })
  const ids = ['id1', 'id2']
  // suiteDef.testcases = [getTestcase(ids)]
  addSteps(ids, suiteDef)

  const errors = suiteDef.validate()
  expect(errors).toEqual([
    {
      class: 'SuiteDefinition',
      error: 'The suite does not contain any testcases',
    },
  ])

  done()
})

test('validate: Missing steps', async (done) => {
  const suiteDef = new SuiteDefinition({
    name: 'my step name',
    description: 'my description',
  })
  const ids = ['id1', 'id2']
  suiteDef.testcases = [getTestcase(ids)]
  // addSteps(ids, suiteDef)

  const errors = suiteDef.validate()
  expect(errors).toEqual([
    { class: 'SuiteDefinition', error: 'The suite does not contain any steps' },
  ])

  done()
})

test.only('validate: Different test cases have different amount of steps', async (done) => {
  const suiteDef = new SuiteDefinition({
    name: 'my step name',
    description: 'my description',
  })

  const tc1 = getTestcase(['id1', 'id2', 'id3'])
  tc1.name = 'first TC'

  const tc2 = getTestcase(['id1', 'id_', 'id3'])
  tc1.name = 'second TC'

  suiteDef.testcases = [tc1, tc2]
  addSteps(['id1', 'id2', 'id3', 'id_'], suiteDef)

  const errors = suiteDef.validate()
  expect(errors).toEqual([
    {
      class: 'TestcaseDefinition',
      error:
        'The step id must be the same as for the other testcases (The first test case is the master)',
      stepPos: 'Step number 2',
      steps: 'id2 <--> id_',
      testcase: 'my tc name',
    },
  ])

  done()
})

test.only('validate: Different test cases have different amount of steps but NOT batch mode', async (done) => {
  const suiteDef = new SuiteDefinition({
    name: 'my step name',
    description: 'my description',
  })
  suiteDef.executionMode = EXECUTION_MODE_NORMAL

  const tc1 = getTestcase(['id1', 'id2', 'id3'])
  tc1.name = 'first TC'

  const tc2 = getTestcase(['id1', 'id_', 'id3'])
  tc1.name = 'second TC'

  suiteDef.testcases = [tc1, tc2]
  addSteps(['id1', 'id2', 'id3', 'id_'], suiteDef)

  const errors = suiteDef.validate()
  expect(errors).toEqual([])

  done()
})

/**
 * Creates a default testcaseDefinition with the given step ids
 * @param ids {array} An array of step IDs
 * @return testcaseDef {object} The created testcaseDefinition object
 */
function getTestcase(ids) {
  const testcaseDef = new TestcaseDefinition({
    name: 'my tc name',
    description: 'my description',
  })

  testcaseDef.steps = ids
  testcaseDef.data = ids

  return testcaseDef
}

/**
 * Add the generated steps to the given suite
 * @param ids {array} An array of step IDs
 * @param suite {object} The suite definition the steps should be added
 */
function addSteps(ids, suite) {
  ids.forEach((id) => {
    const stepDef = new StepDefinition({
      class: 'my class',
      name: 'my step name',
      description: 'my description',
    })
    stepDef.id = id
    stepDef.name = `${stepDef.name} with id ${id}`
    suite.steps[id] = stepDef
  })
}
