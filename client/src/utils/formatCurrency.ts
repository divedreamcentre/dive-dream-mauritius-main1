import type { Price } from '@/types';

// Strapi now sends prices as { amount, currency, unitLabel } instead of a
// bare number, so the symbol has to be derived from `currency` rather than
// hardcoded — otherwise MUR (and any future currency) would still render
// with a "$" prefix. Centralized here so a new currency added in the CMS
// only needs an entry in this map, not another hunt through the codebase.
const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  MUR: 'Rs',
};

// $/€/£ butt up against the number ("$65"), matching the site's existing
// style. Rs is set to lead with a space ("Rs 1,500") per common Mauritian
// convention — confirm this is the client's preferred formatting before
// shipping, since it's the one currency here without a live convention to
// match against.
const SPACE_AFTER_SYMBOL = new Set(['MUR']);

export function formatPrice(price: Price): string {
  const symbol = CURRENCY_SYMBOLS[price.currency] ?? price.currency;
  const amount = price.amount.toLocaleString();
  const value = SPACE_AFTER_SYMBOL.has(price.currency) ? `${symbol} ${amount}` : `${symbol}${amount}`;
  return price.unitLabel ? `${value} ${price.unitLabel}` : value;
}
