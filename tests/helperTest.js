import fs from 'fs'
import util from 'util'
import path from 'path'

import { loadSuite, createRandomSuiteNormal } from '../src/index'

const FIXTURES = path.join(__dirname, 'fixtures')
const readFile = util.promisify(fs.readFile)

test('loadSuite', async (done) => {
  const suiteFileLoad = path.join(FIXTURES, 'suite_normal.json')
  const expected = await readFile(suiteFileLoad, 'utf-8')
  const suiteDef = await loadSuite(suiteFileLoad)
  const res = JSON.stringify(suiteDef, null, 2)
  expect(res).toEqual(expected)
  done()
})

test('createRandomSuiteNormal', async (done) => {
  const suiteDefinition = createRandomSuiteNormal()
  const errors = suiteDefinition.validate()
  expect(errors).toEqual([])
  done()
})
