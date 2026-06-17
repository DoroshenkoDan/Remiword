import { TensesTopic } from '@/content/types'

export const presentSimple: TensesTopic = {
  slug: 'present-simple',
  title: 'Present Simple',
  category: 'tenses',
  description: 'Used for facts, habits, routines and permanent situations.',

  formula: [
    {
      type: 'positive',
      formula: 'Subject + V1 (s/es for he/she/it)',
    },
    {
      type: 'negative',
      formula: "Subject + don't / doesn't + V1",
    },
    {
      type: 'question',
      formula: 'Do / Does + Subject + V1?',
    },
  ],

  signalWords: [
    'always',
    'usually',
    'often',
    'sometimes',
    'rarely',
    'never',
    'every day',
    'every week',
    'on Mondays',
    'twice a week',
  ],

  examples: [
    { sentence: 'She works every day.' },
    { sentence: "He doesn't like coffee." },
    { sentence: 'Do you speak English?' },
    { sentence: 'It takes 20 minutes.' },
  ],

  mistakes: [
    {
      wrong: 'She work every day.',
      correct: 'She works every day.',
      note: 'Add +s/es for he / she / it',
    },
    {
      wrong: 'He is work in a bank.',
      correct: 'He works in a bank.',
      note: 'Use V1 — not is/are + V-ing',
    },
  ],

  useCases: [
    {
      title: 'Facts and general truths',
      example: 'The sun rises in the east.',
    },
    {
      title: 'Habits and routines',
      example: 'I drink coffee every morning.',
    },
    {
      title: 'Permanent situations',
      example: 'She lives in Kyiv.',
    },
    {
      title: 'Schedules and timetables',
      example: 'The train leaves at 9am.',
    },
  ],

  relatedTopics: [
    'present-continuous',
    'present-perfect',
    'past-simple',
  ],
}
