import type { ModalVerbsTopic } from '@/content/types'

export const mustHaveTo: ModalVerbsTopic = {
  slug: 'must-have-to',
  title: 'Must / Have to',
  category: 'modal-verbs',
  description: 'Used to express obligation, necessity and prohibition.',

  forms: {
    modal:        'must',
    negative:     "must not / mustn't",
    past:         'had to',
    pastNegative: "didn't have to",
  },

  meanings: ['obligation', 'necessity', 'prohibition', 'strong advice'],

  examples: [
    { sentence: 'You must wear a seatbelt by law.' },
    { sentence: 'I have to finish this report by Friday.' },
    { sentence: "You mustn't use your phone while driving." },
    { sentence: 'She had to work late yesterday.' },
  ],

  mistakes: [
    {
      wrong:   'You must to pay the fine.',
      correct: 'You must pay the fine.',
      note:    'No to after must',
    },
    {
      wrong:   "I didn't must go to school today.",
      correct: "I didn't have to go to school today.",
      note:    'Must has no past form — use had to instead',
    },
  ],

  useCases: [
    { title: 'Internal obligation',   example: 'I must call my mother.' },
    { title: 'External obligation',   example: 'You have to show your passport.' },
    { title: 'Prohibition',           example: "You mustn't smoke here." },
    { title: 'No obligation (past)',  example: "We didn't have to pay." },
  ],

  relatedTopics: ['should-ought-to', 'can-could'],
}
