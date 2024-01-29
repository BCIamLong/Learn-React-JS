import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="grid grid-cols-[1fr_1.5fr_1fr_1fr] items-center ">
      <p>{quantity}&times;</p>
      <p>{name}</p>
      <div>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
      <div>
        <Button type="primary">Delete</Button>
      </div>
    </li>
  );
}

export default CartItem;
