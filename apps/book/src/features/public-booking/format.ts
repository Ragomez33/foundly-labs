/** Format an integer minor-unit amount as an es-ES currency string. */
export function formatPrice(amountCents: number, currency: string): string {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency }).format(amountCents / 100);
}

/** Extract an `HH:mm` label from an ISO-8601 instant (UTC slice). */
export function formatTimeLabel(iso: string): string {
  return iso.slice(11, 16);
}