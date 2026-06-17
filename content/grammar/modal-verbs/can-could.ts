import type { ModalVerbsTopic } from '@/content/types'

export const canCould: ModalVerbsTopic = {
  slug: 'can-could',
  title: 'Can / Could',
  category: 'modal-verbs',
  description: 'Used to express ability, permission and requests in present and past.',

  forms: {
    modal:        'can',
    negative:     "cannot / can't",
    past:         'could',
    pastNegative: "couldn't",
  },

  meanings: ['ability', 'permission', 'request', 'possibility'],

  examples: [
    { sentence: 'She can speak three languages.' },
    { sentence: 'Could you help me with this, please?' },
    { sentence: "You can't park here." },
    { sentence: "He couldn't swim when he was five." },
  ],

  mistakes: [
    {
      wrong:   'She can to swim very well.',
      correct: 'She can swim very well.',
      note:    'Modal verbs are always followed by bare infinitive — no to',
    },
    {
      wrong:   'Can you to help me?',
      correct: 'Can you help me?',
      note:    'No to after modal verbs',
    },
  ],

  useCases: [
    { title: 'Ability in present', example: 'I can run 10km.' },
    { title: 'Ability in past',    example: 'She could dance when she was young.' },
    { title: 'Permission',         example: 'Can I open the window?' },
    { title: 'Polite request',     example: 'Could you pass the salt, please?' },
  ],

  relatedTopics: ['may-might', 'must-have-to'],
}
