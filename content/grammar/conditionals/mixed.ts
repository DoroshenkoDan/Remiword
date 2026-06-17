import type { ConditionalsTopic } from '@/content/types'

export const mixedConditional: ConditionalsTopic = {
  slug: 'mixed-conditional',
  title: 'Mixed Conditional',
  category: 'conditionals',
  realOrUnreal: 'mixed',
  description: 'Combines past and present time references to talk about hypothetical situations.',

  formula: {
    ifClause: 'If + Past Perfect',
    mainClause: 'would + V1',
    example: 'If I had studied medicine, I would be a doctor now.',
  },

  examples: [
    { sentence: 'If she had taken the job, she would be living in Paris now.' },
    { sentence: 'He would have more friends if he were more sociable.' },
    { sentence: "If I had saved more money, I wouldn't be broke now." },
    { sentence: 'They would be together now if they had met earlier.' },
  ],

  mistakes: [
    {
      wrong: 'If I studied medicine, I would have been a doctor.',
      correct: 'If I had studied medicine, I would be a doctor now.',
      note: 'Mixed conditional mixes past perfect (if) with would + V1 (main)',
    },
    {
      wrong: 'If she would have taken the job, she would live in Paris.',
      correct: 'If she had taken the job, she would live in Paris now.',
      note: 'Never use would in the if-clause',
    },
  ],

  useCases: [
    { title: 'Past action with present consequence',                    example: 'If I had chosen a different career, I would be happier now.' },
    { title: 'Present situation that would have changed a past outcome', example: 'If I were braver, I would have spoken up.' },
    { title: 'Hypothetical combinations of past and present',           example: 'If she had moved here, we would be neighbors now.' },
  ],

  relatedTopics: ['second-conditional', 'third-conditional'],
}
