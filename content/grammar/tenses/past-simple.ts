import { TensesTopic } from '@/content/types'

export const pastSimple: TensesTopic = {
  slug: 'past-simple',
  title: 'Past Simple',
  category: 'tenses',
  description: 'Used for completed actions at a specific point in the past.',

  formula: [
    {
      type: 'positive',
      formula: 'Subject + V2 (regular: +ed)',
    },
    {
      type: 'negative',
      formula: "Subject + didn't + V1",
    },
    {
      type: 'question',
      formula: 'Did + Subject + V1?',
    },
  ],

  signalWords: [
    'yesterday',
    'ago',
    'last night',
    'last week',
    'last year',
    'in 2020',
    'the other day',
  ],

  examples: [
    { sentence: 'She visited her grandmother last weekend.' },
    { sentence: "He didn't come to the meeting." },
    { sentence: 'Did you enjoy the concert?' },
    { sentence: 'They moved to London two years ago.' },
  ],

  mistakes: [
    {
      wrong: "She didn't went to school.",
      correct: "She didn't go to school.",
      note: "After didn't, always use V1 (infinitive without to)",
    },
    {
      wrong: 'I have seen him yesterday.',
      correct: 'I saw him yesterday.',
      note: 'Use Past Simple — not Present Perfect — with specific past time (yesterday, last week)',
    },
  ],

  useCases: [
    {
      title: 'Completed past actions',
      example: 'I finished the project last Friday.',
    },
    {
      title: 'Past events in sequence',
      example: 'She woke up, had breakfast and left.',
    },
    {
      title: 'Past habits (with used to)',
      example: 'He used to play football every Sunday.',
    },
    {
      title: 'Historical facts',
      example: 'Neil Armstrong landed on the Moon in 1969.',
    },
  ],

  relatedTopics: ['present-perfect', 'past-continuous', 'past-perfect'],
}
