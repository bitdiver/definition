'use strict'

export const STEP_TYPE_NORMAL = 'normal'
export const STEP_TYPE_SINGLE = 'single'
export const STEP_TYPE_SERVER_ONLY = 'serverSingle'

/**
 * This class is for defining a Suite
 */
export default class SuiteDefinition {
  constructor(opts = {}) {
    // a name for this suite
    this.name = opts.name ? opts.name : undefined

    // an array of tags for this suite
    this.tags = opts.tags ? opts.tags : []

    // a description for this test case
    this.description = opts.description ? opts.description : undefined

    // stores all the testcase definitions for this testcase
    this.testcases = []

    this.steps = []
  }
}
