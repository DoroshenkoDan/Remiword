import type { ConditionalsTopic } from '@/content/types'

export const zeroConditional: ConditionalsTopic = {
  slug: 'zero-conditional',
  title: 'Zero Conditional',
  category: 'conditionals',
  realOrUnreal: 'real',
  description: 'Used for facts, scientific truths and situations that are always true.',

  formula: {
    ifClause: 'If + Present Simple',
    mainClause: 'Present Simple',
    example: 'If you heat water to 100°C, it boils.',
  },

  examples: [
    { sentence: 'If you mix red and blue, you get purple.' },
    { sentence: 'Water freezes if the temperature drops below 0°C.' },
    { sentence: 'If it rains, the ground gets wet.' },
    { sentence: "Plants die if they don't get water." },
  ],

  mistakes: [
    {
      wrong: 'If you will heat water, it boils.',
      correct: 'If you heat water, it boils.',
      note: 'Use Present Simple in both clauses — no will',
    },
    {
      wrong: 'If she studies, she will pass.',
      correct: 'If she studies, she passes.',
      note: 'Zero conditional = fact, not future prediction',
    },
  ],

  useCases: [
    { title: 'Scientific facts and natural laws',          example: 'If you drop something, it falls.' },
    { title: 'General truths that are always true',        example: 'If you eat too much, you gain weight.' },
    { title: 'Instructions and cause-effect relationships', example: 'If you press this button, the door opens.' },
  ],

  relatedTopics: ['first-conditional', 'present-simple'],
}
