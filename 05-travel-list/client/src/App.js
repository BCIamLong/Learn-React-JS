import { useEffect, useState } from "react";
import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";

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
