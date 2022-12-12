[@bitdiver/definition](../README.md) / [Exports](../modules.md) / SuiteDefinitionInterface

# Interface: SuiteDefinitionInterface

## Table of contents

### Properties

- [executionMode](SuiteDefinitionInterface.md#executionmode)
- [name](SuiteDefinitionInterface.md#name)
- [steps](SuiteDefinitionInterface.md#steps)
- [tags](SuiteDefinitionInterface.md#tags)
- [testcases](SuiteDefinitionInterface.md#testcases)

## Properties

### executionMode

• **executionMode**: ``"normal"`` \| ``"batch"``

#### Defined in

interfaceSuiteDefinition.ts:22

___

### name

• **name**: `string`

The name of this suite

#### Defined in

interfaceSuiteDefinition.ts:6

___

### steps

• **steps**: `Object`

The name used to store the step here step.name.
It is used to reference the step from the testcase

#### Index signature

▪ [key: `string`]: [`StepDefinitionInterface`](StepDefinitionInterface.md)

#### Defined in

interfaceSuiteDefinition.ts:15

___

### tags

• `Optional` **tags**: `string`[]

String tags for filtering results

#### Defined in

interfaceSuiteDefinition.ts:9

___

### testcases

• **testcases**: [`TestcaseDefinitionInterface`](TestcaseDefinitionInterface.md)[]

The list of testcases to be executed in the right order

#### Defined in

interfaceSuiteDefinition.ts:20
