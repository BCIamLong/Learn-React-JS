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
  payer,
}) {
  const firstName = curFriend?.name.split(" ")[0];
  // const billValue = bill ? bill.billVal : billVal;
  const billValue = billVal;
  return (
    // <div
    //   className={`form form--bill${billFormOpen ? "" : " hide"}${
    //     bill ? " disable" : ""
    //   }`}
    // >
    <div
      className={`form form--bill${billFormOpen ? "" : " hide"}
      }`}
    >
      <h3 className="form-title">Split a bill with {firstName}</h3>
      <div className="form-item">
        <label>
          <span>💲</span> Bill value
        </label>
        <input
          type="number"
          value={billVal}
          onChange={(e) => onSetBillVal(e.target.value)}
        />
      </div>
      <div className="form-item">
        <label>
          <span>🧍‍♂️</span> Your expense
        </label>
        <input
          type="number"
          value={myExpense}
          onChange={(e) =>
            onSetMyExpense(
              +e.target.value > billValue ? billValue : e.target.value
            )
          }
          max={billVal}
          min={0}
        />
      </div>
      <div className="form-item">
        <label>
          <span>🧍‍♀️</span> {firstName}'s expense
        </label>
        <input type="text" value={friendExpense} readOnly disabled />
      </div>
      <div className="form-item">
        <label>
          <span>🤑</span> Who is paying the bill?
        </label>
        <select
          name=""
          id=""
          value={payer}
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
