export default function Button({ type, onBtnClick, children }) {
  return (
    <button className={`btn btn--${type}`} onClick={onBtnClick}>
      {children}
    </button>
  );
}
