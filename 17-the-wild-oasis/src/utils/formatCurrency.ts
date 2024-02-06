export default function formatCurrency(amount: number) {
  const amountFormat = amount.toFixed(2);
  return `$${amountFormat}`;
}
