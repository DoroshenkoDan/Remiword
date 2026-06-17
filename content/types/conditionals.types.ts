import { BaseGrammarTopic } from './base.types'

export interface ConditionalsFormula {
  ifClause: string
  mainClause: string
  example: string
}

export interface ConditionalsTopic extends BaseGrammarTopic {
  category: 'conditionals'
  formula: ConditionalsFormula
  realOrUnreal: 'real' | 'unreal' | 'mixed'
}
