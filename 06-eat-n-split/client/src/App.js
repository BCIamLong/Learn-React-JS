import { useEffect, useState } from "react";
import BillForm from "./components/BillForm";
import Button from "./components/Button";
import FriendForm from "./components/FriendForm";
import FriendList from "./components/FriendList";
import {
  getRandomImg,
  getFriends,
  newBill,
  getBill,
  updatePerson,
} from "./api";

export default function App() {
  const [friendFormOpen, setFriendFormOpen] = useState(false);
  const [billFormOpen, setBillFormOpen] = useState(false);
  const [curFriend, setCurFriend] = useState(null);
  const [image, setImage] = useState("");
  const [friends, setFriends] = useState([]);
  const [billVal, setBillVal] = useState("");
  const [myExpense, setMyExpense] = useState("");
  const [payer, setPayer] = useState("you");
  const [bill, setBill] = useState(null);
  const friendExpense = billVal - myExpense;
  // const friendExpense = billVal ? billVal - myExpense : null;
  // console.log(friendExpense);

  useEffect(
    () => async () => {
      const friendsData = await getFriends();
      // const bill = await getBill(curFriend?._id);
      // setBill(bill);
      // console.log(friendsData);
      setFriends(friendsData);
    },
    []
  );

  async function handleSplitBill() {
    const oweNum = payer === "you" ? friendExpense : myExpense;
    // setBill({ payer, owe: oweNum });
    await newBill({
      payer,
      owe: oweNum,
      billVal,
      myExpense,
      person: curFriend?._id,
    });
    const friendsData = await getFriends();
    setFriends(
      friendsData.map((friend) => {
        if (friend._id === curFriend._id) {
          const balance =
            payer === "you"
              ? friend.balance + friendExpense
              : friend.balance + -myExpense;
          updatePerson(curFriend?._id, { balance });
          return { ...friend, balance };
        }
        return friend;
      })
    );
    setBillFormOpen((billFormOpen) => !billFormOpen);
  }

  async function handleFriendFormOpen() {
    const img = await getRandomImg();
    // console.log(img);
    setImage(img);
    if (billFormOpen) setBillFormOpen((billFormOpen) => !billFormOpen);
    setFriendFormOpen((friendFormOpen) => !friendFormOpen);
  }
  async function handleBillFormOpen(friend) {
    const bill = await getBill(friend?._id);
    setBill(bill);
    setCurFriend(friend);
    if (friendFormOpen) setFriendFormOpen((friendFormOpen) => !friendFormOpen);
    setBillFormOpen((billFormOpen) => !billFormOpen);
  }
  // function handleSetFriends(newFriend) {
  //   setFriends((friends) => [...friends, newFriend]);
  // }
  return (
    <div className="container flex">
      <div className="sidebar">
        <FriendList
          onBillFormOpen={handleBillFormOpen}
          billFormOpen={billFormOpen}
          friends={friends}
          curFriend={curFriend}
        />
        <Button
          onBtnClick={handleFriendFormOpen}
          isFormOpen={friendFormOpen}
          type="form"
        >
          Add friend
        </Button>
        <FriendForm
          onFriendForm={handleFriendFormOpen}
          friendFormOpen={friendFormOpen}
          setFriendFormOpen={setFriendFormOpen}
          image={image}
          setFriends={setFriends}
        />
      </div>
      <BillForm
        key={curFriend?._id}
        billFormOpen={billFormOpen}
        curFriend={curFriend}
        onSetBillVal={setBillVal}
        onSetMyExpense={setMyExpense}
        friendExpense={friendExpense}
        billVal={billVal}
        myExpense={myExpense}
        onSetPayer={setPayer}
        onSplitBill={handleSplitBill}
        bill={bill}
        payer={payer}
      />
    </div>
  );
}
