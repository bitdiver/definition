[@bitdiver/definition](../README.md) / [Exports](../modules.md) / TestcaseDefinitionInterface

# Interface: TestcaseDefinitionInterface

Defines one single testcase in the suite

## Table of contents

### Properties

- [data](TestcaseDefinitionInterface.md#data)
- [decription](TestcaseDefinitionInterface.md#decription)
- [name](TestcaseDefinitionInterface.md#name)
- [steps](TestcaseDefinitionInterface.md#steps)
- [tags](TestcaseDefinitionInterface.md#tags)

## Properties

### data

• **data**: `any`[]

The data for each step of this test case.
The order of the stepIds and data corresponds to each other
For each entry in the 'steps' property must be one entry in the
'data' array. If a step do not need any data then a null must be there

#### Defined in

interfaceTestcaseDefinition.ts:23

___

### decription

• `Optional` **decription**: `string`

A description of this testcase

#### Defined in

interfaceTestcaseDefinition.ts:12

___

### name

• **name**: `string`

The name of the testcase

#### Defined in

interfaceTestcaseDefinition.ts:6

___

### steps

• **steps**: `string`[]

The step names to be executed for this test case in the right order

#### Defined in

interfaceTestcaseDefinition.ts:15

___

### tags

• `Optional` **tags**: `string`[]

String tags for filtering results

#### Defined in

interfaceTestcaseDefinition.ts:9
