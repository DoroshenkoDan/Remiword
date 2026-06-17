import type { TensesTopic } from './tenses.types'
import type { ConditionalsTopic } from './conditionals.types'
import type { ModalVerbsTopic } from './modal-verbs.types'

export * from './base.types'
export * from './tenses.types'
export * from './conditionals.types'
export * from './modal-verbs.types'

// Union type
export type GrammarTopic = TensesTopic | ConditionalsTopic | ModalVerbsTopic