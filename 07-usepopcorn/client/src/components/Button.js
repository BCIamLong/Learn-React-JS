export default function Button({ type, onBtnClick, children }) {
  return (
    <button
      className={`btn ${type === "back" ? "btn--back" : ""}`}
      onClick={() => onBtnClick((isOpen) => !isOpen)}
    >
      {children}
    </button>
  );
}
