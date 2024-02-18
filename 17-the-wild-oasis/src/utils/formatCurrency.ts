export default function formatCurrency(amount: number) {
  const length = amount.toString().length;
  const numberOfComma = Math.floor(length / 3);

  let amountFormat;
  if (!numberOfComma) amountFormat = amount;
  else
    amountFormat = amount
      .toString()
      .split("")
      .reduce((str, el, i) => {
        return i % 3 === 0 && i !== length - 1 && length > 3 ? str + el + "," : str + el;
      }, "");

  amountFormat = amountFormat + ".00";

  return `$${amountFormat}`;
}
