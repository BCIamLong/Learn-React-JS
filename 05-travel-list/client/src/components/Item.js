export default function Item({ item, itemsList, setItemsList }) {
  async function deleteItemAPI(itemId) {
    await fetch(`http://127.0.0.1:3001/api/v1/travels/${itemId}`, {
      method: "DELETE",
    });
  }

  async function updateItemAPI(item) {
    await fetch(`http://127.0.0.1:3001/api/v1/travels/${item._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ packed: !item.packed }),
    });
  }

  function handleDeleteItem(itemId) {
    // const newItemsList = itemsList.filter((item) => item._id !== itemId);
    deleteItemAPI(itemId);

    // setItemsList(newItemsList);
    setItemsList((items) => items.filter((item) => item._id !== itemId));
  }

  function handleClickCheckbox(item) {
    updateItemAPI(item);
    setItemsList((itemsList) =>
      itemsList.map((i) =>
        i._id === item._id ? { ...item, packed: !item.packed } : i
      )
    );
  }

  // function handleToggleCheckbox(itemId) {
  //   updateItemAPI(item);

  //   setItemsList((itemsList) =>
  //     itemsList.map((item) =>
  //       item._id === itemId ? { ...item, packed: !item.packed } : item
  //     )
  //   );
  // }
  return (
    <li>
      {item.packed ? (
        <input
          type="checkbox"
          id="checkbox"
          // * we can also use onChange event to do it:
          // onChange={() => handleToggleCheckbox(item.id)}
          onClick={() => handleClickCheckbox(item)}
          defaultChecked
        />
      ) : (
        <input
          type="checkbox"
          id="checkbox"
          // * we can also use onChange event to do it:
          //  onChange={() => handleToggleCheckbox(item.id)}
          onClick={() => handleClickCheckbox(item)}
        />
      )}
      <label htmlFor="checkbox">{`${item.quantity} ${item.description}`}</label>
      <button onClick={() => handleDeleteItem(item._id)}>&times;</button>
    </li>
  );
}
