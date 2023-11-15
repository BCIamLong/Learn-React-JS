import Button from "./Button";

export default function BillForm({
  billFormOpen,
  curFriend,
  onSetBillVal,
  onSetMyExpense,
  friendExpense,
  billVal,
  myExpense,
  onSetPayer,
  onSplitBill,
  bill,
}) {
  const firstName = curFriend?.name.split(" ")[0];
  const billValue = bill ? bill.billVal : billVal;
  return (
    <div
      className={`form form--bill${billFormOpen ? "" : " hide"}${
        bill ? " disable" : ""
      }`}
    >
      <h3 className="form-title">Split a bill with {firstName}</h3>
      <div className="form-item">
        <label>
          <span>💲</span> Bill value
        </label>
        <input
          type="number"
          value={bill ? bill.billVal : billVal}
          onChange={(e) => onSetBillVal(e.target.value)}
        />
      </div>
      <div className="form-item">
        <label>
          <span>🧍‍♂️</span> Your expense
        </label>
        <input
          type="number"
          value={bill ? bill.myExpense : myExpense}
          onChange={(e) =>
            onSetMyExpense(
              +e.target.value > billValue ? billValue : e.target.value
            )
          }
          max={bill ? bill.billVal : billVal}
          min={0}
        />
      </div>
      <div className="form-item">
        <label>
          <span>🧍‍♀️</span> {firstName}'s expense
        </label>
        <input
          type="text"
          value={bill ? bill.billVal - bill.myExpense : friendExpense}
          readOnly
          disabled
        />
      </div>
      <div className="form-item">
        <label>
          <span>🤑</span> Who is paying the bill?
        </label>
        <select
          name=""
          id=""
          value={bill ? bill.payer : "You"}
          onChange={(e) => onSetPayer(e.target.value)}
        >
          <option value="you">You</option>
          <option value="friend">{firstName}</option>
        </select>
      </div>
      <Button type="form" onBtnClick={onSplitBill}>
        {bill ? "Paid" : "Split bill"}
      </Button>
    </div>
  );
}
