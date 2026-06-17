import type { ConditionalsTopic } from '@/content/types'

export const firstConditional: ConditionalsTopic = {
  slug: 'first-conditional',
  title: 'First Conditional',
  category: 'conditionals',
  realOrUnreal: 'real',
  description: 'Used for real and possible situations in the future.',

  formula: {
    ifClause: 'If + Present Simple',
    mainClause: 'will + V1',
    example: 'If it rains tomorrow, I will stay home.',
  },

  examples: [
    { sentence: 'If you study hard, you will pass the exam.' },
    { sentence: 'I will call you if I need help.' },
    { sentence: 'If she arrives late, we will start without her.' },
    { sentence: 'Will you come if I invite you?' },
  ],

  mistakes: [
    {
      wrong: 'If it will rain, I will stay home.',
      correct: 'If it rains, I will stay home.',
      note: 'Never use will in the if-clause',
    },
    {
      wrong: 'If you study, you pass.',
      correct: 'If you study, you will pass.',
      note: 'First conditional needs will in the main clause',
    },
  ],

  useCases: [
    { title: 'Real future possibilities', example: 'If the weather is good, we will go hiking.' },
    { title: 'Warnings and threats',      example: 'If you do that again, you will regret it.' },
    { title: 'Promises and offers',       example: 'If you help me, I will buy you lunch.' },
  ],

  relatedTopics: ['zero-conditional', 'second-conditional', 'future-simple'],
}
