import Hero from './components/Hero';
import Features from './components/Features';
import UserRole from './components/UserRole';
import HowItWork from './components/HowItWorks';
import CTA from './components/CTA';

export default function HomePage() {
  return (
    <div className="bg-white text-gray-800">
      <Hero />
      <Features />
      <UserRole />
      <HowItWork />
      <CTA />
    </div>
  );
}
