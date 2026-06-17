import type { ConditionalsTopic } from '@/content/types'

export const secondConditional: ConditionalsTopic = {
  slug: 'second-conditional',
  title: 'Second Conditional',
  category: 'conditionals',
  realOrUnreal: 'unreal',
  description: 'Used for hypothetical or unlikely situations in the present or future.',

  formula: {
    ifClause: 'If + Past Simple',
    mainClause: 'would + V1',
    example: 'If I had more time, I would learn Spanish.',
  },

  examples: [
    { sentence: 'If I were rich, I would travel the world.' },
    { sentence: 'She would be happier if she changed her job.' },
    { sentence: 'If he studied more, he would get better grades.' },
    { sentence: 'What would you do if you won the lottery?' },
  ],

  mistakes: [
    {
      wrong: 'If I would have money, I would buy a car.',
      correct: 'If I had money, I would buy a car.',
      note: 'Never use would in the if-clause',
    },
    {
      wrong: 'If I was you, I would apologize.',
      correct: 'If I were you, I would apologize.',
      note: 'Use were for all persons — if I were you',
    },
  ],

  useCases: [
    { title: 'Imaginary or hypothetical present situations', example: 'If I lived in Paris, I would speak French.' },
    { title: 'Giving advice (If I were you...)',             example: 'If I were you, I would talk to her.' },
    { title: 'Dreams and wishes',                           example: 'If I could fly, I would visit every country.' },
  ],

  relatedTopics: ['first-conditional', 'third-conditional'],
}
