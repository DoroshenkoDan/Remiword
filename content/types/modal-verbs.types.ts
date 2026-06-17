import { BaseGrammarTopic } from './base.types'

export interface ModalForm {
  modal: string
  negative: string
  past: string
  pastNegative: string
}

export interface ModalVerbsTopic extends BaseGrammarTopic {
  category: 'modal-verbs'
  forms: ModalForm
  meanings: string[]
}
