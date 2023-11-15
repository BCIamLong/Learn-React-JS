export default function Button({ type, children, onBtnClick, isFormOpen }) {
  return (
    <button
      className={`btn${type === "form" ? " btn--add" : ""}${
        isFormOpen ? " hide" : ""
      }`}
      onClick={onBtnClick}
    >
      {children}
    </button>
  );
}
