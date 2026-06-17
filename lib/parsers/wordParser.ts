import { WordPair } from '@/types/word'

const SEPARATORS = [' - ', ': ', ' = ', ' | ', '-', ':']

export function parsePairs(text: string): WordPair[] {
	return text
		.split('\n')
		.map((l) => l.trim())
		.filter(Boolean)
		.flatMap((line) => {
			for (const sep of SEPARATORS) {
				const idx = line.indexOf(sep)
				if (idx > 0) {
					return [{ word: line.slice(0, idx).trim(), translation: line.slice(idx + sep.length).trim() }]
				}
			}
			return []
		})
		.filter((p) => p.word && p.translation)
}