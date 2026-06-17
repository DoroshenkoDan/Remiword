import { grammarTopics } from '@/content/grammar'
import { GrammarView }   from './_components/GrammarView'

export default function GrammarPage() {
  return <GrammarView topics={grammarTopics} />
}
