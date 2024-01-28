import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

LinkButton.propTypes = {
  children: PropTypes.any,
  to: PropTypes.any,
};

function LinkButton({ children, to }) {
  const navigate = useNavigate();
  const className =
    'transition-all text-yellow-500 duration-150 hover:text-yellow-500 hover:underline';

  if (to === '-1')
    return (
      <button className={className} onClick={() => navigate(-1)}>
        {children}
      </button>
    );

  return (
    <Link
      // * https://tailwindcss.com/docs/transition-property
      // transition-colors, transition-transform...
      className={className}
      to={to}
    >
      {children}
    </Link>
  );
}

export default LinkButton;
