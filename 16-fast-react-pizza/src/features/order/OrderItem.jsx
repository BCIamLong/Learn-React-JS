import { formatCurrency } from '../../utils/helpers';

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li>
      <div className="flex items-center justify-between p-3">
        <p className="flex gap-6">
          <span className="font-semibold">{quantity}&times;</span> {name}
        </p>
        <p className="italic">{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
