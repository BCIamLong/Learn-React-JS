export default function Button({ onBtnClick, children }) {
  return (
    <button className="btn" onClick={() => onBtnClick((isOpen) => !isOpen)}>
      {children}
    </button>
  );
}
