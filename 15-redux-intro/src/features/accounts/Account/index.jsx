import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Account.module.css";
import Form from "../../../components/Form";
import { deposit, withdraw, requestLoan, payLoan } from "../accountSlice";

function Account() {
  const [depositAmount, setDepositAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");

  // const account = useSelector((store) => store.account);
  const {
    loan,
    loadPurpose: purpose,
    isLoading,
  } = useSelector((store) => store.account);
  // * we can also use the state instead store: (state) => state.account because in the end it's entire state right
  // * but the store name is the convention and we can follow that as well but do it with state also no problem

  const dispatch = useDispatch();

  function handleDepositAmount(e) {
    e.preventDefault();
    if (!depositAmount) return;
    //* so usually the calculate to return the event object should be in the action creator function, because as the name said it return event object and it should do all the computation for return event object right
    // * if possible let's do it so computations in the action creator function
    // let amount = depositAmount;
    // if (currency === "EUR") amount = depositAmount * 1.09;
    // if (currency === "VND") amount = depositAmount * 0.000041;

    dispatch(deposit(depositAmount, currency));

    setDepositAmount("");
    setCurrency("USD");
  }

  function handleWithdraw(e) {
    e.preventDefault();
    if (!withdrawAmount) return;

    dispatch(withdraw(withdrawAmount));

    setWithdrawAmount("");
  }

  function handleRequestLoan(e) {
    e.preventDefault();

    if (!loanAmount || !loanPurpose) return;

    dispatch(requestLoan(loanAmount, loanPurpose));

    setLoanAmount("");
    setLoanPurpose("");
  }

  function handlePayLoan(e) {
    e.preventDefault();

    dispatch(payLoan());
  }

  return (
    <div className={styles.account}>
      <h3>Your account operations</h3>
      <Form>
        <div>
          <label htmlFor="deposit">Deposit</label>
          <input
            id="deposit"
            type="text"
            value={depositAmount}
            onChange={(e) => setDepositAmount(+e.target.value)}
          />
          <select
            name="currency"
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">USD Dollar</option>
            <option value="EUR">Euro</option>
            <option value="VND">VietNam Dong</option>
          </select>
          <button onClick={handleDepositAmount} disabled={isLoading}>
            {isLoading ? "Depositing..." : `Deposit ${depositAmount}`}
          </button>
        </div>
        <div>
          <label htmlFor="withdraw">Withdraw</label>
          <input
            id="withdraw"
            type="text"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(+e.target.value)}
          />
          <button onClick={handleWithdraw}>Withdraw</button>
        </div>
        <div>
          <label htmlFor="requestLoan">Request Loan</label>
          <input
            id="requestLoan"
            type="text"
            placeholder="Loan amount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
          />
          <input
            id="loanPurpose"
            type="text"
            placeholder="Loan purpose"
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
          />
          <button onClick={handleRequestLoan}>Request Loan</button>
        </div>
        {loan !== 0 && (
          <div>
            {/* <label>Pay back ${account.loan}</label> */}
            <label>
              Pay back ${loan} ({purpose})
            </label>
            <button onClick={handlePayLoan}>Pay Loan</button>
          </div>
        )}
      </Form>
    </div>
  );
}

export default Account;
