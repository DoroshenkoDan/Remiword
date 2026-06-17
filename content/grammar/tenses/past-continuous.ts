import { TensesTopic } from '@/content/types'

export const pastContinuous: TensesTopic = {
  slug: 'past-continuous',
  title: 'Past Continuous',
  category: 'tenses',
  description: 'Used for actions that were in progress at a specific moment in the past.',

  formula: [
    {
      type: 'positive',
      formula: 'Subject + was/were + V-ing',
    },
    {
      type: 'negative',
      formula: 'Subject + was/were + not + V-ing',
    },
    {
      type: 'question',
      formula: 'Was/Were + Subject + V-ing?',
    },
  ],

  signalWords: [
    'while',
    'as',
    'when',
    'at that moment',
    'all day',
    'all morning',
    'at 5pm yesterday',
  ],

  examples: [
    { sentence: 'She was cooking dinner when he arrived.' },
    { sentence: "They weren't listening during the lecture." },
    { sentence: 'Were you working at 9pm last night?' },
    { sentence: 'I was reading while she was watching TV.' },
  ],

  mistakes: [
    {
      wrong: 'She was cook dinner at 7pm.',
      correct: 'She was cooking dinner at 7pm.',
      note: 'Must add -ing after was/were',
    },
    {
      wrong: 'While I was walking, I have seen a dog.',
      correct: 'While I was walking, I saw a dog.',
      note: 'Use Past Simple (not Present Perfect) for the interrupting action',
    },
  ],

  useCases: [
    {
      title: 'Action in progress at a past moment',
      example: 'At 8am I was having breakfast.',
    },
    {
      title: 'Two parallel past actions',
      example: 'He was reading while she was sleeping.',
    },
    {
      title: 'Background action interrupted by another',
      example: 'She was walking home when it started to rain.',
    },
    {
      title: 'Setting the scene in a story',
      example: 'The birds were singing and the sun was shining.',
    },
  ],

  relatedTopics: ['past-simple', 'past-perfect', 'past-perfect-continuous'],
}
