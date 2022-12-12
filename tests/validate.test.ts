import fs from 'fs'
import path from 'path'
import { SuiteDefinitionInterface, validate } from '../src/index'

const FIXTURES = path.join(__dirname, 'fixtures')

test('validate', async () => {
  const fileName = path.join(FIXTURES, 'suite_normal.json')
  const fileContent = JSON.parse(await fs.promises.readFile(fileName, 'utf8'))

  const suite: SuiteDefinitionInterface = validate(fileContent)
  expect(suite).toBeDefined()
})
