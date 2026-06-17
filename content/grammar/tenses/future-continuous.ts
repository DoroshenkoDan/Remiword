import { TensesTopic } from '@/content/types'

export const futureContinuous: TensesTopic = {
  slug: 'future-continuous',
  title: 'Future Continuous',
  category: 'tenses',
  description: 'Used for an action that will be in progress at a specific moment in the future.',

  formula: [
    {
      type: 'positive',
      formula: 'Subject + will + be + V-ing',
    },
    {
      type: 'negative',
      formula: "Subject + won't + be + V-ing",
    },
    {
      type: 'question',
      formula: 'Will + Subject + be + V-ing?',
    },
  ],

  signalWords: [
    'at this time tomorrow',
    'this time next week',
    'at 5pm tomorrow',
    'all day tomorrow',
    'while',
    'when',
  ],

  examples: [
    { sentence: 'This time tomorrow I will be flying to Rome.' },
    { sentence: "He won't be working on Sunday." },
    { sentence: 'Will you be using the car tonight?' },
    { sentence: 'At 8pm they will be having dinner.' },
  ],

  mistakes: [
    {
      wrong: 'At 8pm I will having dinner.',
      correct: 'At 8pm I will be having dinner.',
      note: "Don't drop be — the form is will + be + V-ing",
    },
    {
      wrong: 'This time tomorrow I will work.',
      correct: 'This time tomorrow I will be working.',
      note: 'Use the Continuous to show the action is in progress at that future moment',
    },
  ],

  useCases: [
    {
      title: 'Action in progress at a future time',
      example: 'At noon tomorrow I will be sitting on a beach.',
    },
    {
      title: 'Future actions as part of a routine',
      example: "I'll be seeing her at the meeting anyway.",
    },
    {
      title: 'Polite enquiries about plans',
      example: 'Will you be joining us for lunch?',
    },
    {
      title: 'An action interrupted by another in the future',
      example: 'She will be sleeping when you arrive.',
    },
  ],

  relatedTopics: ['future-simple', 'future-perfect', 'present-continuous'],
}
