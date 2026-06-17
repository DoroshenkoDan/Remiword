import type { ModalVerbsTopic } from '@/content/types'

export const needNeednt: ModalVerbsTopic = {
  slug: 'need-neednt',
  title: "Need / Needn't",
  category: 'modal-verbs',
  description: 'Used to express necessity or lack of necessity.',

  forms: {
    modal:        'need',
    negative:     "needn't / don't need to",
    past:         'needed to',
    pastNegative: "needn't have + V3 / didn't need to",
  },

  meanings: ['necessity', 'lack of necessity'],

  examples: [
    { sentence: "You needn't bring anything — we have everything." },
    { sentence: 'Do I need to book in advance?' },
    { sentence: "She needn't have worried — everything was fine." },
    { sentence: "You don't need to wear a tie here." },
  ],

  mistakes: [
    {
      wrong:   "You needn't to call him.",
      correct: "You needn't call him.",
      note:    'When used as modal — needn\'t has no to',
    },
    {
      wrong:   "He didn't need bringing his passport.",
      correct: "He didn't need to bring his passport.",
      note:    'When used as regular verb — need to + infinitive',
    },
  ],

  useCases: [
    { title: 'No obligation present',    example: "You needn't hurry." },
    { title: 'No obligation past',       example: "She didn't need to pay." },
    { title: 'Unnecessary past action',  example: "You needn't have cooked so much." },
  ],

  relatedTopics: ['must-have-to', 'should-ought-to'],
}
