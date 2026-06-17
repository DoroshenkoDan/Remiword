import type { ModalVerbsTopic } from '@/content/types'

export const usedTo: ModalVerbsTopic = {
  slug: 'used-to',
  title: 'Used to',
  category: 'modal-verbs',
  description: 'Used to describe past habits and states that no longer exist.',

  forms: {
    modal:        'used to',
    negative:     "didn't use to / used not to",
    past:         '—',
    pastNegative: '—',
  },

  meanings: ['past habit', 'past state'],

  examples: [
    { sentence: 'I used to play football every weekend.' },
    { sentence: "She didn't use to drink coffee." },
    { sentence: 'Did you use to live here?' },
    { sentence: 'There used to be a cinema on this street.' },
  ],

  mistakes: [
    {
      wrong:   'I use to wake up early.',
      correct: 'I used to wake up early.',
      note:    'Always used to — never use to in positive sentences',
    },
    {
      wrong:   'I am used to wake up early.',
      correct: 'I am used to waking up early.',
      note:    'Be used to doing = accustomed to — different meaning',
    },
  ],

  useCases: [
    { title: 'Past repeated actions',           example: 'He used to smoke.' },
    { title: 'Past states',                     example: 'She used to be very shy.' },
    { title: 'Contrasting past and present',    example: 'I used to hate vegetables but now I love them.' },
  ],

  relatedTopics: ['will-would', 'past-simple'],
}
