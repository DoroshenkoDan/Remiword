// Word
export interface Word {
  id: string
  term: string
  translation: string
  example?: string
  tags?: string[]
  created_at: string
  user_id: string
}

// Quiz
export type QuizType = 'flashcard' | 'choice' | 'spelling'

export interface QuizResult {
  word_id: string
  correct: boolean
  answered_at: string
}

// Grammar
export interface GrammarTopic {
  slug: string
  title: string
  description: string
  category: 'tenses' | 'conditionals' | 'modal-verbs'
}

// Progress
export interface UserProgress {
  user_id: string
  words_learned: number
  quiz_streak: number
  last_activity: string
}
