export function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function isExpired(isoString?: string): boolean {
  if (!isoString) return false;
  return new Date(isoString).getTime() < Date.now();
}
