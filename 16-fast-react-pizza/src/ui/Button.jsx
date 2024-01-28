import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

Button.propTypes = {
  children: PropTypes.any,
  disabled: PropTypes.bool,
  to: PropTypes.string,
};

function Button({ to, disabled, children }) {
  const className =
    'inline-block rounded-full border-2  border-yellow-300 bg-yellow-400 px-2 py-1 transition-colors duration-200 hover:bg-yellow-300 sm:px-3 sm:py-2';
  if (to)
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    );

  return (
    <button className={className} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
