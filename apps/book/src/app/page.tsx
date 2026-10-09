import type { Metadata } from 'next';
import { ProductLanding } from './components/ProductLanding';
import { BOOK_CTA, BOOK_DEMO, BOOK_FEATURES, BOOK_HERO } from './book-product';

export const metadata: Metadata = {
  title: 'Foundly Book',
  description: BOOK_HERO.subtitle,
};

/** Product page (public `/book`): module capabilities + register CTA (FR-001/FR-002). */
export default function HomePage() {
  return <ProductLanding hero={BOOK_HERO} cta={BOOK_CTA} demo={BOOK_DEMO} features={BOOK_FEATURES} />;
}