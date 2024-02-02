import PropTypes from 'prop-types';
import { formatCurrency } from '../../utils/helpers';

OrderItem.propTypes = {
  item: PropTypes.object,
  isLoadingIngredients: PropTypes.bool,
  ingredients: PropTypes.array,
};

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;
  // console.log(ingredients);

  return (
    <li>
      {/* <div className="flex items-center justify-between p-3"> */}
      <div className="grid grid-cols-3 items-center p-3">
        <p className="flex gap-6">
          <span className="font-semibold">{quantity}&times;</span> {name}
        </p>
        <p className="text-xs capitalize italic">
          {isLoadingIngredients ? 'Loading...' : ingredients.join(', ')}
        </p>
        <p className="justify-self-end font-semibold italic">
          {formatCurrency(totalPrice)}
        </p>
      </div>
    </li>
  );
}

export default OrderItem;
