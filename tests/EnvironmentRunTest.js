import { EnvironmentRun, STATUS_OK, STATUS_WARNING } from '../src/index'

test('EnvironmentRun: default status', () => {
  const env = new EnvironmentRun()
  expect(env.status).toEqual(STATUS_OK)
})

test('EnvironmentRun: set status', () => {
  const env = new EnvironmentRun()
  env.status = STATUS_WARNING
  expect(env.status).toEqual(STATUS_WARNING)
})

test('EnvironmentRun: can not set status to better value as before.', () => {
  const env = new EnvironmentRun()
  env.status = STATUS_WARNING
  expect(env.status).toEqual(STATUS_WARNING)
  env.status = STATUS_OK
  expect(env.status).toEqual(STATUS_WARNING)
})
