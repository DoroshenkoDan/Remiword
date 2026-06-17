export type GrammarCategory = 'tenses' | 'conditionals' | 'modal-verbs'

export interface Example {
  sentence: string
}

export interface Mistake {
  wrong: string
  correct: string
  note: string
}

export interface UseCase {
  title: string
  example: string
}

// Базовий інтерфейс — є у всіх трьох
export interface BaseGrammarTopic {
  slug: string
  title: string
  category: GrammarCategory
  description: string
  examples: Example[]
  mistakes: Mistake[]
  useCases: UseCase[]
  relatedTopics: string[]
}