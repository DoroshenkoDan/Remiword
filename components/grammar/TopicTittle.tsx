/**
 * Page header for a grammar topic — title with inline category badge, description.
 */

interface TopicTittleProps {
  title: string
  description: string
  category: string
}

const CATEGORY_LABEL: Record<string, string> = {
  tenses:        'Tenses',
  conditionals:  'Conditionals',
  'modal-verbs': 'Modal Verbs',
}

export function TopicTittle({ title, description, category }: TopicTittleProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2.5 flex-wrap">
        <h1 className="text-[24px] font-medium text-text-primary leading-tight">{title}</h1>
        <span className="px-2.5 py-0.5 rounded-full bg-primary/15 text-text-secondary text-xs font-medium">
          {CATEGORY_LABEL[category] ?? category}
        </span>
      </div>
      <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
    </div>
  )
}
