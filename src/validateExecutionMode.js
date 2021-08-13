import { EXECUTION_MODE_BATCH, EXECUTION_MODE_NORMAL } from './SuiteDefinition'

/**
 * Validiert das Property executionMode
 * @param {string} executionMode Der zu überprüfende executionMode
 * @throws {error} If the Execution mode ist not valid
 * @returns {void}
 */
export function validateExecutionMode(executionMode) {
  if (executionMode === undefined) {
    throw new Error(`The property 'executionMode' is not defined`)
  } else if (
    executionMode !== EXECUTION_MODE_BATCH &&
    executionMode !== EXECUTION_MODE_NORMAL
  ) {
    throw new Error(
      `The property 'executionMode' must be one of '${EXECUTION_MODE_NORMAL}' or '${EXECUTION_MODE_BATCH}'. Not '${executionMode}'`
    )
  }
}
