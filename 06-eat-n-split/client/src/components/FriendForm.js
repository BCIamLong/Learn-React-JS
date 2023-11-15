import { useState } from "react";
import Button from "./Button";
import { newPerson } from "../api";

export default function FriendForm({
  friendFormOpen,
  onFriendForm,
  image,
  setFriendFormOpen,
  setFriends,
}) {
  const [friendName, setFriendName] = useState("");
  async function handleAddFriend(e) {
    e.preventDefault();

    if (!friendName || !image)
      return alert("Please enter fully infos to add new friend!");

    const newFriend = await newPerson({ name: friendName, image });
    // console.log(newFriend);
    if (!newFriend) return;

    alert("Add new friend successfully");
    setFriendName("");
    setFriends((friends) => [...friends, newFriend]);
    setFriendFormOpen((friendFormOpen) => !friendFormOpen);
  }

  return (
    <div className={`add-form${friendFormOpen ? "" : " hide"}`}>
      <form action="" className="form">
        <div className="form-item">
          <label>
            <span>🙋‍♂️</span> Friend name
          </label>
          <input
            type="text"
            value={friendName}
            onChange={(e) => setFriendName(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label>
            <span>💶</span> Image URL
          </label>
          <input type="text" defaultValue={image} />
        </div>
        <Button type="form" onBtnClick={handleAddFriend}>
          Add
        </Button>
      </form>
      <Button type="form" onBtnClick={onFriendForm}>
        Close
      </Button>
    </div>
  );
}
