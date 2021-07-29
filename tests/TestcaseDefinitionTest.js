import TestcaseDefinition from '../src/TestcaseDefinition'

test('validate: No errors', async () => {
  const testcaseDef = new TestcaseDefinition({
    name: 'my step name',
    description: 'my description',
  })

  testcaseDef.steps = ['id1', 'id2']
  testcaseDef.data = ['dat1', 'dat2']

  const errors = testcaseDef.validate()
  expect(errors.length).toBe(0)
})

test('validate: Missing name', async () => {
  const testcaseDef = new TestcaseDefinition({
    description: 'my description',
  })

  testcaseDef.steps = ['id1', 'id2']
  testcaseDef.data = ['dat1', 'dat2']

  const errors = testcaseDef.validate()
  expect(errors).toEqual([
    { class: 'TestcaseDefinition', error: "The 'name' property is not set." },
  ])
})

test('validate: Missing data', async () => {
  const testcaseDef = new TestcaseDefinition({
    name: 'my step name',
    description: 'my description',
  })

  testcaseDef.steps = ['id1', 'id2']
  // testcaseDef.data = ['dat1', 'dat2']

  const errors = testcaseDef.validate()
  expect(errors).toEqual([
    {
      class: 'TestcaseDefinition',
      error: "The 'data' property does not contain any step data",
      testcase: 'my step name',
    },
  ])
})

test('validate: Missing steps', async () => {
  const testcaseDef = new TestcaseDefinition({
    name: 'my step name',
    description: 'my description',
  })

  // testcaseDef.steps = ['id1', 'id2']
  testcaseDef.data = ['dat1', 'dat2']

  const errors = testcaseDef.validate()
  expect(errors).toEqual([
    {
      class: 'TestcaseDefinition',
      error: "The 'steps' property does not contain any step ids",
      testcase: 'my step name',
    },
  ])
})

test('validate: steps count !== data count', async () => {
  const testcaseDef = new TestcaseDefinition({
    name: 'my step name',
    description: 'my description',
  })

  testcaseDef.steps = ['id1', 'id2', 'id3']
  testcaseDef.data = ['dat1', 'dat2']

  const errors = testcaseDef.validate()
  expect(errors).toEqual([
    {
      class: 'TestcaseDefinition',
      error:
        "The 'data' property must have the same amount of entries as the 'steps' property.",
      testcase: 'my step name',
    },
  ])
})
