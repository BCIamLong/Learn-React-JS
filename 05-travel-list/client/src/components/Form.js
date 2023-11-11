import { useState } from "react";

export default function Form({ onAddItem }) {
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
