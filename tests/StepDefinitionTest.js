import StepDefinition from '../lib/StepDefinition'

test('validate: No errors', async done => {
  const stepDef = new StepDefinition({
    class: 'my class',
    name: 'my step name',
    description: 'my description',
  })

  const errors = stepDef.validate()
  expect(errors.length).toBe(0)

  done()
})

test('validate: Name missing', async done => {
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

test('validate: Class missing', async done => {
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
