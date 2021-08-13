// import fs from 'fs'
// import util from 'util'
// import path from 'path'

import { suiteNormalFromJson } from '../src/index'

// const FIXTURES = path.join(__dirname, 'fixtures', 'suiteNormalFromJson')
// const readFile = util.promisify(fs.readFile)

test('no Parameter at all', async () => {
  expect(() => {
    suiteNormalFromJson()
  }).toThrow(`The Parameter 'suiteData' was not given`)
})

test('no steps', async () => {
  expect(() => {
    suiteNormalFromJson({})
  }).toThrow(`The Property 'steps' was not defined`)
})

test('no testcases', async () => {
  expect(() => {
    suiteNormalFromJson({ steps: {} })
  }).toThrow(`The Property 'testcases' was not defined`)
})

test('steps empty and testcases not an array', async () => {
  expect(() => {
    suiteNormalFromJson({ steps: {}, testcases: {} })
  }).toThrow(
    `The 'steps' property is an empty object\nThe 'testcase' property must be an Array instead of 'object'`
  )
})

test('step empty with empty class', async () => {
  expect(() => {
    suiteNormalFromJson({
      steps: {
        StepId_1: {
          // "class": "myStep1",
          name: 'Step1',
          description: 'Desc1',
        },
      },
      testcases: [],
    })
  }).toThrow(
    `For the step 'stepId' is no 'class' property defined\nThe 'testcase' property has a length of '0'`
  )
})

test('testcase empty object', async () => {
  expect(() => {
    suiteNormalFromJson({
      steps: {
        StepId_1: {
          class: 'myStep1',
          name: 'Step1',
          description: 'Desc1',
        },
      },
      testcases: [{}],
    })
  }).toThrow(`No 'name' property in the testcase with test case number '0'`)
})

test('testcase no steps property', async () => {
  expect(() => {
    suiteNormalFromJson({
      steps: {
        StepId_1: {
          class: 'myStep1',
          name: 'Step1',
          description: 'Desc1',
        },
      },
      testcases: [{ name: 'hugo' }],
    })
  }).toThrow(`No 'steps' property in the testcase with test case number '0'`)
})

test('testcase steps is not an array', async () => {
  expect(() => {
    suiteNormalFromJson({
      steps: {
        StepId_1: {
          class: 'myStep1',
          name: 'Step1',
          description: 'Desc1',
        },
      },
      testcases: [{ name: 'hugo', steps: {} }],
    })
  }).toThrow(
    `The 'steps' property ist not an Array in the testcase with test case number '0'`
  )
})

test('testcase steps has a length of zero', async () => {
  expect(() => {
    suiteNormalFromJson({
      steps: {
        StepId_1: {
          class: 'myStep1',
          name: 'Step1',
          description: 'Desc1',
        },
      },
      testcases: [{ name: 'hugo', steps: [] }],
    })
  }).toThrow(
    `The 'steps' property in the testcase has a length of '0' with test case number '0'`
  )
})

test('testcase step is not a valid step', async () => {
  expect(() => {
    suiteNormalFromJson({
      steps: {
        StepId_1: {
          class: 'myStep1',
          name: 'Step1',
          description: 'Desc1',
        },
      },
      testcases: [{ name: 'hugo', steps: ['gumbo'] }],
    })
  }).toThrow(
    `The stepId 'gumbo' in the test case number '0' does not exist as a Step`
  )
})

test('executionMode not defined', async () => {
  expect(() => {
    suiteNormalFromJson({
      steps: {
        StepId_1: {
          class: 'myStep1',
          name: 'Step1',
          description: 'Desc1',
        },
      },
      testcases: [{ name: 'hugo', steps: ['StepId_1'] }],
    })
  }).toThrow(`The property 'executionMode' is not defined`)
})

test('executionMode wrong', async () => {
  expect(() => {
    suiteNormalFromJson({
      executionMode: 'herbert',
      steps: {
        StepId_1: {
          class: 'myStep1',
          name: 'Step1',
          description: 'Desc1',
        },
      },
      testcases: [{ name: 'hugo', steps: ['StepId_1'] }],
    })
  }).toThrow(
    `The property 'executionMode' must be one of 'normal' or 'batch'. Not 'herbert'`
  )
})

test('Valid Suite', async () => {
  const suite = suiteNormalFromJson({
    executionMode: 'normal',
    steps: {
      StepId_1: {
        class: 'myStep1',
        name: 'Step1',
        description: 'Desc1',
      },
    },
    testcases: [{ name: 'hugo', steps: ['StepId_1'] }],
  })

  expect(suite).toEqual({
    description: undefined,
    executionMode: 'normal',
    name: 'unnamed suite',
    steps: {
      StepId_1: {
        class: 'myStep1',
        description: 'Desc1',
        id: 'StepId_1',
        name: 'Step1',
      },
    },
    tags: [],
    testcases: [
      {
        data: [],
        description: 'hugo',
        name: 'hugo',
        steps: ['StepId_1'],
      },
    ],
  })
})
