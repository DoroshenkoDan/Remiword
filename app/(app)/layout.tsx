import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { BottomTabBar } from '@/components/layout/BottomTabBar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar / Navbar will go here */}
      <Header/>
      <Sidebar/>
      <main className="flex-1 overflow-hidden">{children}</main>
      <BottomTabBar/>
    </div>
  )
}
