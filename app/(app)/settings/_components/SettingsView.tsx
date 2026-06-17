import { ScrollArea } from '@/components/ui/scroll-area'
import { SettingsDesktopHeader } from './SettingsDesktopHeader'
import { AccountCard } from './AccountCard'
import { TelegramBotCard } from './TelegramBotCard'
import { FeedbackCard } from './FeedbackCard'
import { DangerZoneCard } from './DangerZoneCard'
import { RemiwordCard } from './RemiwordCard'

export function SettingsView() {
  return (
    <div className="flex flex-col flex-1 h-[calc(100dvh-56px)] md:h-screen overflow-hidden pt-14 md:pt-0">
      <SettingsDesktopHeader />

      <ScrollArea className="flex-1 min-h-0">
        <div className="flex flex-col md:flex-row px-4 md:px-8 md:items-start min-h-full">
          <div className="flex flex-col gap-3 pt-5 pb-8 md:w-[59%]">
            <AccountCard />
            <FeedbackCard />
            <DangerZoneCard />
          </div>
          <div className='flex md:hidden w-full'>
            <div className='w-full border-t border-border' />
          </div>
          <div className='hidden md:flex w-[2%] self-stretch justify-center'>
            <div className='w-px h-full border-r border-border' />
          </div>
          <div className="flex flex-col gap-3 pt-5 pb-8 md:w-[39%]">
            <TelegramBotCard />
          </div>
        </div>
      </ScrollArea>
      <RemiwordCard />
    </div>
  )
}
