import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

Button.propTypes = {
  children: PropTypes.any,
  disabled: PropTypes.bool,
  to: PropTypes.string,
  type: PropTypes.string,
};

function Button({ to, type, disabled, children }) {
  const base =
    'inline-block rounded-full border-2  border-yellow-300 bg-yellow-400  transition-all duration-200 hover:bg-yellow-300 font-semibold ';
  const styles = {
    primary: base + 'sm:px-3 sm:py-2 px-2 py-1',
    small:
      base +
      'sm:px-3 sm:py-2 px-2 py-1 text-sm hover:-translate-y-1 hover:shadow-lg',
  };

  if (to)
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );

  return (
    <button className={styles[type]} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
