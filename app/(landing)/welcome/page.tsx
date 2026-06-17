
import { Hero } from './sections/Hero/Hero'
import { HowItWorks } from './sections/HowItWorks/HowItWorks'
import { EverythingYouNeedToLearn } from './sections/EverythingYouNeedToLearn/EverythingYouNeedToLearn'
import { WhyCreateAccount } from './sections/WhyCreateAccount/WhyCreateAccount'
import { ReadyToStartLearning } from './sections/ReadyToStartLearning/ReadyToStartLearning'

export default function LandingPage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <EverythingYouNeedToLearn />
      <WhyCreateAccount />
      <ReadyToStartLearning />
    </>
  )
}
