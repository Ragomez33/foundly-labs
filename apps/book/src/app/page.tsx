import type { Metadata } from 'next';
import { ProductLanding } from './components/ProductLanding';
import {
  BOOK_BENEFITS,
  BOOK_CTA,
  BOOK_DEMO,
  BOOK_FINAL_CTA,
  BOOK_HERO,
  BOOK_INDUSTRIES,
} from './book-product';

export const metadata: Metadata = {
  title: 'Foundly Book',
  description: BOOK_HERO.subtitle,
};

/** Product page (public `/book`): module capabilities + register CTA (FR-001/FR-002). */
export default function HomePage() {
  return (
    <ProductLanding
      hero={BOOK_HERO}
      cta={BOOK_CTA}
      demo={BOOK_DEMO}
      benefits={BOOK_BENEFITS}
      industries={BOOK_INDUSTRIES}
      finalCta={BOOK_FINAL_CTA}
    />
  );
}