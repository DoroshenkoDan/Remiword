import type { ModalVerbsTopic } from '@/content/types'

export const mayMight: ModalVerbsTopic = {
  slug: 'may-might',
  title: 'May / Might',
  category: 'modal-verbs',
  description: 'Used to express possibility and permission in formal contexts.',

  forms: {
    modal:        'may',
    negative:     'may not',
    past:         'might',
    pastNegative: "might not / mightn't",
  },

  meanings: ['possibility', 'permission (formal)', 'uncertainty'],

  examples: [
    { sentence: 'It may rain later — take an umbrella.' },
    { sentence: "She might not come to the party." },
    { sentence: 'May I use your phone?' },
    { sentence: 'He might have missed the train.' },
  ],

  mistakes: [
    {
      wrong:   'It may to snow tomorrow.',
      correct: 'It may snow tomorrow.',
      note:    'No to after may or might',
    },
    {
      wrong:   'She might be arrived already.',
      correct: 'She might have arrived already.',
      note:    'For past possibility use might have + past participle',
    },
  ],

  useCases: [
    { title: 'Present possibility', example: 'I may be late tonight.' },
    { title: 'Future possibility',  example: 'We might go abroad this summer.' },
    { title: 'Formal permission',   example: 'May I come in?' },
    { title: 'Past possibility',    example: 'He might have forgotten.' },
  ],

  relatedTopics: ['can-could', 'will-would'],
}
