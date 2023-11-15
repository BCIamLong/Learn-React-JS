import FriendItem from "./FriendItem";

export default function FriendList({
  onBillFormOpen,
  billFormOpen,
  friends,
  curFriend,
}) {
  return (
    <ul className="list">
      {friends?.map((friend) => (
        <FriendItem
          onBillFormOpen={onBillFormOpen}
          billFormOpen={billFormOpen}
          friend={friend}
          key={friend._id}
          curFriend={curFriend}
        />
      ))}
      {/* <FriendItem onBillFormOpen={onBillFormOpen} billFormOpen={billFormOpen} /> */}
      {/* <FriendItem />
      <FriendItem /> */}
    </ul>
  );
}
