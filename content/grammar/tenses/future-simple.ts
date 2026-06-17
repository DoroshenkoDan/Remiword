import { TensesTopic } from '@/content/types'

export const futureSimple: TensesTopic = {
  slug: 'future-simple',
  title: 'Future Simple',
  category: 'tenses',
  description: 'Used for predictions, decisions made at the moment, and future facts.',

  formula: [
    {
      type: 'positive',
      formula: 'Subject + will + V1',
    },
    {
      type: 'negative',
      formula: "Subject + won't + V1",
    },
    {
      type: 'question',
      formula: 'Will + Subject + V1?',
    },
  ],

  signalWords: [
    'tomorrow',
    'next week',
    'next year',
    'soon',
    'in the future',
    'probably',
    'perhaps',
    'I think',
    "I'm sure",
  ],

  examples: [
    { sentence: 'She will call you tomorrow.' },
    { sentence: "I won't be at the office on Friday." },
    { sentence: 'Will they finish the project on time?' },
    { sentence: 'I think it will rain later.' },
  ],

  mistakes: [
    {
      wrong: 'I will to call you later.',
      correct: 'I will call you later.',
      note: "Never use 'to' after will — use bare infinitive (V1)",
    },
    {
      wrong: 'She wills come tomorrow.',
      correct: 'She will come tomorrow.',
      note: 'Will never changes — no +s for he/she/it',
    },
  ],

  useCases: [
    {
      title: 'Predictions about the future',
      example: 'I think prices will go up next year.',
    },
    {
      title: 'Spontaneous decisions',
      example: 'The phone is ringing — I will get it!',
    },
    {
      title: 'Promises and offers',
      example: 'I will help you with that.',
    },
    {
      title: 'Future facts',
      example: 'She will be 30 next month.',
    },
  ],

  relatedTopics: ['future-continuous', 'future-perfect', 'present-continuous'],
}
