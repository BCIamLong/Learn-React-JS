import Item from "./Item";

export default function PackingList({ itemsList, setItemsList }) {
  // const [sortBy, setSortBy] = useState("input");

  // let sortByItems;
  // if (sortBy === "input") sortByItems = itemsList;
  // if (sortBy === "description")
  //   sortByItems = [...itemsList].sort((a, b) =>
  //     a.description.localeCompare(b.description)
  //   );
  // // sortByItems = [...itemsList].sort(
  // //   (a, b) => a.description.length - b.description.length
  // // );
  // if (sortBy === "packed")
  //   sortByItems = [...itemsList].sort(
  //     (a, b) => Number(a.packed) - Number(b.packed)
  //   );

  async function deleteAllItemAPI() {
    await fetch("http://127.0.0.1:3001/api/v1/travels", {
      method: "DELETE",
    });
  }
  function handleDeleteAllItem() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (!confirmed) return;

    deleteAllItemAPI();
    setItemsList([]);
  }
  function handleSortItems(sort) {
    // console.log(sort === "description");
    if (sort === "input") {
      const newItemsList = [...itemsList].reverse();
      setItemsList(newItemsList);
    }
    if (sort === "description") {
      const newItemsList = [...itemsList].sort(
        (a, b) => a.description.length - b.description.length
      );
      setItemsList(newItemsList);
    }

    if (sort === "packed") {
      const newItemsList = [...itemsList].sort(
        (a, b) => Number(a.packed) - Number(b.packed)
      );
      setItemsList(newItemsList);
    }
    // console.log(
    //   itemsList.sort((a, b) => a.description.length - b.description.length)
    // );
    // setItemsList((itemsList) =>
    //   itemsList.sort((a, b) => a.description.length - b.description.length)
    // );
  }
  return (
    <div className="packing-list">
      <ul className="packings">
        {itemsList?.map((item) => (
          <Item
            key={item._id || item.id}
            item={item}
            itemsList={itemsList}
            setItemsList={setItemsList}
          />
        ))}
      </ul>
      <div className="option-box">
        <select
          name="sort"
          id="sort"
          // value={sortBy}
          // onChange={(e) => setSortBy(e.target.value)}
          onChange={(e) => handleSortItems(e.target.value)}
        >
          {/* <option>sort</option> */}
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={handleDeleteAllItem} className="btn-clear">
          Clear list
        </button>
      </div>
    </div>
  );
}
