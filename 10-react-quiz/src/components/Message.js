function Error({ type, message }) {
  return (
    <div className="msg">
      <h3 className="heading-tertiary">
        <span>🚫</span> Oh no some errors happen! <span>💥</span>
      </h3>
      <p className={`${type}`}>{message}</p>
    </div>
  );
}

export default Error;
