import { TensesTopic } from '@/content/types'

export const pastPerfect: TensesTopic = {
  slug: 'past-perfect',
  title: 'Past Perfect',
  category: 'tenses',
  description: 'Used for an action completed before another action or time in the past.',

  formula: [
    {
      type: 'positive',
      formula: 'Subject + had + V3',
    },
    {
      type: 'negative',
      formula: 'Subject + had + not + V3',
    },
    {
      type: 'question',
      formula: 'Had + Subject + V3?',
    },
  ],

  signalWords: [
    'before',
    'after',
    'by the time',
    'by then',
    'already',
    'just',
    'never',
  ],

  examples: [
    { sentence: 'She had left before he arrived.' },
    { sentence: "They hadn't eaten, so they were hungry." },
    { sentence: 'Had you finished the report by Monday?' },
    { sentence: 'I had never seen snow before that winter.' },
  ],

  mistakes: [
    {
      wrong: 'When I arrived, she already left.',
      correct: 'When I arrived, she had already left.',
      note: 'Use Past Perfect for the action that happened first',
    },
    {
      wrong: 'He had went to the market.',
      correct: 'He had gone to the market.',
      note: 'Always use V3 (past participle) after had',
    },
  ],

  useCases: [
    {
      title: 'First of two past actions',
      example: 'By the time she called, I had already left.',
    },
    {
      title: 'Unfulfilled past conditions',
      example: 'If I had known, I would have helped.',
    },
    {
      title: 'Past experiences before a point in time',
      example: 'He had never tried sushi before that day.',
    },
    {
      title: 'Reported speech with past reference',
      example: 'She said she had finished the work.',
    },
  ],

  relatedTopics: ['past-simple', 'past-continuous', 'past-perfect-continuous'],
}
