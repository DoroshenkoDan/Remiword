import { TensesTopic } from '@/content/types'

export const pastPerfectContinuous: TensesTopic = {
  slug: 'past-perfect-continuous',
  title: 'Past Perfect Continuous',
  category: 'tenses',
  description: 'Used for an action that was in progress for some time before another action or moment in the past.',

  formula: [
    {
      type: 'positive',
      formula: 'Subject + had + been + V-ing',
    },
    {
      type: 'negative',
      formula: 'Subject + had + not + been + V-ing',
    },
    {
      type: 'question',
      formula: 'Had + Subject + been + V-ing?',
    },
  ],

  signalWords: [
    'for',
    'since',
    'before',
    'all day',
    'all morning',
    'how long',
  ],

  examples: [
    { sentence: 'She had been working there for ten years before she quit.' },
    { sentence: "They hadn't been waiting long when the bus came." },
    { sentence: 'How long had you been driving before you stopped?' },
    { sentence: 'The ground was wet because it had been raining.' },
  ],

  mistakes: [
    {
      wrong: 'She was tired because she had work all day.',
      correct: 'She was tired because she had been working all day.',
      note: 'Use had been + V-ing to stress the duration before a past moment',
    },
    {
      wrong: 'He had been knowing her for years.',
      correct: 'He had known her for years.',
      note: 'Stative verbs (know, want, believe) do not take the Continuous form',
    },
  ],

  useCases: [
    {
      title: 'Duration before another past action',
      example: 'He had been studying for hours before the exam.',
    },
    {
      title: 'Cause of a past situation',
      example: 'Her eyes were red because she had been crying.',
    },
    {
      title: 'Repeated or ongoing past activity',
      example: 'They had been arguing a lot before they split up.',
    },
    {
      title: 'Emphasising how long an action lasted',
      example: 'We had been walking for miles when it got dark.',
    },
  ],

  relatedTopics: ['past-perfect', 'past-continuous', 'present-perfect-continuous'],
}
