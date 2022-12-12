import Ajv from 'ajv'
import { SuiteDefinitionInterface } from '../interfaceSuiteDefinition'
import schema from './interfaceSuiteDefinition.json'

// stores the compiled schema
const validateFunction = new Ajv({ allErrors: true }).compile(schema)

export function validate(value: unknown): SuiteDefinitionInterface {
  if (validateFunction(value)) {
    return value as unknown as SuiteDefinitionInterface
  } else {
    throw new Error(JSON.stringify(validateFunction.errors, null, 2))
  }
}
