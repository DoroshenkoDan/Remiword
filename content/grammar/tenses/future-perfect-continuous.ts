import { TensesTopic } from '@/content/types'

export const futurePerfectContinuous: TensesTopic = {
  slug: 'future-perfect-continuous',
  title: 'Future Perfect Continuous',
  category: 'tenses',
  description: 'Used to emphasise the duration of an action up to a specific point in the future.',

  formula: [
    {
      type: 'positive',
      formula: 'Subject + will + have + been + V-ing',
    },
    {
      type: 'negative',
      formula: "Subject + won't + have + been + V-ing",
    },
    {
      type: 'question',
      formula: 'Will + Subject + have + been + V-ing?',
    },
  ],

  signalWords: [
    'by',
    'by then',
    'by the time',
    'for',
    'by 2030',
  ],

  examples: [
    { sentence: 'By next month I will have been working here for five years.' },
    { sentence: "By 9pm they won't have been driving for too long." },
    { sentence: 'Will you have been studying for six hours by then?' },
    { sentence: 'By the time she retires, she will have been teaching for 40 years.' },
  ],

  mistakes: [
    {
      wrong: 'By June I will have been work here for a year.',
      correct: 'By June I will have been working here for a year.',
      note: 'The form is will + have + been + V-ing',
    },
    {
      wrong: 'By then I will have been knowing him for years.',
      correct: 'By then I will have known him for years.',
      note: 'Stative verbs (know, own, believe) do not take the Continuous form',
    },
  ],

  useCases: [
    {
      title: 'Duration up to a future point',
      example: 'By 5pm I will have been waiting for three hours.',
    },
    {
      title: 'Emphasising a long ongoing activity',
      example: 'Next year they will have been building it for a decade.',
    },
    {
      title: 'Cause of a future situation',
      example: "I'll be tired tonight — I will have been travelling all day.",
    },
    {
      title: 'Highlighting effort over time',
      example: 'By graduation she will have been studying medicine for six years.',
    },
  ],

  relatedTopics: ['future-perfect', 'present-perfect-continuous', 'future-continuous'],
}
