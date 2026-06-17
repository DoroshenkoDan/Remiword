import { TensesTopic } from '@/content/types'

export const presentPerfect: TensesTopic = {
  slug: 'present-perfect',
  title: 'Present Perfect',
  category: 'tenses',
  description: 'Connects past actions or experiences to the present moment.',

  formula: [
    {
      type: 'positive',
      formula: 'Subject + have/has + V3',
    },
    {
      type: 'negative',
      formula: 'Subject + have/has + not + V3',
    },
    {
      type: 'question',
      formula: 'Have/Has + Subject + V3?',
    },
  ],

  signalWords: [
    'already',
    'just',
    'yet',
    'ever',
    'never',
    'recently',
    'lately',
    'so far',
  ],

  examples: [
    { sentence: 'She has already finished her homework.' },
    { sentence: "I haven't seen that film yet." },
    { sentence: 'Have you ever been to Japan?' },
    { sentence: 'They have lived here for ten years.' },
  ],

  mistakes: [
    {
      wrong: 'I have seen him yesterday.',
      correct: 'I saw him yesterday.',
      note: 'Use Past Simple with specific past time expressions (yesterday, last week, in 2020)',
    },
    {
      wrong: 'She has went to the store.',
      correct: 'She has gone to the store.',
      note: 'Always use V3 (past participle), not V2 (simple past)',
    },
  ],

  useCases: [
    {
      title: 'Life experiences',
      example: 'I have visited Paris twice.',
    },
    {
      title: 'Recent actions with present result',
      example: 'He has broken his leg.',
    },
    {
      title: 'Unfinished time periods',
      example: 'We have worked here since 2019.',
    },
    {
      title: 'Actions just completed',
      example: 'I have just sent the email.',
    },
  ],

  relatedTopics: ['present-simple', 'past-simple', 'present-perfect-continuous'],
}
