import type { ModalVerbsTopic } from '@/content/types'

export const willWould: ModalVerbsTopic = {
  slug: 'will-would',
  title: 'Will / Would',
  category: 'modal-verbs',
  description: 'Used to express future actions, habits, requests and conditionals.',

  forms: {
    modal:        'will',
    negative:     "will not / won't",
    past:         'would',
    pastNegative: "would not / wouldn't",
  },

  meanings: ['future', 'spontaneous decision', 'habit (past)', 'polite request', 'conditional'],

  examples: [
    { sentence: 'I will call you when I arrive.' },
    { sentence: 'Would you like some coffee?' },
    { sentence: 'When I was young, we would visit my grandparents every Sunday.' },
    { sentence: "She won't listen to anyone." },
  ],

  mistakes: [
    {
      wrong:   'I will to help you tomorrow.',
      correct: 'I will help you tomorrow.',
      note:    'No to after will',
    },
    {
      wrong:   'Would you like coming with us?',
      correct: 'Would you like to come with us?',
      note:    'Would like is followed by to + infinitive',
    },
  ],

  useCases: [
    { title: 'Future plans and predictions', example: 'It will snow tomorrow.' },
    { title: 'Spontaneous decisions',        example: "I'll answer that." },
    { title: 'Past habits',                  example: 'He would read every evening.' },
    { title: 'Polite requests',              example: 'Would you mind closing the door?' },
  ],

  relatedTopics: ['may-might', 'should-ought-to'],
}
