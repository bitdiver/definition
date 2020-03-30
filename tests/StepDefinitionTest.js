import StepDefinition from '../src/StepDefinition'

test('validate: No errors', async (done) => {
  const stepDef = new StepDefinition({
    class: 'my class',
    name: 'my step name',
    description: 'my description',
  })

  const errors = stepDef.validate()
  expect(errors.length).toBe(0)

  done()
})

test('validate: Name missing', async (done) => {
  const stepDef = new StepDefinition({
    class: 'my class',
    description: 'my description',
  })

  const errors = stepDef.validate()
  expect(errors).toEqual([
    {
      class: 'StepDefinition',
      error: "The 'name' property is not set.",
      step: 'my class',
    },
  ])

  done()
})

test('validate: Class missing', async (done) => {
  const stepDef = new StepDefinition({
    name: 'my step name',
    description: 'my description',
  })

  const errors = stepDef.validate()
  expect(errors).toEqual([
    {
      class: 'StepDefinition',
      error:
        "The 'class' property is not set. This is the name of the step implementation",
      step: 'my step name',
    },
  ])

  done()
})

test('create Step', async (done) => {
  const stepDef = new StepDefinition({
    name: 'my step name',
    description: 'my description',
    class: 'myClass',
    id: 'myId',
  })

  expect(stepDef).toEqual({
    class: 'myClass',
    description: 'my description',
    id: 'myId',
    name: 'my step name',
  })

  done()
})
