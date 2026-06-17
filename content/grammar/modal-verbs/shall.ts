import type { ModalVerbsTopic } from '@/content/types'

export const shall: ModalVerbsTopic = {
  slug: 'shall',
  title: 'Shall',
  category: 'modal-verbs',
  description: 'Used for suggestions, offers and formal future — mainly in questions.',

  forms: {
    modal:        'shall',
    negative:     "shall not / shan't",
    past:         '—',
    pastNegative: '—',
  },

  meanings: ['suggestion', 'offer', 'formal future'],

  examples: [
    { sentence: 'Shall we go for a walk?' },
    { sentence: 'Shall I help you with that?' },
    { sentence: 'What time shall we meet?' },
    { sentence: 'I shall return — formal/literary.' },
  ],

  mistakes: [
    {
      wrong:   'Shall I to open the window?',
      correct: 'Shall I open the window?',
      note:    'No to after shall',
    },
    {
      wrong:   'Shall you come to the party?',
      correct: 'Will you come to the party?',
      note:    'Shall is mainly used with I and We in modern English',
    },
  ],

  useCases: [
    { title: 'Suggestions',   example: 'Shall we order pizza?' },
    { title: 'Offers',        example: 'Shall I carry that for you?' },
    { title: 'Formal future', example: 'The contract shall be signed tomorrow.' },
  ],

  relatedTopics: ['will-would', 'can-could'],
}
