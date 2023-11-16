export default function Result({ movies }) {
  return (
    <p>
      Found <strong>{movies?.length}</strong> result
    </p>
  );
}
