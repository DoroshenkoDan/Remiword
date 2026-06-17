import type { ConditionalsTopic } from '@/content/types'

export const thirdConditional: ConditionalsTopic = {
  slug: 'third-conditional',
  title: 'Third Conditional',
  category: 'conditionals',
  realOrUnreal: 'unreal',
  description: 'Used for imaginary situations in the past — things that did not happen.',

  formula: {
    ifClause: 'If + Past Perfect',
    mainClause: 'would have + V3',
    example: 'If I had studied harder, I would have passed the exam.',
  },

  examples: [
    { sentence: 'If she had left earlier, she would have caught the train.' },
    { sentence: 'He would have got the job if he had prepared better.' },
    { sentence: 'If we had known about the problem, we would have fixed it.' },
    { sentence: 'Would you have helped if I had asked you?' },
  ],

  mistakes: [
    {
      wrong: 'If I would have known, I would have helped.',
      correct: 'If I had known, I would have helped.',
      note: 'Use Past Perfect in the if-clause, not would have',
    },
    {
      wrong: 'If she studied harder, she would have passed.',
      correct: 'If she had studied harder, she would have passed.',
      note: 'Third conditional needs Past Perfect in the if-clause',
    },
  ],

  useCases: [
    { title: 'Imaginary past situations',     example: 'If I had taken that job, my life would be different.' },
    { title: 'Regrets about the past',        example: 'If I had studied harder, I would have graduated.' },
    { title: 'Criticism of past actions',     example: 'If you had listened, you would have understood.' },
  ],

  relatedTopics: ['second-conditional', 'past-perfect'],
}
