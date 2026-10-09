import type { Metadata } from 'next';
import { WizardShell } from './components/WizardShell';

export const metadata: Metadata = {
  title: 'Crea tu negocio — Foundly Book',
  description: 'Registra tu negocio en Foundly Book en tres pasos.',
};

export default function OnboardingPage() {
  return <WizardShell />;
}