import { StepRegistry, StepBase } from '../src/index'

test('Test that the step could be registered', () => {
  const registry = new StepRegistry()
  registry.registerStep('gumStep', StepBase)

  const step = registry.getStep('gumStep')

  expect(step.name).toEqual('gumStep')
})

test('Register to steps with the same name', () => {
  const registry = new StepRegistry()
  registry.registerStep('gumStep', StepBase)

  const step = registry.getStep('gumStep')
  expect(step.name).toEqual('gumStep')

  registry.registerStep('gumStep', GumStep)

  const step2 = registry.getStep('gumStep')
  expect(step2.name).toEqual('gumStep')
  expect(step2.myId).toEqual('otherStep')
})

test('Register try to get a step which does not exists', () => {
  const registry = new StepRegistry()
  registry.registerStep('gumStep', StepBase)

  expect(() => {
    // eslint-disable-next-line no-new
    registry.getStep('bubu')
  }).toThrow("There was no step registered with the name 'bubu'")
})

class GumStep extends StepBase {
  constructor(opts) {
    super(opts)
    this.myId = 'otherStep'
  }
}
