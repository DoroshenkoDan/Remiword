import { BaseGrammarTopic } from './base.types'

export interface TensesFormula {
  type: 'positive' | 'negative' | 'question'
  formula: string
}

export interface TensesTopic extends BaseGrammarTopic {
  category: 'tenses'
  formula: TensesFormula[]
  signalWords: string[]
}