import { TensesTopic } from '@/content/types'

export const presentContinuous: TensesTopic = {
  slug: 'present-continuous',
  title: 'Present Continuous',
  category: 'tenses',
  description: 'Used for actions happening right now or around the current moment.',

  formula: [
    {
      type: 'positive',
      formula: 'Subject + is/am/are + V-ing',
    },
    {
      type: 'negative',
      formula: 'Subject + is/am/are + not + V-ing',
    },
    {
      type: 'question',
      formula: 'Is/Am/Are + Subject + V-ing?',
    },
  ],

  signalWords: [
    'now',
    'right now',
    'at the moment',
    'currently',
    'still',
    'Look!',
    'Listen!',
  ],

  examples: [
    { sentence: 'She is reading a book right now.' },
    { sentence: "They aren't watching TV at the moment." },
    { sentence: 'Is he working from home today?' },
    { sentence: 'I am learning English this year.' },
  ],

  mistakes: [
    {
      wrong: 'She is know the answer.',
      correct: 'She knows the answer.',
      note: 'Stative verbs (know, like, want, love) are not used in Continuous',
    },
    {
      wrong: 'They are work in the office.',
      correct: 'They are working in the office.',
      note: 'Must add -ing to the main verb',
    },
  ],

  useCases: [
    {
      title: 'Actions happening right now',
      example: 'Look! It is raining outside.',
    },
    {
      title: 'Temporary situations',
      example: 'I am staying at a hotel this week.',
    },
    {
      title: 'Changing or developing situations',
      example: 'The weather is getting colder.',
    },
    {
      title: 'Future arrangements',
      example: 'We are meeting at 7pm tonight.',
    },
  ],

  relatedTopics: ['present-simple', 'present-perfect', 'future-continuous'],
}
