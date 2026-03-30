export function formatPrice(amount) {
  return new Intl.NumberFormat('ar-PS', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
