export default function QuizSessionLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  )
}
