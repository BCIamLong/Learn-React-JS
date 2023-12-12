function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className="btn-fake-dark-mode">
      {children}
    </button>
  );
}

export default Button;
