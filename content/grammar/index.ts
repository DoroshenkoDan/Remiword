import type { GrammarTopic, GrammarCategory } from '@/content/types'

import { presentSimple }              from './tenses/present-simple'
import { presentContinuous }          from './tenses/present-continuous'
import { presentPerfect }             from './tenses/present-perfect'
import { presentPerfectContinuous }   from './tenses/present-perfect-continuous'
import { pastSimple }                 from './tenses/past-simple'
import { pastContinuous }             from './tenses/past-continuous'
import { pastPerfect }                from './tenses/past-perfect'
import { pastPerfectContinuous }      from './tenses/past-perfect-continuous'
import { futureSimple }               from './tenses/future-simple'
import { futureContinuous }           from './tenses/future-continuous'
import { futurePerfect }              from './tenses/future-perfect'
import { futurePerfectContinuous }    from './tenses/future-perfect-continuous'

import { zeroConditional }    from './conditionals/zero'
import { firstConditional }   from './conditionals/first'
import { secondConditional }  from './conditionals/second'
import { thirdConditional }   from './conditionals/third'
import { mixedConditional }   from './conditionals/mixed'

import { canCould }           from './modal-verbs/can-could'
import { mustHaveTo }         from './modal-verbs/must-have-to'
import { shouldOughtTo }      from './modal-verbs/should-ought-to'
import { mayMight }           from './modal-verbs/may-might'
import { willWould }          from './modal-verbs/will-would'
import { shall }              from './modal-verbs/shall'
import { needNeednt }         from './modal-verbs/need-neednt'
import { usedTo }             from './modal-verbs/used-to'

export const grammarTopics: GrammarTopic[] = [
  presentSimple,
  presentContinuous,
  presentPerfect,
  presentPerfectContinuous,
  pastSimple,
  pastContinuous,
  pastPerfect,
  pastPerfectContinuous,
  futureSimple,
  futureContinuous,
  futurePerfect,
  futurePerfectContinuous,

  zeroConditional,
  firstConditional,
  secondConditional,
  thirdConditional,
  mixedConditional,

  canCould,
  mustHaveTo,
  shouldOughtTo,
  mayMight,
  willWould,
  shall,
  needNeednt,
  usedTo,
]

export function getTopicBySlug(slug: string): GrammarTopic | undefined {
  return grammarTopics.find((t) => t.slug === slug)
}

export function getTopicsByCategory(category: GrammarCategory): GrammarTopic[] {
  return grammarTopics.filter((t) => t.category === category)
}
