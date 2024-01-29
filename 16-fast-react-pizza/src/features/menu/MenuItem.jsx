import PropTypes from 'prop-types';
import { formatCurrency } from '../../utils/helpers';
import Button from '../../ui/Button';

MenuItem.propTypes = {
  pizza: PropTypes.any,
};

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  return (
    <li
      className={`${soldOut ? 'opacity-80 grayscale' : ''} h-full rounded shadow`}
    >
      <div className="overflow-hidden">
        <img
          className="w-full overflow-hidden transition-all duration-200 hover:scale-125"
          src={imageUrl}
          alt={name}
        />
      </div>
      <div className="flex h-32 flex-col gap-2 px-1 py-2">
        <p className="text-xl font-semibold">{name}</p>
        <p className="text-xs capitalize italic">{ingredients.join(', ')}</p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <>
              <p>{formatCurrency(unitPrice)}</p>
              <Button to="/cart" type="small">
                Add to cart
              </Button>
            </>
          ) : (
            <p className="border-2 border-dotted border-yellow-300 px-3 py-1 text-sm uppercase text-stone-500">
              Sold out
            </p>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
