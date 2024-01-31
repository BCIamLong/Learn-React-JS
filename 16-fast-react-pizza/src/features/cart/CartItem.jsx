import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { deleteItem, updateItem } from './cartSlice';

CartItem.propTypes = {
  item: PropTypes.object,
};

function CartItem({ item }) {
  const dispatch = useDispatch();
  const { id, name, quantity, totalPrice, unitPrice } = item;
  // console.log(item);

  function handleDeleteItem() {
    if (!id) return;
    dispatch(deleteItem(id));
  }
  function handleIncQuantity() {
    if (!id) return;
    // if (!(quantity - 1)) return dispatch(deleteItem(id));
    dispatch(
      updateItem({
        ...item,
        quantity: quantity + 1,
        totalPrice: unitPrice * (quantity + 1),
      }),
    );
  }
  function handleDecQuantity() {
    if (!id) return;
    if (!(quantity - 1)) return dispatch(deleteItem(id));

    dispatch(
      updateItem({
        ...item,
        quantity: quantity - 1,
        totalPrice: unitPrice * (quantity - 1),
      }),
    );
  }

  return (
    <li className="grid grid-cols-[1fr_1.5fr_1fr_1fr] items-center gap-3">
      <div className="flex items-center gap-3">
        <Button type="round" onClick={handleDecQuantity}>
          -
        </Button>
        <p>{quantity}&times;</p>
        <Button type="round" onClick={handleIncQuantity}>
          +
        </Button>
      </div>
      <p>{name}</p>
      <div>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
      <div>
        <Button type="primary" onClick={handleDeleteItem}>
          Delete
        </Button>
      </div>
    </li>
  );
}

export default CartItem;
