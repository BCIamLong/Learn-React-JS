import Button from "./Button";

export default function FriendItem({
  onBillFormOpen,
  billFormOpen,
  friend,
  curFriend,
}) {
  return (
    <li
      className={`item${
        billFormOpen && curFriend._id === friend._id ? " selected" : ""
      }`}
    >
      <img src={friend.image} alt={friend.name} />
      <div className="user-info">
        <p className="name">{friend.name}</p>

        {friend.bill?.length ? (
          friend?.bill[0]?.payer === "you" ? (
            <p className="description no-owe">
              {friend.name} owes you ${friend?.bill[0]?.owe}$
            </p>
          ) : (
            <p className="description owe">
              You owe {friend.name} {friend?.bill[0]?.owe}$
            </p>
          )
        ) : (
          <p className="description">You and {friend.name} are even</p>
        )}
      </div>
      <Button onBtnClick={() => onBillFormOpen(friend)}>
        {billFormOpen && curFriend._id === friend._id ? "Close" : "Select"}
      </Button>
      {/* <button className="btn" onClick={onBillFormOpen}>
        Select
      </button> */}
    </li>
  );
}
