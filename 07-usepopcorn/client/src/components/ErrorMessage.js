export default function Error({ error }) {
  return (
    <p className="error">
      <span>🚫 </span>
      {error}
      <span> 💥</span>
    </p>
  );
}
