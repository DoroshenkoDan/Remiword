import { TensesTopic } from '@/content/types'

export const presentPerfectContinuous: TensesTopic = {
  slug: 'present-perfect-continuous',
  title: 'Present Perfect Continuous',
  category: 'tenses',
  description: 'Used for actions that started in the past and are still continuing, or recently stopped with a present result.',

  formula: [
    {
      type: 'positive',
      formula: 'Subject + have/has + been + V-ing',
    },
    {
      type: 'negative',
      formula: 'Subject + have/has + not + been + V-ing',
    },
    {
      type: 'question',
      formula: 'Have/Has + Subject + been + V-ing?',
    },
  ],

  signalWords: [
    'for',
    'since',
    'all day',
    'all morning',
    'lately',
    'how long',
    'recently',
  ],

  examples: [
    { sentence: 'She has been studying for three hours.' },
    { sentence: "They haven't been sleeping well lately." },
    { sentence: 'How long have you been waiting?' },
    { sentence: 'It has been raining since this morning.' },
  ],

  mistakes: [
    {
      wrong: 'I have been knowing him for years.',
      correct: 'I have known him for years.',
      note: 'Stative verbs (know, like, own) are not used in the Continuous form',
    },
    {
      wrong: 'She has been work all day.',
      correct: 'She has been working all day.',
      note: 'The main verb always takes -ing after have/has been',
    },
  ],

  useCases: [
    {
      title: 'Actions continuing up to now',
      example: 'I have been learning English for two years.',
    },
    {
      title: 'Recent actions with a visible result',
      example: 'Your eyes are red — have you been crying?',
    },
    {
      title: 'Emphasising the duration of an action',
      example: 'We have been driving for six hours.',
    },
    {
      title: 'Temporary repeated actions',
      example: 'He has been going to the gym a lot recently.',
    },
  ],

  relatedTopics: ['present-perfect', 'present-continuous', 'past-perfect-continuous'],
}
