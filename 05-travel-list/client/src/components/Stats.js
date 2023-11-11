export default function Stats({ itemsList }) {
  if (!itemsList?.length)
    return (
      <div className="stats">
        <p>Start adding some items to your packing list 🚀</p>
      </div>
    );

  const packedQuantity = itemsList?.filter((item) => item.packed)?.length;
  const itemsQuantity = itemsList?.length;
  const percentage = Math.round((packedQuantity / itemsQuantity) * 100);
  return (
    <div className="stats">
      <p>
        {percentage !== 100
          ? `💼 You have ${itemsQuantity} items on your list, and you already packed 
          ${packedQuantity} (${percentage}%)`
          : "🛫 You got everything, ready to go 🛫"}
      </p>
    </div>
  );
}
