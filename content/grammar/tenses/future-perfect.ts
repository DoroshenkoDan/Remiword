import { TensesTopic } from '@/content/types'

export const futurePerfect: TensesTopic = {
  slug: 'future-perfect',
  title: 'Future Perfect',
  category: 'tenses',
  description: 'Used for an action that will be completed before a specific time or another action in the future.',

  formula: [
    {
      type: 'positive',
      formula: 'Subject + will + have + V3',
    },
    {
      type: 'negative',
      formula: "Subject + won't + have + V3",
    },
    {
      type: 'question',
      formula: 'Will + Subject + have + V3?',
    },
  ],

  signalWords: [
    'by',
    'by then',
    'by the time',
    'by next year',
    'before',
    'by 2030',
  ],

  examples: [
    { sentence: 'By next June I will have finished my degree.' },
    { sentence: "They won't have arrived by 6pm." },
    { sentence: 'Will you have read the book by Friday?' },
    { sentence: 'By the time you wake up, I will have left.' },
  ],

  mistakes: [
    {
      wrong: 'By 2030 I will finished university.',
      correct: 'By 2030 I will have finished university.',
      note: 'The form is will + have + V3 (past participle)',
    },
    {
      wrong: 'I will have went by then.',
      correct: 'I will have gone by then.',
      note: 'Always use V3 after have — gone, not went',
    },
  ],

  useCases: [
    {
      title: 'Action completed before a future time',
      example: 'By midnight I will have written the report.',
    },
    {
      title: 'Action completed before another future action',
      example: 'She will have left before we get there.',
    },
    {
      title: 'Predicting completion with a deadline',
      example: 'The builders will have finished by spring.',
    },
    {
      title: 'Looking back from a future point',
      example: 'Next month I will have worked here for five years.',
    },
  ],

  relatedTopics: ['future-simple', 'future-continuous', 'future-perfect-continuous'],
}
