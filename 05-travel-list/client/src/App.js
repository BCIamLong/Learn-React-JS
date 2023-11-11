import { useEffect, useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Coat", quantity: 3, packed: true },
// ];

export default function App() {
  const [itemsList, setItemsList] = useState();
  async function postItemAPI(newItem) {
    // const res =
    await fetch("http://127.0.0.1:3001/api/v1/travels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });
    // const data = await res.json();
  }

  function handleAddItem(item) {
    postItemAPI(item);

    setItemsList((itemsList) => [...itemsList, item]);
  }

  async function getData() {
    const res = await fetch("http://127.0.0.1:3001/api/v1/travels");
    const data = await res.json();

    setItemsList(data.travelItems);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="travel">
      <Logo />
      <Form itemsList={itemsList} onAddItem={handleAddItem} />
      <PackingList itemsList={itemsList} setItemsList={setItemsList} />
      <Stats itemsList={itemsList} />
    </div>
  );
}

function Logo() {
  return <div className="logo">🌴 FAR AWAY 💼</div>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  // * when submit event occurs react will call this function and it will pass the object event to function so the object with all about information about event and it looks like vanilla JS right

  function handleSubmitForm(e) {
    e.preventDefault();
    // console.log(e.target);
    if (!description) return alert("Please enter the item field required");
    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };
    onAddItem(newItem);
    setDescription("");
    setQuantity(1);
  }
  return (
    <div className="form-box">
      <form className="form" onSubmit={handleSubmitForm}>
        <span>What do you need for your 😍 trip? </span>
        <select
          id="number"
          value={quantity}
          onChange={(e) => {
            setQuantity(+e.target.value);
          }}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          id="item"
          type="text"
          placeholder="Item..."
          value={description}
          // * so whenever we type something to input field the change event will trigger, and we can react to that event here with this onchange event handler
          // * and the this function will always receive event when it call and then set new state with new value of input field
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>Add</button>
      </form>
    </div>
  );
}

function PackingList({ itemsList, setItemsList }) {
  async function deleteAllItemAPI() {
    await fetch("http://127.0.0.1:3001/api/v1/travels", {
      method: "DELETE",
    });
  }
  function handleDeleteAllItem() {
    deleteAllItemAPI();
    setItemsList([]);
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
        <select name="sort" id="sort">
          <option>sort</option>
          <option value="description">Sort by the tag description</option>
        </select>
        <button onClick={handleDeleteAllItem} className="btn-clear">
          Clear list
        </button>
      </div>
    </div>
  );
}

function Item({ item, itemsList, setItemsList }) {
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

  function handleToggleCheckbox(itemId) {
    updateItemAPI(item);

    setItemsList((itemsList) =>
      itemsList.map((item) =>
        item._id === itemId ? { ...item, packed: !item.packed } : item
      )
    );
  }
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

function Stats({ itemsList }) {
  const packedQuantity = itemsList?.filter((item) => item.packed)?.length;
  const itemsQuantity = itemsList?.length;
  return (
    <div className="stats">
      <p>
        💼 You have {itemsQuantity} items on your list, and you already packed{" "}
        {packedQuantity} ({Math.round((packedQuantity / itemsQuantity) * 100)}%)
      </p>
    </div>
  );
}

// ------------------------USE SETTER FUNCTION AS PROPS
/*
function Form({ itemsList, setItemsList }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  // * when submit event occurs react will call this function and it will pass the object event to function so the object with all about information about event and it looks like vanilla JS right

  async function postItemAPI(newItem) {
    // const res =
    await fetch("http://127.0.0.1:3001/api/v1/travels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });
    // const data = await res.json();
  }

  function handleAddItem(itemsList) {
    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };
    postItemAPI(newItem);

    return [...itemsList, newItem];
  }

  function handleSubmitForm(e) {
    e.preventDefault();
    // console.log(e.target);
    if (!description) return alert("Please enter the item field required");

    setItemsList((itemsList) => handleAddItem(itemsList));
    setDescription("");
    setQuantity(1);
  }
  return (
    <div className="form-box">
      <form className="form" onSubmit={handleSubmitForm}>
        <span>What do you need for your 😍 trip? </span>
        <select
          id="number"
          value={quantity}
          onChange={(e) => {
            setQuantity(+e.target.value);
          }}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          id="item"
          type="text"
          placeholder="Item..."
          value={description}
          // * so whenever we type something to input field the change event will trigger, and we can react to that event here with this onchange event handler
          // * and the this function will always receive event when it call and then set new state with new value of input field
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>Add</button>
      </form>
    </div>
  );
}
*/
