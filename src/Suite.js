import fs from 'fs'
import util from 'util'
import assert from 'assert'

import { EXECUTION_MODE_BATCH, EXECUTION_MODE_NORMAL } from './SuiteDefinition'
import { suiteNormalFromJson } from './suiteNormalFromJson'
import { suiteBatchFromJson } from './suiteBatchFromJson'

const readFile = util.promisify(fs.readFile)

export class Suite {
  /**
   * Creates a sute from a json file. Depending on the 'executionMode' property
   * either a suite for batch execution or normal execution will be created. This suite
   * could be executed by the runner.
   *
   * @param {string} fileName The name of the file to read from
   * @return {object} suiteDefinition An executable Suite object
   */
  static async fromJsonFile(fileName) {
    assert.ok(fileName, `The Parameter 'fileName' was not given`)
    try {
      const suiteData = JSON.parse(await readFile(fileName))
      if (suiteData.executionMode === undefined) {
        console.log(
          `The property 'executionMode' is not defined in the file '${fileName}'`
        )
      } else if (suiteData.executionMode === EXECUTION_MODE_NORMAL) {
        return suiteNormalFromJson(suiteData)
      } else if (suiteData.executionMode === EXECUTION_MODE_BATCH) {
        return suiteBatchFromJson(suiteData)
      } else {
        console.log(
          `The property 'executionMode' must be one of '${EXECUTION_MODE_NORMAL}' or '${EXECUTION_MODE_BATCH}'. Not '${suiteData.executionMode}'`
        )
      }
    } catch (e) {
      console.log(
        `Error while reading or parsing file '${fileName}':\n e.message`
      )
    }
  }
}
