import type { ModalVerbsTopic } from '@/content/types'

export const shouldOughtTo: ModalVerbsTopic = {
  slug: 'should-ought-to',
  title: 'Should / Ought to',
  category: 'modal-verbs',
  description: 'Used to express advice, recommendation and moral obligation.',

  forms: {
    modal:        'should',
    negative:     "should not / shouldn't",
    past:         'should have + V3',
    pastNegative: "shouldn't have + V3",
  },

  meanings: ['advice', 'recommendation', 'expectation', 'criticism of past'],

  examples: [
    { sentence: 'You should see a doctor if you feel unwell.' },
    { sentence: 'She ought to apologize for what she said.' },
    { sentence: "They shouldn't have left without telling anyone." },
    { sentence: 'You should have called me earlier.' },
  ],

  mistakes: [
    {
      wrong:   'You should to eat more vegetables.',
      correct: 'You should eat more vegetables.',
      note:    'No to after should',
    },
    {
      wrong:   'He should studied harder.',
      correct: 'He should have studied harder.',
      note:    'For past advice use should have + past participle',
    },
  ],

  useCases: [
    { title: 'Giving advice',          example: 'You should get more sleep.' },
    { title: 'Making recommendations', example: 'You ought to try this restaurant.' },
    { title: 'Expectation',            example: 'The package should arrive tomorrow.' },
    { title: 'Criticism of past',      example: "You shouldn't have said that." },
  ],

  relatedTopics: ['must-have-to', 'may-might'],
}
