// Formats a plain number as USD, matching the site's existing "$65" style
// (used for package/course prices). Centralized so price formatting stays
// consistent once prices start coming from Strapi.
export function formatCurrency(amount: number): string {
  return `$${amount}`;
}
